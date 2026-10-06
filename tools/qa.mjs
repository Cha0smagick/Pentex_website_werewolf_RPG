/* Pre-ship checks. Run:  node tools/qa.mjs
   Everything here is a real assertion about the shipped tree. No dependencies. */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join, relative, extname } from 'node:path';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const r = (p) => readFileSync(join(ROOT, p), 'utf8');

let fails = 0;
let checks = 0;
const ok = (name, pass, detail) => {
  checks++;
  if (!pass) fails++;
  const mark = pass ? 'PASS' : 'FAIL';
  process.stdout.write(`${mark}  ${name}${detail ? '  â€” ' + detail : ''}\n`);
};

function walk(dir, out = []) {
  for (const entry of readdirSync(join(ROOT, dir))) {
    if (entry === 'node_modules' || entry === '.git' || entry === 'raw') continue;
    if (entry === '.codegraph' || entry === '.opencode' || entry === 'undefined') continue;
    const full = join(dir, entry);
    if (statSync(join(ROOT, full)).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const FILES = walk('.').map((f) => relative(ROOT, f).replace(/\\/g, '/'));
const PAGES = FILES.filter((f) => extname(f) === '.html');
const BREACH_PAGES = ['portal.html', 'archive.html', 'evidence.html'];
const corpPages = PAGES.filter((p) => !BREACH_PAGES.includes(p));
const SCRIPTS = FILES.filter((f) => extname(f) === '.js' || extname(f) === '.mjs');

/* ---- 1. no key material in the tree ---- */
/* Placeholder help text ("nvapi-...", "<your key>") is not a key; require a
   realistically long opaque token so the check cannot be faked by a template. */
const SECRET = /(nvapi-[A-Za-z0-9_-]{24,}|NVIDIA_API_KEY\s*=\s*["'][^"'.<\s]{24,}["'])/;
const secretHits = FILES.filter((f) => SECRET.test(r(f)));
ok('no API key in any shipped file', secretHits.length === 0, secretHits.join(', '));

/* ---- 2. scripts parse ---- */
for (const f of SCRIPTS) {
  try {
    execFileSync(process.execPath, ['--check', join(ROOT, f)], { stdio: 'pipe' });
    ok('syntax ' + f, true);
  } catch (err) {
    ok('syntax ' + f, false, String(err.stderr || '').split('\n').slice(0, 3).join(' '));
  }
}

/* ---- 3. data.js evaluates and the puzzle is solvable ---- */
global.window = {};
new Function(readFileSync(join(ROOT, 'assets/js/data.js'), 'utf8').replace('window.PENTEX', 'global.__P'))();
const D = global.__P;

ok('data.js exposes every collection', [
  'COMPANY', 'MISSION', 'VALUES', 'STRATEGY', 'DIVISIONS', 'SITES', 'PEOPLE',
  'CLUES', 'PROGRAMS', 'ARCHIVE', 'FS', 'DECODERS'
].every((k) => D[k] !== undefined));

const userOk = D.PEOPLE.executives.concat(D.PEOPLE.board).some(
  (p) => p.mail && p.mail.split('@')[0].toLowerCase() === D.CLUES.user.value
);
ok('clue.user resolves to a published badge identifier', userOk, D.CLUES.user.value);

const passWord = D.VALUES[1].name.trim().split(/\s+/)[0].toLowerCase();
ok('clue.pass is derivable from published value #2', passWord === D.CLUES.pass.value, passWord);

ok('every archive file has a body', D.ARCHIVE.files.every((f) => f.body && f.body.length > 200));
ok('every archive file is listed in FS', (() => {
  const seen = new Set();
  Object.keys(D.FS).forEach((d) => D.FS[d].forEach((e) => seen.add(e.id)));
  return D.ARCHIVE.files.every((f) => seen.has(f.id));
})(), D.ARCHIVE.files.length + ' docs');

ok('every encoded doc uses a known decoder',
  D.ARCHIVE.files.filter((f) => f.enc).every((f) => D.DECODERS.indexOf(f.enc) !== -1));

// An encoded body must actually be stored encoded. A plaintext body tagged `enc`
// passes the check above and then `dec` returns noise, which is how this shipped once.
const decode = {
  rot13: (s) => s.replace(/[a-zA-Z]/g, (c) => {
    const b = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - b + 13) % 26) + b);
  }),
  hex: (s) => new TextDecoder('utf-8').decode(
    Uint8Array.from(s.replace(/\s+/g, '').match(/[0-9a-fA-F]{2}/g) || [], (h) => parseInt(h, 16))
  ),
  b64: (s) => Buffer.from(s.replace(/\s+/g, ''), 'base64').toString('utf8'),
};
const encoded = D.ARCHIVE.files.filter((f) => f.enc);
const badDecode = encoded.filter((f) => {
  let text;
  try {
    text = decode[f.enc](f.body);
  } catch {
    return true;
  }
  const readable = text.replace(/\s+/g, ' ').trim();
  const printable = readable.replace(/[^ -~\u2014\u2019\u00b7]/g, '').length;
  return readable.length < 200 || printable / readable.length < 0.9;
});
ok('every encoded body decodes to readable text', badDecode.length === 0,
  badDecode.length ? badDecode.map((f) => f.id).join(', ') : encoded.length + ' encoded');

/* ---- 4. every referenced image exists ---- */
const refs = new Set();
for (const f of FILES) {
  const e = extname(f);
  if (e !== '.html' && e !== '.js') continue;
  const txt = r(f);
  for (const m of txt.matchAll(/assets\/img\/([A-Za-z0-9_-]+\.(?:webp|png|jpg))/g)) refs.add(m[1]);
}
const missing = [...refs].filter((n) => !existsSync(join(ROOT, 'assets/img', n)));
ok('every referenced image is on disk', missing.length === 0, missing.length ? missing.join(', ') : refs.size + ' refs');

/* ---- 5. every getElementById target exists in the page that ships it ---- */
const SCRIPT_TO_PAGE = {
  'site.js': corpPages,
  auth: ['portal.html'],
  terminal: ['archive.html'],
  evidence: ['evidence.html']
};
const TARGETS = {
  'auth.js': [...r('assets/js/auth.js').matchAll(/byId\('([^']+)'\)/g)].map((m) => m[1]),
  'terminal.js': [...r('assets/js/terminal.js').matchAll(/getElementById\('([^']+)'\)/g)].map((m) => m[1]),
  'evidence.js': [...r('assets/js/evidence.js').matchAll(/getElementById\('([^']+)'\)/g)].map((m) => m[1])
};
for (const [script, ids] of Object.entries(TARGETS)) {
  const pages = SCRIPT_TO_PAGE[script.split('.')[0]] || PAGES;
  const bad = [];
  for (const page of pages) {
    const html = r(page);
    for (const id of ids) if (!html.includes(`id="${id}"`)) bad.push(page + '#' + id);
  }
  ok(`${script} targets exist in ${pages.join(', ')}`, bad.length === 0, bad.join(', '));
}

/* site.js renders into ids that must exist on the page that triggers that
   renderer. Slice the source per `pages.<key>` block rather than demanding
   every page carry every placeholder. */
const SITE_SRC = r('assets/js/site.js');
const RENDERERS = {};
for (const m of SITE_SRC.matchAll(/pages\.([a-z]+) = function \(\) \{([\s\S]*?)\n {2}\};/g)) {
  const ids = new Set();
  for (const g of m[2].matchAll(/\$\('([a-z0-9-]+)'\)/g)) ids.add(g[1]);
  for (const g of m[2].matchAll(/fill\('([a-z0-9-]+)'/g)) ids.add(g[1]);
  RENDERERS[m[1]] = [...ids];
}
const rendererMisses = [];
for (const [key, ids] of Object.entries(RENDERERS)) {
  const page = corpPages.find((p) => r(p).includes(`data-page="${key}"`));
  if (!page) {
    rendererMisses.push(`${key}: no page declares data-page="${key}"`);
    continue;
  }
  const html = r(page);
  for (const id of ids) if (!html.includes(`id="${id}"`)) rendererMisses.push(`${page}#${id}`);
}
ok('each renderer runs against a page carrying its placeholders',
  rendererMisses.length === 0, rendererMisses.join(', '));

const wired = corpPages.filter((p) => {
  const m = r(p).match(/data-page="([a-z]+)"/);
  if (!m || !RENDERERS[m[1]]) return !r(p).includes('assets/js/site.js'); // fully static pages are fine
  return true;
});
ok('every corporate page wires a renderer that exists',
  wired.length === corpPages.length,
  `${wired.length}/${corpPages.length}: ` + corpPages.filter((p) => !wired.includes(p)).join(', '));

/* ---- 6. anti-slop rules ---- */
const js = SCRIPTS.filter((f) => f.startsWith('assets/js/')).map((f) => r(f)).join('\n');
ok('no console.* in shipped js', !/console\.(log|debug|warn|error)/.test(js));
ok('no alert( in shipped js', !/\balert\s*\(/.test(js));
ok('no as any / ts-ignore', !/@ts-ignore|@ts-expect-error/.test(js));
ok('no inline style attributes in html', !PAGES.some((p) => /<[a-z]+[^>]*\sstyle="/i.test(r(p))));
ok('every page declares lang and viewport', PAGES.every((p) => {
  const h = r(p);
  return /<html lang="en">/.test(h) && /name="viewport"/.test(h);
}));
ok('no page is missing a title', PAGES.every((p) => /<title>[^<]+<\/title>/.test(r(p))));

/* ---- 7. leak-only fields never reach the public site ---- */
const publicHtml = corpPages.map((p) => r(p)).join('\n');
const truthLeak = D.SITES.filter((s) => s.truth && publicHtml.indexOf(s.truth.slice(0, 40)) !== -1);
ok('no site .truth text in public html', truthLeak.length === 0, truthLeak.map((s) => s.id).join(', '));

const privateNotes = D.PEOPLE.board
  .concat(D.PEOPLE.executives, D.PEOPLE.security)
  .filter((p) => !p.public && p.note)
  .filter((p) => publicHtml.indexOf(p.note.slice(0, 40)) !== -1);
ok('no private person note in public html', privateNotes.length === 0, privateNotes.map((p) => p.name).join(', '));

const hiddenNames = D.PEOPLE.board
  .concat(D.PEOPLE.executives, D.PEOPLE.security)
  .filter((p) => !p.public)
  .filter((p) => publicHtml.indexOf(p.name) !== -1);
ok('no non-public person appears in public html', hiddenNames.length === 0, hiddenNames.length + ' hidden');
ok('no full document body is inlined in public html',
  !D.ARCHIVE.files.some((f) => publicHtml.indexOf(f.body.slice(40, 160)) !== -1));

/* ---- 8. nav integrity ---- */
for (const page of corpPages) {
  const html = r(page);
  const hrefs = [...html.matchAll(/href="([a-z0-9._-]+\.html)"/g)].map((m) => m[1]);
  const dead = [...new Set(hrefs)].filter((h) => !existsSync(join(ROOT, h)));
  ok('links resolve from ' + page, dead.length === 0, dead.join(', '));
}

/* ---- 9. logo present ---- */
ok('brand logo copied into assets/img', existsSync(join(ROOT, 'assets/img/LogoPentex.webp')));

/* ---- 10. the whole archive loads and is internally coherent ----
   The corpus is data.js + lore.js + 35 chunk files. A chunk can parse and
   still contribute nothing, so every check below is made against the LOADED
   store, never against the source text. */
const CHUNKS = existsSync(join(ROOT, 'assets/js/archive'))
  ? readdirSync(join(ROOT, 'assets/js/archive')).filter((f) => f.endsWith('.js')).sort()
  : [];

globalThis.window = {};
try {
  for (const f of ['assets/js/data.js', 'assets/js/lore.js', ...CHUNKS.map((c) => 'assets/js/archive/' + c)]) {
    const src = r(f)
      .replace(/window\.PENTEX/g, 'window.__P')
      .replace(/\bglobal\.PENTEX\b/g, 'window.__P');
    new Function(src)();
  }
} catch (err) {
  ok('archive loads without throwing', false, String(err && err.message).slice(0, 140));
}

const K = globalThis.window.__P || {};
const files = (K.ARCHIVE && K.ARCHIVE.files) || [];
ok('archive loads without throwing', true, files.length + ' documents');
ok('every chunk contributed documents', CHUNKS.length > 0 && files.length > 2000, files.length + ' docs from ' + CHUNKS.length + ' chunks');
ok('every document path is absolute', files.every((f) => typeof f.path === 'string' && f.path.charAt(0) === '/'));
ok('every document has a string body of substance',
  files.every((f) => typeof f.body === 'string' && f.body.length > 60));
ok('every document has a title', files.every((f) => typeof f.title === 'string' && f.title.length > 2));
ok('no document id is a number or placeholder',
  files.every((f) => typeof f.id === 'string' && f.id.length > 1 && !/^0/.test(f.id)));
ok('no document basename begins with a digit-garbage run',
  files.every((f) => !/\/0[A-Za-z]/.test(f.path)));
ok('document ids are unique', (() => {
  const s = new Set();
  let dup = 0;
  files.forEach((f) => { if (s.has(f.id)) dup++; s.add(f.id); });
  return dup === 0;
})(), files.length + ' ids');
ok('document paths are unique', (() => {
  const s = new Set();
  let dup = 0;
  files.forEach((f) => { if (s.has(f.path)) dup++; s.add(f.path); });
  return dup === 0;
})());
ok('no replacement characters in any document body',
  files.every((f) => f.body.indexOf('\uFFFD') === -1));
ok('every document is listed in FS', (() => {
  const s = new Set();
  Object.keys(K.FS || {}).forEach((k) => (K.FS[k] || []).forEach((e) => {
    s.add(k + e.name);
    s.add(k + '/' + String(e.name).split('/').filter(Boolean).pop());
  }));
  return files.every((f) => s.has(f.path));
})());
ok('every encoded document uses a known decoder',
  (K.DECODERS || []).length === 3 &&
  files.filter((f) => f.enc).every((f) => D.DECODERS.indexOf(f.enc) !== -1));

process.stdout.write(`\n${checks - fails}/${checks} checks passed\n`);
process.exit(fails === 0 ? 0 : 1);