import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import assert from 'node:assert/strict';
import { reviewInputs, digestFile, validateCoverage } from '../../scripts/evidence-source.mjs';
import { validatePng, validateCommand } from '../../scripts/evidence-artifacts.mjs';
import { authenticateArtifact, ownerApproval } from '../../scripts/evidence-api.mjs';
const root = process.cwd();
const inputs = reviewInputs(root);
const coverage = Object.fromEntries(inputs.map(file => [file, digestFile(path.join(root, file))]));
validateCoverage(root, coverage);
assert(inputs.length > 0, 'No tracked review inputs');
const stale = {
    ...coverage, [inputs[0]]: '0'.repeat(64)
};
assert.throws(() => validateCoverage(root, stale), /STALE_OR_OMITTED/);
const source = spawnSync('git', ['rev-parse', 'HEAD'], {
    encoding: 'utf8'
});
assert.equal(source.status, 0, 'Git source commit unavailable');
const sha = source.stdout.trim(), executedAt = new Date().toISOString();
fs.mkdirSync('.audit-private/independent', {
    recursive: true
});
const results = [];
for (const critical of ['success', 'failure', 'cancelled', 'skipped'])
    for (const custody of ['success', 'failure', 'cancelled', 'skipped']) {
        const responses = {
            'actions/artifacts/8': {
                name: 'fixture-evidence', expired: false, workflow_run: {
                    head_sha: sha, id: 42
                }
            }, 'actions/runs/42': {
                workflow_id: 3, head_sha: sha, event: 'push', status: 'in_progress', conclusion: null
            }, 'actions/workflows/v8.yml': {
                id: 3
            }, 'actions/runs/42/jobs?filter=latest&per_page=100&page=1': {
                jobs: [{
                        name: 'V8 critical QA', status: 'completed', conclusion: critical
                    }, {
                        name: 'V8 owner authorization and custody', status: 'completed', conclusion: custody
                    }]
            }
        };
        const api = async (endpoint) => ({
            json: async () => responses[endpoint]
        });
        let accepted = false;
        try {
            await authenticateArtifact(api, {
                id: 8, name: 'fixture-evidence', sha, runId: 42, requiredJobs: ['V8 critical QA', 'V8 owner authorization and custody']
            });
            accepted = true;
        }
        catch (e) {
            assert.match(e.message, /PREREQUISITE/);
        }
        assert.equal(accepted, critical === 'success' && custody === 'success');
        results.push({
            critical, custody, accepted
        });
    }
assert.throws(() => ownerApproval([], 'owner'), /approval/);
assert.throws(() => ownerApproval([{
        state: 'approved', user: {
            login: 'other'
        }, environments: [{
                name: 'v8-release-approval'
            }]
    }], 'owner'), /approval/);
assert.equal(ownerApproval([{
        state: 'approved', user: {
            login: 'owner'
        }, environments: [{
                name: 'v8-release-approval'
            }]
    }], 'owner').length, 1);
const svg = inputs.filter(f => f.endsWith('.svg'));
for (const f of svg) {
    const text = fs.readFileSync(f, 'utf8');
    assert.match(text, /<svg/);
    assert(!/<script|onload=|onclick=/i.test(text), f);
}
const png = fs.readFileSync('.audit-private/independent/320-hero.png');
assert(validatePng(png, 320) > 100);
const corrupted = Buffer.from(png);
corrupted[40] ^= 1;
assert.throws(() => validatePng(corrupted, 320), /CRC|CHUNK|TRUNCATED/);
assert.throws(() => validatePng(png.subarray(0, 33), 320), /RASTER|TRUNCATED|CRC/);
const stamp = new Date().toISOString(), fixtureLog = '.audit-private/independent/synthetic-log-fixture.txt';
fs.writeFileSync(fixtureLog, JSON.stringify({
    sourceCommit: sha, executedAt: stamp, executable: 'node', args: ['fixture-only']
}) + '\nSTDOUT\nThis is an explicitly synthetic parser adversarial fixture, never execution evidence.\nSTDERR\n\nEXIT 1\n');
assert.throws(() => validateCommand(root, {
    log: fixtureLog, status: 'PASS', exitCode: 0, sourceCommit: sha, executedAt: stamp, command: 'node fixture-only'
}), /CONTRADICTS/);
console.log('PNG valid raster accepted; corrupted/truncated rejected; contradictory synthetic command rejected.');
fs.writeFileSync('.audit-private/independent/coverage.json', JSON.stringify({
    sourceCommit: sha, executedAt, executionKind: 'Automated replay of independently authored source/API harness', runner: process.env.GITHUB_ACTIONS === 'true' ? 'GitHub Actions' : 'local', reviewedFiles: coverage, inspection: {
        automatedCoverage: 'Runner read bytes and checked digests; this replay does not claim a new manual review. The original reviewer report remains separate.', integrityOnly: inputs.filter(f => /\.(png|ico)$/.test(f) || f === 'package-lock.json'), warning: 'Hash coverage does not assert detailed human inspection of binaries or every lock entry.'
    }
}, null, 2));
console.log(JSON.stringify({
    scope: 'independent source and isolated API fixture checks; no external GitHub operation', sourceCommit: sha, inputCount: inputs.length, coverageStaleRejected: true, approvalAbsentRejected: true, jobCombinations: results, svgInputs: svg.length
}, null, 2));
