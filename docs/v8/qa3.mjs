import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const base = 'http://localhost:3200';
const out = [];
const log = (ok, name, extra = '') => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name} ${extra}`);
const b = await chromium.launch({ channel: 'chrome' });

// 1. Responsive, consola, tap targets
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
  const small = await p.evaluate(() => [...document.querySelectorAll('a,button,summary,input')].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && !e.closest('.skip-link') && r.height < 43.5; }).map((e) => `${e.tagName}:${(e.textContent || '').trim().slice(0, 25)}:${Math.round(e.getBoundingClientRect().height)}`));
  log(small.length === 0, `objetivos táctiles >=44px ${w}`, small.slice(0, 5).join(', '));
  // sin texto bajo la marca monumental
  const overlap = await p.evaluate(() => {
    const out = [];
    document.querySelectorAll('.mark').forEach((m) => {
      const mr = m.getBoundingClientRect(); if (getComputedStyle(m).position !== 'absolute') return;
      m.parentElement.querySelectorAll('h1,h2,h3,p,a,li,b').forEach((t) => {
        const r = t.getBoundingClientRect(); if (!(t.textContent || '').trim()) return;
        if (r.left < mr.right && r.right > mr.left && r.top < mr.bottom && r.bottom > mr.top) {
          // intersección real con el área ocupada por texto: aprox. bounding box del texto
          const range = document.createRange(); range.selectNodeContents(t); const rr = [...range.getClientRects()].some((q) => q.left < mr.right && q.right > mr.left && q.top < mr.bottom && q.bottom > mr.top);
          if (rr) out.push((t.textContent || '').trim().slice(0, 30));
        }
      });
    });
    return out;
  });
  log(overlap.length === 0, `marca decorativa sin tapar texto ${w}`, overlap.slice(0, 3).join(' | '));
  if (w === 1440) {
    const wa = await p.evaluate(() => [...document.querySelectorAll('a[href*="wa.me"]')].map((a) => a.href));
    log(wa.length >= 6 && wa.every((u) => u.startsWith('https://wa.me/528333263389')), 'enlaces WhatsApp con número correcto', `n=${wa.length}`);
    log((await p.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href')).filter((h) => h.length > 1 && !document.querySelector(h)))).length === 0, 'anclas internas existen');
    const mail = await p.evaluate(() => [...document.querySelectorAll('a[href^="mailto:"]')].map((a) => a.getAttribute('href')));
    log(mail.length > 0 && mail.every((m) => m === 'mailto:contacto@lsslocalsystemsstudio.com'), 'mailto correcto');
    const soc = await p.evaluate(() => [...document.querySelectorAll('a[href*="instagram"],a[href*="facebook"]')].map((a) => a.href));
    log(soc.length === 2, 'Instagram y Facebook presentes');
    log((await p.evaluate(() => [...document.querySelectorAll('a[target=_blank]')].filter((a) => !/noopener/.test(a.rel)).length)) === 0, 'target=_blank con noopener');
    for (const path of ['/privacidad', '/terminos', '/robots.txt', '/sitemap.xml']) { const r = await p.request.get(base + path); log(r.status() === 200, `ruta ${path}`, String(r.status())); }
    const meta = await p.evaluate(() => ({ t: document.title, d: document.querySelector('meta[name=description]')?.content, c: document.querySelector('link[rel=canonical]')?.href, h1: document.querySelectorAll('h1').length, og: !!document.querySelector('meta[property="og:title"]'), ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent) }));
    log(meta.h1 === 1 && meta.d.length >= 120 && meta.d.length <= 160 && !!meta.c && meta.og && meta.t.length <= 60, 'SEO básico', JSON.stringify({ title: meta.t.length, desc: meta.d.length, h1: meta.h1 }));
    let ldOk = true; let types = [];
    try { const arr = JSON.parse(meta.ld[0]); types = arr.map((x) => x['@type']); ldOk = types.includes('ProfessionalService') && types.includes('WebSite') && types.includes('FAQPage') && !JSON.stringify(arr).match(/openingHours|aggregateRating|streetAddress|priceRange/); } catch { ldOk = false; }
    log(ldOk, 'JSON-LD válido y sin datos inventados', types.join(','));
    const faqVisible = await p.evaluate(() => document.querySelectorAll('.faq details').length);
    log(faqVisible === 9, 'FAQ visibles = FAQ en JSON-LD', `visibles=${faqVisible}`);
    const txt = await p.evaluate(() => document.body.innerText);
    const banned = [/todavía no tenemos/i, /no contamos con/i, /no podemos garantizar/i, /esto es solo/i, /no hacemos/i, /no somos/i, /aún no publicamos/i, /nadie puede/i, /lleva(mos)? tu (negocio|presencia) al siguiente nivel/i, /no es solo una/i, /transformamos tu presencia/i, /soluciones innovadoras/i, /sin fricci[oó]n/i, /resultados garantizados/i, /nos encargamos de todo/i, /\$\s?\d/, /testimonio/i, /Casa Arroyo|Atelier|Pigmento/i];
    const hit = banned.filter((r) => r.test(txt)).map(String);
    log(hit.length === 0, 'sin frases prohibidas, precios, testimonios ni marcas ficticias', hit.join(' '));
    const fonts = await p.evaluate(() => [...new Set([...document.querySelectorAll('*')].map((e) => getComputedStyle(e).fontFamily.split(',')[0].trim()))].length);
    log(fonts <= 3, 'máximo 2 familias tipográficas', `familias=${fonts}`);
    const radius = await p.evaluate(() => [...document.querySelectorAll('*')].filter((e) => parseFloat(getComputedStyle(e).borderTopLeftRadius) > 0).length);
    const grad = await p.evaluate(() => [...document.querySelectorAll('*')].filter((e) => /gradient/.test(getComputedStyle(e).backgroundImage)).length);
    log(radius === 0 && grad === 0, 'identidad: cero radios y cero degradados', `radius=${radius} gradients=${grad}`);
  }
  await c.close();
}

// 2. WhatsApp: barra móvil
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
  log(n >= 4 && shown === 0, 'barra WhatsApp se retira ante cada CTA propio', `ctas=${n} visibles=${shown}`);
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(400);
  const badFocus = [];
  for (let i = 0; i < 70; i++) {
    await p.keyboard.press('Tab'); await p.waitForTimeout(60);
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
  log((await p2.evaluate(() => getComputedStyle(document.querySelector('.wa-float')).display)) === 'none' && (await p2.locator('.nav-links a.btn').isVisible()), 'escritorio: CTA de WhatsApp fijo en el menú, sin flotante');
  await c2.close();
}

// 3. Teclado, menú, FAQ, reduced-motion
{
  const c = await b.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const p = await c.newPage();
  await p.goto(base, { waitUntil: 'networkidle' });
  await p.keyboard.press('Tab');
  log(/Saltar/.test(await p.evaluate(() => document.activeElement.textContent)), 'primer Tab = saltar al contenido');
  await p.focus('.nav-toggle'); await p.keyboard.press('Enter');
  log(await p.isVisible('#menu-movil'), 'menú móvil abre con teclado');
  const links = await p.locator('#menu-movil a').count();
  await p.click('#menu-movil a >> nth=1'); await p.waitForTimeout(300);
  log(links === 6 && !(await p.isVisible('#menu-movil')), 'menú móvil: 5 enlaces + CTA; cierra al navegar', `n=${links}`);
  await p.focus('.nav-toggle'); await p.keyboard.press('Enter'); await p.keyboard.press('Escape');
  log(!(await p.isVisible('#menu-movil')) && (await p.evaluate(() => document.activeElement.className)).includes('nav-toggle'), 'Escape cierra y devuelve el foco');
  await p.click('.faq summary >> nth=0');
  log(await p.evaluate(() => document.querySelector('.faq details').open), 'FAQ expande');
  await p.evaluate(() => document.getElementById('proceso').scrollIntoView());
  log((await p.evaluate(() => getComputedStyle(document.querySelector('.reveal')).opacity)) === '1', 'reduced-motion: contenido en estado final');
  log((await p.evaluate(() => getComputedStyle(document.querySelector('.flow-signal')).animationName)) === 'none', 'reduced-motion: diagrama sin animación');
  await c.close();
}

// 4. axe
for (const path of ['/', '/privacidad', '/terminos']) {
  for (const w of [390, 1440]) {
    const c = await b.newContext({ viewport: { width: w, height: 900 } });
    const p = await c.newPage();
    await p.goto(base + path, { waitUntil: 'networkidle' });
    await p.waitForTimeout(3300);
    const r = await new AxeBuilder({ page: p }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    log(r.violations.length === 0, `axe WCAG 2.2 AA ${path} ${w}`, r.violations.map((v) => `${v.id}(${v.nodes.length})`).join(','));
    await c.close();
  }
}
await b.close();
console.log(out.join('\n'));
console.log(`\nTOTAL ${out.filter((l) => l.startsWith('PASS')).length} PASS / ${out.filter((l) => l.startsWith('FAIL')).length} FAIL`);
