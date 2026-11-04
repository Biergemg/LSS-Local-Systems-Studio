import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const {GITHUB_TOKEN,GITHUB_REPOSITORY,GITHUB_SHA,GITHUB_ACTOR,EVIDENCE_ARTIFACT_ID,GITHUB_RUN_ID}=process.env;
if(!/^\d+$/.test(EVIDENCE_ARTIFACT_ID||'')) throw new Error('A submitted artifact ID is required');
const call=async endpoint=>{
 const response=await fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}/${endpoint}`,{headers:{Authorization:`Bearer ${GITHUB_TOKEN}`,Accept:'application/vnd.github+json'}});
 if(!response.ok) throw new Error('Evidence API '+response.status);
 return response;
};
const repo=await (await call('')).json();
if(repo.owner.login!==GITHUB_ACTOR) throw new Error('Only repository owner may authorize release custody');
const artifact=await (await call(`actions/artifacts/${EVIDENCE_ARTIFACT_ID}`)).json();
if(artifact.expired||artifact.workflow_run?.head_sha!==GITHUB_SHA||artifact.name!==`v8-submitted-evidence-${GITHUB_SHA}`) throw new Error('Submission must belong to this exact commit');
const originalRun=await (await call(`actions/runs/${artifact.workflow_run.id}`)).json();
if(originalRun.conclusion!=='success') throw new Error('Submission run must have completed successfully');
const approvals=await (await call(`actions/runs/${GITHUB_RUN_ID}/approvals`)).json();
if(!approvals.some(review=>review.state==='approved'&&review.user?.login===repo.owner.login&&review.environments?.some(env=>env.name==='v8-release-approval'))) throw new Error('Server-recorded owner environment approval is required');
fs.mkdirSync('.audit-private',{recursive:true});
fs.writeFileSync('.audit-private/submission.zip',Buffer.from(await (await call(`actions/artifacts/${EVIDENCE_ARTIFACT_ID}/zip`)).arrayBuffer()));
if(spawnSync('unzip',['-q','.audit-private/submission.zip','-d','.audit-private'],{stdio:'inherit'}).status!==0) throw new Error('Submission extraction failed');
const document=JSON.parse(fs.readFileSync('.audit-private/V8_DELIVERY_EVIDENCE.json','utf8'));
if(document.sourceCommit!==GITHUB_SHA) throw new Error('Submission SHA mismatch');
const permission='.audit-private/owner-approval.json';
fs.writeFileSync(permission,JSON.stringify({sourceCommit:GITHUB_SHA,approvedBy:GITHUB_ACTOR,runId:GITHUB_RUN_ID,reviewHistory:approvals,scope:'Owner explicitly authorized production release via protected workflow_dispatch; this workflow does not deploy.'},null,2));
document.approval={status:'APPROVED',approvedBy:GITHUB_ACTOR,evidence:permission};
// F9/G9 or any other phase must be closed by real evidence before this operation.
// Owner authorization cannot promote BLOCKED to PASS.
fs.writeFileSync('V8_DELIVERY_EVIDENCE.json',JSON.stringify(document,null,2));
fs.writeFileSync('.audit-private/V8_DELIVERY_EVIDENCE.json',JSON.stringify(document,null,2));
