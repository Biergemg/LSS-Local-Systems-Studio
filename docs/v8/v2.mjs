import { chromium } from 'playwright';
const url = process.argv[2] ?? 'http://localhost:3200';
const tag = process.argv[3] ?? 'v2';
const vps = [[390, 844], [1440, 900]];
const sections = ['inicio', 'cambio', 'prueba', 'oferta', 'proceso', 'entrega', 'presupuesto', 'preguntas', 'contacto'];
const b = await chromium.launch({ channel: 'chrome' });
for (const [w, h] of vps) {
  const c = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: w < 500 ? 2 : 1 });
  const p = await c.newPage();
  const errs = [];
  p.on('console', (m) => ['error', 'warning'].includes(m.type()) && errs.push(m.text()));
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.waitForTimeout(600);
  await p.screenshot({ path: `shots/${tag}-${w}-hero.png` });
  for (const id of sections.slice(1)) {
    await p.evaluate((i) => document.getElementById(i).scrollIntoView({ behavior: 'instant', block: 'start' }), id);
    await p.waitForTimeout(900);
    await p.screenshot({ path: `shots/${tag}-${w}-${id}.png` });
  }
  // PPV: antes, despuÃ©s con datos, 3 direcciones
  await p.evaluate(() => document.getElementById('prueba').scrollIntoView({ behavior: 'instant', block: 'start' }));
  await p.waitForTimeout(500);
  await p.locator('.ppv-controls input').nth(0).fill('Taller Mendoza');
  await p.locator('.ppv-controls input').nth(1).fill('Monterrey');
  await p.locator('.ppv-controls input').nth(2).fill('Cocinas integrales');
  const canvas = p.locator('.ppv-canvas');
  await p.click('.canvas-switch button:first-child'); await p.waitForTimeout(1300);
  await canvas.screenshot({ path: `shots/${tag}-${w}-ppv-before.png` });
  await p.click('.ppv-go');
  await p.waitForTimeout(2200);
  for (const d of ['atelier', 'noche', 'pigmento']) {
    await p.click(`.dir[data-dir="${d}"]`);
    await p.waitForTimeout(500);
    await canvas.screenshot({ path: `shots/${tag}-${w}-ppv-${d}.png` });
  }
  console.log(w, 'scrollWidth', await p.evaluate(() => document.documentElement.scrollWidth), 'errs', errs.length, errs.slice(0, 3));
  await c.close();
}
await b.close();

