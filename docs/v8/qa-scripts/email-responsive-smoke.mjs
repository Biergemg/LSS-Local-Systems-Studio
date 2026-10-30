import { chromium } from 'playwright'

const browser = await chromium.launch({channel:'chrome'})
let count=0
let failed=0
try {
  for (const width of [320,390,768,1440]) {
    const ctx=await browser.newContext({viewport:{width,height:900}})
    const page=await ctx.newPage()
    await page.goto('https://www.lsslocalsystemsstudio.com',{waitUntil:'domcontentloaded',timeout:30000})
    const result=await page.evaluate(()=>{
      const links=Array.from(document.querySelectorAll('main a[href^="mailto:"]'))
      const visible=links.some(el=>{
        const rect=el.getBoundingClientRect()
        const style=getComputedStyle(el)
        return style.display!=='none'&&style.visibility!=='hidden'&&rect.width>0&&rect.height>0
      })
      return {
        horizontalOverflow:document.documentElement.scrollWidth>window.innerWidth+2,
        visibleEmailLink:visible,
        dangerousTarget:links.some(el=>el.getAttribute('target')==='_blank'),
        count:links.length,
      }
    })
    const good=!result.horizontalOverflow&&result.visibleEmailLink&&!result.dangerousTarget&&result.count>=2
    console.log((good?'PASS ':'FAIL ')+width+'px '+JSON.stringify(result))
    count+=Number(good)
    failed+=Number(!good)
    await ctx.close()
  }
} finally { await browser.close() }
console.log('Responsive email channel QA '+count+'/4 PASS')
if(failed)process.exitCode=1
