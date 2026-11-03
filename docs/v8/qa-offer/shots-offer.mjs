import { createRequire } from 'node:module';
const req = createRequire('C:/Users/Bierge Ponce/Desktop/ALMACEN/Proyectos/Proyectos_nuevos/Sitioos Web/LSS/lss-web-v8-qa/package.json');
const { chromium } = req('playwright');
const [base, out] = [process.argv[2], process.argv[3]];
const b = await chromium.launch({ channel: 'chrome' });
for (const w of [390, 1440]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 }, hasTouch: w < 800, isMobile: w < 800 })).newPage();
  await p.goto(base, { waitUntil: 'networkidle' });
  await p.screenshot({ path: `${out}/hero-${w}.png` });
  for (const id of ['oferta', 'presupuesto']) {
    const el = p.locator('#' + id);
    await el.scrollIntoViewIfNeeded();
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } });
    await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(600);
    await el.screenshot({ path: `${out}/${id}-${w}.png` });
  }
}
await b.close();
