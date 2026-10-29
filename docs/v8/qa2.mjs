import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const base = 'http://localhost:3200';
const out = [];
const log = (ok, name, extra = '') => { out.push(`${ok ? 'PASS' : 'FAIL'}  ${name} ${extra}`); };
const b = await chromium.launch({ channel: 'chrome' });

// 1. Responsive, consola, tap targets, enlaces
for (const [w, h] of [[320, 720], [390, 844], [768, 1024], [1440, 900]]) {
  const c = await b.newContext({ viewport: { width: w, height: h } });
  const p = await c.newPage();
  const errs = [];
  p.on('console', (m) => ['error', 'warning'].includes(m.type()) && errs.push(m.text()));
  p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(base, { waitUntil: 'networkidle' });
  const sw = await p.evaluate(() => document.documentElement.scrollWidth);
  log(sw <= w, `sin scroll horizontal ${w}`, `scrollWidth=${sw}`);
  log(errs.length === 0, `consola limpia ${w}`, errs.slice(0, 2).join(' | '));
  const small = await p.evaluate(() => [...document.querySelectorAll('a,button,summary,input')].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && cs.visibility !== 'hidden' && !e.closest('.skip-link') && (r.height < 44 - 0.5) && !(e.tagName === 'A' && e.closest('p') && !e.classList.length && false); }).map((e) => `${e.tagName}:${(e.textContent || '').trim().slice(0, 25)}:${Math.round(e.getBoundingClientRect().height)}`));
  log(small.length === 0, `objetivos táctiles >=44px ${w}`, small.slice(0, 5).join(', '));
  if (w === 1440) {
    const wa = await p.evaluate(() => [...document.querySelectorAll('a[href*="wa.me"]')].map((a) => a.href));
    log(wa.length >= 6 && wa.every((u) => u.startsWith('https://wa.me/528333263389')), 'enlaces WhatsApp con número correcto', `n=${wa.length}`);
    const anchors = await p.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href')).filter((h) => h.length > 1 && !document.querySelector(h)));
    log(anchors.length === 0, 'anclas internas existen', anchors.join(','));
    const mail = await p.evaluate(() => [...document.querySelectorAll('a[href^="mailto:"]')].map((a) => a.getAttribute('href')));
    log(mail.every((m) => m === 'mailto:contacto@lsslocalsystemsstudio.com') && mail.length > 0, 'mailto correcto');
    const soc = await p.evaluate(() => [...document.querySelectorAll('a[href*="instagram"],a[href*="facebook"]')].map((a) => a.href));
    log(soc.length === 2, 'Instagram y Facebook presentes', soc.join(' '));
    const ext = await p.evaluate(() => [...document.querySelectorAll('a[target=_blank]')].filter((a) => !/noopener/.test(a.rel)).length);
    log(ext === 0, 'target=_blank con noopener');
    for (const path of ['/privacidad', '/terminos', '/robots.txt', '/sitemap.xml']) {
      const r = await p.request.get(base + path);
      log(r.status() === 200, `ruta ${path}`, String(r.status()));
    }
    const meta = await p.evaluate(() => ({ t: document.title, d: document.querySelector('meta[name=description]')?.content, c: document.querySelector('link[rel=canonical]')?.href, h1: document.querySelectorAll('h1').length, ld: document.querySelectorAll('script[type="application/ld+json"]').length }));
    log(meta.h1 === 1 && meta.d.length >= 120 && meta.d.length <= 160 && !!meta.c, 'SEO básico', JSON.stringify({ title: meta.t.length, desc: meta.d.length, h1: meta.h1, ld: meta.ld }));
    const txt = await p.evaluate(() => document.body.innerText);
    const banned = [/todavía no tenemos/i, /no contamos con/i, /no podemos garantizar/i, /esto es solo/i, /no hacemos/i, /no somos/i, /\bno necesitas\b/i, /aún no publicamos/i, /nadie puede/i, /no promete/i, /\$\s?\d/, /garant[ií]a/i, /testimonio/i];
    const hit = banned.filter((r) => r.test(txt)).map(String);
    log(hit.length === 0, 'sin fórmulas defensivas ni precios/garantías', hit.join(' '));
  }
  await c.close();
}

// 2. Demo PPV
{
  const c = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(base, { waitUntil: 'networkidle' });
  const inp = p.locator('.ppv-controls input');
  await inp.nth(0).fill('Estudio Prueba'); await inp.nth(1).fill('Mérida'); await inp.nth(2).fill('Diseño de interiores');
  await p.click('.ppv-go');
  await p.waitForTimeout(1800);
  const t = await p.locator('.layer-after').innerText();
  log(/Estudio Prueba/.test(t) && /Mérida/.test(t) && /Diseño de interiores/.test(t), 'demo incorpora nombre, ciudad y servicio');
  const op = await p.evaluate(() => getComputedStyle(document.querySelector('.layer-before')).opacity);
  log(op === '0', 'transición: capa «antes» se retira', `opacity=${op}`);
  for (const d of ['noche', 'pigmento', 'atelier']) {
    await p.click(`.dir[data-dir="${d}"]`);
    const v = await p.evaluate(() => getComputedStyle(document.querySelector('.ppv-canvas .canvas')).getPropertyValue('--b-bg').trim());
    log(!!v, `dirección de arte ${d}`, v);
  }
  const href = await p.getAttribute('.canvas-cta a', 'href');
  const dec = decodeURIComponent(href);
  log(/Estudio Prueba/.test(dec) && /Mérida/.test(dec) && /Diseño de interiores/.test(dec) && href.startsWith('https://wa.me/528333263389'), 'CTA de la demo lleva los datos a WhatsApp');
  const url0 = p.url();
  await inp.nth(0).press('Enter');
  await p.waitForTimeout(400);
  log(p.url() === url0, 'Enter no navega ni envía');
  await p.click('.canvas-switch button:first-child');
  await p.waitForTimeout(1200);
  const op2 = await p.evaluate(() => getComputedStyle(document.querySelector('.layer-before')).opacity);
  log(op2 === '1', 'volver al punto de partida');
  await c.close();
}

// 3. WhatsApp: barra móvil, se retira ante otros CTA, no oculta el foco; sin barra en escritorio
{
  const c = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(base, { waitUntil: 'networkidle' });
  const n = await p.locator('[data-hide-wa]').count();
  let shown = 0;
  for (let i = 0; i < n; i++) {
    await p.locator('[data-hide-wa]').nth(i).scrollIntoViewIfNeeded();
    await p.waitForTimeout(700);
    const o = await p.evaluate(() => parseFloat(getComputedStyle(document.querySelector('.wa-float')).opacity));
    if (o > 0.1) shown++;
  }
  log(n >= 4 && shown === 0, 'barra WhatsApp se retira ante cada CTA propio de WhatsApp', );
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(400);
  const badFocus = [];
  for (let i = 0; i < 70; i++) {
    await p.keyboard.press('Tab');
    await p.waitForTimeout(60);
    const r = await p.evaluate(() => {
      const f = document.querySelector('.wa-float'); const a = document.activeElement;
      if (!a || a === document.body || a === document.documentElement || a === f || f.contains(a) || parseFloat(getComputedStyle(f).opacity) < 0.5) return null;
      const fr = f.getBoundingClientRect(); const ar = a.getBoundingClientRect();
      return ar.bottom > fr.top && ar.top < fr.bottom ? (a.textContent || a.tagName).trim().slice(0, 30) : null;
    });
    if (r) badFocus.push(r);
  }
  log(badFocus.length === 0, 'el foco de teclado no queda tapado por la barra', badFocus.slice(0, 3).join(' | '));
  await c.close();
  const c2 = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p2 = await c2.newPage();
  await p2.goto(base, { waitUntil: 'networkidle' });
  const dsp = await p2.evaluate(() => getComputedStyle(document.querySelector('.wa-float')).display);
  log(dsp === 'none' && (await p2.locator('.nav-links a.btn').isVisible()), 'escritorio: sin flotante; CTA de WhatsApp fijo en el menú');
  await c2.close();
}

// 4. Teclado, menú móvil, FAQ, reduced motion
{
  const c = await b.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const p = await c.newPage();
  await p.goto(base, { waitUntil: 'networkidle' });
  await p.keyboard.press('Tab');
  log(/Saltar/.test(await p.evaluate(() => document.activeElement.textContent)), 'primer Tab = saltar al contenido');
  await p.focus('.nav-toggle'); await p.keyboard.press('Enter');
  log(await p.isVisible('#menu-movil'), 'menú móvil abre con teclado');
  await p.keyboard.press('Escape');
  log(!(await p.isVisible('#menu-movil')) && (await p.evaluate(() => document.activeElement.className)).includes('nav-toggle'), 'Escape cierra y devuelve el foco');
  await p.click('.faq summary >> nth=0');
  log(await p.evaluate(() => document.querySelector('.faq details').open), 'FAQ expande');
  const st = await p.evaluate(() => { const a = document.querySelector('.layer-after'); return getComputedStyle(a).transitionDuration; });
  log(parseFloat(st) < 0.1, 'reduced-motion neutraliza transiciones', st);
  await p.evaluate(() => document.getElementById('proceso').scrollIntoView());
  const ro = await p.evaluate(() => getComputedStyle(document.querySelector('.reveal')).opacity);
  log(ro === '1', 'reduced-motion: contenido en estado final legible', ro);
  await c.close();
}

// 5. axe
for (const path of ['/', '/privacidad', '/terminos']) {
  for (const w of [390, 1440]) {
    const c = await b.newContext({ viewport: { width: w, height: 900 } });
    const p = await c.newPage();
    await p.goto(base + path, { waitUntil: 'networkidle' });
    if (path === '/') { await p.click('.ppv-go'); await p.waitForTimeout(1800); }
    const r = await new AxeBuilder({ page: p }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    log(r.violations.length === 0, `axe WCAG 2.2 AA ${path} ${w}`, r.violations.map((v) => `${v.id}(${v.nodes.length})`).join(','));
    await c.close();
  }
}
await b.close();
console.log(out.join('\n'));
console.log(`\nTOTAL ${out.filter((l) => l.startsWith('PASS')).length} PASS / ${out.filter((l) => l.startsWith('FAIL')).length} FAIL`);
