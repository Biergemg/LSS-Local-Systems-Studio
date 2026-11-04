import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { validateCoverage, digestFile, reviewInputs } from './evidence-source.mjs';

export const LEGACY_AUDIT_COMMIT = 'ff3c00e84a728f5a69acc905ccef62db620534c2';

// Only tooling inputs actually changed since the archived ff3c00e source
// review may differ. Changes to product, CSS, SEO, security policy or other
// previously-reviewed inputs require a fresh full review, not a re-stamp.
const permittedHistoricalDrift = new Set([
  'package.json',
  'package-lock.json',
  'scripts/assemble-evidence.mjs',
  'scripts/release-guard.mjs',
  'tests/release-guard.test.mjs',
]);

const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const git = (root, args, options = {}) => spawnSync('git', args, {
  cwd: root, maxBuffer: 128 * 1024 * 1024, ...options,
});
const isReviewedInput = file =>
  Boolean(file && !file.startsWith('vendor/') && !file.startsWith('docs/') &&
    !file.startsWith('.ai-context/') && !/\.md$/i.test(file));

export function assertHistoricalReview(root, registry, currentSha) {
  const historical = registry?.reviewedSourceCommit;
  if (!/^[0-9a-f]{40}$/.test(historical || '') ||
      !/^[0-9a-f]{40}$/.test(currentSha || '') ||
      git(root, ['merge-base', '--is-ancestor', historical, currentSha]).status !== 0)
    throw new Error('HISTORICAL_REVIEW_COMMIT_INVALID');

  const oldRegistryResult = git(root, ['show', historical + ':docs/audit/reviews.json']);
  if (oldRegistryResult.status !== 0) throw new Error('HISTORICAL_REGISTRY_NOT_AT_SOURCE');
  let oldRegistry;
  try { oldRegistry = JSON.parse(oldRegistryResult.stdout.toString('utf8')); }
  catch { throw new Error('HISTORICAL_REGISTRY_INVALID'); }
  // The entire original evidence block and digest registry are immutable.
  // Adding explanatory metadata cannot rewrite historical PASS entries.
  if (JSON.stringify(registry.evidence) !== JSON.stringify(oldRegistry.evidence) ||
      JSON.stringify(registry.reviewedFiles) !== JSON.stringify(oldRegistry.reviewedFiles) ||
      registry.reviewedAt !== oldRegistry.reviewedAt)
    throw new Error('HISTORICAL_EVIDENCE_MODIFIED');
  const originalEvidenceDigest=sha256(Buffer.from(JSON.stringify(oldRegistry.evidence)));
  const oldTree = git(root, ['ls-tree', '-r', '-z', '--name-only', historical]);
  if (oldTree.status !== 0) throw new Error('HISTORICAL_REVIEW_TREE_UNAVAILABLE');
  const originalInputs = oldTree.stdout.toString('utf8').split('\0').filter(isReviewedInput).sort();
  const recorded = Object.keys(registry.reviewedFiles || {}).sort();
  if (!originalInputs.length || JSON.stringify(originalInputs) !== JSON.stringify(recorded))
    throw new Error('HISTORICAL_REVIEW_COVERAGE_INCOMPLETE');
  // A newly introduced product input must not inherit the old source review.
  // The only new reviewed input in this correction is this provenance guard.
  const permittedNewInputs = new Set(['scripts/review-provenance.mjs']);
  const added = reviewInputs(root).filter(file => !recorded.includes(file));
  if (added.some(file => !permittedNewInputs.has(file)))
    throw new Error('HISTORICAL_REVIEW_SCOPE_ADDITION: ' + added.find(file => !permittedNewInputs.has(file)));

  const changed = [];
  for (const file of originalInputs) {
    const blob = git(root, ['show', `${historical}:${file}`]);
    if (blob.status !== 0 || sha256(blob.stdout) !== registry.reviewedFiles[file])
      throw new Error('HISTORICAL_REVIEW_PROVENANCE_MISMATCH: ' + file);
    const now = digestFile(path.join(root, file));
    if (now !== registry.reviewedFiles[file]) {
      if (!permittedHistoricalDrift.has(file))
        throw new Error('HISTORICAL_REVIEW_SCOPE_DRIFT: ' + file);
      changed.push(file);
    }
  }
  return {historicalCommit: historical, originalInputs: originalInputs.length, permittedChanges: changed, originalEvidenceDigest};
}

export function assertCurrentIndependentReview(root, report, currentSha) {
  if (!report || report.status !== 'PASS' || report.sourceCommit !== currentSha ||
      !report.reviewer || !report.implementer ||
      String(report.reviewer).trim().toLowerCase() === String(report.implementer).trim().toLowerCase())
    throw new Error('CURRENT_INDEPENDENT_REVIEW_INVALID');
  validateCoverage(root, report.reviewedFiles);
  return true;
}

export function assertAuditProvenance(doc) {
  const legacy = doc?.evidenceScope?.legacyReview;
  const current = doc?.evidenceScope?.currentIndependentReview;
  if (!legacy || legacy.sourceCommit !== LEGACY_AUDIT_COMMIT ||
      legacy.status !== 'HISTORICAL_CONTENT_INTEGRITY_ONLY' ||
      legacy.reviewedAtAuthenticated !== false ||
      legacy.humanReviewerAuthenticated !== false ||
      !/^[a-f0-9]{64}$/.test(legacy.evidenceSha256 || ''))
    throw new Error('LEGACY_EVIDENCE_PROVENANCE_MISSING');
  if (!current || current.sourceCommit !== doc.sourceCommit ||
      current.status !== 'PASS' || current.ownerApproval !== 'NOT_ASSERTED')
    throw new Error('CURRENT_REVIEW_PROVENANCE_MISSING');
  return true;
}

export function loadCurrentIndependentReview(root, currentSha) {
  const file=path.join(root,'.audit-private','independent-review.json');
  if(!fs.existsSync(file)) throw new Error('CURRENT_INDEPENDENT_REVIEW_MISSING');
  let report;
  try {report=JSON.parse(fs.readFileSync(file,'utf8'));}
  catch {throw new Error('CURRENT_INDEPENDENT_REVIEW_UNREADABLE');}
  assertCurrentIndependentReview(root,report,currentSha);
  return report;
}
