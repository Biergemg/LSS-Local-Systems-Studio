import fs from 'node:fs';
import {authenticateArtifact,ownerApproval} from './evidence-api.mjs';
import {extractEvidence} from './extract-evidence.mjs';
const {GITHUB_TOKEN,GITHUB_REPOSITORY,RELEASE_SHA,V8_EVIDENCE_ARTIFACT_ID,GITHUB_RUN_ID}=process.env;
if(!GITHUB_TOKEN || !GITHUB_REPOSITORY || !/^[a-f0-9]{40}$/.test(RELEASE_SHA||'') || !/^\d+$/.test(V8_EVIDENCE_ARTIFACT_ID||'')) {
  console.error('BLOCKED: a certified evidence artifact ID for this exact commit is required. No laptop paths or synthetic replacement.');
  process.exit(1);
}
const api=async endpoint=>{
  const r=await fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}/${endpoint}`,{headers:{Authorization:`Bearer ${GITHUB_TOKEN}`,Accept:'application/vnd.github+json'}});
  if(!r.ok) throw new Error(`GitHub evidence API returned ${r.status}`);
  return r;
};
try {
  const artifact=await authenticateArtifact(api,{id:V8_EVIDENCE_ARTIFACT_ID,name:`v8-certified-evidence-${RELEASE_SHA}`,sha:RELEASE_SHA,runId:GITHUB_RUN_ID,requiredJobs:['V8 critical QA','V8 owner authorization and custody']});
  const repo=await (await api('')).json();
  ownerApproval(await (await api(`actions/runs/${GITHUB_RUN_ID}/approvals`)).json(),repo.owner.login);
  const archive=await api(`actions/artifacts/${V8_EVIDENCE_ARTIFACT_ID}/zip`);
  fs.mkdirSync('.audit-private',{recursive:true});
  fs.writeFileSync('.audit-private/evidence.zip',Buffer.from(await archive.arrayBuffer()));
  // Ubuntu CI extracts only the authorized artifact, into the ignored evidence directory.
  extractEvidence('.audit-private/evidence.zip','.audit-private');
  const document=JSON.parse(fs.readFileSync('.audit-private/V8_DELIVERY_EVIDENCE.json','utf8'));
  if(document.sourceCommit!==RELEASE_SHA) throw new Error('Evidence document commit differs from authenticated artifact');
  fs.copyFileSync('.audit-private/V8_DELIVERY_EVIDENCE.json','V8_DELIVERY_EVIDENCE.json');
  console.log(`Authenticated artifact ${artifact.id} from run ${GITHUB_RUN_ID} for ${RELEASE_SHA}`);
}catch(error){console.error(error.message);process.exitCode=1;}
