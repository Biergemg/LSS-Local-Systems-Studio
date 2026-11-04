import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
const {GITHUB_TOKEN,GITHUB_REPOSITORY,RELEASE_SHA,V8_EVIDENCE_ARTIFACT_ID}=process.env;
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
  const artifact=await (await api(`actions/artifacts/${V8_EVIDENCE_ARTIFACT_ID}`)).json();
  if(artifact.expired || artifact.name!==`v8-certified-evidence-${RELEASE_SHA}` || artifact.workflow_run?.head_sha!==RELEASE_SHA) throw new Error('Evidence artifact expired, untrusted name, or wrong source SHA');
  const run=await (await api(`actions/runs/${artifact.workflow_run.id}`)).json();
  const expected=await (await api('actions/workflows/v8-evidence-custody.yml')).json();
  if(run.conclusion!=='success'||run.workflow_id!==expected.id||run.head_sha!==RELEASE_SHA||run.event!=='workflow_dispatch') throw new Error('Evidence requires a successful owner-reviewed custody workflow for the same SHA');
  const archive=await api(`actions/artifacts/${V8_EVIDENCE_ARTIFACT_ID}/zip`);
  fs.mkdirSync('.audit-private',{recursive:true});
  fs.writeFileSync('.audit-private/evidence.zip',Buffer.from(await archive.arrayBuffer()));
  // Ubuntu CI extracts only the authorized artifact, into the ignored evidence directory.
  const result=spawnSync('unzip',['-q','.audit-private/evidence.zip','-d','.audit-private'],{stdio:'inherit'});
  if(result.status!==0) throw new Error('Cannot extract evidence artifact');
  const document=JSON.parse(fs.readFileSync('.audit-private/V8_DELIVERY_EVIDENCE.json','utf8'));
  if(document.sourceCommit!==RELEASE_SHA) throw new Error('Evidence document commit differs from authenticated artifact');
  fs.copyFileSync('.audit-private/V8_DELIVERY_EVIDENCE.json','V8_DELIVERY_EVIDENCE.json');
  console.log(`Authenticated artifact ${artifact.id} from run ${run.id} for ${RELEASE_SHA}`);
}catch(error){console.error(error.message);process.exitCode=1;}
