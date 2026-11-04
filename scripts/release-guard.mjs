import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {validateCoverage,evidencePath,digestFile} from './evidence-source.mjs';

export const V8_LOCK_SHA256 = '537ef9de19bd30c39a8f1a10df8dd2f56558f742800abb78be053f37c5845085';
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const git = (root,args) => {
  const r=spawnSync('git',args,{cwd:root,encoding:'utf8'});
  if(r.status!==0) throw new Error('Git could not verify release state');
  return r.stdout;
};
export function snapshot(root) {
  return git(root,['ls-files','-z']).split('\0').filter(Boolean).map(file=>({file,sha256:hash(fs.readFileSync(path.join(root,file)))}));
}
export function assertSource(root,doc) {
  const head=git(root,['rev-parse','HEAD']).trim();
  if(git(root,['status','--porcelain','--untracked-files=all']).trim()) throw new Error('RELEASE_DIRTY: commit all candidate changes before evidence capture');
  if(head!==doc.sourceCommit) throw new Error('RELEASE_COMMIT_MISMATCH');
  if(hash(fs.readFileSync(path.join(root,'vendor/v8/.v8-integrity.json')))!==V8_LOCK_SHA256) throw new Error('V8_CANONICAL_LOCK_MISMATCH');
  const actual=snapshot(root);
  if(JSON.stringify(actual)!==JSON.stringify(doc.sourceSnapshot)) throw new Error('RELEASE_SNAPSHOT_MISMATCH: full tracked tree changed since evidence capture');
  for(const r of doc.skills||[]) if(r.sourceCommit!==head) throw new Error('SKILL_COMMIT_MISMATCH');
  for(const r of doc.commands||[]) if(r.sourceCommit!==head) throw new Error('COMMAND_COMMIT_MISMATCH');
  // A local JSON cannot establish human approval or an independent execution.
  // CI additionally authenticates the artifact's run/commit in fetch-evidence.mjs.
  const independent=doc.independentReview;
  if(!independent?.evidence || independent.sourceCommit!==head || independent.status!=='PASS') throw new Error('INDEPENDENT_REVIEW_REQUIRED');
  const reportFile=evidencePath(root,independent.evidence);
  if(digestFile(reportFile)!==independent.sha256) throw new Error('INDEPENDENT_REPORT_HASH_MISMATCH');
  const report=JSON.parse(fs.readFileSync(reportFile,'utf8'));
  if(report.status!=='PASS'||report.sourceCommit!==head||!report.reviewer||report.reviewer===report.implementer||!report.implementer||!Number.isFinite(Date.parse(report.executedAt))||!Array.isArray(report.limitations)||!report.limitations.length) throw new Error('INDEPENDENT_REPORT_INCOMPLETE');
  validateCoverage(root,report.reviewedFiles);
  if(!Array.isArray(report.findings)||report.findings.some(f=>['P0','P1'].includes(f.priority)&&f.status!=='FIXED_RETESTED')) throw new Error('INDEPENDENT_OPEN_BLOCKERS');
  if(!Array.isArray(report.operations)||!report.operations.length) throw new Error('INDEPENDENT_OPERATIONS_REQUIRED');
  for(const operation of report.operations) {
    if(!operation.command||operation.exitCode!==0||!Number.isFinite(Date.parse(operation.executedAt))||digestFile(evidencePath(root,operation.log))!==operation.sha256) throw new Error('INDEPENDENT_OPERATION_UNVERIFIED');
  }
  return head;
}

if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    const root=process.cwd();
    const evidence=path.resolve(process.argv[2]||'V8_DELIVERY_EVIDENCE.json');
    const doc=JSON.parse(fs.readFileSync(evidence,'utf8'));
    assertSource(root,doc);
    const check=spawnSync(process.execPath,['vendor/v8/scripts/verify-integrity.mjs','--verify'],{cwd:root,stdio:'inherit'});
    if(check.status!==0) process.exit(check.status||1);
    const delivery=spawnSync(process.execPath,['vendor/v8/scripts/verify-delivery.mjs','--project',root,'--evidence',evidence,'--mode','production'],{cwd:root,stdio:'inherit'});
    process.exit(delivery.status??1);
  } catch(error) {console.error(error.message);process.exitCode=1;}
}
