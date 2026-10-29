import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.goto('file:///C:/Users/Bierge Ponce/Desktop/ALMACEN/Proyectos/Proyectos_nuevos/Sitioos Web/LSS/lss-web-v8-qa/og.html');
await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
await p.screenshot({ path: 'og-new.png' });
await b.close();
