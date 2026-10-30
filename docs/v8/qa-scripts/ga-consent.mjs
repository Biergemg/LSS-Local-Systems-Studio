// Prueba funcional del flujo de consentimiento de GA4 (ID de PRUEBA, no real) con las peticiones a Google interceptadas:
// nada sale hacia Google. Valida la logica, NO es medicion real. Uso: node ga-consent.mjs [base]
import { chromium } from 'playwright';
const BASE = process.argv[2] ?? 'http://localhost:3201';
const ID = 'G-TEST000001';
let fails = 0;
const rec = (ok, name, info = '') => { if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${info ? '  (' + info + ')' : ''}`); };
const b = await chromium.launch({ channel: 'chrome' });

async function fresh(opts = {}) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, ...opts });
  const hits = [];
  await ctx.route(/googletagmanager\.com|google-analytics\.com|analytics\.google\.com/, (r) => { hits.push(r.request().url()); r.fulfill({ status: 200, contentType: 'application/javascript', body: '/* interceptado */' }); });
  await ctx.route(/wa\.me\//, (r) => r.fulfill({ status: 200, contentType: 'text/html', body: 'wa' }));
  const p = await ctx.newPage();
  return { ctx, p, hits };
}

// 1. Antes de decidir: banner visible y cero peticiones a Google
{
  const { ctx, p, hits } = await fresh();
  await p.goto(BASE, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  rec(await p.locator('.privacy-consent').isVisible(), 'Banner de medicion visible antes de elegir');
  rec(hits.length === 0, 'Cero peticiones a Google antes de elegir', hits.length + ' peticiones');
  const txt = await p.locator('.privacy-consent').innerText();
  rec(/Google Analytics/.test(txt) && /Rechazar medici/.test(txt) && /Permitir medici/.test(txt), 'Texto del banner describe el fin y ofrece Rechazar y Permitir con el mismo peso');
  const sizes = await p.$$eval('.privacy-consent .btn', (els) => els.map((e) => Math.round(e.getBoundingClientRect().height)));
  rec(sizes.every((h) => h >= 44), 'Botones del banner >= 44 px', sizes.join(','));
  // 2. Rechazar: persiste y no carga nada
  await p.getByRole('button', { name: /Rechazar medici/ }).click(); await p.waitForTimeout(800);
  await p.goto(BASE, { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
  rec(hits.length === 0, 'Tras rechazar: cero peticiones a Google (tambien tras recargar)');
  rec(!(await p.locator('.privacy-consent').isVisible()), 'Tras rechazar el banner no reaparece');
  const ck = (await ctx.cookies()).filter((c) => c.name.startsWith('_ga'));
  rec(ck.length === 0, 'Tras rechazar: sin cookies _ga');
  await p.locator('a[href="https://wa.me/528333263389?text=x"], a[href^="https://wa.me/"]').first().click({ trial: true }).catch(() => {});
  await ctx.close();
}

// 3. Permitir: carga una sola vez, eventos de WhatsApp, sin contenido personal
{
  const { ctx, p, hits } = await fresh();
  await p.goto(BASE, { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
  await p.getByRole('button', { name: /Permitir medici/ }).click(); await p.waitForTimeout(2500);
  const libs = hits.filter((u) => /gtag\/js\?id=G-TEST000001/.test(u));
  rec(libs.length === 1, 'Tras permitir: gtag.js se solicita exactamente una vez (sin doble etiquetado)', libs.length + '');
  const scripts = await p.$$eval('script[src*="googletagmanager"], script#lss-ga4-init', (s) => s.length);
  rec(scripts <= 2, 'Un solo bloque de init + una libreria en el DOM', String(scripts));
  const cfg = await p.evaluate(() => window.dataLayer.map((a) => Array.from(a)));
  const configs = cfg.filter((a) => a[0] === 'config');
  rec(configs.length === 1 && configs[0][1] === ID, 'Un unico gtag config con el ID', String(configs.length));
  rec(configs[0]?.[2]?.allow_google_signals === false && configs[0]?.[2]?.allow_ad_personalization_signals === false, 'Senales de Google y personalizacion de anuncios desactivadas');
  const consent = cfg.find((a) => a[0] === 'consent' && a[1] === 'default')?.[2];
  rec(consent?.ad_storage === 'denied' && consent?.ad_user_data === 'denied' && consent?.ad_personalization === 'denied' && consent?.analytics_storage === 'granted', 'Consent Mode: publicidad denegada, analitica concedida');
  // eventos: clic en WhatsApp de cada ubicacion
  await p.evaluate(() => { document.querySelectorAll('a[href*="wa.me"]').forEach((a) => a.addEventListener('click', (e) => e.preventDefault())); window.dataLayer.length = 0; });
  const links = p.locator('a[href^="https://wa.me/"]');
  const n = await links.count();
  await p.locator('main a[href^="https://wa.me/"]').first().click({ force: true });
  await p.waitForTimeout(300);
  const ev = (await p.evaluate(() => window.dataLayer.map((a) => Array.from(a)))).filter((a) => a[0] === 'event');
  rec(ev.length === 1 && ev[0][1] === 'whatsapp_click' && typeof ev[0][2]?.link_location === 'string', 'Clic en WhatsApp => un evento whatsapp_click con ubicacion', JSON.stringify(ev[0]?.slice(1)));
  rec(!/528333263389|text=|Hola/.test(JSON.stringify(ev)), 'El evento no incluye telefono ni texto del mensaje');
  await p.evaluate(() => { window.dataLayer.length = 0; });
  await p.locator('.footer a[href^="https://wa.me/"]').first().click({ force: true }); await p.waitForTimeout(200);
  const ev2 = (await p.evaluate(() => window.dataLayer.map((a) => Array.from(a)))).filter((a) => a[0] === 'event');
  rec(ev2[0]?.[2]?.link_location === 'pie', 'Ubicacion distingue el pie de pagina', JSON.stringify(ev2[0]?.[2]));
  await p.evaluate(() => { window.dataLayer.length = 0; });
  await p.locator('main a[href="#proceso"], nav a[href^="#"]').first().click({ force: true }).catch(() => {}); await p.waitForTimeout(200);
  const ev3 = (await p.evaluate(() => window.dataLayer.map((a) => Array.from(a)))).filter((a) => a[0] === 'event');
  rec(ev3.length === 0, 'Un enlace interno no genera evento');
  rec(n >= 4, 'El sitio tiene enlaces de WhatsApp en varias ubicaciones', String(n));

  // 4. Retirar: elimina cookies _ga y detiene
  await p.evaluate(() => { document.cookie = '_ga=GA1.1.1.1; path=/'; document.cookie = '_ga_TEST000001=GS1.1.1; path=/'; });
  await p.locator('.footer-preferences').click(); await p.waitForTimeout(500);
  rec(await p.locator('.privacy-consent').isVisible(), 'Preferencias de privacidad reabre el control desde el pie');
  await Promise.all([p.waitForNavigation({ waitUntil: 'load' }), p.getByRole('button', { name: /Rechazar medici/ }).click()]);
  await p.waitForTimeout(800);
  const left = (await ctx.cookies()).filter((c) => c.name.startsWith('_ga'));
  rec(left.length === 0, 'Retirar el permiso elimina las cookies _ga y _ga_*', left.map((c) => c.name).join(','));
  await ctx.close();
}

// 5. Privacidad refleja exactamente el tratamiento
{
  const { ctx, p } = await fresh();
  await p.goto(BASE + '/privacidad', { waitUntil: 'networkidle' });
  const t = await p.locator('main, body').first().innerText();
  const checks = [[/Google Analytics 4/, 'nombra la herramienta'], [/solo si eliges/, 'condiciona al consentimiento'], [/_ga/, 'declara las cookies'], [/14 meses/, 'declara retencion'], [/no equivale a un mensaje recibido/i, 'distingue clic de mensaje'], [/Preferencias de privacidad/, 'indica como retirar'], [/Google Ireland Limited/, 'identifica al proveedor'], [/fuera de M/, 'transferencia internacional']];
  for (const [re, what] of checks) rec(re.test(t), 'Aviso de privacidad ' + what);
  await ctx.close();
}
await b.close();
console.log(fails ? `\nRESULTADO: ${fails} FAIL` : '\nRESULTADO: TODO PASS (logica con ID de prueba e interceptacion; NO es medicion real)');
process.exit(fails ? 1 : 0);
