import fs from 'node:fs';
import {authenticateArtifact,ownerApproval} from './evidence-api.mjs';
import {extractEvidence} from './extract-evidence.mjs';
const {GITHUB_TOKEN,GITHUB_REPOSITORY,RELEASE_SHA,EVIDENCE_ARTIFACT_ID,GITHUB_RUN_ID}=process.env;
if(!/^\d+$/.test(EVIDENCE_ARTIFACT_ID||'')) throw new Error('A submitted artifact ID is required');
const call=async endpoint=>{
 const response=await fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}/${endpoint}`,{headers:{Authorization:`Bearer ${GITHUB_TOKEN}`,Accept:'application/vnd.github+json'}});
 if(!response.ok) throw new Error('Evidence API '+response.status);
 return response;
};
const repo=await (await call('')).json();
await authenticateArtifact(call,{id:EVIDENCE_ARTIFACT_ID,name:`v8-submitted-evidence-${RELEASE_SHA}`,sha:RELEASE_SHA,runId:GITHUB_RUN_ID,requiredJobs:['V8 critical QA']});
const approvals=await (await call(`actions/runs/${GITHUB_RUN_ID}/approvals`)).json();
ownerApproval(approvals,repo.owner.login);
fs.mkdirSync('.audit-private',{recursive:true});
fs.writeFileSync('.audit-private/submission.zip',Buffer.from(await (await call(`actions/artifacts/${EVIDENCE_ARTIFACT_ID}/zip`)).arrayBuffer()));
extractEvidence('.audit-private/submission.zip','.audit-private');
const document=JSON.parse(fs.readFileSync('.audit-private/V8_DELIVERY_EVIDENCE.json','utf8'));
if(document.sourceCommit!==RELEASE_SHA) throw new Error('Submission SHA mismatch');
const permission='.audit-private/owner-approval.json';
fs.writeFileSync(permission,JSON.stringify({sourceCommit:RELEASE_SHA,approvedBy:repo.owner.login,runId:GITHUB_RUN_ID,reviewHistory:approvals,scope:'Owner explicitly authorized this candidate through protected v8-release-approval environment; this workflow does not deploy.'},null,2));
document.approval={status:'APPROVED',approvedBy:repo.owner.login,evidence:permission};
// F9/G9 or any other phase must be closed by real evidence before this operation.
// Owner authorization cannot promote BLOCKED to PASS.
fs.writeFileSync('V8_DELIVERY_EVIDENCE.json',JSON.stringify(document,null,2));
fs.writeFileSync('.audit-private/V8_DELIVERY_EVIDENCE.json',JSON.stringify(document,null,2));
