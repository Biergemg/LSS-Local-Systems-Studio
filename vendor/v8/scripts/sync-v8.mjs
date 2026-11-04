#!/usr/bin/env node
// Sync *one* canonical V8 into active Claude skill. Never treat old ZIPs as sources.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const args=process.argv.slice(2);
const sync=args.includes('--sync'),check=args.includes('--check')||!sync;
const targetFlag=args.indexOf('--target');
const target=targetFlag>=0?args[targetFlag+1]:'claude';
if(!['claude','codex','both'].includes(target)){console.error('Usar --target claude|codex|both');process.exit(2)}
const verify=spawnSync(process.execPath,[path.join(root,'scripts','verify-integrity.mjs'),'--verify'],{encoding:'utf8'});
if(verify.status!==0){console.error('CANONICAL LOCK FAIL: '+verify.stderr+verify.stdout);process.exit(2)}
const skill='prompt-maestro-v8-orchestrator';
const lookup=a=>path.join(os.homedir(),a==='claude'?'.claude':'.codex','skills',skill);
const list=(base)=>{const out=new Map();function walk(dir){if(!fs.existsSync(dir))return;for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isSymbolicLink())throw new Error('Symlink prohibido '+p);if(e.isDirectory())walk(p);else if(e.isFile()){const rel=path.relative(base,p).split(path.sep).join('/');const hash=crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');out.set(rel,hash)}}}walk(base);return out};
const base=list(root);
const state=dst=>{const cur=list(dst);const diff=[...new Set([...base.keys(),...cur.keys()])].filter(k=>base.get(k)!==cur.get(k));return {path:dst,same:diff.length===0,changed:diff.slice(0,25),totalDifferent:diff.length}};
const agents=target==='both'?['claude','codex']:[target];
const report=[];
for(const a of agents){
 const dst=lookup(a);
 if(path.resolve(root).toLowerCase()===path.resolve(dst).toLowerCase()){console.error('La fuente no puede instalarse sobre sí misma');process.exit(2)}
 const before=state(dst);
 if(sync&&!before.same){
  const parent=path.dirname(dst);
  fs.mkdirSync(parent,{recursive:true});
  const stamp=new Date().toISOString().replace(/[:.]/g,'-');
  const safe=path.join(os.homedir(),'.v8-historicos-no-instalar',skill+'-'+a+'-'+stamp);
  fs.mkdirSync(path.dirname(safe),{recursive:true});
  let wasMoved=false,copyFallback=false;
  if(fs.existsSync(dst)){
   try{fs.renameSync(dst,safe);wasMoved=true}
   catch(e){
    if(!['EPERM','EACCES','EBUSY'].includes(e.code))throw e;
    fs.cpSync(dst,safe,{recursive:true,errorOnExist:true,force:false});
    copyFallback=true;
   }
  }
  try{
   fs.cpSync(root,dst,{recursive:true,errorOnExist:false,force:true,filter:(source)=>!['.git','node_modules'].includes(path.basename(source))});
   // After a copy-overwrite fallback, remove files that were in the old installed version only.
   if(copyFallback)for(const rel of list(dst).keys())if(!base.has(rel))fs.rmSync(path.join(dst,rel),{force:true});
  }catch(e){
   if(wasMoved){fs.rmSync(dst,{recursive:true,force:true});fs.renameSync(safe,dst)}
   if(copyFallback)fs.cpSync(safe,dst,{recursive:true,force:true});
   throw e;
  }
  report.push({agent:a,before,archive:(wasMoved||copyFallback)?safe:null,copyFallback,after:state(dst)});
 }else report.push({agent:a,before,after:before});
}
console.log(JSON.stringify({source:root,mode:sync?'sync':'check',status:report.every(r=>r.after.same)?'PASS':'DIVERGENT',report},null,2));
if(report.some(r=>!r.after.same))process.exitCode=1;
