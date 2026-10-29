import { chromium } from 'playwright';
import fs from 'node:fs';
const dir = process.cwd().split(String.fromCharCode(92)).join('/');
const pairs = [
  ['hero-movil', 'shots/w1-390-hero.png', 'shots/w4-390-hero.png', 390, 844],
  ['hero-escritorio', 'shots/w1-1440-hero.png', 'shots/w4-1440-hero.png', 720, 450],
  ['cambio-movil', 'shots/w1-390-cambio.png', 'shots/w4-390-cambio.png', 390, 844],
  ['cambio-escritorio', 'shots/w1-1440-cambio.png', 'shots/w4-1440-cambio.png', 720, 450],
  ['oferta-escritorio', 'shots/w1-1440-preguntas-cliente.png', 'shots/w4-1440-oferta.png', 720, 450],
  ['prueba-escritorio', 'shots/w1-1440-prueba.png', 'shots/w4-1440-prueba.png', 720, 450],
  ['presupuesto-escritorio', 'shots/w1-1440-presupuesto.png', 'shots/w4-1440-presupuesto.png', 720, 450],
];
const b = await chromium.launch({ channel: 'chrome' });
for (const [n, a, c, w, h] of pairs) {
  const html = `<body style="margin:0;background:#222;font:700 18px Arial;color:#fff"><div style="display:flex;gap:16px;padding:16px"><div><div style="padding:6px 0">ANTES (V9.1)</div><img src="file:///${dir}/${a}" width="${w}"></div><div><div style="padding:6px 0;color:#00ff88">DESPUÉS (V9.2)</div><img src="file:///${dir}/${c}" width="${w}"></div></div>`;
  fs.writeFileSync('compare/_t.html', html);
  const p = await b.newPage({ viewport: { width: w * 2 + 48, height: h + 80 } });
  await p.goto('file:///' + dir + '/compare/_t.html'); await p.waitForTimeout(400);
  await p.screenshot({ path: `compare/${n}.png`, fullPage: true }); await p.close();
}
await b.close();
fs.unlinkSync('compare/_t.html');
