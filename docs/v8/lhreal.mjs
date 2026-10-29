import lighthouse from 'lighthouse';
import * as cl from 'chrome-launcher';
const ch = await cl.launch({ chromePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', chromeFlags: ['--headless=new'] });
for (const m of ['devtools','provided']) {
  const r = await lighthouse('http://localhost:3200', { port: ch.port, output: 'json', logLevel: 'error', throttlingMethod: m, onlyCategories: ['performance'] });
  const a = r.lhr.audits;
  console.log(m, 'LCP', a['largest-contentful-paint'].displayValue, 'FCP', a['first-contentful-paint'].displayValue, 'TBT', a['total-blocking-time'].displayValue);
}
await ch.kill();
