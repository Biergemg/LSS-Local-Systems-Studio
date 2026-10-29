import { chromium } from 'playwright';
const url='http://localhost:3200', tag=process.argv[2]||'v4';
const ids=['cambio','prueba','preguntas-cliente','oferta','proceso','entrega','presupuesto','preguntas','contacto'];
const b=await chromium.launch({channel:'chrome'});
for (const [w,h] of [[390,844],[1440,900]]) {
  const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:w<500?2:1});
  const p=await c.newPage(); const errs=[]; p.on('console',m=>['error','warning'].includes(m.type())&&errs.push(m.text()));
  await p.goto(url,{waitUntil:'networkidle'}); await p.waitForTimeout(3500);
  await p.screenshot({path:`shots/${tag}-${w}-hero.png`});
  for (const id of ids){ await p.evaluate(i=>document.getElementById(i).scrollIntoView({behavior:'instant',block:'start'}),id); await p.waitForTimeout(900); await p.screenshot({path:`shots/${tag}-${w}-${id}.png`}); }
  console.log(w,'sw',await p.evaluate(()=>document.documentElement.scrollWidth),'errs',errs.length,errs.slice(0,2));
  await c.close();
}
await b.close();
