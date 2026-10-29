import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'chrome' });
for (const [w, h, tag] of [[1440, 900, 'd'], [390, 844, 'm']]) {
  const c = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: w < 500 ? 2 : 1 });
  const p = await c.newPage();
  await p.goto('http://localhost:3200', { waitUntil: 'commit' });
  const t0 = Date.now();
  for (const t of [500, 1300, 2100, 3600]) {
    const wait = t - (Date.now() - t0); if (wait > 0) await p.waitForTimeout(wait);
    if (tag === 'm') await p.evaluate(() => document.querySelector('.hero-figure')?.scrollIntoView({ block: 'center' }));
    await p.screenshot({ path: `shots/anim-${tag}-${t}.png` });
  }
  await c.close();
}
await b.close();
