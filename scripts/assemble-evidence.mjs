import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {snapshot} from './release-guard.mjs';
const root=process.cwd();
const sha=spawnSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).stdout.trim();
const registry=JSON.parse(fs.readFileSync('docs/audit/reviews.json','utf8'));
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
for(const [file,digest] of Object.entries(registry.reviewedFiles)) if(hash(file)!==digest) throw new Error('Manual skill review stale for '+file);
const doc=structuredClone(registry.evidence);
doc.sourceCommit=sha;doc.sourceSnapshot=snapshot(root);
// Dates and findings remain those of the real manual review. The source digest,
// not a rewritten date or an old commit assertion, determines applicability.
doc.skills=doc.skills.map(s=>({...s,sourceCommit:sha}));
const commandFiles=fs.readdirSync('.audit-private/commands').filter(p=>p.endsWith('.json'));
doc.commands=commandFiles.map(file=>JSON.parse(fs.readFileSync(path.join('.audit-private/commands',file),'utf8')));
const browser=doc.commands.find(c=>c.kind==='browser');
if(browser) for(const kind of ['accessibility','seo']) doc.commands.push({...browser,kind,command:browser.command+' (included '+kind+' assertions; same execution)'});
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
if(process.env.V8_INDEPENDENT_REVIEW_JSON) fs.writeFileSync(independentFile,process.env.V8_INDEPENDENT_REVIEW_JSON);
if(fs.existsSync(independentFile)) {
 const review=JSON.parse(fs.readFileSync(independentFile,'utf8'));
 if(review.sourceCommit!==sha) throw new Error('Independent review belongs to a different commit');
 doc.independentReview={...review,evidence:independentFile};
} else doc.independentReview={status:'BLOCKED',sourceCommit:sha,evidence:'docs/audit/INDEPENDENT_REVIEW_REQUIREMENTS.md',reason:'No independent final-commit report was supplied'};
doc.generatedAt=new Date().toISOString();
fs.writeFileSync('V8_DELIVERY_EVIDENCE.json',JSON.stringify(doc,null,2));
fs.copyFileSync('V8_DELIVERY_EVIDENCE.json','.audit-private/V8_DELIVERY_EVIDENCE.json');
console.log(`Evidence assembled for ${sha}; phase/gate status preserved, no approval synthesized.`);
