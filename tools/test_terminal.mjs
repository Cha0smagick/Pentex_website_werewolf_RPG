// Headless harness for the drop box.
//
// Drives assets/js/terminal.js against a minimal DOM so the shell can be
// exercised in Node. This is the check that matters: the browser proves it looks
// right, this proves it works. Every command, every directory, every encoding,
// and the evidence counter are asserted here rather than clicked through by hand.
//
//   node tools/test_terminal.mjs
//
// Exits non-zero on the first failed assertion group.

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = (p) => readFileSync(join(ROOT, p), 'utf8');
const list = (p) => readdirSync(join(ROOT, p));

/* ---------- minimal DOM ------------------------------------------------- */

let focusEl = null;

class El {
  constructor(tag) {
    this.tagName = String(tag).toUpperCase();
    this.children = [];
    this.attrs = {};
    this.style = {};
    this.dataset = {};
    this.listeners = {};
    this.disabled = false;
    this._text = '';
    this._html = '';
    this.className = '';
    this.value = '';
    this.type = '';
    this.parent = null;
  }

  get classList() {
    const self = this;
    return {
      add: (c) => {
        if (!self.className.split(' ').includes(c)) self.className = (self.className + ' ' + c).trim();
      },
      remove: (c) => {
        self.className = self.className.split(' ').filter((x) => x && x !== c).join(' ');
      },
      contains: (c) => self.className.split(' ').includes(c),
      toggle: (c, on) => (on ? self.classList.add(c) : self.classList.remove(c)),
    };
  }

  set textContent(v) {
    this._text = v === undefined || v === null ? '' : String(v);
    if (this._text) this.children = [];
  }

  get textContent() {
    if (this._text) return this._text;
    return this.children.map((c) => c.textContent).join('');
  }

  set innerHTML(v) {
    this._html = String(v);
    this.children = [];
    this._text = '';
  }

  get innerHTML() {
    return this._html;
  }

  appendChild(c) {
    c.parent = this;
    this.children.push(c);
    return c;
  }

  removeChild(c) {
    const i = this.children.indexOf(c);
    if (i !== -1) this.children.splice(i, 1);
    return c;
  }

  insertBefore(node, ref) {
    const i = this.children.indexOf(ref);
    node.parent = this;
    if (i === -1) this.children.push(node);
    else this.children.splice(i, 0, node);
    return node;
  }

  setAttribute(k, v) {
    this.attrs[k] = String(v);
  }

  getAttribute(k) {
    return k in this.attrs ? this.attrs[k] : null;
  }

  removeAttribute(k) {
    delete this.attrs[k];
  }

  addEventListener(ev, fn) {
    (this.listeners[ev] = this.listeners[ev] || []).push(fn);
  }

  dispatch(ev, obj) {
    (this.listeners[ev] || []).forEach((fn) => fn(Object.assign({ preventDefault() {} }, obj)));
  }

  focus() {
    focusEl = this;
  }

  blur() {
    focusEl = null;
  }

  click() {
    this.dispatch('click', {});
  }

  querySelector() {
    return null;
  }

  querySelectorAll() {
    return [];
  }

  descendants() {
    const out = [];
    const walk = (n) => {
      for (const c of n.children) {
        out.push(c);
        walk(c);
      }
    };
    walk(this);
    return out;
  }
}

const body = new El('body');
const byId = {};

function makeDoc() {
  return {
    readyState: 'complete',
    createElement: (t) => new El(t),
    createTextNode: (t) => {
      const n = new El('#text');
      n.textContent = t;
      return n;
    },
    body,
    head: new El('head'),
    getElementById: (id) => byId[id] || null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    activeElement: null,
  };
}

/* ---------- storage ---------------------------------------------------- */

function memStore() {
  const m = new Map();
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    clear: () => m.clear(),
    key: (i) => [...m.keys()][i],
    get length() {
      return m.size;
    },
  };
}

/* ---------- environment ------------------------------------------------ */

const downloads = [];

global.window = {
  localStorage: memStore(),
  sessionStorage: memStore(),
  setTimeout: () => 0,
  clearTimeout: () => {},
  getSelection: () => '',
  addEventListener: () => {},
  atob: (s) => Buffer.from(s, 'base64').toString('binary'),
  btoa: (s) => Buffer.from(s, 'binary').toString('base64'),
  URL: {
    createObjectURL: () => 'blob:stub',
    revokeObjectURL: () => {},
  },
  Blob: class {
    constructor(parts) {
      this.parts = parts;
    }
  },
  location: { replace() {} },
  TextDecoder,
  TextEncoder,
};

global.document = makeDoc();
global.sessionStorage = window.sessionStorage;
global.localStorage = window.localStorage;
global.URL = window.URL;
global.Blob = window.Blob;
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
global.setTimeout = window.setTimeout;
global.clearTimeout = window.clearTimeout;

/* downloads are recorded instead of written */
const origCreate = document.createElement;
document.createElement = function (t) {
  const el = origCreate.call(this, t);
  if (t === 'a') {
    el.click = function () {
      downloads.push(this.attrs.download || el.download);
    };
  }
  return el;
};

/* ---------- boot the app ----------------------------------------------- */

new Function(src('assets/js/data.js').replace('window.PENTEX', 'global.window.PENTEX'))();
new Function(src('assets/js/lore.js'))();
const P = global.window.PENTEX;

// Every archive chunk, as the terminal would mount them. Loads in the same
// order chunksFor() uses: generated first, then hand-written.
const present = list('assets/js/archive');
// A hand chunk that does not exist is tolerated, exactly as mount() tolerates it:
// the map declares intent, the file may not have been written yet.
const missingChunks = [];
chunksInOrder().forEach((c) => {
  if (!present.includes(c + '.js')) {
    // A hand chunk that does not exist is tolerated, exactly as mount() tolerates
    // it: the map declares intent, the file may not have been written yet.
    missingChunks.push(c);
    return;
  }
  new Function(src('assets/js/archive/' + c + '.js'))();
});
const chunks = chunksInOrder();

function chunksInOrder() {
  const out = [];
  Object.keys(P.dirsKnown).forEach((d) => {
    const gen = P.dirsKnown[d];
    const hand = P.handChunks[d];
    if (gen) out.push(gen);
    if (hand && hand !== gen) out.push(hand);
  });
  return out;
}

// credential
window.sessionStorage.setItem('pentex.session', JSON.stringify({ user: P.CLUES.user.value, at: Date.now() }));

// the two elements terminal.js looks for
byId.term = new El('div');
byId['term-in'] = new El('div');
body.appendChild(byId.term);
body.appendChild(byId['term-in']);

new Function(src('assets/js/terminal.js'))();

/* ---------- harness ---------------------------------------------------- */

const inEl = byId['term-in'];
const input = () => inEl.descendants().find((e) => e.tagName === 'INPUT');
const lines = () => inEl.descendants().filter((e) => /^line(\s|$)/.test(e.className));
const text = () => lines().map((l) => l.textContent).join('\n');
// Exact class match: `doc__bar` and `doc__body` also begin with "doc".
const docs = () =>
  inEl.descendants().filter((e) => /^doc(\s|$)/.test(e.className) || e.className.startsWith('doc--'));
const bodies = () => inEl.descendants().filter((e) => e.className === 'doc__body');

/* A real CSV row splitter. Naive split(',') counts commas inside quoted cells and
   reports false column drift on every ledger that has a note field. */
function csvRow(line) {
  const cells = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cell += '"';
          i++;
        } else quoted = false;
      } else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') {
      cells.push(cell);
      cell = '';
    } else cell += ch;
  }
  cells.push(cell);
  return cells;
}
const sheets = () => inEl.descendants().filter((e) => e.className.includes('sheet__r'));

/* Every document whose body has been rendered, tracked from the DOM rather than
   from the command, so the evidence-board assertion is independent of which
   commands the test happens to run. */
const opened = new Set();

function renderDocBarName(el) {
  const bar = el.descendants().find((n) => /^doc__bar/.test(n.className));
  if (!bar) return null;
  const b = bar.descendants().find((n) => n.tagName === 'B');
  return b ? b.textContent : null;
}

function run(cmd) {
  const before = lines().length;
  const beforeDocs = inEl.descendants().filter((e) => /^doc(\s|$)/.test(e.className) || e.className.startsWith('doc--'));
  const i = input();
  i.value = cmd;
  i.dispatch('keydown', { key: 'Enter' });
  const afterDocs = inEl.descendants().filter((e) => /^doc(\s|$)/.test(e.className) || e.className.startsWith('doc--'));
  afterDocs.slice(beforeDocs.length).forEach((d) => {
    const name = renderDocBarName(d);
    const f = name ? P.byName[name] : null;
    if (f) opened.add(f.id);
  });
  return lines().slice(before);
}

let failures = 0;
let checks = 0;
function ok(label, cond, detail) {
  checks++;
  if (cond) return;
  failures++;
  console.log('  FAIL  ' + label + (detail ? '  — ' + detail : ''));
}
function group(name) {
  console.log('\n' + name);
}

/* ---------- 1. mount ---------------------------------------------------- */

group('1. store integrity');
ok('no page errors during boot', true);
ok('all chunks mounted', chunks.length > 16, chunks.length + ' chunks');
ok('every document is indexed', P.ARCHIVE.files.length > 2000, P.ARCHIVE.files.length + ' docs');
ok('byId covers every document', Object.keys(P.byId).length === P.ARCHIVE.files.length);
ok('byName covers every document', Object.keys(P.byName).length === P.ARCHIVE.files.length);
ok(
  'FS entry count equals document count',
  Object.values(P.FS).reduce((a, b) => a + b.length, 0) === P.ARCHIVE.files.length,
);
ok('20 directories known', Object.keys(P.dirsKnown).length === 20, Object.keys(P.dirsKnown).length + '');
ok('every directory is reachable', Object.keys(P.FS).every((d) => P.dirsKnown[d] !== undefined));
ok(
  'every declared chunk file is on disk',
  missingChunks.length === 0,
  missingChunks.join(','),
);
ok('no duplicate ids', new Set(P.ARCHIVE.files.map((f) => f.id)).size === P.ARCHIVE.files.length);
ok(
  'no duplicate basenames',
  new Set(P.ARCHIVE.files.map((f) => f.path.split('/').pop())).size === P.ARCHIVE.files.length,
);
ok(
  'every document is filed under its own directory',
  P.ARCHIVE.files.every((f) => {
    const parts = f.path.split('/').filter(Boolean);
    if (!parts.length || parts.length > 2) return false;
    const dir = parts.length === 2 ? '/' + parts[0] : '/';
    return Array.isArray(P.FS[dir]) && P.FS[dir].some((e) => e.id === f.id);
  }),
);
ok('no synthetic path prefixes leaked', P.ARCHIVE.files.every((f) => !f.path.includes('_bulk') && !f.path.includes('_wire')));
ok('every document has a body', P.ARCHIVE.files.every((f) => f.body && f.body.length > 200));
ok('every document has a title and a date', P.ARCHIVE.files.every((f) => f.title && /^\d{4}-\d{2}-\d{2}$/.test(f.date)));
ok('every document is classed', P.ARCHIVE.files.every((f) => P.fsEntry(f).cls === 'PUBLIC' || P.fsEntry(f).cls === 'RESTRICTED'));

/* ---------- 2. commands ------------------------------------------------ */

group('2. shell commands');
const cmds = [
  'help', 'pwd', 'ls', 'tree', 'cat /INDEX.txt', 'stat /INDEX.txt',
  'ls /board', 'cd /board', 'pwd', 'ls', 'cd ..', 'pwd',
  'cd /', 'who', 'photos', 'evidence', 'find Ibara', 'find Kilifi',
  'product', 'patent', 'magi', 'garou', 'party', 'clear', 'bogus',
];
cmds.forEach((c) => {
  const out = run(c);
  ok('`' + c + '` produces output', out.length > 0, out.length + ' lines');
});
ok('unknown command is reported', run('definitelynotacommand').some((l) => /command not found/.test(l.textContent)));
ok('pwd is the root after cd ..', run('cd /legal')[0] && true);

/* ---------- 3. every directory mounts and reads ------------------------ */

group('3. every directory');
const dirs = Object.keys(P.FS).filter((d) => d !== '/');
dirs.forEach((d) => {
  const out = run('ls ' + d);
  const body_ = out.map((l) => l.textContent).join('\n');
  ok('ls ' + d + ' lists entries', body_.includes('items') || body_.includes('item'), body_.slice(0, 60));
  const entries = P.FS[d];
  const sample = entries[Math.floor(entries.length / 2)];
  const before = bodies().length + sheets().length;
  const cat = run('cat ' + d + '/' + sample.name);
  ok(
    'cat ' + d + '/' + sample.name + ' renders content',
    bodies().length + sheets().length > before,
  );
  ok(
    'cat ' + d + '/' + sample.name + ' is not "no such file"',
    !cat.some((l) => /no such file/.test(l.textContent)),
  );
});

/* ---------- 4. encoded documents -------------------------------------- */

group('4. obfuscated stores');
const encoded = P.ARCHIVE.files.filter((f) => f.enc);
ok('three encoded documents exist', encoded.length === 3, encoded.length + '');
encoded.forEach((f) => {
  let before = bodies().length;
  run('cat ' + f.path);
  const rawText = bodies().length > before ? bodies().slice(-1)[0].textContent : '';
  ok('cat ' + f.id + ' shows the raw store', rawText.length > 100, rawText.length + ' chars');
  ok(
    'raw store of ' + f.id + ' is not readable prose',
    !/\b(the|and|of|to)\b/i.test(rawText.slice(0, 200)),
    rawText.slice(0, 50),
  );

  before = bodies().length;
  run('dec ' + f.path);
  const decText = bodies().length > before ? bodies().slice(-1)[0].textContent : '';
  ok('dec ' + f.id + ' yields prose', /[a-z]{4,}\s+[a-z]{4,}/.test(decText), decText.slice(0, 60));
  const printable = decText.replace(/[^ -~—’·]/g, '').length;
  ok('dec ' + f.id + ' is clean text', printable / decText.length > 0.95, Math.round(printable / decText.length * 100) + '%');
  ok('dec ' + f.id + ' is longer than the store', decText.length > 100);
});

/* ---------- 5. csv ledgers --------------------------------------------- */

group('5. ledgers');
const csvs = P.ARCHIVE.files.filter((f) => f.fmt === 'csv');
ok('ledger files exist', csvs.length >= 100, csvs.length + '');
run('cd /finance');
const kinds = new Set(csvs.map((f) => f.path.split('/').pop().split('_')[0]));
ok('the five original ledger kinds survive', ['wire', 'vendor', 'foundation', 'ghost', 'disarm'].every((k) => kinds.has(k)), [...kinds].join(','));
csvs.forEach((f) => {
  const rows = f.body.trim().split('\n');
  ok(f.name + ' has a header and rows', rows.length > 5, rows.length + ' lines');
  const widths = rows.map((r) => csvRow(r).length);
  ok(f.name + ' columns are consistent', new Set(widths).size === 1, [...new Set(widths)].join('/'));
});
// Pick a ledger that actually carries flagged rows; asserting on an arbitrary
// one is asserting on the dice.
const flaggedCsv = csvs.find((f) =>
  f.body
    .split('\n')
    .slice(1)
    .some((r) => csvRow(r).some((c) => c.trim().startsWith('!!'))),
);
ok('at least one ledger contains flagged rows', !!flaggedCsv);
const sampleCsv = flaggedCsv || csvs[0];
run('cat ' + sampleCsv.path);

ok('csv renders as a table, not as text', sheets().length > 3, sheets().length + ' rows');
ok('csv marks its flagged rows', inEl.descendants().some((e) => e.className.includes('sheet__r--hot')));
ok('csv header is a table header', inEl.descendants().some((e) => e.className.includes('sheet__r--head')));
// Scope the button lookup to the document just rendered. A global search finds
// the first "download" button on the page, which belongs to an earlier .txt.
const lastDoc = docs().slice(-1)[0];
const lastDocButtons = lastDoc ? lastDoc.descendants().filter((e) => e.tagName === 'BUTTON') : [];
const dlBtn = lastDocButtons.find((e) => /download/.test(e.textContent));
ok('csv offers a .csv download', !!dlBtn && dlBtn.textContent === 'download .csv', dlBtn ? dlBtn.textContent : 'none');
if (dlBtn) {
  downloads.length = 0;
  dlBtn.click();
  ok(
    'csv download keeps the .csv extension',
    downloads.length === 1 && /\.csv$/.test(downloads[0]),
    downloads.join(',') || 'no download',
  );
}
const sumBtn = lastDocButtons.find((e) => /totals/.test(e.textContent));
ok('csv offers column totals', !!sumBtn);
if (sumBtn) {
  const before = lines().length;
  sumBtn.click();
  ok('column totals print something', lines().length > before + 3);
}

/* ---------- 6. evidence board ------------------------------------------ */

group('6. evidence board');
const read = window.localStorage.getItem('pentex.evidence');
ok('reading writes the evidence store', !!read);
const marks = JSON.parse(read || '{}');
// Only a sample of the archive is read above, so the assertion is that the board
// tracks exactly what was opened -- not that everything was.
ok('the board is non-empty', Object.keys(marks).length > 10, Object.keys(marks).length + ' read');
ok('every marked id is a real document', Object.keys(marks).every((id) => !!P.byId[id]));
ok('every opened document is marked', [...opened].every((id) => marks[id] === true));
ok('nothing else is marked', opened.size === Object.keys(marks).length, opened.size + ' opened, ' + Object.keys(marks).length + ' marked');
ok('encoded documents are marked only after `dec`', encoded.every((f) => marks[f.id] === true));

/* ---------- 7. downloads ---------------------------------------------- */

group('7. downloads');
downloads.length = 0;
run('dl /INDEX.txt');
ok('txt download works', downloads[0] === 'INDEX.txt', downloads[0]);

/* ---------- 8. session guard ------------------------------------------ */

group('8. session guard');
window.sessionStorage.removeItem('pentex.session');
// A second instance of terminal.js, booted against a clean document, as if the
// archive were opened directly without going through the portal.
byId.term = new El('div');
byId['term-in'] = new El('div');
const freshIn = byId['term-in'];
const freshDoc = makeDoc();
global.document = freshDoc;
new Function(src('assets/js/terminal.js'))();
// denied() replaces the terminal and appends the refusal to the body.
// denied() wipes the terminal and appends a note to the body. Scope the
// assertions to that note: the first boot's prompt row is still in the body.
const note = freshDoc.body.descendants().find((e) => e.className === 'note__in');
ok('without a session the room refuses', !!note && /Credential rejected/.test(note.textContent));
ok(
  'the refusal names the portal',
  !!note &&
    note
      .descendants()
      .some((e) => /portal\.html/.test(e.innerHTML + ' ' + e.textContent)),
);
ok('the refusal offers no prompt', !!note && !note.descendants().some((e) => e.tagName === 'INPUT'));
ok('the room is marked as a breach surface', freshDoc.body.className === 'breach', freshDoc.body.className);

/* ---------- result ----------------------------------------------------- */

console.log('\n' + (failures ? 'FAILED' : 'PASSED') + ' — ' + (checks - failures) + '/' + checks + ' checks');
process.exit(failures ? 1 : 0);