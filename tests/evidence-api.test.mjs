import {test} from 'node:test';
import assert from 'node:assert/strict';
import {authenticateArtifact,ownerApproval} from '../scripts/evidence-api.mjs';
const sha='a'.repeat(40);
function fixture(overrides={}) {
 const responses={
  'actions/artifacts/10':{id:10,name:`v8-submitted-evidence-${sha}`,expired:false,workflow_run:{id:20,head_sha:sha}},
  'actions/runs/20':{workflow_id:30,head_sha:sha,event:'push',status:'in_progress',conclusion:null},
  'actions/workflows/v8.yml':{id:30},
  'actions/runs/20/jobs?filter=latest&per_page=100&page=1':{jobs:[{name:'V8 critical QA',status:'completed',conclusion:'success'}]},
  ...overrides
 };
 return async endpoint=>{assert.ok(endpoint in responses,endpoint);return {json:async()=>responses[endpoint]};};
}
const request={id:10,name:`v8-submitted-evidence-${sha}`,sha,runId:20,requiredJobs:['V8 critical QA']};
test('running same workflow accepts successful critical job without circular certification dependency',async()=>{
 assert.equal((await authenticateArtifact(fixture(),request)).id,10);
});
test('a successful run cannot replace a failed critical job',async()=>{
 await assert.rejects(authenticateArtifact(fixture({'actions/runs/20/jobs?filter=latest&per_page=100&page=1':{jobs:[{name:'V8 critical QA',status:'completed',conclusion:'failure'}]}}),request),/PREREQUISITE/);
});
test('a matching SHA cannot authorize an artifact from another run',async()=>{
 await assert.rejects(authenticateArtifact(fixture(),{...request,runId:21}),/ARTIFACT/);
});
test('approval by author or by another environment is insufficient',()=>{
 assert.throws(()=>ownerApproval([{state:'approved',user:{login:'author'},environments:[{name:'v8-release-approval'}]}],'owner'));
 assert.throws(()=>ownerApproval([{state:'approved',user:{login:'owner'},environments:[{name:'preview'}]}],'owner'));
 assert.equal(ownerApproval([{state:'approved',user:{login:'owner'},environments:[{name:'v8-release-approval'}]}],'owner').length,1);
});
