import lighthouse from 'lighthouse';
import * as cl from 'chrome-launcher';
const html = await (await fetch('http://localhost:3200')).text();
const js = [...new Set([...html.matchAll(/\/_next\/static\/chunks\/([^"']+\.js)/g)].map((m) => m[1]))];
const ch = await cl.launch({ chromePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', chromeFlags: ['--headless=new'] });
for (const f of [null, ...js]) {
  const r = await lighthouse('http://localhost:3200', { port: ch.port, output: 'json', logLevel: 'error', onlyCategories: ['performance'], blockedUrlPatterns: f ? ['*' + f] : [] });
  console.log(f || 'baseline', (r.lhr.audits['largest-contentful-paint'].numericValue / 1000).toFixed(2));
}
await ch.kill();
