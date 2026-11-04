#!/usr/bin/env node
// Deterministic SHA256 inventory. Use --seal ONLY after a reviewed canonical edit.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const lock='.v8-integrity.json';
const arg=process.argv.slice(2);
if(!arg.includes('--seal')&&!arg.includes('--verify')){console.error('Uso: --verify (solo lectura) o --seal (actualización controlada del lock)');process.exit(2)}
const files=[];
function visit(dir){
 for(const ent of fs.readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){
  if(['.git','node_modules','.DS_Store','__pycache__'].includes(ent.name))continue;
  const absolute=path.join(dir,ent.name);
  if(ent.isSymbolicLink())throw new Error('Prohibido symlink '+absolute);
  if(ent.isDirectory()){visit(absolute);continue}
  if(!ent.isFile())continue;
  const rel=path.relative(root,absolute).split(path.sep).join('/');
  if(rel===lock)continue;
  files.push({path:rel,sha256:crypto.createHash('sha256').update(fs.readFileSync(absolute)).digest('hex')});
 }
}
visit(root);
const manifest=fs.readFileSync(path.join(root,'manifest.yaml'),'utf8');
if(!/^name: prompt-maestro-v8-orchestrator$/m.test(manifest)||!/^version: 8\.0\.0$/m.test(manifest))throw new Error('V8 NAME/VERSION mismatch');
const json={product:'PROMPT MAESTRO V8',skill:'prompt-maestro-v8-orchestrator',version:'8.0.0',algorithm:'sha256',files};
if(arg.includes('--seal')){
 fs.writeFileSync(path.join(root,lock),JSON.stringify(json,null,2)+'\n','utf8');
 console.log(JSON.stringify({status:'SEALED',version:json.version,files:files.length},null,2));
} else {
 let actual;try{actual=JSON.parse(fs.readFileSync(path.join(root,lock),'utf8'))}catch{console.error('FAIL: falta lock de integridad');process.exit(1)}
 const a=JSON.stringify(actual),b=JSON.stringify(json);
 if(a!==b){const old=new Map((actual.files||[]).map(x=>[x.path,x.sha256]));const current=new Map(files.map(x=>[x.path,x.sha256]));const bad=[...new Set([...old.keys(),...current.keys()])].filter(k=>old.get(k)!==current.get(k));console.error(JSON.stringify({status:'FAIL',changed:bad},null,2));process.exit(1)}
 console.log(JSON.stringify({status:'PASS',version:json.version,files:files.length},null,2));
}
