import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {assertSource} from '../scripts/release-guard.mjs';
import {validateCoverage,evidencePath,digestFile} from '../scripts/evidence-source.mjs';

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
