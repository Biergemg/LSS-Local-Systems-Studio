import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';

export const digest=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
export const digestFile=file=>digest(fs.readFileSync(file));
// All executable/product inputs, test definitions and release policy are in scope.
// Narrative outputs are excluded to avoid a self-referential hash registry.
export function reviewInputs(root) {
 const result=spawnSync('git',['ls-files','-z'],{cwd:root,encoding:'utf8'});
 if(result.status!==0) throw new Error('Cannot enumerate review inputs');
 return result.stdout.split('\0').filter(file=>file&&!file.startsWith('vendor/')&&!file.startsWith('docs/')&&!file.startsWith('.ai-context/')&&!/\.md$/i.test(file)).sort();
}
export function validateCoverage(root,reviewedFiles) {
 const expected=reviewInputs(root);
 if(!expected.length||!reviewedFiles||typeof reviewedFiles!=='object') throw new Error('REVIEW_COVERAGE_MISSING');
 for(const file of expected) {
  if(reviewedFiles[file]!==digestFile(path.join(root,file))) throw new Error('REVIEW_STALE_OR_OMITTED: '+file);
 }
 return expected;
}
export function evidencePath(root,relative) {
 if(typeof relative!=='string'||path.isAbsolute(relative)||relative.includes('\0')) throw new Error('EVIDENCE_PATH_INVALID');
 const resolved=path.resolve(root,relative);
 if(!resolved.startsWith(path.resolve(root)+path.sep)||!fs.statSync(resolved).isFile()) throw new Error('EVIDENCE_FILE_REQUIRED');
 const actual=fs.realpathSync(resolved),actualRoot=fs.realpathSync(root);
 if(!actual.startsWith(actualRoot+path.sep)) throw new Error('EVIDENCE_REALPATH_OUTSIDE_ROOT');
 return resolved;
}
