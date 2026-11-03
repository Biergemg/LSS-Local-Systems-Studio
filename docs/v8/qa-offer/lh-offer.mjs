// Lighthouse móvil (mediana de 5 corridas simuladas) y escritorio. Usa lighthouse del espacio de QA existente.
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const req = createRequire('C:/Users/Bierge Ponce/Desktop/ALMACEN/Proyectos/Proyectos_nuevos/Sitioos Web/LSS/lss-web-v8-qa/package.json');
const lighthouse = (await import(pathToFileURL(req.resolve('lighthouse')).href)).default;
const chromeLauncher = await import(pathToFileURL(req.resolve('chrome-launcher')).href);

const url = process.argv[2] ?? 'http://localhost:3300/';
const out = process.argv[3] ?? 'lighthouse.json';
const median = (a) => [...a].sort((x, y) => x - y)[Math.floor(a.length / 2)];
const chrome = await chromeLauncher.launch({ chromePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', chromeFlags: ['--headless=new'] });
const res = { url, version: null, mobile: {}, desktop: {} };
const desktopCfg = { extends: 'lighthouse:default', settings: { formFactor: 'desktop', screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false }, throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 } } };

for (const form of ['mobile', 'desktop']) {
  const runs = [];
  for (let i = 0; i < (form === 'mobile' ? 5 : 3); i++) {
    const r = await lighthouse(url, { port: chrome.port, output: 'json', logLevel: 'error', formFactor: form, throttlingMethod: 'simulate' }, form === 'desktop' ? desktopCfg : undefined);
    const c = r.lhr.categories, a = r.lhr.audits;
    res.version = r.lhr.lighthouseVersion;
    runs.push({ performance: Math.round(c.performance.score * 100), accessibility: Math.round(c.accessibility.score * 100), bestPractices: Math.round(c['best-practices'].score * 100), seo: Math.round(c.seo.score * 100), cls: a['cumulative-layout-shift'].numericValue, lcp: a['largest-contentful-paint'].displayValue, tbt: a['total-blocking-time'].displayValue });
  }
  res[form] = { runs, median: { performance: median(runs.map((r) => r.performance)), accessibility: median(runs.map((r) => r.accessibility)), bestPractices: median(runs.map((r) => r.bestPractices)), seo: median(runs.map((r) => r.seo)), cls: median(runs.map((r) => r.cls)) } };
}
await chrome.kill();
res.date = new Date().toISOString();
writeFileSync(out, JSON.stringify(res, null, 1));
console.log(JSON.stringify({ version: res.version, mobile: res.mobile.median, desktop: res.desktop.median }, null, 1));
