import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
export function extractEvidence(archive,destination) {
 const listing=spawnSync('unzip',['-Z1',archive],{encoding:'utf8'});
 if(listing.status!==0) throw new Error('Evidence archive cannot be listed');
 for(const entry of listing.stdout.split('\n').filter(Boolean)) {
  if(entry.includes('\\')||entry.startsWith('/')||/^[a-z]:/i.test(entry)||entry.split('/').includes('..')) throw new Error('Evidence archive path rejected');
 }
 const metadata=spawnSync('unzip',['-Z','-l',archive],{encoding:'utf8'});
 if(metadata.status!==0||/^l[rwxstST-]{9}\s/m.test(metadata.stdout)) throw new Error('Evidence archive symlink rejected');
 fs.mkdirSync(destination,{recursive:true});
 if(spawnSync('unzip',['-q',archive,'-d',destination],{stdio:'inherit'}).status!==0) throw new Error('Evidence extraction failed');
 const walk=dir=>{for(const item of fs.readdirSync(dir)){const file=path.join(dir,item);const stat=fs.lstatSync(file);if(stat.isSymbolicLink()) throw new Error('Evidence symlink rejected');if(stat.isDirectory())walk(file);}};
 walk(destination);
}
