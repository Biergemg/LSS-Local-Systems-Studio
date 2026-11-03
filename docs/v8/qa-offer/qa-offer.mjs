// QA de la oferta reingenierizada. Usa Playwright/axe/Lighthouse del espacio de QA existente (lss-web-v8-qa/node_modules).
// Uso: node qa-offer.mjs <baseUrl> <outDir>
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

const widths = [320, 360, 390, 430, 768, 1024, 1440, 1920];
const routes = ['/', '/privacidad', '/terminos', '/servicios/presencia-digital', '/robots.txt', '/sitemap.xml'];
const report = { base, date: new Date().toISOString(), routes: {}, widths: {}, axe: {}, links: {}, ctas: {}, console: [] };

const browser = await chromium.launch({ channel: 'chrome' });

// 1) rutas
for (const r of routes) {
  const res = await fetch(base + r, { redirect: 'manual' });
  report.routes[r] = res.status;
}

// 2) responsive, desbordamiento, contenido oculto, consola
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 700 ? 800 : 900 }, hasTouch: w < 800, isMobile: w < 800 });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) errors.push(`${m.type()}: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  // forzar revelado por scroll
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } window.scrollTo(0, 0); });
  await page.waitForTimeout(400);
  const m = await page.evaluate(async () => {
    const doc = document.documentElement;
    const h1 = document.querySelector('h1')?.textContent?.trim();
    // Las animaciones por scroll (view timeline) dejan opacidad 0 fuera de vista: se mide con cada elemento centrado en pantalla.
    const hidden = [];
    for (const e of document.querySelectorAll('main h2, main h3, main p, main li, main summary')) {
      if (e.closest('details:not([open])') && e.tagName !== 'SUMMARY') continue;
      e.scrollIntoView({ block: 'center' });
      await new Promise((r) => setTimeout(r, 350));
      const s = getComputedStyle(e);
      if (s.visibility === 'hidden' || s.display === 'none' || Number(s.opacity) < 0.95) hidden.push(e.textContent.trim().slice(0, 60));
    }
    window.scrollTo(0, 0);
    const wide = [...document.querySelectorAll('main *')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1).slice(0, 5).map((e) => e.tagName + '.' + e.className);
    const small = [...document.querySelectorAll('a, button, summary')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.height < 24 || r.width < 24) && getComputedStyle(e).display !== 'inline'; }).slice(0, 5).map((e) => e.textContent.trim().slice(0, 40));
    return { scrollWidth: doc.scrollWidth, innerWidth, overflowX: doc.scrollWidth > innerWidth + 1, h1, hiddenCount: hidden.length, hidden: hidden.slice(0, 5), wide, small };
  });
  report.widths[w] = m;
  report.console.push({ w, errors });
  await page.screenshot({ path: path.join(out, `home-${w}.png`), fullPage: true });
  if (w === 390 || w === 1440) {
    const ax = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    report.axe[w] = { violations: ax.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })) };
  }
  await ctx.close();
}

// 3) enlaces y CTA
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const links = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => ({ text: a.textContent.trim().slice(0, 60), href: a.getAttribute('href') })));
  const ids = await page.evaluate(() => new Set([...document.querySelectorAll('[id]')].map((e) => e.id)).size && [...document.querySelectorAll('[id]')].map((e) => e.id));
  const dead = [];
  for (const l of links) {
    if (l.href.startsWith('#')) { if (l.href !== '#' && !ids.includes(l.href.slice(1))) dead.push(l); }
    else if (l.href.startsWith('/')) { const r = await fetch(base + l.href.split('#')[0], { redirect: 'manual' }); if (r.status >= 400) dead.push({ ...l, status: r.status }); }
  }
  report.links = { total: links.length, dead, external: [...new Set(links.filter((l) => /^(https?:|mailto:)/.test(l.href)).map((l) => l.href.slice(0, 90)))] };
  const wa = links.filter((l) => l.href.startsWith('https://wa.me/'));
  report.ctas = { whatsappLinks: wa.length, sample: wa[0]?.href?.slice(0, 160), texts: [...new Set(wa.map((l) => l.text))] };
  await ctx.close();
}

await browser.close();
writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
const bad = [];
for (const [r, s] of Object.entries(report.routes)) if (s >= 400) bad.push(`ruta ${r} ${s}`);
for (const [w, m] of Object.entries(report.widths)) { if (m.overflowX) bad.push(`overflow-x ${w}`); if (m.hiddenCount) bad.push(`oculto ${w}: ${m.hiddenCount}`); }
for (const [w, a] of Object.entries(report.axe)) if (a.violations.length) bad.push(`axe ${w}: ${a.violations.map((v) => v.id).join(',')}`);
for (const c of report.console) if (c.errors.length) bad.push(`consola ${c.w}: ${c.errors[0]}`);
if (report.links.dead.length) bad.push('enlaces muertos ' + JSON.stringify(report.links.dead));
console.log(JSON.stringify({ routes: report.routes, h1: report.widths[390].h1, ctas: report.ctas, links: report.links.total, bad }, null, 2));
process.exitCode = bad.length ? 1 : 0;
