import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const sizes = [[320,568],[360,640],[375,667],[390,844],[414,896],[768,1024],[900,900],[1024,768],[1366,768],[1440,900],[1920,1080]];
async function ready(page: Page) {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1900);
}
async function exposure(page: Page, selector: string) {
  return page.locator(selector).evaluate(el => {
    const r = el.getBoundingClientRect();
    const points = [[r.left+4,r.top+4],[r.right-4,r.top+4],[r.left+4,r.bottom-4],[r.right-4,r.bottom-4],[r.left+r.width/2,r.top+r.height/2]];
    return {inViewport:r.top>=0 && r.bottom<=innerHeight && r.left>=0 && r.right<=innerWidth,
      unobscured:points.every(([x,y])=>{const hit=document.elementFromPoint(x,y); return !!hit && el.contains(hit);}),
      height:r.height, width:r.width};
  });
}
for (const reducedMotion of ['no-preference', 'reduce'] as const) {
  for (const [width,height] of sizes) {
    test(`responsive ${width}x${height} ${reducedMotion}`, async ({page}, info) => {
      await page.setViewportSize({width,height});
      await page.emulateMedia({reducedMotion});
      const errors: string[] = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('console', m => {if(m.type()==='error') errors.push(m.text());});
      page.on('requestfailed', r => errors.push(`Network failure: ${r.url()}`));
      await ready(page);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      expect(await exposure(page, '#inicio .btn-primary')).toMatchObject({inViewport:true,unobscured:true});
      for(const [region,selector] of [['hero','#inicio'],['signature','#servicio'],['cta','#contacto'],['footer','footer']]) {
        if(region!=='hero') {await page.locator(selector).scrollIntoViewIfNeeded(); await page.waitForTimeout(350);}
        if(reducedMotion==='no-preference') await page.screenshot({path:info.outputPath(`${width}-${region}.png`)});
      }
      await page.locator('#contacto .btn-primary').focus();
      await page.waitForTimeout(350);
      expect((await exposure(page,'#contacto .btn-primary')).unobscured).toBe(true);
      expect(errors).toEqual([]);
    });
  }
}

test('mobile menu keyboard, escape, anchors, repeated use, scroll and rotation', async ({page}) => {
  await page.setViewportSize({width:360,height:640}); await ready(page);
  const toggle=page.getByRole('button',{name:'Abrir menú'});
  for(let i=0;i<3;i++) {
    await toggle.click(); await expect(page.locator('#menu-movil')).toBeVisible();
    await page.keyboard.press('Tab'); await expect(page.locator('#menu-movil a').first()).toBeFocused();
    await page.keyboard.press('Escape'); await expect(toggle).toBeFocused();
    await expect(page.locator('#menu-movil')).toHaveCount(0);
  }
  await toggle.click(); await page.locator('#menu-movil a[href="#proceso"]').click();
  await expect(page).toHaveURL(/#proceso$/); await expect(toggle).toHaveAttribute('aria-expanded','false');
  await page.mouse.wheel(0,900); await page.keyboard.press('Home');
  await toggle.focus(); await toggle.click();
  await page.setViewportSize({width:640,height:360});
  await page.locator('#menu-movil a').last().scrollIntoViewIfNeeded();
  expect((await exposure(page,'#menu-movil a:last-child')).unobscured).toBe(true);
});

test('legal pages expose consent revocation and preserve rejection', async ({page}) => {
  await ready(page); await page.getByRole('button',{name:/Rechazar/}).click();
  await page.reload(); await expect(page.getByRole('dialog')).toHaveCount(0);
  for(const route of ['/privacidad','/terminos']) {
    await page.goto(route); await page.getByRole('button',{name:'Preferencias de privacidad'}).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button',{name:/Rechazar/}).click();
    const other=route==='/privacidad'?'/terminos':'/privacidad';
    await page.locator(`.legal-switch a[href="${other}"]`).click();
    await expect(page).toHaveURL(new RegExp(other+'$'));
  }
});

test('keyboard skip link and full focus traversal stay reachable with consent open',async ({page})=>{
  await page.setViewportSize({width:320,height:568});await ready(page);
  await page.keyboard.press('Tab');await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');await expect(page).toHaveURL(/#contenido$/);
  const visited:string[]=[];
  for(let i=0;i<32;i++) {
    await page.keyboard.press('Tab'); await page.waitForTimeout(30);
    const observed=await page.evaluate(()=>{
      const el=document.activeElement;if(!(el instanceof HTMLElement)||el===document.body)return null;
      const r=el.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
      const hit=document.elementFromPoint(x,y);
      return {name:el.textContent?.trim().slice(0,60),visible:r.width>0&&r.height>0&&x>=0&&x<=innerWidth&&y>=0&&y<=innerHeight&&!!hit&&el.contains(hit)};
    });
    if(observed){visited.push(observed.name||'control');expect(observed.visible,observed.name).toBe(true);}
  }
  expect(visited.length).toBeGreaterThan(10);
});

test('consent gates scripts, captures intent only, then revokes cookies and transport', async ({page,context}) => {
  const requested: string[]=[];
  const remote = /googletagmanager|google-analytics|connect\.facebook|facebook\.com\/tr/;
  await context.route(remote, async route=>{requested.push(route.request().url());await route.fulfill({status:200,contentType:'application/javascript',body:'/* isolated provider stub: no third-party events transmitted */'});});
  await ready(page); expect(requested).toEqual([]);
  await page.getByRole('button',{name:/Permitir/}).click();
  await expect.poll(()=>requested.length).toBeGreaterThan(0);
  await page.locator('#inicio .btn-primary').evaluate(el=>el.addEventListener('click',e=>e.preventDefault()));
  await page.locator('#inicio .btn-primary').click();
  expect(await page.evaluate(()=>JSON.stringify((window as Window & {dataLayer?:unknown[]}).dataLayer))).toContain('contact_intent');
  await page.evaluate(()=>{document.cookie='_ga=test;path=/';document.cookie='_ga_TEST=test;path=/';document.cookie='_fbp=test;path=/';});
  await page.getByRole('button',{name:'Preferencias de privacidad'}).click();
  await page.getByRole('button',{name:/Rechazar/}).click();
  await page.waitForLoadState('load'); requested.length=0;
  await page.reload(); await page.waitForTimeout(500);
  expect(requested).toEqual([]);
  expect((await context.cookies()).some(c=>/^_ga|^_fbp|^_fbc/.test(c.name))).toBe(false);
});

test('navigation without JavaScript and reduced-motion fallback', async ({browser}) => {
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:568},reducedMotion:'reduce'});
  const page=await context.newPage(); await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:3418');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.nav-fallback a[href="#servicio"]')).toBeVisible();
  await page.locator('.nav-fallback a[href="#servicio"]').click(); await expect(page).toHaveURL(/#servicio$/);
  await expect(page.locator('#servicio .ix-row').first()).toBeVisible();
  expect(await page.locator('script[src*="googletagmanager"]').count()).toBe(0);
  await context.close();
});

test('all WhatsApp URLs use the real number, intent and safe target', async ({page}) => {
  for(const route of ['/','/privacidad','/terminos','/servicios/presencia-digital']) {
  await page.goto(route);
  for(const link of await page.locator('a[href^="https://wa.me/"]').all()) {
    const url=new URL((await link.getAttribute('href'))!);
    expect(url.pathname).toBe('/528333263389');
    expect(url.searchParams.get('text')).toContain('solicitar una propuesta');
    expect(await link.getAttribute('rel')).toContain('noopener');
  }
  }
});

for(const route of ['/privacidad','/terminos','/servicios/presencia-digital']) {
  test(`internal text 200% reflows without header occlusion ${route}`,async({page})=>{
    await page.setViewportSize({width:320,height:568});await page.goto(route);
    await page.evaluate(()=>document.fonts.ready);
    await page.evaluate(()=>{
      const sizes=Array.from(document.querySelectorAll<HTMLElement>('p,h1,h2,h3,a,button,summary,li,span')).map(el=>({el,size:parseFloat(getComputedStyle(el).fontSize)*2}));
      for(const {el,size}of sizes)el.style.fontSize=`${size}px`;
    });
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
    if(route.includes('/servicios/')) {
      const bounds=await page.evaluate(()=>({header:document.querySelector('header')!.getBoundingClientRect().bottom,intro:document.querySelector('.service-intro .eyebrow')!.getBoundingClientRect().top}));
      expect(bounds.intro).toBeGreaterThanOrEqual(bounds.header);
    }
  });
}

test('FAQ, service focus and hover, hero lens and live reduced-motion switch', async ({page})=>{
  await page.setViewportSize({width:1440,height:900}); await ready(page);
  const lens=page.locator('.lens-layer');
  const before=await lens.evaluate(el=>(el as HTMLElement).style.clipPath);
  await page.mouse.move(1100,180); await page.waitForTimeout(400);
  expect(await lens.evaluate(el=>(el as HTMLElement).style.clipPath)).not.toBe(before);
  await page.emulateMedia({reducedMotion:'reduce'});
  const rest=await lens.evaluate(el=>(el as HTMLElement).style.clipPath);
  await page.mouse.move(400,320); await page.waitForTimeout(100);
  expect(await lens.evaluate(el=>(el as HTMLElement).style.clipPath)).toBe(rest);
  for(const row of await page.locator('.ix-row').all()) {
    await row.focus(); await page.waitForTimeout(350);
    expect(await row.locator('h3').evaluate(el=>getComputedStyle(el).color)).toBe('rgb(0, 0, 0)');
  }
  const summary=page.locator('summary').first(); await summary.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('details').first()).toHaveAttribute('open','');
  await page.keyboard.press('Enter'); await expect(page.locator('details').first()).not.toHaveAttribute('open','');
});

test('legacy permissions cannot authorize the current provider set; storage failure denies tracking',async ({page,context})=>{
  const requests:string[]=[];
  await context.route(/googletagmanager|google-analytics|connect\.facebook|facebook\.com\/tr/,r=>{requests.push(r.request().url());return r.abort();});
  await page.addInitScript(()=>{localStorage.setItem('lss-tracking-consent-v2','yes');localStorage.setItem('lss-tracking-consent-v3:G-OTHER123:no-meta','yes');});
  await ready(page); await expect(page.getByRole('dialog')).toBeVisible(); expect(requests).toEqual([]);
  await page.addInitScript(()=>{Storage.prototype.setItem=()=>{throw new DOMException('Unavailable','SecurityError');};});
  await page.reload(); await page.getByRole('button',{name:/Permitir/}).click();
  await expect(page.getByRole('dialog')).toBeVisible(); expect(requests).toEqual([]);
});

test('internal anchors, sitemap, robots, FAQ/schema parity, 404 and browser network',async ({page,request})=>{
  await ready(page);
  const anchors=await page.locator('a[href^="#"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')!.slice(1)));
  for(const id of new Set(anchors)) expect(await page.locator(`[id="${id}"]`).count()).toBe(1);
  const schema=await page.locator('script[type="application/ld+json"]').allTextContents();
  const faq=schema.map(s=>JSON.parse(s)).find(s=>s['@type']==='FAQPage');
  const questions=await page.locator('summary').allTextContents();
  expect(faq.mainEntity.map((q:{name:string})=>q.name)).toEqual(questions);
  const sitemap=await request.get('/sitemap.xml');expect(sitemap.status()).toBe(200);
  const xml=await sitemap.text();
  for(const route of ['/privacidad','/terminos','/servicios/presencia-digital'])expect(xml).toContain('https://www.lsslocalsystemsstudio.com'+route);
  const robots=await request.get('/robots.txt');expect(await robots.text()).toContain('Sitemap: https://www.lsslocalsystemsstudio.com/sitemap.xml');
  expect((await request.get('/ruta-inexistente-v8')).status()).toBe(404);
  await page.locator('footer a[href="/"]').click();await expect(page).toHaveURL(/\/$/);
});

for(const route of ['/','/privacidad','/terminos','/servicios/presencia-digital']) {
  test(`SEO, schema, HTTP and axe ${route}`,async ({page})=>{
    const response=await page.goto(route); expect(response?.status()).toBe(200);
    await page.evaluate(()=>document.fonts.ready); await page.waitForTimeout(1900);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toBe('https://www.lsslocalsystemsstudio.com'+(route==='/'?'':route));
    expect(await page.locator('meta[name="description"]').getAttribute('content')).toBeTruthy();
    const schemas=await page.locator('script[type="application/ld+json"]').allTextContents();
    for(const schema of schemas) expect(()=>JSON.parse(schema)).not.toThrow();
    const a11y=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    expect(a11y.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}))).toEqual([]);
    if(!process.env.SKIP_SECURITY_HEADERS) {
      const headers=response!.headers();
      expect(headers['x-frame-options']).toBe('DENY');
      expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
      expect(headers['x-content-type-options']).toBe('nosniff');
    }
  });
}

test('zoom reflow, slow resources, external failure and short landscape', async ({page})=>{
  await page.setViewportSize({width:320,height:568});
  await page.route(/googletagmanager|facebook/,r=>r.abort());
  await page.route('**/*.woff2',async r=>{await new Promise(resolve=>setTimeout(resolve,500));await r.continue();});
  await ready(page);
  await page.evaluate(()=>{
    const sizes=Array.from(document.querySelectorAll<HTMLElement>('p,h1,h2,h3,a,button,summary,li,span'))
      .map(el=>({el,size:parseFloat(getComputedStyle(el).fontSize)*2}));
    for(const {el,size} of sizes) el.style.fontSize=`${size}px`;
  });
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  const clippedHeadings=await page.locator('h1,h2,h3').evaluateAll(elements=>elements.flatMap(el=>{
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const bad:string[]=[];
    while(walker.nextNode()) {const range=document.createRange();range.selectNodeContents(walker.currentNode);
      for(const r of range.getClientRects()) if(r.width&& (r.left< -1||r.right>innerWidth+1)) bad.push(walker.currentNode.textContent||'');}
    return bad;
  }));
  expect(clippedHeadings).toEqual([]);
  await page.locator('#inicio .btn-primary').focus(); await page.waitForTimeout(350);
  expect((await exposure(page,'#inicio .btn-primary')).unobscured).toBe(true);
  await page.setViewportSize({width:568,height:320});
  await page.locator('#contacto .btn-primary').focus(); await page.waitForTimeout(350);
  expect((await exposure(page,'#contacto .btn-primary')).unobscured).toBe(true);
});
