import lighthouse from 'lighthouse';
import * as cl from 'chrome-launcher';
import desktop from 'lighthouse/core/config/desktop-config.js';
const ch = await cl.launch({ chromePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', chromeFlags: ['--headless=new'] });
for (const [n, cfg] of [['móvil', undefined], ['escritorio', desktop]]) {
  const r = await lighthouse('http://localhost:3200', { port: ch.port, output: 'json', logLevel: 'error' }, cfg);
  const c = r.lhr.categories;
  console.log(n, Object.entries(c).map(([k, v]) => `${k}=${Math.round(v.score * 100)}`).join(' '), 'LCP', r.lhr.audits['largest-contentful-paint'].displayValue, 'CLS', r.lhr.audits['cumulative-layout-shift'].displayValue, 'TBT', r.lhr.audits['total-blocking-time'].displayValue);
}
await ch.kill();
