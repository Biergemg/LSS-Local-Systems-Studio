import { createRequire } from 'node:module';
const req = createRequire('C:/Users/Bierge Ponce/Desktop/ALMACEN/Proyectos/Proyectos_nuevos/Sitioos Web/LSS/lss-web-v8-qa/package.json');
const { chromium } = req('playwright'); const { AxeBuilder } = req('@axe-core/playwright');
const b = await chromium.launch({ channel: 'chrome' });
for (const w of [1440, 1440, 1440]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await p.goto(process.argv[2], { waitUntil: 'networkidle' });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } window.scrollTo(0, 0); });
  await p.waitForTimeout(400);
  const r = await new AxeBuilder({ page: p }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  console.log(r.violations.map((v) => v.id + ': ' + v.nodes.map((n) => n.target.join(' ') + ' | ' + (n.any[0]?.message || '')).join(' || ')));
}
await b.close();
