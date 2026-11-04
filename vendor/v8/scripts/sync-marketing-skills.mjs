#!/usr/bin/env node
// One pinned marketing skill pack: identical bytes across all supported agent installs.
// Existing divergent versions are archived outside active skills before replacement.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const marketing=path.join(root,'vendor','marketing-skills');
const locked=path.join(root,'vendor','locked-skills');
const entries=[...['ai-seo','seo-audit','schema'].map(name=>({name,path:path.join(marketing,name)})),...['copywriting','cro','ui-ux-pro-max','impeccable'].map(name=>({name,path:path.join(locked,name)}))];
const argv=process.argv.slice(2),install=argv.includes('--install');
const at=argv.indexOf('--target'),target=at>=0?argv[at+1]:'auto';
if(!['auto','claude','codex','both'].includes(target)){console.error('target inválido');process.exit(2)}
const agents=target==='both'?['claude','codex']:target==='auto'?['claude']: [target];
const hash=(p)=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const list=(dir)=>{
 const m=new Map();
 function scan(p){if(!fs.existsSync(p))return;for(const e of fs.readdirSync(p,{withFileTypes:true})){
  const abs=path.join(p,e.name);
  if(e.isSymbolicLink())throw new Error('Symlink prohibido '+abs);
  if(e.isDirectory())scan(abs);
  else if(e.isFile())m.set(path.relative(dir,abs).replace(/\\/g,'/'),hash(abs));
 }}scan(dir);return m;
};
const same=(a,b)=>{
 const x=list(a),y=list(b),changed=[...new Set([...x.keys(),...y.keys()])].filter(k=>x.get(k)!==y.get(k));
 return {same:changed.length===0&&x.size>0,changed:changed.slice(0,14),count:x.size};
};
const results=[];
for(const agent of agents){
 const base=path.join(os.homedir(),agent==='claude'?'.claude':'.codex','skills');
 for(const entry of entries){
  const name=entry.name,original=entry.path,dst=path.join(base,name);
  if(!fs.existsSync(path.join(original,'SKILL.md')))throw new Error('Fuente canónica incompleta: '+name);
  const before=same(original,dst);
  let action='NONE',archive=null;
  if(install&&!before.same){
   fs.mkdirSync(base,{recursive:true});
   if(fs.existsSync(dst)){
    const dir=path.join(os.homedir(),'.v8-historicos-no-instalar');
    fs.mkdirSync(dir,{recursive:true});
    archive=path.join(dir,name+'-'+agent+'-'+new Date().toISOString().replace(/[:.]/g,'-'));
    // Copy backup first, then update; if rename is denied by open file handles, do not pretend success.
    fs.cpSync(dst,archive,{recursive:true,errorOnExist:true,force:false});
    try{fs.renameSync(dst,dst+'.v8-swap-temp')}catch{
     action='BLOCKED_ACTIVE_FOLDER_LOCKED';
    }
    if(action!=='BLOCKED_ACTIVE_FOLDER_LOCKED'){
     try{fs.cpSync(original,dst,{recursive:true,errorOnExist:true,force:false});fs.rmSync(dst+'.v8-swap-temp',{recursive:true,force:true});action='REPLACED'}
     catch(e){fs.rmSync(dst,{recursive:true,force:true});fs.renameSync(dst+'.v8-swap-temp',dst);throw e}
    }
   }else{fs.cpSync(original,dst,{recursive:true,errorOnExist:true,force:false});action='INSTALLED'}
  }
  const after=same(original,dst);
  results.push({agent,name,status:after.same?'PASS':'DIVERGENT_OR_MISSING',action,archive,canonicalFiles:after.count,changed:after.changed});
 }
}
const passed=results.every(x=>x.status==='PASS');
console.log(JSON.stringify({source:root,mode:install?'install':'check',status:passed?'PASS':'BLOCKED',results},null,2));
process.exitCode=passed?0:1;
