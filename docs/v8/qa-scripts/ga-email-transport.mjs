import { chromium } from 'playwright'

const BASE='https://www.lsslocalsystemsstudio.com'
const ID='G-0DJ220E3ZL'
const browser=await chromium.launch({channel:'chrome'})
const ctx=await browser.newContext({viewport:{width:390,height:844}})
const page=await ctx.newPage()
const requests=[]
page.on('request',req=>{
 if (/googletagmanager\.com|google-analytics\.com/.test(req.url())) {
   requests.push({url:req.url(),body:req.postData()||'',status:null})
 }
})
page.on('response',res=>{
 const item=requests.find(x=>x.url===res.url()&&x.status===null)
 if(item)item.status=res.status()
})
let passed=0
function check(ok,label){
 console.log((ok?'PASS':'FAIL')+' '+label)
 if(ok)passed++
 else process.exitCode=1
}
try{
 await page.goto(BASE,{waitUntil:'networkidle',timeout:30000})
 await page.waitForTimeout(700)
 check(requests.length===0,'No Google requests before analytics consent')
 await page.getByRole('button',{name:/^Permitir(?: medici.n)?$/}).click()
 await page.waitForTimeout(2600)
 const tag=requests.some(r=>r.url.includes('/gtag/js?id='+ID)&&r.status===200)
 check(tag,'Consent loads approved GA4 tag')
 await page.evaluate(()=>{
   document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{
     a.addEventListener('click',event=>event.preventDefault())
   })
 })
 const link=page.locator('main a[href^="mailto:"]').first()
 check(await link.count()===1,'Visible first-class email CTA in main content')
 await link.click()
 await page.waitForTimeout(7000)
 const hits=requests.filter(r=>r.url.includes('google-analytics.com/g/collect'))
 const event=hits.find(r=>new URL(r.url).searchParams.get('en')==='email_click' ||
   new URLSearchParams(r.body).get('en')==='email_click'||r.body.includes('en=email_click'))
 check(Boolean(event),'GA4 email_click emitted after consent')
 check(Boolean(event)&&event.status>=200&&event.status<300,'Google accepted email_click transport')
 const body=event?event.url+'\n'+event.body:''
 check(Boolean(event)&&!/contacto@lsslocalsystemsstudio|mailto:|Primera%20Visita|Nombre:|Negocio:/i.test(body),
   'Email event does not contain address, subject or email template text')
 check(page.url().startsWith(BASE), 'Email QA intercept keeps test browser on LSS website')
 console.log('RESULT '+passed+'/7 PASS')
}finally{
 await ctx.close()
 await browser.close()
}
