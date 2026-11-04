import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {assertSource} from '../scripts/release-guard.mjs';

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
