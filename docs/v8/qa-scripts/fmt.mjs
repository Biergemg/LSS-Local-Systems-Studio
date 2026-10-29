import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'chrome' });
for (const [w, h, t] of [[1440, 900, 'd'], [390, 844, 'm']]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: t === 'm' ? 2 : 1 })).newPage();
  await p.goto('http://localhost:3200', { waitUntil: 'networkidle' });
  for (const [sel, name] of [['.fmt', 'fmt'], ['.acta-live', 'live'], ['#contacto', 'contacto']]) {
    await p.locator(sel).first().scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, -70)); await p.waitForTimeout(1000);
    await p.screenshot({ path: `shots/w4-${t}-${name}.png` });
  }
}
await b.close();
