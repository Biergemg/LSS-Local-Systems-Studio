import { createRequire } from 'node:module';
const req = createRequire('C:/Users/Bierge Ponce/Desktop/ALMACEN/Proyectos/Proyectos_nuevos/Sitioos Web/LSS/lss-web-v8-qa/package.json');
const { chromium } = req('playwright');
const base = process.argv[2];
const b = await chromium.launch({ channel: 'chrome' });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto(base, { waitUntil: 'networkidle' });
const info = await p.evaluate(async () => {
  const out = [];
  for (const e of document.querySelectorAll('#cambio .reveal')) {
    e.scrollIntoView({ block: 'center' });
    await new Promise((r) => setTimeout(r, 300));
    out.push({ t: e.textContent.trim().slice(0, 30), op: getComputedStyle(e).opacity, top: Math.round(e.getBoundingClientRect().top) });
  }
  return out;
});
console.log(JSON.stringify(info, null, 1));
await b.close();
