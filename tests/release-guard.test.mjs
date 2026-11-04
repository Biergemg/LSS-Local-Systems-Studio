import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {assertSource} from '../scripts/release-guard.mjs';
import {validateCoverage,evidencePath,digestFile} from '../scripts/evidence-source.mjs';
import {validateCommand,validatePng} from '../scripts/evidence-artifacts.mjs';
import {LEGACY_AUDIT_COMMIT,assertHistoricalReview,assertCurrentIndependentReview,assertAuditProvenance,loadCurrentIndependentReview} from '../scripts/review-provenance.mjs';
import {deflateSync,crc32} from 'node:zlib';

test('dirty tracked CSS is rejected even if HEAD matches and evidence asserts PASS',()=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'lss-release-guard-'));
  const git=(...args)=>{const r=spawnSync('git',args,{cwd:root,encoding:'utf8'});assert.equal(r.status,0,r.stderr);return r.stdout.trim();};
  try{
    git('init','-q');fs.writeFileSync(path.join(root,'style.css'),'body {color:black}');git('add','.');
    git('-c','user.name=Isolated test','-c','user.email=test@example.invalid','commit','-qm','synthetic fixture, never client evidence');
    const sha=git('rev-parse','HEAD');fs.appendFileSync(path.join(root,'style.css'),'body {display:none}');
    assert.throws(()=>assertSource(root,{sourceCommit:sha}),/RELEASE_DIRTY/);
  }finally{fs.rmSync(root,{recursive:true,force:true});}
});

test('a reviewed narrative cannot silently rebind changed product source',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'lss-review-coverage-'));
 try {
  spawnSync('git',['init','-q'],{cwd:root});
  fs.mkdirSync(path.join(root,'app'));fs.mkdirSync(path.join(root,'docs'));
  fs.writeFileSync(path.join(root,'app','page.tsx'),'<main>Real product</main>');
  fs.writeFileSync(path.join(root,'docs','review.md'),'Narrative review');
  spawnSync('git',['add','.'],{cwd:root});
  assert.throws(()=>validateCoverage(root,{'docs/review.md':digestFile(path.join(root,'docs','review.md'))}),/OMITTED/);
  const reviewed={'app/page.tsx':digestFile(path.join(root,'app','page.tsx'))};
  validateCoverage(root,reviewed);
  fs.appendFileSync(path.join(root,'app','page.tsx'),'<button>Broken</button>');
  assert.throws(()=>validateCoverage(root,reviewed),/STALE/);
 }finally {fs.rmSync(root,{recursive:true,force:true});}
});
test('a missing or escaping independent report is rejected',()=>{
 assert.throws(()=>evidencePath(process.cwd(),'THIS-FILE-DOES-NOT-EXIST.json'));
 assert.throws(()=>evidencePath(process.cwd(),'../private/report.json'),/PATH|FILE/);
});
test('a passing command record cannot contradict its real log exit',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'lss-command-log-'));
 try {
  const metadata={executedAt:new Date().toISOString(),sourceCommit:'a'.repeat(40),executable:'node',args:['build.js']};
  fs.writeFileSync(path.join(root,'build.log'),JSON.stringify(metadata)+'\nSTDOUT\nFailed\nSTDERR\n\nEXIT 1\n');
  const record={...metadata,kind:'build',status:'PASS',exitCode:0,command:'node build.js',log:'build.log'};
  assert.throws(()=>validateCommand(root,record),/CONTRADICTS/);
  fs.writeFileSync(path.join(root,'build.log'),JSON.stringify(metadata)+'\nSTDOUT\nBuilt\nSTDERR\n\nEXIT 0\n');
  validateCommand(root,record);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('PNG header-only forgery is rejected; real compressed raster is accepted',()=>{
 const forged=Buffer.alloc(2048);Buffer.from('89504e470d0a1a0a','hex').copy(forged);forged.writeUInt32BE(320,16);forged.writeUInt32BE(568,20);
 assert.throws(()=>validatePng(forged,320));
 const chunk=(type,data)=>{const bytes=Buffer.alloc(data.length+12);bytes.writeUInt32BE(data.length);bytes.write(type,4);data.copy(bytes,8);bytes.writeUInt32BE(crc32(bytes.subarray(4,bytes.length-4)),bytes.length-4);return bytes;};
 const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(1);ihdr.writeUInt32BE(1,4);ihdr[8]=8;ihdr[9]=6;
 const real=Buffer.concat([Buffer.from('89504e470d0a1a0a','hex'),chunk('IHDR',ihdr),chunk('IDAT',deflateSync(Buffer.from([0,0,0,0,255]))),chunk('IEND',Buffer.alloc(0))]);
 assert.equal(validatePng(real,1),1);
 const damaged=Buffer.from(real);damaged[damaged.length-1]^=1;assert.throws(()=>validatePng(damaged,1),/CRC/);
});

test('historical review provenance allows known tooling drift but rejects changed product and forged history',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'lss-historical-review-'));
 const git=(...args)=>{
  const r=spawnSync('git',args,{cwd:root,encoding:'utf8'});
  assert.equal(r.status,0,r.stderr);return r.stdout.trim();
 };
 try {
  git('init','-q');
  fs.mkdirSync(path.join(root,'app'));
  fs.mkdirSync(path.join(root,'docs','audit'),{recursive:true});
  fs.writeFileSync(path.join(root,'app','page.tsx'),'<main>Original</main>');
  fs.writeFileSync(path.join(root,'package-lock.json'),'{"lockfileVersion":3}');
  const reviewedFiles={
   'app/page.tsx':digestFile(path.join(root,'app','page.tsx')),
   'package-lock.json':digestFile(path.join(root,'package-lock.json')),
  };
  const legacy={reviewedAt:'2026-01-01T00:00:00.000Z',reviewedFiles,evidence:{phases:[{status:'PASS'}]}};
  fs.writeFileSync(path.join(root,'docs','audit','reviews.json'),JSON.stringify(legacy));
  git('add','.');
  git('-c','user.name=Synthetic Reviewer','-c','user.email=test@example.invalid','commit','-qm','historical fixture');
  const old=git('rev-parse','HEAD');
  const registry={...legacy,reviewedSourceCommit:old};
  assert.equal(assertHistoricalReview(root,registry,old).originalInputs,2);
  fs.writeFileSync(path.join(root,'package-lock.json'),'{"lockfileVersion":3,"tools":"patched"}');
  assert.deepEqual(assertHistoricalReview(root,registry,old).permittedChanges,['package-lock.json']);
  assert.throws(()=>assertHistoricalReview(root,{...registry,evidence:{phases:[{status:'PASS',forged:true}]}},old),/HISTORICAL_EVIDENCE_MODIFIED/);
  assert.throws(()=>assertHistoricalReview(root,{...registry,reviewedAt:'2027-01-01T00:00:00Z'},old),/HISTORICAL_EVIDENCE_MODIFIED/);
  git('add','package-lock.json');
  git('-c','user.name=Synthetic Reviewer','-c','user.email=test@example.invalid','commit','-qm','later tooling edit');
  const descendant=git('rev-parse','HEAD');
  assert.deepEqual(assertHistoricalReview(root,registry,descendant).permittedChanges,['package-lock.json']);
  fs.writeFileSync(path.join(root,'app','new.tsx'),'<main>New product without review</main>');
  git('add','app/new.tsx');
  assert.throws(()=>assertHistoricalReview(root,registry,old),/HISTORICAL_REVIEW_SCOPE_ADDITION: app\/new.tsx/);
  git('reset','-q','--','app/new.tsx');
  fs.rmSync(path.join(root,'app','new.tsx'));
  fs.writeFileSync(path.join(root,'app','page.tsx'),'<main>Changed without review</main>');
  assert.throws(()=>assertHistoricalReview(root,registry,old),/HISTORICAL_REVIEW_SCOPE_DRIFT: app\/page.tsx/);
  fs.writeFileSync(path.join(root,'app','page.tsx'),'<main>Original</main>');
  assert.throws(()=>assertHistoricalReview(root,{...registry,reviewedFiles:{...reviewedFiles,'app/page.tsx':'0'.repeat(64)}},old),/HISTORICAL_EVIDENCE_MODIFIED/);
  assert.throws(()=>assertHistoricalReview(root,{...registry,reviewedFiles:{'package-lock.json':reviewedFiles['package-lock.json']}},old),/HISTORICAL_EVIDENCE_MODIFIED/);
  assert.throws(()=>assertHistoricalReview(root,{...registry,reviewedSourceCommit:'a'.repeat(40)},old),/HISTORICAL_REVIEW_COMMIT_INVALID/);
  assert.throws(()=>assertHistoricalReview(root,{...registry,reviewedSourceCommit:'not-a-sha'},old),/HISTORICAL_REVIEW_COMMIT_INVALID/);
 } finally {fs.rmSync(root,{recursive:true,force:true});}
});

test('exact-commit independent source review rejects missing implementer, self-review, stale and incomplete coverage',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'lss-current-review-'));
 try {
  spawnSync('git',['init','-q'],{cwd:root});
  fs.mkdirSync(path.join(root,'app'));
  fs.writeFileSync(path.join(root,'app','page.tsx'),'<main>Test only</main>');
  spawnSync('git',['add','.'],{cwd:root});
  const sha='b'.repeat(40);
  const report={
   status:'PASS',sourceCommit:sha,reviewer:'Separate audit agent',implementer:'Code implementer',
   reviewedFiles:{'app/page.tsx':digestFile(path.join(root,'app','page.tsx'))},
  };
  assert.equal(assertCurrentIndependentReview(root,report,sha),true);
  for(const bad of [
    {...report,status:'BLOCKED'},
    {...report,sourceCommit:'a'.repeat(40)},
    {...report,reviewer:report.implementer},
    {...report,implementer:null},
    {...report,reviewedFiles:{}},
    null,
  ]) assert.throws(()=>assertCurrentIndependentReview(root,bad,sha),/CURRENT_INDEPENDENT_REVIEW_INVALID|REVIEW_STALE_OR_OMITTED/);
  fs.appendFileSync(path.join(root,'app','page.tsx'),'<button>Edited</button>');
  assert.throws(()=>assertCurrentIndependentReview(root,report,sha),/REVIEW_STALE_OR_OMITTED/);
 } finally {fs.rmSync(root,{recursive:true,force:true});}
});

test('assembler review loader fails closed for missing, blocked, stale and spoofed reports',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'lss-assembly-review-'));
 try {
  spawnSync('git',['init','-q'],{cwd:root});
  fs.mkdirSync(path.join(root,'app'));
  fs.mkdirSync(path.join(root,'.audit-private'));
  fs.writeFileSync(path.join(root,'app','page.tsx'),'<main>Test fixture only</main>');
  spawnSync('git',['add','app/page.tsx'],{cwd:root});
  const sha='c'.repeat(40);
  assert.throws(()=>loadCurrentIndependentReview(root,sha),/CURRENT_INDEPENDENT_REVIEW_MISSING/);
  const reportPath=path.join(root,'.audit-private','independent-review.json');
  const coverage={'app/page.tsx':digestFile(path.join(root,'app','page.tsx'))};
  fs.writeFileSync(reportPath,JSON.stringify({status:'BLOCKED',sourceCommit:sha,reviewedFiles:coverage}));
  assert.throws(()=>loadCurrentIndependentReview(root,sha),/CURRENT_INDEPENDENT_REVIEW_INVALID/);
  const good={status:'PASS',sourceCommit:sha,reviewer:'External code reviewer',implementer:'Implementer',reviewedFiles:coverage};
  fs.writeFileSync(reportPath,JSON.stringify(good));
  const poison='{"status":"BLOCKED","sourceCommit":"evil"}';
  const before=process.env.V8_INDEPENDENT_REVIEW_JSON;
  process.env.V8_INDEPENDENT_REVIEW_JSON=poison;
  try {assert.deepEqual(loadCurrentIndependentReview(root,sha),good);}
  finally {if(before===undefined) delete process.env.V8_INDEPENDENT_REVIEW_JSON;else process.env.V8_INDEPENDENT_REVIEW_JSON=before;}
  assert.equal(fs.readFileSync(reportPath,'utf8'),JSON.stringify(good));
  assert.throws(()=>loadCurrentIndependentReview(root,'d'.repeat(40)),/CURRENT_INDEPENDENT_REVIEW_INVALID/);
  fs.writeFileSync(reportPath,'{broken json');
  assert.throws(()=>loadCurrentIndependentReview(root,sha),/CURRENT_INDEPENDENT_REVIEW_UNREADABLE/);
 }finally {fs.rmSync(root,{recursive:true,force:true});}
});

test('legacy timestamps cannot be passed as authenticated current audit provenance',()=>{
 const sha='c'.repeat(40);
 const legacy={
  sourceCommit:LEGACY_AUDIT_COMMIT,
  status:'HISTORICAL_CONTENT_INTEGRITY_ONLY',
  reviewedAtAuthenticated:false,
  humanReviewerAuthenticated:false,
  evidenceSha256:'a'.repeat(64),
 };
 const current={sourceCommit:sha,status:'PASS',ownerApproval:'NOT_ASSERTED'};
 const doc={sourceCommit:sha,evidenceScope:{legacyReview:legacy,currentIndependentReview:current}};
 assert.equal(assertAuditProvenance(doc),true);
 assert.throws(()=>assertAuditProvenance({...doc,evidenceScope:{...doc.evidenceScope,legacyReview:{...legacy,reviewedAtAuthenticated:true}}}),/LEGACY_EVIDENCE_PROVENANCE_MISSING/);
 assert.throws(()=>assertAuditProvenance({...doc,evidenceScope:{...doc.evidenceScope,legacyReview:{...legacy,humanReviewerAuthenticated:true}}}),/LEGACY_EVIDENCE_PROVENANCE_MISSING/);
 assert.throws(()=>assertAuditProvenance({...doc,evidenceScope:{...doc.evidenceScope,currentIndependentReview:{...current,sourceCommit:'d'.repeat(40)}}}),/CURRENT_REVIEW_PROVENANCE_MISSING/);
 assert.throws(()=>assertAuditProvenance({...doc,evidenceScope:{...doc.evidenceScope,currentIndependentReview:{...current,ownerApproval:'APPROVED'}}}),/CURRENT_REVIEW_PROVENANCE_MISSING/);
});
