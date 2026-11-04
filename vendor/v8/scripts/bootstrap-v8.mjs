#!/usr/bin/env node
/**
 * PROMPT MAESTRO V8 — bootstrap portable, sin dependencias npm.
 * --check: diagnóstico sin cambios. --install: busca/instala skills gratuitas
 * desde repositorios permitidos. Nunca descarga o ejecuta componentes comerciales.
 * NOTA: autenticación 21st y reinicio del agente pueden requerir intervención humana.
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const install = argv.includes('--install');
const check = argv.includes('--check') || !install;
const help = argv.includes('--help') || argv.includes('-h');
const idx = argv.indexOf('--target');
const requested = idx >= 0 ? argv[idx + 1] : 'auto';
const allowedTargets = new Set(['auto', 'claude', 'codex', 'both']);
if (!allowedTargets.has(requested)) {
  console.error('Uso: node scripts/bootstrap-v8.mjs --check|--install --target auto|claude|codex|both');
  process.exit(2);
}
if (help) {
  console.log('V8 portable bootstrap: --check (sin cambios), --install (instala skills faltantes e intenta configurar 21st), --target auto|claude|codex|both.');
  process.exit(0);
}
const home = os.homedir();
const cli = (name, args, opts = {}) => {
  const shim = process.platform === 'win32' && ['npm','npx','python3','python','codex'].includes(name);
    const result = spawnSync(shim ? 'cmd.exe' : name,
      shim ? ['/d', '/s', '/c', name, ...args] : args, {
    encoding: 'utf8', timeout: opts.timeout ?? 15000,
    cwd: opts.cwd ?? root, shell: false, windowsHide: true,
    env: { ...process.env, ...(opts.env ?? {}) },
    maxBuffer: 4 * 1024 * 1024
  });
  return { ok: result.status === 0 && !result.error, exit: result.status,
    stdout: (result.stdout || '').slice(0, 2500),
    stderr: (result.stderr || '').slice(0, 1500),
    error: result.error?.code || null };
};
const exists = p => fs.existsSync(p);
const tool = name => cli(name, ['--version'], {timeout: 9000}).ok;
const toolState = { node: process.version, git: tool('git'), npm: tool('npm'),
  npx: tool('npx'), python: tool('python3') || tool('python'),
  claude: tool('claude'), codex: tool('codex') };
let targets;
if (requested === 'both') targets = ['claude', 'codex'];
else if (requested !== 'auto') targets = [requested];
else {
  targets = [];
  if (toolState.claude || exists(path.join(home, '.claude'))) targets.push('claude');
  if (toolState.codex || exists(path.join(home, '.codex'))) targets.push('codex');
  if (!targets.length) targets.push('claude');
}
const directory = agent => path.join(home, agent === 'claude' ? '.claude' : '.codex', 'skills');
const canonicalMarketing = new Set(['copywriting','page-cro','ui-ux-pro-max','seo-audit','ai-seo','schema-markup','impeccable']);
const vendor = path.join(root, 'vendor', 'marketing-skills');
const definitions = [
  { key: 'copywriting', aliases: ['copywriting'], repo: 'marketing' },
  { key: 'page-cro', aliases: ['page-cro', 'cro'], repo: 'marketing' },
  { key: 'ui-ux-pro-max', aliases: ['ui-ux-pro-max'], repo: 'ui' },
  { key: 'seo-audit', aliases: ['seo-audit'], repo: 'marketing' },
  { key: 'ai-seo', aliases: ['ai-seo'], repo: 'marketing' },
  { key: 'schema-markup', aliases: ['schema-markup', 'schema'], repo: 'marketing' },
  { key: 'impeccable', aliases: ['impeccable'], repo: 'impeccable' }
];
const repositories = {
  marketing: 'https://github.com/coreyhaines31/marketingskills.git',
  ui: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git',
  impeccable: 'https://github.com/pbakaus/impeccable.git'
};
const report = { product: 'PROMPT MAESTRO V8', version: 'portable-2026-10-30-aeo',
  mode: install ? 'install' : 'check', platform: process.platform, arch: process.arch,
  targets, prerequisites: toolState, skills: [], integrations: [], sources: [], errors: [] };
const validName = (filename, aliases) => {
  try {
    const text = fs.readFileSync(filename, 'utf8').slice(0, 15000);
    const match = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return false;
    return aliases.some(a => new RegExp('^name:\\s*[\\x22\\x27]?' + a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\x22\\x27]?\\s*$', 'm').test(match[1]));
  } catch { return false; }
};
const installed = (base, spec) => {
  for (const name of spec.aliases) {
    const target = path.join(base, name);
    if (validName(path.join(target, 'SKILL.md'), spec.aliases)) return { name, path: target };
  }
  return null;
};
function probe21st(agent) {
  if (agent === 'claude' && toolState.claude) {
    const plugins = cli('claude', ['plugin','list'], {timeout:22000});
    const mcp = cli('claude', ['mcp','list'], {timeout:28000});
    const combined = (plugins.stdout || '') + '\n' + (mcp.stdout || '');
    const lines = combined.split(/\r?\n/).filter(x => /\b21st\b/i.test(x));
    if (!lines.length) return { status: 'NOT_INSTALLED', detail: '21st no aparece en plugin list ni mcp list' };
    if (lines.some(x => /connected|conectado/i.test(x) && !/not connected|disconnected|needs authentication/i.test(x)))
      return { status: 'CONNECTED', detail: 'MCP reporta Connected' };
    return { status: 'AUTH_OR_RESTART_REQUIRED', detail: 'Plugin/MCP presente sin salud CONNECTED verificada' };
  }
  if (agent === 'codex' && toolState.codex) {
    const plugins = cli('codex', ['plugin','list'], {timeout:14000});
    if ((plugins.stdout || '').includes('21st')) return {status:'INSTALLED_VERIFY_AUTH', detail:'Verificar MCP y autenticación con Codex'};
    return {status:'NOT_VERIFIED', detail:'El cliente no acredita plugin 21st'};
  }
  return {status:'CLIENT_NOT_FOUND', detail:'No hay CLI del agente en PATH'};
}
const ignore = new Set(['.git', 'node_modules', '.next', '__pycache__', '.venv', '.cache', '.turbo', 'test-results']);
function findSkill(repoDir, spec) {
  const starts = [path.join(repoDir, 'skills'), path.join(repoDir, '.claude', 'skills'),
    path.join(repoDir, '.agents', 'skills'), path.join(repoDir, 'dist'),
    path.join(repoDir, 'src'), repoDir];
  const visited = new Set();
  const queue = starts.filter(exists).map(x => ({ dir: x, depth: 0 }));
  while (queue.length) {
    const { dir, depth } = queue.shift();
    const resolved = path.resolve(dir);
    if (visited.has(resolved) || depth > 10) continue;
    visited.add(resolved);
    if (validName(path.join(dir, 'SKILL.md'), spec.aliases)) return dir;
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { continue; }
    for (const e of entries) {
      if (e.isDirectory() && !ignore.has(e.name) && !e.name.startsWith('.git'))
        queue.push({ dir: path.join(dir, e.name), depth: depth + 1 });
    }
    if (visited.size > 6000) break;
  }
  return null;
}
function safeCopy(source, dest) {
  // No symlinks, archives, binary executables or hidden secrets; no replacement.
  if (exists(dest)) throw new Error('Destino ya existe; no se sobrescribe: ' + dest);
  let bytes = 0;
  const walk = (from, to) => {
    fs.mkdirSync(to, { recursive: true });
    for (const ent of fs.readdirSync(from, { withFileTypes: true })) {
      if (ignore.has(ent.name) || ent.name === '.git') continue;
      if (ent.name.startsWith('.env') || ent.name === 'credentials.json') continue;
      const src = path.join(from, ent.name);
      const dst = path.join(to, ent.name);
      const st = fs.lstatSync(src);
      if (st.isSymbolicLink()) continue;
      if (st.isDirectory()) walk(src, dst);
      else if (st.isFile()) {
        if (/\.(exe|dll|dylib|so|msi|bat|cmd|ps1|sh)$/i.test(ent.name)) continue;
        bytes += st.size;
        if (bytes > 45 * 1024 * 1024) throw new Error('Skill supera 45 MiB; requiere revisión');
        fs.copyFileSync(src, dst, fs.constants.COPYFILE_EXCL);
      }
    }
  };
  try { walk(source, dest); }
  catch (error) { fs.rmSync(dest, { recursive: true, force: true }); throw error; }
}
const clones = new Map();
let tmp = null;
function getRepo(key) {
  if (clones.has(key)) return clones.get(key);
  if (!toolState.git) throw new Error('Git no instalado; ver references/portabilidad-instalacion-automatica.md');
  if (!tmp) tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'v8-skill-bootstrap-'));
  const dest = path.join(tmp, key);
  const url = repositories[key];
  const result = cli('git', ['clone', '--depth=1', '--filter=blob:none', '--', url, dest], {timeout: 180000});
  if (!result.ok) throw new Error('No se pudo descargar ' + url + ': ' + (result.stderr || result.error));
  const commit = cli('git', ['rev-parse', 'HEAD'], {cwd: dest});
  if (!commit.ok) throw new Error('No se pudo verificar commit de ' + url);
  const source = { repo: url, commit: commit.stdout.trim() };
  report.sources.push(source);
  clones.set(key, dest);
  return dest;
}
// Pinned first: never silently download a second version of ai-seo, seo-audit or schema.
const pinned = cli(process.execPath, [path.join(root,'scripts','sync-marketing-skills.mjs'), install?'--install':'--check', '--target', targets.length===2?'both':targets[0]], {timeout:65000});
let pinnedData=null;
try {pinnedData=JSON.parse(pinned.stdout)}catch{}
report.pinnedMarketing={status:pinnedData?.status||'BLOCKED',results:pinnedData?.results||[],error:pinned.stderr||pinned.error||null};
try {
  for (const agent of targets) {
    const dest = directory(agent);
    for (const spec of definitions) {
      const old = installed(dest, spec);
      const row = { agent, skill: spec.key, aliases: spec.aliases, before: old ? 'PRESENT' : 'MISSING', after: old ? 'PASS' : 'MISSING' };
      if(canonicalMarketing.has(spec.key)) {
        const expectedName = spec.key==='schema-markup'?'schema':spec.key==='page-cro'?'cro':spec.key;
        const entry=report.pinnedMarketing.results.find(r=>r.agent===agent&&r.name===expectedName);
        row.after=entry?.status==='PASS'?'PASS':'DIVERGENT_OR_MISSING';
        row.method='vendor pinned content SHA256; see scripts/sync-marketing-skills.mjs';
        row.path=path.join(dest,expectedName);
        report.skills.push(row);
        continue;
      }
      if (!old && install) {
        try {
          if (spec.key === 'impeccable') {
            if (!toolState.npx) throw new Error('npx no está disponible');
            const run = cli('npx', ['--yes', 'impeccable', 'install', '--providers=' + agent, '--scope=global'], {timeout: 240000});
            if (!run.ok) throw new Error('Instalador oficial Impeccable: ' + (run.stderr || run.stdout || run.error));
            row.method = 'npx impeccable install --providers=' + agent + ' --scope=global';
          } else {
            const repoDir = getRepo(spec.repo);
            const from = findSkill(repoDir, spec);
            if (!from) throw new Error('Skill no localizada en el upstream actual; revisar cambios de nombre/ruta oficiales');
            const chosen = path.basename(from);
            // Conservar nombre upstream (cro/schema) para versiones actuales.
            const to = path.join(dest, chosen);
            if (!validName(path.join(from, 'SKILL.md'), spec.aliases)) throw new Error('SKILL.md no valida el nombre');
            safeCopy(from, to);
            row.method = 'git clone + copia revisable de skill';
            row.source = repositories[spec.repo];
          }
          const after = installed(dest, spec);
          if (!after) throw new Error('SKILL.md de destino no comprobó la instalación');
          row.after = 'PASS'; row.path = after.path; row.requiresRestart = true;
        } catch (err) { row.after = 'INSTALL_FAILED'; row.error = String(err.message || err); report.errors.push(agent + '/' + spec.key + ': ' + row.error); }
      }
      if (old) { row.path = old.path; row.name = old.name; }
      report.skills.push(row);
    }
    // 21st es instalación separada; nunca se realizan llamadas de pago o autenticación.
    const integration = { agent, service: '21st.dev', official: 'https://21st.dev/mcp', status: 'NOT_VERIFIED' };
    if (install && agent === 'claude' && toolState.claude) {
      const add = cli('claude', ['plugin', 'marketplace', 'add', '21st-dev/claude-code-plugin'], {timeout: 80000});
      const plug = cli('claude', ['plugin', 'install', '21st@21st', '--scope', 'user'], {timeout: 100000});
      integration.marketplace = add.ok ? 'OK' : 'FAILED_OR_PRESENT';
      integration.plugin = plug.ok ? 'INSTALLED' : 'INSTALL_FAILED';
      if (!plug.ok) integration.detail = (plug.stderr || plug.stdout || '').slice(0, 500);
      integration.status = plug.ok ? 'AUTH_OR_RESTART_REQUIRED' : 'INSTALL_FAILED';
    } else if (install && agent === 'codex' && toolState.codex) {
      const add = cli('codex', ['plugin', 'marketplace', 'add', '21st-dev/codex-plugin'], {timeout: 80000});
      const plug = cli('codex', ['plugin','install','21st'], {timeout:85000});
      integration.install = plug.ok ? 'INSTALLED' : 'CLI_UNSUPPORTED_OR_INSTALL_FAILED';
      integration.status = plug.ok ? 'AUTH_OR_RESTART_REQUIRED' : (add.ok ? 'MARKETPLACE_ADDED_VERIFY_PLUGIN' : 'INSTALL_FAILED');
      if (!add.ok) integration.detail = (add.stderr || add.stdout || '').slice(0, 500);
    } else {
      integration.status = 'NOT_VERIFIED';
    }
    const health = probe21st(agent);
    integration.health = health.status;
    if (health.status === 'CONNECTED') integration.status = 'CONNECTED';
    else if (!install || integration.status === 'NOT_VERIFIED') integration.status = health.status;
    integration.verification = health.detail;
    if(agent==='claude'&&integration.status!=='CONNECTED') {
      // La conexión por MCP directo es real y verificable; no afirmar que el plugin está autenticado.
      const direct=cli(process.execPath,[path.join(root,'scripts','21st-direct.mjs'),'--check'],{timeout:24000});
      let body={};try{body=JSON.parse(direct.stdout)}catch{}
      if(direct.ok&&body.status==='CONNECTED_DIRECT'){
        integration.status='CONNECTED';integration.transport='DIRECT_READ_ONLY_MCP';
        integration.verification='Autenticación real mediante scripts/21st-direct.mjs; plugin Claude separado no acreditado';
        integration.tools=body.tools;
      }
    }
    report.integrations.push(integration);
  }
} finally {
  if (tmp) fs.rmSync(tmp, { recursive: true, force: true });
}
report.complete = report.pinnedMarketing.status==='PASS' && report.skills.every(x => x.after === 'PASS') &&
  report.integrations.every(x => x.status === 'CONNECTED');
report.next = report.complete ? 'Verificar pruebas de proyecto y fases G0-G9' :
  'Revisar INSTALL_FAILED, autenticación 21st, permisos, reinicio y pruebas reales. No declarar G0 PASS.';
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.complete?0:1;
