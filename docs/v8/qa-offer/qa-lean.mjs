// QA ligero y secuencial: un solo navegador headless, una página a la vez, sin capturas de página completa.
// Uso: node qa-lean.mjs <baseUrl> <outDir>. Usa Playwright/axe de lss-web-v8-qa.
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const QA_ROOT = 'C:/Users/Bierge Ponce/Desktop/ALMACEN/Proyectos/Proyectos_nuevos/Sitioos Web/LSS/lss-web-v8-qa/';
const req = createRequire(QA_ROOT + 'package.json');
const { chromium } = req('playwright');
const { AxeBuilder } = req('@axe-core/playwright');

const base = (process.argv[2] ?? 'http://localhost:3300').replace(/\/$/, '');
const out = process.argv[3] ?? 'qa-out';
mkdirSync(out, { recursive: true });
const widths = [320, 390, 768, 1440, 1920];
const routes = ['/', '/privacidad', '/terminos', '/servicios/presencia-digital', '/robots.txt', '/sitemap.xml'];
const report = { base, date: new Date().toISOString(), routes: {}, widths: {}, axe: {}, links: {}, ctas: {}, text: {}, console: [] };

const browser = await chromium.launch({ headless: true, executablePath: process.env.LOCALAPPDATA + '/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-win64/chrome-headless-shell.exe', args: ['--disable-gpu', '--disable-extensions', '--disable-dev-shm-usage', '--no-first-run'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 800 } });

for (const r of routes) report.routes[r] = (await fetch(base + r, { redirect: 'manual' })).status;

for (const w of widths) {
  const page = await ctx.newPage();
  await page.setViewportSize({ width: w, height: w < 700 ? 800 : 900 });
  const errors = [];
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) errors.push(`${m.type()}: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('requestfailed', (rq) => errors.push('requestfailed: ' + rq.url().slice(0, 100)));
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const m = await page.evaluate(async () => {
    const doc = document.documentElement;
    const hidden = [];
    for (const e of document.querySelectorAll('main h2, main h3, main p, main li, main summary')) {
      if (e.closest('details:not([open])') && e.tagName !== 'SUMMARY') continue;
      e.scrollIntoView({ block: 'center' });
      await new Promise((r) => setTimeout(r, 120));
      const s = getComputedStyle(e);
      if (s.visibility === 'hidden' || s.display === 'none' || Number(s.opacity) < 0.95) hidden.push(e.textContent.trim().slice(0, 60));
    }
    window.scrollTo(0, 0);
    const wide = [...document.querySelectorAll('main *')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1).slice(0, 5).map((e) => e.tagName + '.' + e.className);
    const small = [...document.querySelectorAll('a, button, summary')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.height < 24 || r.width < 24) && getComputedStyle(e).display !== 'inline'; }).slice(0, 5).map((e) => e.textContent.trim().slice(0, 40));
    return { scrollWidth: doc.scrollWidth, innerWidth, overflowX: doc.scrollWidth > innerWidth + 1, h1: document.querySelector('h1')?.textContent?.trim(), hiddenCount: hidden.length, hidden: hidden.slice(0, 5), wide, small };
  });
  report.widths[w] = m;
  report.console.push({ w, errors });
  if (w === 320 || w === 390 || w === 1440) {
    const ax = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    report.axe[w] = { violations: ax.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, targets: v.nodes.slice(0, 3).map((n) => n.target.join(' ')) })) };
  }
  if (w === 390 || w === 1440) await page.screenshot({ path: path.join(out, `home-${w}.png`) });
  await page.close();
}

// enlaces y CTA (sin enviar mensajes)
{
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const links = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => ({ text: a.textContent.trim().slice(0, 60), href: a.getAttribute('href') })));
  const ids = await page.evaluate(() => [...document.querySelectorAll('[id]')].map((e) => e.id));
  const dead = [];
  for (const l of links) {
    if (l.href.startsWith('#')) { if (l.href !== '#' && !ids.includes(l.href.slice(1))) dead.push(l); }
    else if (l.href.startsWith('/')) { const r = await fetch(base + l.href.split('#')[0], { redirect: 'manual' }); if (r.status >= 400) dead.push({ ...l, status: r.status }); }
  }
  const wa = links.filter((l) => l.href.startsWith('https://wa.me/'));
  const mail = links.filter((l) => l.href.startsWith('mailto:'));
  const parsedWa = wa.map((l) => { const u = new URL(l.href); return { phone: u.pathname.slice(1), text: u.searchParams.get('text') }; });
  report.links = { total: links.length, dead, external: [...new Set(links.filter((l) => /^(https?:|mailto:)/.test(l.href)).map((l) => l.href.slice(0, 90)))] };
  report.ctas = { whatsappLinks: wa.length, destinations: [...new Set(parsedWa.map((p) => p.phone))], texts: [...new Set(wa.map((l) => l.text))], prefill: parsedWa[0]?.text, mailto: mail.map((l) => l.href.slice(0, 80)) };
  await page.close();
}

// coherencia de texto entre páginas (texto visible)
for (const r of ['/', '/servicios/presencia-digital', '/privacidad', '/terminos']) {
  const page = await ctx.newPage();
  await page.goto(base + r, { waitUntil: 'networkidle' });
  const t = await page.evaluate(() => document.body.innerText);
  report.text[r] = {
    precio12500: (t.match(/12,500/g) || []).length,
    otrosPrecios: [...new Set((t.match(/\$\s?\d{1,3},\d{3}/g) || []))],
    cincoPaginas: (t.match(/cinco páginas/gi) || []).length,
    unProyectoALaVez: /un proyecto a la vez/i.test(t),
    plazoGarantizado: /(días hábiles|entrega en \d|en 24 h|en 48 h)/i.test(t),
    lighthouseCifras: /Lighthouse/i.test(t),
    garantiaResultados: /garantizamos|garantía de resultados/i.test(t),
  };
  await page.close();
}
await ctx.close();
await browser.close();
writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
const bad = [];
for (const [r, s] of Object.entries(report.routes)) if (s >= 400) bad.push(`ruta ${r} ${s}`);
for (const [w, m] of Object.entries(report.widths)) { if (m.overflowX) bad.push(`overflow-x ${w}`); if (m.hiddenCount) bad.push(`oculto ${w}: ${m.hiddenCount}`); }
for (const [w, a] of Object.entries(report.axe)) if (a.violations.length) bad.push(`axe ${w}: ${a.violations.map((v) => v.id).join(',')}`);
for (const c of report.console) if (c.errors.length) bad.push(`consola ${c.w}: ${c.errors[0]}`);
if (report.links.dead.length) bad.push('enlaces muertos ' + JSON.stringify(report.links.dead));
console.log(JSON.stringify({ routes: report.routes, h1: report.widths[390].h1, ctas: report.ctas, text: report.text, links: report.links.total, bad }, null, 2));
process.exitCode = bad.length ? 1 : 0;
