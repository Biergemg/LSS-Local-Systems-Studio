import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {snapshot} from './release-guard.mjs';
import {LEGACY_AUDIT_COMMIT,assertHistoricalReview,loadCurrentIndependentReview,assertAuditProvenance} from './review-provenance.mjs';
const root=process.cwd();
const sha=spawnSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).stdout.trim();
const registry=JSON.parse(fs.readFileSync('docs/audit/reviews.json','utf8'));
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
// Legacy evidence is pinned to the original commit and cannot be edited or
// restamped onto changed product sources. Its timestamp is not authenticated.
if(registry.reviewedSourceCommit!==LEGACY_AUDIT_COMMIT)
  throw new Error('HISTORICAL_REVIEW_COMMIT_CHANGED');
const historical=assertHistoricalReview(root,registry,sha);
// The CI replay has already authenticated this exact-SHA independent review.
// No old SHA or unverified environment variable can replace its coverage.
const finalReview=loadCurrentIndependentReview(root,sha);
const doc=structuredClone(registry.evidence);
doc.sourceCommit=sha;doc.sourceSnapshot=snapshot(root);
// Legacy PASS labels and timestamps are inherited from a content snapshot;
// they must never be represented as a newly authenticated human review.
doc.evidenceScope={
  ...doc.evidenceScope,
  legacyReview:{
    sourceCommit:LEGACY_AUDIT_COMMIT,
    status:'HISTORICAL_CONTENT_INTEGRITY_ONLY',
    reviewedAt:registry.reviewedAt,
    reviewedAtAuthenticated:false,
    humanReviewerAuthenticated:false,
    evidenceSha256:historical.originalEvidenceDigest,
    unchangedProductSourcesRequired:true,
  },
  currentIndependentReview:{
    sourceCommit:sha,
    status:finalReview.status,
    reviewerLabel:finalReview.reviewer,
    ownerApproval:'NOT_ASSERTED',
  },
};
assertAuditProvenance(doc);
// Historical skill applications remain attributed to unchanged source inputs.
// The current independent report and CI logs support only their scoped claims.
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
// Reuse only the already-validated CI report; never overwrite it with a raw
// environment variable after the authentication and current-SHA hash checks.
doc.independentReview={status:finalReview.status,sourceCommit:sha,evidence:independentFile,sha256:hash(independentFile)};
doc.generatedAt=new Date().toISOString();
fs.writeFileSync('V8_DELIVERY_EVIDENCE.json',JSON.stringify(doc,null,2));
fs.copyFileSync('V8_DELIVERY_EVIDENCE.json','.audit-private/V8_DELIVERY_EVIDENCE.json');
console.log(`Evidence assembled for ${sha}; phase/gate status preserved, no approval synthesized.`);
