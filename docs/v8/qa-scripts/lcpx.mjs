import lighthouse from 'lighthouse';
import * as cl from 'chrome-launcher';
const ch = await cl.launch({ chromePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', chromeFlags: ['--headless=new'] });
for (const [name, blocked] of [['sin-JS', ['*.js']], ['sin-fuentes', ['*.woff2']], ['sin-JS-ni-fuentes', ['*.js','*.woff2']]]) {
  const v = [];
  for (let i = 0; i < 3; i++) { const r = await lighthouse('http://localhost:3200', { port: ch.port, output: 'json', logLevel: 'error', onlyCategories: ['performance'], blockedUrlPatterns: blocked }); v.push(+(r.lhr.audits['largest-contentful-paint'].numericValue/1000).toFixed(2)); }
  console.log(name, v.join(' '));
}
await ch.kill();
