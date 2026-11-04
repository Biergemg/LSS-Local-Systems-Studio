#!/usr/bin/env node
// V8 EVIDENCE GATE: checks files and structured assertions, never fabricates results.
// A PASS requires real artefacts; this cannot independently certify who generated them.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
const flags=process.argv.slice(2);
const val=(name)=>{const i=flags.indexOf('--'+name);return i<0?null:flags[i+1]};
const mode=val('mode')||'production';
const project=val('project')&&path.resolve(val('project'));
const evidence=val('evidence')&&path.resolve(val('evidence'));
const errors=[], warnings=[];
const fail=(msg)=>errors.push(msg);
const isNonBlank=(x)=>typeof x==='string'&&x.trim().length>=5;
if(!project||!evidence||!['production','prototype'].includes(mode)){console.error('Uso: node scripts/verify-delivery.mjs --project <ruta> --evidence <json> --mode production|prototype');process.exit(2)}
const within=(root,relative)=>{
 if(!isNonBlank(relative)||path.isAbsolute(relative)||relative.includes('\0'))return null;
 const full=path.resolve(root,relative);
 return full.startsWith(root+path.sep)?full:null;
};
const checkFile=(relative,field)=>{
 const p=within(project,relative);
 if(!p){fail(field+': ruta fuera del proyecto o ausente: '+String(relative));return false}
 try{const s=fs.statSync(p);if(!s.isFile()||s.size<8){fail(field+': archivo inexistente/vacio '+relative);return false}return true}
 catch{fail(field+': archivo inexistente '+relative);return false}
};
const checkFiles=(list,field)=>{
 if(!Array.isArray(list)||!list.length){fail(field+': requiere evidencia concreta');return}
 for(const f of list)checkFile(f,field);
};
let doc;
try{doc=JSON.parse(fs.readFileSync(evidence,'utf8'))}
catch(e){console.error('FAIL: evidence JSON ilegible: '+e.message);process.exit(2)}
if(doc.contract!=='v8-delivery-evidence/1')fail('contract no coincide');
if(!isNonBlank(doc.projectName))fail('projectName ausente');
if(!isNonBlank(doc.sourceCommit)||!/^[a-f0-9]{7,40}$/i.test(doc.sourceCommit))fail('sourceCommit debe identificar un commit Git real');
const git=spawnSync('git',['rev-parse','HEAD'],{cwd:project,encoding:'utf8',timeout:8000});
if(git.status!==0)fail('El proyecto no tiene versión Git verificable');
else if(git.stdout.trim()!==doc.sourceCommit)fail('Commit evaluado difiere del commit del proyecto');
const pass=(x)=>x==='PASS';
const phaseRows=Array.isArray(doc.phases)?doc.phases:[];
const gateRows=Array.isArray(doc.gates)?doc.gates:[];
for(let n=1;n<=9;n++){
 const rows=phaseRows.filter(r=>r.id===n);
 if(rows.length!==1){fail('FASE '+n+': falta o duplicada');continue}
 const r=rows[0];if(!pass(r.status))fail('FASE '+n+': '+r.status+'; no acreditada');
 checkFiles(r.evidence,'FASE '+n);
}
for(let n=0;n<=9;n++){
 const id='G'+n,rows=gateRows.filter(r=>r.id===id);
 if(rows.length!==1){fail(id+': falta o duplicado');continue}
 const r=rows[0];if(!pass(r.status))fail(id+': '+r.status+'; no acreditado');
 checkFiles(r.evidence,id);
}
const skills=Array.isArray(doc.skills)?doc.skills:[];
const required=['copywriting','page-cro','ui-ux-pro-max','seo-audit','ai-seo','schema','impeccable'];
for(const id of required){
 const rows=skills.filter(r=>r.capability===id);
 if(rows.length!==1){fail('SKILL '+id+': falta o duplicada');continue}
 const r=rows[0];
 if(r.status!=='EXECUTED'){fail('SKILL '+id+': '+r.status+'; no se ejecutó con prueba')}
 if(!isNonBlank(r.installedName)||!isNonBlank(r.source))fail('SKILL '+id+': no se verificó identidad/origen');
 checkFile(r.artifact,'SKILL '+id+' output');
 checkFile(r.executionLog,'SKILL '+id+' invocation log');
 {
  const vendorFolder=['seo-audit','ai-seo','schema'].includes(id)?'marketing-skills':'locked-skills';
  const vendoredName=id==='page-cro'?'cro':id;
  const canonical=path.resolve(import.meta.dirname,'..','vendor',vendorFolder,vendoredName,'SKILL.md');
  const hash=crypto.createHash('sha256').update(fs.readFileSync(canonical)).digest('hex');
  if(r.skillFileSha256!==hash)fail('SKILL '+id+': SHA256 distinto de la única fuente V8');
  if(!isNonBlank(r.executedAt)||!Number.isFinite(Date.parse(r.executedAt)))fail('SKILL '+id+': ejecución sin fecha ISO válida');
 }
}
// SEO técnico + voz/AI SEO + Schema: no se aprueba por mera instalación de skills.
const sv=doc.seoVisibility||{};
if(sv.version!=='v8-aeo-geo/1')fail('AI SEO/F5: seoVisibility versión ausente');
const dated=x=>typeof x==='string'&&Number.isFinite(Date.parse(x));
const audit=sv.technicalAudit||{};
if(audit.status!=='PASS'||!dated(audit.checkedAt)||!/^https?:\/\//.test(audit.checkedUrl||''))fail('AI SEO/F5: no hay auditoría técnica HTTP e indexabilidad fechada');
checkFile(audit.evidence,'F5 auditoría técnica SEO');
const queries=Array.isArray(sv.queryMap)?sv.queryMap:[];
if(queries.length<5)fail('AI SEO/F5: se requieren >=5 consultas conversacionales reales con URL y contenido');
if(!queries.some(q=>/[¿?]|quién|quien|dónde|donde|cómo|como|oye google/i.test(q.query||'')))fail('AI SEO/F5: falta consulta con formulación natural o por voz');
const seenQueries=new Set();
for(const [i,q] of queries.entries()){
 const label='AI SEO/F5 consulta '+i;
 if(!isNonBlank(q.query)||!isNonBlank(q.intent)||!isNonBlank(q.market)||typeof q.language!=='string'||q.language.length<2||!/^https?:\/\//.test(q.targetUrl||''))fail(label+': consulta/mercado/idioma/URL insuficiente');
 if(seenQueries.has(q.query))fail(label+': consulta duplicada');
 seenQueries.add(q.query);
 if(checkFile(q.sourceFile,label+' fuente')){
  const actual=crypto.createHash('sha256').update(fs.readFileSync(path.resolve(project,q.sourceFile))).digest('hex');
  if(q.sourceSha256!==actual)fail(label+': el contenido cambió o carece de SHA256');
 }
 checkFile(q.evidence,label+' evidencia de mapeo a página');
}
const probes=Array.isArray(sv.assistantProbes)?sv.assistantProbes:[];
if(probes.length<2)fail('AI SEO/F5: faltan 2 observaciones fechadas de asistentes/buscadores');
const providers=new Set();
for(const [i,p] of probes.entries()){
 if(!isNonBlank(p.provider)||!seenQueries.has(p.query)||!dated(p.checkedAt)||!['MENTIONED','NOT_MENTIONED'].includes(p.observed))fail('AI SEO/F5 sondeo '+i+': proveedor/consulta/fecha/resultado no comprobado');
 providers.add(p.provider);
 checkFile(p.evidence,'F5 sondeo de respuesta '+i);
}
if(probes.length>=2&&providers.size<2)fail('AI SEO/F5: verificar en >=2 proveedores distintos');
const baseline=sv.baseline||{};
if(!['MEASURED','NO_DATA'].includes(baseline.status)||!dated(baseline.checkedAt))fail('AI SEO/F5: no hay línea base de Search Console verificada, o NO_DATA explícito');
checkFile(baseline.evidence,'F5 línea base Search Console');
const schemaReview=sv.schemaReview||{};
if(schemaReview.status!=='PASS'||!dated(schemaReview.checkedAt))fail('Schema/F5: falta revisión de JSON-LD y texto visible fechada');
checkFile(schemaReview.evidence,'F5 validación Schema');

const components=Array.isArray(doc.components)?doc.components:[];
if(!components.length)fail('No hay inventario de componentes');
const ids=new Set();
for(const c of components){
 if(!isNonBlank(c.id)||ids.has(c.id))fail('ID de componente ausente/duplicado: '+c.id);
 ids.add(c.id);
 if(!isNonBlank(c.purpose))fail('Componente '+c.id+': sin función comercial');
 if(!checkFile(c.sourceFile,'Código componente '+c.id))continue;
 const original=fs.readFileSync(path.resolve(project,c.sourceFile));
 const actualSha=crypto.createHash('sha256').update(original).digest('hex');
 if(c.sourceSha256!==actualSha)fail('Componente '+c.id+': fuente modificada desde la prueba o SHA ausente');
 if(c.kind==='static'&&/(<button\b|onClick\s*=|onSubmit\s*=|<form\b)/.test(original.toString('utf8')))fail('Componente '+c.id+': se declararon controles interactivos como estaticos');
 if(c.kind!=='static'&&c.kind!=='interactive')fail('Componente '+c.id+': kind inválido');
 if(!Array.isArray(c.tests)||!c.tests.some(x=>x.kind==='render'&&x.status==='PASS'))fail('Componente '+c.id+': falta test render PASS');
 if(c.kind==='interactive'&&!c.tests?.some(x=>x.kind==='interaction'&&x.status==='PASS'))fail('Componente '+c.id+': falta test interacción PASS');
 for(const t of c.tests||[]){
  if(!['PASS','FAIL','BLOCKED'].includes(t.status))fail('Componente '+c.id+': estado no válido');
  if(t.status!=='PASS')fail('Componente '+c.id+': prueba sin PASS '+t.kind);
  if(!isNonBlank(t.assertion))fail('Componente '+c.id+': prueba sin aserción');
  checkFile(t.evidence,'Componente '+c.id+' prueba '+t.kind);
 }
}
// Detectar páginas y componentes del código que el inventario omitió. No equivale a parser AST.
const discover=[];
for(const sub of ['app','src/app','pages','src/pages','components','src/components']){
 const start=path.join(project,sub);if(!fs.existsSync(start))continue;
 function scan(dir){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
  if(['node_modules','.next','test-results','__tests__'].includes(ent.name))continue;
  const full=path.join(dir,ent.name);
  if(ent.isDirectory()){scan(full);continue}
  if(!ent.isFile())continue;
  if(/\.(tsx|jsx|vue)$/.test(ent.name) && ((sub.includes('components'))||/^(page|index)\.(tsx|jsx|vue)$/.test(ent.name))){discover.push(path.relative(project,full).replace(/\\/g,'/'))}
 }}scan(start)
}
if(fs.existsSync(path.join(project,'index.html')))discover.push('index.html');
const declared=new Set(components.map(c=>String(c.sourceFile).replace(/\\/g,'/')));
for(const rel of new Set(discover))if(!declared.has(rel))fail('Archivo UI omitido del inventario: '+rel);
const journeys=Array.isArray(doc.journeys)?doc.journeys:[];
if(!journeys.length)fail('No hay journey de conversión probado');
for(const j of journeys){
 if(!isNonBlank(j.name)||!isNonBlank(j.assertion)||j.status!=='PASS')fail('Journey sin PASS/aserción: '+j.name);
 checkFile(j.evidence,'Journey '+j.name);
}
const checkScreenshot=(s)=>{
 const rel=s.file, p=within(project,rel);
 if(!p||!fs.existsSync(p)){fail('Captura inexistente '+rel);return false}
 const b=fs.readFileSync(p);
 if(b.length<1024){fail('Captura demasiado pequeña para prueba visual '+rel);return false}
 const png=b.subarray(0,8).equals(Buffer.from('89504e470d0a1a0a','hex'));
 if(!png){fail('Captura no es PNG verificable '+rel);return false}
 if(b.readUInt32BE(16)!==s.width||b.readUInt32BE(20)<100){fail('Dimensiones de captura no coinciden con viewport '+rel);return false}
 return true;
};
const shots=Array.isArray(doc.screenshots)?doc.screenshots:[];
for(const width of [320,390,768,1440])for(const region of ['hero','signature','cta','footer']){
 if(!shots.some(s=>s.width===width&&s.region===region&&s.browserCaptured===true&&checkScreenshot(s)))fail('Falta captura navegador '+width+'/'+region);
}
const commands=Array.isArray(doc.commands)?doc.commands:[];
for(const kind of ['build','typecheck','lint','browser','accessibility','seo']){
 const rows=commands.filter(c=>c.kind===kind);
 if(rows.length!==1){fail('Comando '+kind+': falta o duplicado');continue}
 const r=rows[0];
 if(r.status!=='PASS'||r.exitCode!==0||!isNonBlank(r.command)||!isNonBlank(r.executedAt))fail('Comando '+kind+': sin ejecución PASS verificable');
 checkFile(r.log,'Comando '+kind);
}
const assets=Array.isArray(doc.assets)?doc.assets:[];
for(const a of assets){
 if(!(typeof a.license==='string'&&a.license.trim().length>=2)||!isNonBlank(a.origin))fail('Asset licencia/origen no acreditados');
 checkFile(a.file,'Asset');
}
const issues=Array.isArray(doc.issues)?doc.issues:[];
for(const issue of issues){
 if(!['P0','P1','P2'].includes(issue.priority))fail('Issue severidad inválida');
 if(['P0','P1'].includes(issue.priority)&&issue.status!=='FIXED_RETESTED')fail('Issue '+issue.id+' crítica sin retest');
 if(issue.status==='FIXED_RETESTED'){checkFile(issue.fixEvidence,'Issue '+issue.id+' corrección');checkFile(issue.retestEvidence,'Issue '+issue.id+' retest')}
 if(issue.priority==='P2'&&issue.status!=='FIXED_RETESTED'&&!isNonBlank(issue.acceptedRisk))fail('Issue P2 sin resolución ni aceptación de riesgo');
}
const third=doc.thirdParty21st||{};
if(!['USED','EVALUATED_NOT_SELECTED'].includes(third.status)||third.authentication!=='CONNECTED')fail('21st.dev: sin conexión y evaluación real. Estado '+third.status+'/'+third.authentication);
if(!Array.isArray(third.searches)||third.searches.length<1)fail('21st.dev: falta búsqueda documentada');
for(const s of third.searches||[]){if(!isNonBlank(s.query))fail('21st.dev: consulta vacía');checkFile(s.evidence,'21st.dev búsqueda')}
if(!Array.isArray(third.candidates)||third.candidates.length<2)fail('21st.dev: mínimo 2 candidatos evaluados');
for(const c of third.candidates||[]){if(!isNonBlank(c.name)||!isNonBlank(c.url)||!(typeof c.license==='string'&&c.license.trim().length>=2)||!isNonBlank(c.decision))fail('21st.dev: candidato incompleto');checkFile(c.evidence,'21st.dev evaluación')}
if(third.status==='USED'&&(!Array.isArray(third.integrations)||!third.integrations.length))fail('21st.dev: declara usado sin componente integrado');
for(const v of third.integrations||[]){if(!ids.has(v.componentId))fail('21st.dev: referencia a componente sin inventario '+v.componentId);checkFile(v.testEvidence,'21st.dev componente '+v.componentId)}
for(const f of ['ART_DIRECTION.md','QA_EVIDENCE.md'])checkFile(f,'Handoff');
if(mode==='production'){
 const a=doc.approval||{};
 if(a.status!=='APPROVED'||!isNonBlank(a.approvedBy))fail('Publicación no autorizada por el titular');
 checkFile(a.evidence,'Permiso de publicación');
}
if(mode==='prototype'&&errors.length)warnings.push('Prototipo con evidencias insuficientes: no usar el estado PASS ni publicar');
const result={product:'PROMPT MAESTRO V8',mode,status:errors.length?'BLOCKED':'PASS',components:components.length,discoveredFiles:discover.length,journeys:journeys.length,issues:issues.length,errors,warnings};
console.log(JSON.stringify(result,null,2));
process.exitCode=errors.length?1:0;
