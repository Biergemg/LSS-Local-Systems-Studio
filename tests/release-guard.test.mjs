import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {assertSource} from '../scripts/release-guard.mjs';
import {validateCoverage,evidencePath,digestFile} from '../scripts/evidence-source.mjs';
import {validateCommand,validatePng} from '../scripts/evidence-artifacts.mjs';
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
