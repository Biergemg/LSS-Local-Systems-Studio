import { chromium } from 'playwright';
const [,, url, tag] = process.argv;
const vps = [[320,720],[390,844],[768,1024],[1440,900]];
const b = await chromium.launch({channel:'chrome'});
for (const [w,h] of vps) {
  const c = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor: w<500?2:1, reducedMotion:'no-preference' });
  const p = await c.newPage();
  await p.goto(url, { waitUntil:'networkidle' });
  await p.waitForTimeout(800);
  await p.screenshot({ path:`shots/${tag}-${w}-hero.png` });
  await p.screenshot({ path:`shots/${tag}-${w}-full.png`, fullPage:true });
  const sw = await p.evaluate(()=>document.documentElement.scrollWidth);
  console.log(tag, w, 'scrollWidth', sw, 'height', await p.evaluate(()=>document.documentElement.scrollHeight));
  await c.close();
}
await b.close();
