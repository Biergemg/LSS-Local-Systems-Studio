import { chromium } from 'playwright';
const refs = [['basic','https://basicagency.com'],['pentagram','https://www.pentagram.com'],['geowiza','https://www.geowiza.com']];
const b = await chromium.launch({ channel: 'chrome' });
for (const [n,u] of refs) for (const [w,h,t] of [[1440,900,'d'],[390,844,'m']]) {
  const c = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor: t==='m'?2:1 });
  const p = await c.newPage();
  try {
    await p.goto(u,{waitUntil:'domcontentloaded',timeout:45000}); await p.waitForTimeout(4500);
    await p.screenshot({path:`comp/${n}-${t}-hero.png`});
    if (t==='d') {
      await p.evaluate(()=>window.scrollTo(0, innerHeight*1.2)); await p.waitForTimeout(1500);
      await p.screenshot({path:`comp/${n}-${t}-scroll.png`});
      const info = await p.evaluate(()=>{
        const els=[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&(e.textContent||'').trim().length>0});
        const fam={}; els.forEach(e=>{const f=getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g,'').trim(); fam[f]=(fam[f]||0)+1});
        const h1=document.querySelector('h1'); const hs=h1?getComputedStyle(h1):null;
        const anims=document.getAnimations().length;
        return {fam:Object.entries(fam).sort((a,b)=>b[1]-a[1]).slice(0,5), bg:getComputedStyle(document.body).backgroundColor, fg:getComputedStyle(document.body).color, h1:h1?{text:h1.innerText.slice(0,80),size:hs.fontSize,weight:hs.fontWeight,font:hs.fontFamily.split(',')[0]}:null, anims, radiusEls:[...document.querySelectorAll('*')].filter(e=>parseFloat(getComputedStyle(e).borderTopLeftRadius)>0).length};
      });
      console.log(n, JSON.stringify(info));
    }
  } catch(e){ console.log(n,t,'ERR',String(e).slice(0,120)); }
  await c.close();
}
await b.close();
