import { chromium } from 'playwright'; import { AxeBuilder } from '@axe-core/playwright';
const b = await chromium.launch({ channel: 'chrome' });
for (const [w, h] of [[390, 844], [1440, 900]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
  await p.goto('http://localhost:3201/', { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
  const r = await new AxeBuilder({ page: p }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  const bn = await p.locator('.privacy-consent').boundingBox();
  console.log(w, 'banner visible:', !!bn, 'height', bn && Math.round(bn.height), 'axe violations:', r.violations.length, r.violations.map(v => v.id).join(','), 'overflow-x:', overflow);
  await p.screenshot({ path: `shots21/banner-${w}.png` }); await ctx.close();
}
await b.close();
