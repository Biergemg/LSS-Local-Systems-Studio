#!/usr/bin/env node
// Isolated synthetic fixtures verify that the validator rejects missing/altered evidence.
// These fixtures NEVER represent a real website or client QA.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import {spawnSync} from 'node:child_process';
const script=path.join(import.meta.dirname,'verify-delivery.mjs');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'v8-validator-tests-'));
const write=(r,text)=>{const p=path.join(temp,r);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,text);return r};
const blob=(name)=>write('evidence/'+name,'Synthetic validation fixture — NOT a real client result. '.repeat(4));
function png(width,height){
 const chunk=(name,data)=>{
  const len=Buffer.alloc(4);len.writeUInt32BE(data.length);
  const n=Buffer.from(name,'ascii'),payload=Buffer.concat([n,data]);
  let crc=~0;
  for(const c of payload){crc^=c;for(let i=0;i<8;i++)crc=(crc>>>1)^((crc&1)?0xedb88320:0)}
  const crcbuf=Buffer.alloc(4);crcbuf.writeUInt32BE((~crc)>>>0);
  return Buffer.concat([len,payload,crcbuf]);
 };
 const header=Buffer.alloc(13);header.writeUInt32BE(width,0);header.writeUInt32BE(height,4);header[8]=8;header[9]=2;
 const scan=Buffer.alloc((width*3+1)*height);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const p=y*(width*3+1)+1+x*3;scan[p]=x%256;scan[p+1]=y%256;scan[p+2]=(x*y)%256;
 }
 return Buffer.concat([Buffer.from('89504e470d0a1a0a','hex'),chunk('IHDR',header),chunk('IDAT',zlib.deflateSync(scan)),chunk('IEND',Buffer.alloc(0))]);
}
const phase=Array.from({length:9},(_,i)=>({id:i+1,status:'PASS',evidence:[blob('phase-'+(i+1)+'.txt')]}));
const gates=Array.from({length:10},(_,i)=>({id:'G'+i,status:'PASS',evidence:[blob('gate-'+i+'.txt')]}));
const skills=['copywriting','page-cro','ui-ux-pro-max','seo-audit','ai-seo','schema','impeccable'].map(x=>({
 capability:x,installedName:x,source:'https://example.test/fixture/'+x,status:'EXECUTED',
 artifact:blob('skill-'+x+'.md'),executionLog:blob('invoke-'+x+'.log'),
 executedAt:'2026-10-30T18:00:00.000Z',
 skillFileSha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(import.meta.dirname,'..','vendor',['seo-audit','ai-seo','schema'].includes(x)?'marketing-skills':'locked-skills',x==='page-cro'?'cro':x,'SKILL.md'))).digest('hex')
}));
const components=[];
for(const [id,rel,kind,source] of [
 ['home-page','app/page.tsx','static','export default function Page(){return <main>Prueba simulada</main>};'],
 ['contact-button','components/Hero.tsx','interactive','export function Hero(){return <button onClick={()=>{}}>Prueba</button>}']
]){
 write(rel,source);
 components.push({id,sourceFile:rel,sourceSha256:crypto.createHash('sha256').update(source).digest('hex'),
  purpose:'Prueba de contrato de inventario sin representar cliente real',kind,
  tests:[{kind:'render',status:'PASS',assertion:'La pieza aparece en el navegador de pruebas',evidence:blob('render-'+id+'.txt')},...(kind==='interactive'?[{kind:'interaction',status:'PASS',assertion:'El control responde a un clic real de prueba',evidence:blob('click-'+id+'.txt')}]:[])]
 });
}
const screenshots=[];
for(const width of [320,390,768,1440])for(const region of ['hero','signature','cta','footer']){
 const file='evidence/screenshots/'+width+'-'+region+'.png',p=path.join(temp,file);
 fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,png(width,200));
 screenshots.push({width,region,file,browserCaptured:true});
}
const commands=['build','typecheck','lint','browser','accessibility','seo'].map(kind=>({
 kind,status:'PASS',exitCode:0,command:'test-fixture '+kind,executedAt:'2026-10-30T00:00:00Z',
 log:blob('test-'+kind+'.log')
}));
for(const name of ['ART_DIRECTION.md','QA_EVIDENCE.md'])write(name,'DOCUMENTO DE PRUEBA — NO ES ENTREGA REAL. '+name);
const base={contract:'v8-delivery-evidence/1',projectName:'ONLY SYNTHETIC CONTRACT TEST',sourceCommit:'',
 phases:phase,gates,skills,components,
 seoVisibility:{version:'v8-aeo-geo/1',
  technicalAudit:{status:'PASS',checkedAt:'2026-10-30T18:00:00Z',checkedUrl:'https://example.test/',evidence:blob('technical-audit.txt')},
  queryMap:Array.from({length:5},(_,i)=>({query:['¿Quién hace sitios web para negocios?','Dónde contratar presencia en Google','Cómo mejorar la web del negocio','Agencia que diseña sitios de servicios','Quién revisa las páginas de mi empresa'][i],intent:'contratacion de servicios',language:'es-MX',market:'Mexico',targetUrl:'https://example.test/',sourceFile:'app/page.tsx',sourceSha256:components[0].sourceSha256,evidence:blob('query-'+i+'.txt')})),
  assistantProbes:[{provider:'Assistant A (synthetic)',query:'¿Quién hace sitios web para negocios?',observed:'NOT_MENTIONED',checkedAt:'2026-10-30T18:05:00Z',evidence:blob('probe-a.txt')},{provider:'Assistant B (synthetic)',query:'Dónde contratar presencia en Google',observed:'NOT_MENTIONED',checkedAt:'2026-10-30T18:06:00Z',evidence:blob('probe-b.txt')}],
  baseline:{status:'NO_DATA',checkedAt:'2026-10-30T18:07:00Z',evidence:blob('baseline.txt')},
  schemaReview:{status:'PASS',checkedAt:'2026-10-30T18:09:00Z',evidence:blob('schema-review.txt')}
 },
 journeys:[{name:'Synthetic CTA',status:'PASS',assertion:'Camino completo probado en fixture',evidence:blob('journey.txt')}],
 screenshots,commands,assets:[],issues:[{id:'synthetic-1',priority:'P1',status:'FIXED_RETESTED',fixEvidence:blob('fix.txt'),retestEvidence:blob('retest.txt')}],
 thirdParty21st:{status:'USED',authentication:'CONNECTED',
 searches:[{query:'synthetic hero',evidence:blob('21st-search.txt')}],
 candidates:[{name:'Candidate 1',url:'https://example.test/component-1',license:'MIT',decision:'Selected for fixture only',evidence:blob('21st-candidate-1.txt')},{name:'Candidate 2',url:'https://example.test/component-2',license:'MIT',decision:'Rejected in fixture',evidence:blob('21st-candidate-2.txt')}],
 integrations:[{componentId:'contact-button',testEvidence:blob('21st-test.txt')}]},
 approval:{status:'APPROVED',approvedBy:'Synthetic test harness',evidence:blob('approval.txt')}
};
function git(...args){const r=spawnSync('git',args,{cwd:temp,encoding:'utf8'});if(r.status)throw Error('git '+args.join(' ')+' '+r.stderr);return r.stdout.trim()}
function run(obj){
 write('V8_DELIVERY_EVIDENCE.json',JSON.stringify(obj,null,2));
 const r=spawnSync(process.execPath,[script,'--project',temp,'--evidence',path.join(temp,'V8_DELIVERY_EVIDENCE.json')],{encoding:'utf8'});
 let out;try{out=JSON.parse(r.stdout)}catch{throw Error('Output invalido '+r.stderr+' '+r.stdout)}
 return {exit:r.status,status:out.status,errors:out.errors};
}
let failures=0,total=0;
try{
 git('init','-q');git('add','app','components');git('-c','user.email=test@example.invalid','-c','user.name=V8 Test','commit','-qm','synthetic fixture');
 base.sourceCommit=git('rev-parse','HEAD');
 const tests=[
 ['fixture synthetic all fields',base,true],
 ['missing screenshot',{...base,screenshots:base.screenshots.slice(1)},false],
 ['skill not executed',{...base,skills:base.skills.map((s,i)=>i===0?{...s,status:'BLOCKED'}:s)},false],
 ['21st not connected',{...base,thirdParty21st:{...base.thirdParty21st,authentication:'AUTH_REQUIRED'}},false],
 ['missing interactive test',{...base,components:base.components.map((c,i)=>i===1?{...c,tests:c.tests.slice(0,1)}:c)},false],
 ['modified source hash',{...base,components:base.components.map((c,i)=>i===0?{...c,sourceSha256:'0'.repeat(64)}:c)},false],
 ['no approval',{...base,approval:{...base.approval,status:'NOT_APPROVED'}},false],
 ['P1 not retested',{...base,issues:[{id:'broken',priority:'P1',status:'OPEN'}]},false],
 ['ai-seo missing entirely',{...base,skills:base.skills.filter(s=>s.capability!=='ai-seo')},false],
 ['ai-seo version SHA mismatch',{...base,skills:base.skills.map(s=>s.capability==='ai-seo'?{...s,skillFileSha256:'f'.repeat(64)}:s)},false],
 ['no AI/voice query portfolio',{...base,seoVisibility:{...base.seoVisibility,queryMap:[]}},false],
 ['missing assistant real checks',{...base,seoVisibility:{...base.seoVisibility,assistantProbes:[]}},false],
 ['content changed since AEO mapping',{...base,seoVisibility:{...base.seoVisibility,queryMap:base.seoVisibility.queryMap.map((x,i)=>i===0?{...x,sourceSha256:'0'.repeat(64)}:x)}},false]
 ];
 total=tests.length;
 for(const [name,data,expected]of tests){const out=run(data);const ok=(out.exit===0)===expected;console.log((ok?'PASS':'FAIL')+' '+name+' => '+out.status+' errors='+out.errors.length);if(!ok){console.log('  DETAIL='+JSON.stringify(out.errors));failures++}}
} finally {fs.rmSync(temp,{recursive:true,force:true})}
console.log('V8 CONTRACT TESTS: '+(total-failures)+'/'+total+' PASS (synthetic harness, not site QA)');
process.exitCode=failures?1:0;
