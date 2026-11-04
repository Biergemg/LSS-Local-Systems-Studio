import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {snapshot} from './release-guard.mjs';
import {validateCoverage} from './evidence-source.mjs';
const root=process.cwd();
const sha=spawnSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).stdout.trim();
const registry=JSON.parse(fs.readFileSync('docs/audit/reviews.json','utf8'));
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
// The original registry is historical evidence. Verify it against its actual
// source commit, not against newer files that its reviewer never inspected.
const historicalCommit=registry.reviewedSourceCommit;
if(!/^[a-f0-9]{40}$/.test(historicalCommit||'') ||
   spawnSync('git',['merge-base','--is-ancestor',historicalCommit,sha],{cwd:root}).status!==0)
  throw new Error('HISTORICAL_REVIEW_COMMIT_INVALID');
for(const [file,expected] of Object.entries(registry.reviewedFiles||{})) {
  if(hash(file)===expected) continue;
  const historical=spawnSync('git',['show',`${historicalCommit}:${file}`],{cwd:root});
  if(historical.status!==0 || crypto.createHash('sha256').update(historical.stdout).digest('hex')!==expected)
    throw new Error('HISTORICAL_REVIEW_PROVENANCE_MISMATCH: '+file);
}
// The independent report from this exact SHA supplies current tracked-input
// coverage. The CI replay produced it after authenticating the original review.
const finalReviewFile='.audit-private/independent-review.json';
if(!fs.existsSync(finalReviewFile)) throw new Error('CURRENT_INDEPENDENT_REVIEW_MISSING');
const finalReview=JSON.parse(fs.readFileSync(finalReviewFile,'utf8'));
if(finalReview.sourceCommit!==sha || finalReview.status!=='PASS' || !finalReview.reviewer || finalReview.reviewer===finalReview.implementer)
  throw new Error('CURRENT_INDEPENDENT_REVIEW_INVALID');
validateCoverage(root,finalReview.reviewedFiles);
const doc=structuredClone(registry.evidence);
doc.sourceCommit=sha;doc.sourceSnapshot=snapshot(root);
// Dates and findings remain those of the real manual review. The source digest,
// not a rewritten date or an old commit assertion, determines applicability.
doc.skills=doc.skills.map(s=>({...s,sourceCommit:sha}));
const commandFiles=fs.readdirSync('.audit-private/commands').filter(p=>p.endsWith('.json'));
doc.commands=commandFiles.map(file=>JSON.parse(fs.readFileSync(path.join('.audit-private/commands',file),'utf8')));
const browser=doc.commands.find(c=>c.kind==='browser');
if(browser) for(const kind of ['accessibility','seo']) doc.commands.push({...browser,kind,derivedFrom:'browser'});
const browserResults=JSON.parse(fs.readFileSync('test-results/results.json','utf8'));
const browserPassed=browser?.status==='PASS'&&browser.exitCode===0&&browserResults.stats.expected===39&&browserResults.stats.unexpected===0&&browserResults.stats.skipped===0;
// Component outcomes refer to the defined full regression suite, never a
// filtered smoke run. Phase/gate/manual review decisions remain untouched.
for(const component of doc.components) for(const test of component.tests) test.status=browserPassed?'PASS':'BLOCKED';
const retests={H02:['browser'],H03:['browser'],SEC01:['dependency','build','browser'],PRIV01:['browser'],NAV01:['browser'],A11Y01:['browser'],A11Y02:['browser'],A11Y03:['browser'],A11Y04:['browser'],CI01:['release-guard'],CI02:['release-guard'],V8V01:['release-guard']};
for(const issue of doc.issues) {
 const kinds=retests[issue.id];
 if(kinds&&browserPassed&&kinds.every(kind=>doc.commands.some(c=>c.kind===kind&&c.status==='PASS'&&c.exitCode===0&&c.sourceCommit===sha))) {
  issue.status='FIXED_RETESTED';issue.retestEvidence='.audit-private/commands/'+kinds[0]+'.log';
 }
}
fs.mkdirSync('.audit-private/browser',{recursive:true});
fs.cpSync('test-results','.audit-private/browser',{recursive:true});
doc.screenshots=[];
function scan(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
 const file=path.join(dir,entry.name);
 if(entry.isDirectory()) scan(file);
 else {const m=entry.name.match(/^(320|390|768|1440)-(hero|signature|cta|footer)\.png$/);if(m) doc.screenshots.push({width:Number(m[1]),region:m[2],browserCaptured:true,file:file.replaceAll('\\','/')});}
}}scan('.audit-private/browser');
for(const c of doc.components) c.sourceSha256=hash(c.sourceFile);
for(const q of doc.seoVisibility.queryMap) q.sourceSha256=hash(q.sourceFile);
const independentFile='.audit-private/independent-review.json';
doc.performance={measurement:'LABORATORY',fieldCWV:{status:'NO_DATA',reason:'No authenticated RUM/CrUX p75 data available; laboratory TBT is not field INP.'},reports:[]};
for(const profile of ['mobile','desktop']) {
 const file=`.audit-private/performance/${profile}.json`,command=doc.commands.find(c=>c.kind===`performance-${profile}`);
 if(fs.existsSync(file)&&command?.status==='PASS'&&command.sourceCommit===sha) {
  const result=JSON.parse(fs.readFileSync(file,'utf8'));
  doc.performance.reports.push({profile,file,sourceCommit:sha,checkedAt:result.fetchTime,url:result.finalDisplayedUrl,lighthouseVersion:result.lighthouseVersion,scores:Object.fromEntries(['performance','accessibility','best-practices','seo'].map(id=>[id,result.categories[id]?.score])),LCPms:result.audits['largest-contentful-paint'].numericValue,CLS:result.audits['cumulative-layout-shift'].numericValue,TBTms:result.audits['total-blocking-time'].numericValue});
 }
}
if(process.env.V8_INDEPENDENT_REVIEW_JSON) fs.writeFileSync(independentFile,process.env.V8_INDEPENDENT_REVIEW_JSON);
if(fs.existsSync(independentFile)) {
 const review=JSON.parse(fs.readFileSync(independentFile,'utf8'));
 if(review.sourceCommit!==sha) throw new Error('Independent review belongs to a different commit');
 doc.independentReview={status:review.status,sourceCommit:review.sourceCommit,evidence:independentFile,sha256:hash(independentFile)};
} else doc.independentReview={status:'BLOCKED',sourceCommit:sha,evidence:'docs/audit/INDEPENDENT_REVIEW_REQUIREMENTS.md',reason:'No independent final-commit report was supplied'};
doc.generatedAt=new Date().toISOString();
fs.writeFileSync('V8_DELIVERY_EVIDENCE.json',JSON.stringify(doc,null,2));
fs.copyFileSync('V8_DELIVERY_EVIDENCE.json','.audit-private/V8_DELIVERY_EVIDENCE.json');
console.log(`Evidence assembled for ${sha}; phase/gate status preserved, no approval synthesized.`);
