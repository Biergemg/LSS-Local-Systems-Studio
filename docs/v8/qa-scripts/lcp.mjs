import lighthouse from 'lighthouse';
import * as cl from 'chrome-launcher';
const N = +process.argv[2] || 5;
const ch = await cl.launch({ chromePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', chromeFlags: ['--headless=new'] });
const rows = [];
for (let i = 0; i < N; i++) {
  const r = await lighthouse('http://localhost:3200', { port: ch.port, output: 'json', logLevel: 'error', onlyCategories: ['performance'] });
  const a = r.lhr.audits;
  const bd = a['largest-contentful-paint-element']?.details?.items?.find((x) => x.type === 'table')?.items || [];
  rows.push({ perf: Math.round(r.lhr.categories.performance.score * 100), lcp: +(a['largest-contentful-paint'].numericValue / 1000).toFixed(2), fcp: +(a['first-contentful-paint'].numericValue / 1000).toFixed(2), tbt: Math.round(a['total-blocking-time'].numericValue), cls: +a['cumulative-layout-shift'].numericValue.toFixed(3), bd: bd.map((x) => `${x.phase}=${Math.round(x.timing)}ms`).join(' '), el: (a['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node?.snippet || '').slice(0, 50) });
}
await ch.kill();
rows.forEach((r) => console.log(JSON.stringify(r)));
const med = (k) => rows.map((r) => r[k]).sort((a, b) => a - b)[Math.floor(rows.length / 2)];
console.log('MEDIANA perf', med('perf'), 'LCP', med('lcp'), 'FCP', med('fcp'), 'TBT', med('tbt'));
