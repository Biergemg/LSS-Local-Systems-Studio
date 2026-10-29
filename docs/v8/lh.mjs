import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { writeFileSync } from 'node:fs';

const url = process.argv[2] ?? 'http://localhost:3200';
const chrome = await chromeLauncher.launch({ chromePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', chromeFlags: ['--headless=new'] });
const res = {};
for (const form of ['mobile', 'desktop']) {
  const r = await lighthouse(url, { port: chrome.port, output: 'json', logLevel: 'error', formFactor: form, screenEmulation: form === 'desktop' ? { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false } : undefined, throttlingMethod: 'simulate' }, form === 'desktop' ? { extends: 'lighthouse:default', settings: { formFactor: 'desktop', screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false }, throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 } } } : undefined);
  const c = r.lhr.categories, a = r.lhr.audits;
  res[form] = {
    performance: Math.round(c.performance.score * 100),
    accessibility: Math.round(c.accessibility.score * 100),
    bestPractices: Math.round(c['best-practices'].score * 100),
    seo: Math.round(c.seo.score * 100),
    LCP: a['largest-contentful-paint'].displayValue,
    CLS: a['cumulative-layout-shift'].displayValue,
    TBT: a['total-blocking-time'].displayValue,
    FCP: a['first-contentful-paint'].displayValue,
    version: r.lhr.lighthouseVersion,
    date: r.lhr.fetchTime,
  };
}
await chrome.kill();
console.log(JSON.stringify(res, null, 1));
writeFileSync('lighthouse.json', JSON.stringify(res, null, 1));
