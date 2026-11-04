import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {validateCoverage,digestFile} from './evidence-source.mjs';
import {validateCommand} from './evidence-artifacts.mjs';
if(process.env.GITHUB_ACTIONS!=='true') throw new Error('CI_REPLAY_ONLY: use the independent reviewer report directly for local evidence');
const root=process.cwd(),sourceCommit=spawnSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).stdout.trim();
const target='.audit-private/independent-review.json';
if(!process.env.V8_INDEPENDENT_REVIEW_JSON) {
 fs.writeFileSync(target,JSON.stringify({status:'BLOCKED',sourceCommit,reason:'No independent source-review attestation for this exact SHA was supplied. CI replay alone does not establish independence.'},null,2));
 console.log('Independent tests replayed; source-review attestation still BLOCKED.');
} else {
 const original=JSON.parse(process.env.V8_INDEPENDENT_REVIEW_JSON);
 if(original.sourceCommit!==sourceCommit||original.status!=='PASS'||!original.reviewer||original.reviewer===original.implementer) throw new Error('Independent source review missing, blocked or stale');
 validateCoverage(root,original.reviewedFiles);
 const manualFile='.audit-private/independent-original-review.json';
 fs.writeFileSync(manualFile,JSON.stringify(original,null,2));
 const operations=[];
 for(const kind of ['independent-browser','independent-source']) {
  const command=JSON.parse(fs.readFileSync(`.audit-private/commands/${kind}.json`,'utf8'));
  if(command.sourceCommit!==sourceCommit) throw new Error('Independent replay source mismatch');
  validateCommand(root,command);
  operations.push({command:command.command,executedAt:command.executedAt,exitCode:command.exitCode,log:command.log,sha256:digestFile(command.log),runner:'GitHub Actions: replay of independently authored committed harness'});
 }
 // Preserve the reviewer's date, claims, findings and original operation hashes.
 // New CI operations are explicitly attributed to the runner, not to the agent.
 const report={...original,scope:original.scope+' Independent harness replayed on GitHub Actions; no global V8 or release approval inferred.',originalOperations:original.operations,originalReview:{file:manualFile,sha256:digestFile(manualFile)},replayedAt:new Date().toISOString(),replayRunner:'GitHub Actions',operations};
 fs.writeFileSync(target,JSON.stringify(report,null,2));
 console.log('Independent source review preserved and actual CI replay operations attached.');
}
