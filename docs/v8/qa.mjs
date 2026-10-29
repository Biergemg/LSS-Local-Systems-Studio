import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const URL = process.argv[2] ?? 'http://localhost:3200';
const out = [];
const rec = (ok, n, i = '') => { out.push(ok); console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${i ? '  (' + i + ')' : ''}`); };
const b = await chromium.launch({ channel: 'chrome' });

// 1. responsive + consola + objetivos táctiles
for (const [w, h] of [[320, 720], [390, 844], [768, 1024], [1440, 900]]) {
  const c = await b.newContext({ viewport: { width: w, height: h } });
  const p = await c.newPage();
  const errs = [];
  p.on('console', (m) => { if (['error', 'warning'].includes(m.type())) errs.push(m.text()); });
  p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(URL, { waitUntil: 'networkidle' });
  const sw = await p.evaluate(() => document.documentElement.scrollWidth);
  rec(sw <= w, `sin scroll horizontal a ${w}px`, `scrollWidth ${sw}`);
  rec(errs.length === 0, `consola limpia a ${w}px`, errs.join(' | ').slice(0, 200));
  const small = await p.evaluate(() => [...document.querySelectorAll('a,button,summary,input')].filter((e) => {
    const r = e.getBoundingClientRect();
    if (r.width === 0 || e.closest('.skip-link') || e.classList.contains('skip-link')) return false;
    const inText = e.tagName === 'A' && e.closest('p') && getComputedStyle(e).display === 'inline';
    return r.height < 44 && !inText;
  }).map((e) => e.tagName + ':' + (e.textContent || '').trim().slice(0, 25) + ':' + Math.round(e.getBoundingClientRect().height)));
  rec(small.length === 0, `objetivos táctiles >=44px a ${w}px`, small.slice(0, 6).join(' ; '));
  await c.close();
}

// 2. enlaces
const c = await b.newContext({ viewport: { width: 390, height: 844 } });
const p = await c.newPage();
await p.goto(URL, { waitUntil: 'networkidle' });
const hrefs = await p.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
const missing = [];
for (const h of new Set(hrefs.filter((x) => x.startsWith('#') && x.length > 1))) if (!(await p.$(h))) missing.push(h);
rec(missing.length === 0, 'anclas internas existen', missing.join(','));
const wa = hrefs.filter((h) => h.startsWith('https://wa.me/'));
rec(wa.length >= 6 && wa.every((h) => h.startsWith('https://wa.me/528333263389?text=')), 'enlaces WhatsApp con número correcto y texto', `${wa.length} enlaces`);
rec(hrefs.filter((h) => h.startsWith('mailto:')).every((h) => h === 'mailto:contacto@lsslocalsystemsstudio.com'), 'mailto correcto');
for (const u of new Set(hrefs.filter((h) => /^https?:/.test(h) && !h.includes('wa.me')))) {
  const st = await fetch(u, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0' } }).then((r) => r.status).catch(() => 'ERR');
  console.log('  externo', u, st);
}
rec(await p.$$eval('a[target=_blank]', (as) => as.every((a) => /noopener/.test(a.rel))), 'target=_blank con noopener');

// 3. demo PPV
await p.locator('#prueba').scrollIntoViewIfNeeded();
await p.fill('input[placeholder^="Ej. Taller"]', 'Taller Mendoza');
await p.fill('input[placeholder^="Ej. Tampico"]', 'Tampico');
await p.fill('input[placeholder^="Ej. instalación"]', 'instalación de cocinas integrales');
let phone = await p.locator('.phone').innerText();
rec(/Taller Mendoza/.test(phone) && /Tampico/.test(phone) && /Instalación de cocinas integrales en Tampico/.test(phone), 'PPV: la vista usa los datos escritos');
await p.getByRole('button', { name: 'Primera impresión dispersa' }).click();
phone = await p.locator('.phone').innerText();
rec(/Hacen instalación de cocinas integrales en Tampico/.test(phone), 'PPV: alternar antes/después cambia la vista');
const href = await p.locator('.phone a.btn').getAttribute('href');
rec(decodeURIComponent(href).includes('Nombre: Taller Mendoza | Ciudad: Tampico | Servicio que quiero destacar: instalación de cocinas integrales'), 'PPV: el enlace de WhatsApp lleva los datos escritos');
const posts = [];
p.on('request', (r) => { if (r.method() === 'POST') posts.push(r.url()); });
await p.press('input[placeholder^="Ej. Tampico"]', 'Enter');
await p.waitForTimeout(300);
rec(posts.length === 0, 'PPV: Enter no envía nada (sin POST)');

// 4. teclado
await p.evaluate(() => window.scrollTo(0, 0));
await p.getByRole('button', { name: 'Abrir menú' }).focus();
await p.keyboard.press('Enter');
rec(await p.locator('#menu-movil').isVisible(), 'menú móvil abre con teclado');
await p.keyboard.press('Escape');
rec((await p.locator('#menu-movil').count()) === 0 && (await p.evaluate(() => document.activeElement?.getAttribute('aria-label'))) === 'Abrir menú', 'Escape cierra el menú y devuelve el foco');
await p.locator('#preguntas summary').first().click();
rec(await p.locator('#preguntas details').first().evaluate((d) => d.open), 'FAQ se expande');
await p.goto(URL);
await p.keyboard.press('Tab');
rec((await p.evaluate(() => document.activeElement?.className)) === 'skip-link', 'primer Tab = enlace «Saltar al contenido»');
await c.close();

// 5. reduced motion
const rc = await b.newContext({ reducedMotion: 'reduce' });
const rp = await rc.newPage();
await rp.goto(URL);
const anim = await rp.evaluate(() => getComputedStyle(document.querySelector('.rise')).animationName);
rec(anim === 'none', 'reduced-motion desactiva animaciones', anim);
await rc.close();

// 6. axe
for (const [w, h] of [[390, 844], [1440, 900]]) {
  const ac = await b.newContext({ viewport: { width: w, height: h } });
  const ap = await ac.newPage();
  await ap.goto(URL, { waitUntil: 'networkidle' });
  const r = await new AxeBuilder({ page: ap }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  rec(r.violations.length === 0, `axe WCAG 2.2 AA a ${w}px`, r.violations.map((v) => v.id + '×' + v.nodes.length).join(','));
  for (const v of r.violations) console.log('   ', v.id, v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | '));
  await ac.close();
}

// 7. SEO / schema
const sp = await b.newPage();
await sp.goto(URL);
const seo = await sp.evaluate(() => ({
  title: document.title,
  desc: document.querySelector('meta[name=description]')?.content ?? '',
  canon: document.querySelector('link[rel=canonical]')?.href,
  h1: document.querySelectorAll('h1').length,
  lang: document.documentElement.lang,
  og: document.querySelector('meta[property="og:image"]')?.content,
  ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent)),
}));
const flat = seo.ld.flat();
console.log(JSON.stringify({ title: seo.title, tl: seo.title.length, desc: seo.desc, dl: seo.desc.length, canon: seo.canon, h1: seo.h1, lang: seo.lang, og: seo.og, ldTypes: flat.map((x) => x['@type']) }, null, 1));
rec(seo.h1 === 1 && seo.title.length <= 60 && seo.desc.length <= 160 && seo.canon === 'https://www.lsslocalsystemsstudio.com/' && seo.lang === 'es-MX', 'SEO básico: 1 H1, title<=60, desc<=160, canonical, lang');
const faqQ = flat.find((x) => x['@type'] === 'FAQPage')?.mainEntity.length;
const visibleQ = await sp.locator('#preguntas summary').count();
rec(faqQ === visibleQ, 'FAQPage coincide con FAQ visible', `${faqQ}/${visibleQ}`);
rec(!/aggregateRating|"review"|openingHours|priceRange|streetAddress/.test(JSON.stringify(flat)), 'JSON-LD sin datos no verificables');
await b.close();
console.log(out.every(Boolean) ? '\nQA: TODO PASS' : `\nQA: ${out.filter((x) => !x).length} FALLO(S)`);
