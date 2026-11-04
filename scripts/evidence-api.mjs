// These checks intentionally accept a running workflow: certification has not
// finished yet. Trust only completed prerequisite jobs from this same run.
export async function authenticateArtifact(api,{id,name,sha,runId,requiredJobs}) {
 const artifact=await (await api(`actions/artifacts/${id}`)).json();
 if(artifact.expired||artifact.name!==name||artifact.workflow_run?.head_sha!==sha||String(artifact.workflow_run.id)!==String(runId)) throw new Error('ARTIFACT_RUN_OR_SOURCE_MISMATCH');
 const run=await (await api(`actions/runs/${runId}`)).json();
 const workflow=await (await api('actions/workflows/v8.yml')).json();
 if(run.workflow_id!==workflow.id||run.head_sha!==sha||!['pull_request','push','workflow_dispatch'].includes(run.event)) throw new Error('UNTRUSTED_EVIDENCE_WORKFLOW');
 const jobs=[];
 for(let page=1;;page++) {
  const result=await (await api(`actions/runs/${runId}/jobs?filter=latest&per_page=100&page=${page}`)).json();
  jobs.push(...result.jobs);
  if(result.jobs.length<100) break;
 }
 for(const name of requiredJobs) {
  const matching=jobs.filter(j=>j.name===name);
  if(matching.length!==1||matching[0].status!=='completed'||matching[0].conclusion!=='success') throw new Error('PREREQUISITE_JOB_NOT_SUCCESSFUL: '+name);
 }
 return artifact;
}
export function ownerApproval(approvals,owner) {
 const accepted=approvals.filter(r=>r.state==='approved'&&r.user?.login===owner&&r.environments?.some(e=>e.name==='v8-release-approval'));
 if(!accepted.length) throw new Error('Server-recorded owner environment approval is required');
 return accepted;
}
