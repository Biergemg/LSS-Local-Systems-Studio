#!/usr/bin/env node
// 21st.dev read-only MCP transport, no credential leakage; search metadata is free.
// Usage: node scripts/21st-direct.mjs --check | --search "query" [--limit 3]
// Never execute get_component, generation, uploads, edits, or paid tools.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const argv=process.argv.slice(2);
const isCheck=argv.includes('--check'), si=argv.indexOf('--search');
const query=si>=0?argv[si+1]:null;
if(!isCheck&&(!query||query.trim().length<4)){console.error('Uso: --check o --search "consulta"');process.exit(2)}
const p=path.join(os.homedir(),'.lss-secrets','21st.key');
if(!fs.existsSync(p)){console.log(JSON.stringify({status:'AUTH_REQUIRED',reason:'Credencial privada 21st no configurada en este equipo'}));process.exit(1)}
let key=fs.readFileSync(p,'utf8').trim().replace(/^API_KEY_21ST\s*=\s*/,'').replace(/^["']|["']$/g,'').trim();
if(key.length<15){console.log(JSON.stringify({status:'INVALID_LOCAL_CREDENTIAL'}));process.exit(1)}
const endpoint='https://21st.dev/api/mcp';
let session=null;
async function rpc(id,method,params){
 const headers={'content-type':'application/json','accept':'application/json, text/event-stream','x-api-key':key,'mcp-protocol-version':'2025-06-18'};
 if(session)headers['mcp-session-id']=session;
 const res=await fetch(endpoint,{method:'POST',headers,body:JSON.stringify({jsonrpc:'2.0',id,method,params}),signal:AbortSignal.timeout(16000)});
 session=res.headers.get('mcp-session-id')||session;
 const raw=await res.text();
 let data=null;
 try{data=JSON.parse(raw)}catch{
  const events=[...raw.matchAll(/^data: (.+)$/gm)].map(x=>x[1]);
  for(const x of events.reverse()){try{data=JSON.parse(x);break}catch{}}
 }
 if(!res.ok||data?.error)throw new Error('MCP HTTP '+res.status+' / protocol '+String(data?.error?.code||'error'));
 return data?.result||{};
}
try{
 await rpc(1,'initialize',{protocolVersion:'2025-06-18',capabilities:{},clientInfo:{name:'V8-canonical-readonly',version:'8.0.0'}});
 const available=await rpc(2,'tools/list',{});
 const names=(available.tools||[]).map(x=>x.name);
 if(!names.includes('search'))throw new Error('La cuenta no expone herramienta search');
 if(isCheck)console.log(JSON.stringify({status:'CONNECTED_DIRECT',tools:names.length,searchAvailable:true,codeRetrievalsConsumed:0,secretPrinted:false}));
 else{
  const at=argv.indexOf('--limit');const n=at>=0?Number(argv[at+1]):3;
  const limit=Number.isFinite(n)?Math.min(5,Math.max(1,Math.round(n))):3;
  const results=await rpc(3,'tools/call',{name:'search',arguments:{query,type:'component',limit}});
  const items=(results.content||[]).filter(x=>x.type==='text').map(x=>x.text).slice(0,3);
  if(results.isError)throw new Error('21st search devolvió error');
  const text=items.join('\n').replaceAll(key,'[REDACTED]').slice(0,8000);
  console.log(JSON.stringify({status:'SEARCH_SUCCESS',query,limit,content:text,codeRetrievalsConsumed:0,secretPrinted:false}));
 }
}catch(e){
 console.log(JSON.stringify({status:'BLOCKED',reason:String(e.message||e).replaceAll(key,'[REDACTED]').slice(0,180)}));process.exitCode=1;
}finally{key=''}
