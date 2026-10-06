/* Pentex — the drop box.
   A working shell over window.PENTEX.ARCHIVE. Nothing is fetched: the files
   already live in the page, which is the entire security failure this thing is
   about. Every document you actually read is written to the evidence board. */
(function () {
  'use strict';

  var P = window.PENTEX;
  var SESSION = 'pentex.session';
  var EVIDENCE = 'pentex.evidence';
  var IDLE_MS = 400000;
  var TOTAL = P.ARCHIVE.files.length;

  /* Photographs recovered alongside the paperwork. Some of them are the reason
     the paperwork exists. */
  var PHOTOS = {
    'bp-1': ['amazon-river', 'Rio Vermelho at the outfall, four days after the release.'],
    'bp-2': ['burn-line', 'The Q1 clearing limit, photographed from the transect road.'],
    'bp-3': ['animal-cages', 'Vector housing, Kilifi. Tier 3 enclosures.'],
    'bp-5': ['wolf-fog', 'Kilifi, 04:10. The witness walk was rescheduled twice.'],
    'fo-1': ['clearing', 'The reach above the Ibara intake. Cleared in 2018, replanted 2019, cleared again 2021.'],
    'fo-2': ['animal-cages', 'BioSynth-V holding room, Manaus, revision 7 protocol day 1.'],
    'fo-3': ['blight', 'Plot 6, Calgary. Nine weeks after the last treatment.'],
    'fo-4': ['security-guard', 'Contract rotation, Manaus. Rotation length is four weeks by contract and six by practice.'],
    'fo-5': ['night-raid', 'Jurong, gate 3, 02:40. Pallets 19 through 22 came in and none of them came out.'],
    'lg-4': ['wolf-fog', 'Surveillance still, taken from a company aircraft over the Yukon corridor.'],
    'lg-5': ['night-raid', 'The night the authorisation was signed. Nobody was photographed. That is the point.'],
    'bp-8': ['refinery-night', 'Tank farm A-5. On the permit it is a warehouse.']};

  var CREDENTIAL_FAIL = 'credential rejected — this room needs the sub-level 4 session. <a href="portal.html">portal.html</a>';

  /* ---------- state ---------- */

  var cwd = '/';
  var history = [];
  var histAt = 0;
  var idleTimer = null;
  var evidence = {};
  var byId = {};
  var byName = {};
  var elTerm = null;
  var elIn = null;
  var elInput = null;

  P.ARCHIVE.files.forEach(function (f) {
    byId[f.id] = f;
    byName[f.path.split('/').filter(Boolean).pop()] = f;
  });

  /* ---------- storage (every access guarded; private mode must still work) ---------- */

  function storeGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (err) {
      return null;
    }
  }

  function storeSet(key, val) {
    try {
      window.localStorage.setItem(key, val);
    } catch (err) {
      /* the board is a convenience, not a requirement */
    }
  }

  function loadEvidence() {
    var raw = storeGet(EVIDENCE);
    if (!raw) return {};
    try {
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (err) {
      return {};
    }
  }

  function saveEvidence() {
    storeSet(EVIDENCE, JSON.stringify(evidence));
  }

  function markRead(id) {
    if (evidence[id]) return;
    evidence[id] = true;
    saveEvidence();
  }

  function evidenceCount() {
    return Object.keys(evidence).length;
  }

  /* ---------- output ---------- */

  function line(kind, text) {
    var n = document.createElement('div');
    n.className = 'line' + (kind ? ' line--' + kind : '');
    if (text !== undefined && text !== null) n.textContent = String(text);
    elIn.appendChild(n);
    return n;
  }

  function echo(text) {
    var n = document.createElement('div');
    n.className = 'line line--cmd';
    var s = document.createElement('span');
    s.textContent = text;
    n.appendChild(s);
    elIn.appendChild(n);
  }

  function scroll() {
    elTerm.scrollTop = elTerm.scrollHeight;
  }

  function size(n) {
    if (n < 1024) return n + ' B';
    if (n < 1048576) return (n / 1024).toFixed(1) + 'K';
    return (n / 1048576).toFixed(1) + 'M';
  }

  /* ---------- decoders ---------- */

  function utf8(bytes) {
    return new TextDecoder('utf-8').decode(bytes);
  }

  var DECODERS = {
    rot13: function (s) {
      return s.replace(/[a-zA-Z]/g, function (ch) {
        var base = ch <= 'Z' ? 65 : 97;
        return String.fromCharCode(((ch.charCodeAt(0) - base + 13) % 26) + base);
      });
    },
    // Both binary encodings are UTF-8 byte streams. Building the string with
    // String.fromCharCode per byte mangles any multi-byte character, so collect
    // the bytes and let TextDecoder do the work.
    hex: function (s) {
      var hex = s.replace(/\s+/g, '').match(/[0-9a-fA-F]{2}/g) || [];
      var bytes = new Uint8Array(hex.length);
      for (var i = 0; i < hex.length; i++) bytes[i] = parseInt(hex[i], 16);
      return utf8(bytes);
    },
    b64: function (s) {
      var bin = window.atob(s.replace(/\s+/g, ''));
      var bytes = new Uint8Array(bin.length);
      for (var j = 0; j < bin.length; j++) bytes[j] = bin.charCodeAt(j);
      return utf8(bytes);
    }
  };

  function plain(f) {
    if (!f.enc) return f.body;
    var dec = DECODERS[f.enc];
    return dec ? dec(f.body) : f.body;
  }

  /* ---------- filesystem model ---------- */

  function dirsHere() {
    return Object.keys(P.FS).filter(function (d) {
      return d !== cwd;
    });
  }

  function entriesHere() {
    return P.FS[cwd] || [];
  }

  function resolve(arg) {
    if (!arg) return null;
    var name = entryId(arg);
    var hit = byName[name] || byId[name] || null;
    if (!hit) return null;
    var wanted = String(arg).replace(/\/+$/, '');
    if (wanted.charAt(0) === '/') return wanted === hit.path ? hit : null;
    return dirOf(hit.path) === cwd ? hit : null;
  }

  function dirOf(path) {
    var parts = String(path).split('/').filter(Boolean);
    parts.pop();
    return '/' + parts.join('/');
  }

  function entryId(path) {
    return String(path).split('/').filter(Boolean).pop();
  }

  function absPath(f) {
    return f.path;
  }

  /* ---------- commands ---------- */

  var CMD = {};

  CMD.help = function () {
    line('hdr', 'COMMANDS');
    line('doc', 'ls [dir]            list a directory');
    line('doc', 'cd <dir>            change directory');
    line('doc', 'pwd                 print working directory');
    line('doc', 'cat <file>          open a document');
    line('doc', 'dec <file>          decode a stored document (' + P.DECODERS.join(', ') + ')');
    line('doc', 'find <term>         search every document for a term');
    line('doc', 'stat <file>         document metadata');
    line('doc', 'dl <file>           download a document as .txt');
    line('doc', 'tree                the whole drop box');
    line('doc', 'who                 the people named in this material');
    line('doc', 'photos              the photographs recovered with it');
    line('doc', 'evidence            what you have actually read');
    line('doc', 'clear               clear the screen');
    line('meta', 'Reading a document is the only thing that counts. Searching is not reading.');
  };

  CMD.pwd = function () {
    line('ok', cwd);
  };

  CMD.ls = function (args) {
    var target = args[0] ? normalise(args[0]) : cwd;
    if (!P.FS[target]) {
      line('bad', 'ls: ' + args[0] + ': no such directory');
      return;
    }
    if (target !== cwd && target !== '/') {
      line('doc', 'drwxr-xr-x   -   -   -  ../' + entryId(target));
    }
    var rows = P.FS[target] || [];
    line('hdr', target + '   ' + rows.length + ' items');
    rows.forEach(function (e) {
      var enc = e.enc ? '[' + e.enc + ']' : '      ';
      line(
        'doc',
        '  -rw-r--r--  ' + size(e.size).padStart(7) + '  ' + e.date + '  ' + enc + '  ' + e.name
      );
      line('meta', '    ' + e.cls + ' · ' + (byId[e.id] ? byId[e.id].title : ''));
    });
  };

  CMD.tree = function () {
    line('hdr', 'DROPBOX');
    Object.keys(P.FS).forEach(function (d) {
      if (d === '/') return;
      var rows = P.FS[d] || [];
      line('doc', '  ' + d + '/   (' + P.ARCHIVE.dirs[d] + ')');
      rows.forEach(function (e) {
        var enc = e.enc ? '  [' + e.enc + ']' : '';
        line('meta', '    ' + e.name + enc + '  — ' + e.cls);
      });
    });
    line('hdr', '/');
    (P.FS['/'] || []).forEach(function (e) {
      line('meta', '    ' + e.name + '  — ' + e.cls);
    });
    line('warn', TOTAL + ' documents. ' + evidenceCount() + ' read.');
  };

  CMD.cd = function (args) {
    if (!args[0]) {
      line('ok', cwd);
      return;
    }
    var target = normalise(args[0]);
    if (!P.FS[target]) {
      line('bad', 'cd: ' + args[0] + ': no such directory');
      return;
    }
    cwd = target;
    CMD.ls([]);
  };

  CMD.cat = function (args) {
    var f = resolve(args[0]);
    if (!f) {
      line('bad', 'cat: ' + (args[0] || '') + ': no such file in ' + cwd);
      return;
    }
    if (f.enc) {
      line('warn', f.path + ' is stored ' + f.enc + '. Showing the raw store — use `dec ' + f.id + '`.');
      renderDoc(f, f.body, false);
      return;
    }
    renderDoc(f, f.body, true);
  };

  CMD.dec = function (args) {
    var f = resolve(args[0]);
    if (!f) {
      line('bad', 'dec: ' + (args[0] || '') + ': no such file in ' + cwd);
      return;
    }
    if (!f.enc) {
      line('warn', f.path + ' is not encoded. Reading it.');
      renderDoc(f, f.body, true);
      return;
    }
    if (DECODERS[f.enc]) {
      renderDoc(f, plain(f), true);
    } else {
      line('bad', 'no decoder for ' + f.enc);
    }
  };

  CMD.stat = function (args) {
    var f = resolve(args[0]);
    if (!f) {
      line('bad', 'stat: ' + (args[0] || '') + ': no such file');
      return;
    }
    var e = (P.FS[f.path.split('/').slice(0, -1).join('/') || '/'] || []).filter(function (x) {
      return x.id === f.id;
    })[0];
    line('hdr', f.path);
    line('doc', '  title   ' + f.title);
    line('doc', '  date    ' + f.date);
    line('doc', '  source  ' + f.src);
    line('doc', '  size    ' + (e ? size(e.size) : '—'));
    line('doc', '  class   ' + (e ? e.cls : '—'));
    line('doc', '  store   ' + (f.enc || 'plaintext'));
    line('doc', '  tags    ' + f.tags.join(', '));
    line('meta', '  read    ' + (evidence[f.id] ? 'yes' : 'not yet'));
  };

  CMD.find = function (args) {
    var q = args.join(' ').toLowerCase();
    if (!q) {
      line('warn', 'find: give me a term.');
      return;
    }
    var hits = [];
    P.ARCHIVE.files.forEach(function (f) {
      var hay = (f.title + '\n' + f.tags.join(' ') + '\n' + f.body).toLowerCase();
      var at = hay.indexOf(q);
      if (at !== -1) hits.push({ f: f, at: at });
    });
    line('hdr', hits.length + ' document' + (hits.length === 1 ? '' : 's') + ' mention "' + q + '"');
    hits.forEach(function (hit) {
      line('doc', '  ' + hit.f.path);
      line('meta', '    ' + hit.f.title + ' · ' + hit.f.date);
    });
    line('warn', 'Searching is not reading. Open what matters: cat <file> or dec <file>.');
  };

  CMD.who = function () {
    line('hdr', 'PEOPLE NAMED IN THIS MATERIAL');
    ['board', 'executives', 'security'].forEach(function (group) {
      P.PEOPLE[group].forEach(function (p) {
        var site = p.site ? siteLabel(p.site) : '—';
        line('doc', '  ' + p.name);
        line('meta', '    ' + p.role + ' · ' + site + ' · room ' + (p.room || '—'));
        line('meta', '    ' + (p.mail || 'no mailbox on record'));
        if (p.phone) line('meta', '    ' + p.phone);
      });
    });
    line('warn', 'Eleven of these accounts are not published anywhere on the public site.');
  };

  CMD.photos = function () {
    line('hdr', 'RECOVERED PHOTOGRAPHS');
    Object.keys(PHOTOS).forEach(function (id) {
      var f = byId[id];
      if (!f) return;
      line('doc', '  ' + f.id + '  ' + PHOTOS[id][1]);
      line('meta', '    attached to ' + f.path);
    });
    line('meta', 'Photographs open with their document.');
  };

  CMD.evidence = function () {
    line('hdr', 'EVIDENCE BOARD');
    line('doc', '  ' + evidenceCount() + ' of ' + TOTAL + ' documents read.');
    line('meta', '  board: evidence.html');
  };

  CMD.dl = function (args) {
    var f = resolve(args[0]);
    if (!f) {
      line('bad', 'dl: ' + (args[0] || '') + ': no such file');
      return;
    }
    var body = plain(f);
    var blob = new Blob([body], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = entryId(f.path);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 2000);
    line('ok', 'wrote ' + entryId(f.path) + ' (' + size(body.length) + ')');
    if (!f.enc) markRead(f.id);
    line('meta', 'A copy on your disk is not evidence. Reading it here is.');
  };

  CMD.clear = function () {
    while (elIn.firstChild) elIn.removeChild(elIn.firstChild);
  };

  CMD.exit = function () {
    line('warn', 'There is nowhere to exit to. Lock the room from the bar above.');
  };

  CMD.logout = CMD.exit;

  /* ---------- document rendering ---------- */

  function renderDoc(f, body, counts) {
    markRead(f.id);
    var box = document.createElement('div');
    box.className = 'doc';

    var bar = document.createElement('div');
    bar.className = 'doc__bar';
    var nameB = document.createElement('b');
    nameB.textContent = entryId(f.path);
    bar.appendChild(nameB);
    bar.appendChild(document.createTextNode(f.date));
    var flag = document.createElement('span');
    flag.className = 'flag' + (f.enc ? '' : ' flag--ok');
    flag.textContent = f.enc ? f.enc + ' store · decoded' : 'plaintext';
    bar.appendChild(flag);
    var cls = document.createElement('span');
    cls.textContent = f.tags.indexOf('press') !== -1 ? 'PUBLIC' : 'RESTRICTED';
    bar.appendChild(cls);
    box.appendChild(bar);

    var b = document.createElement('div');
    b.className = 'doc__body';
    b.textContent = body;
    box.appendChild(b);

    var acts = document.createElement('div');
    acts.className = 'doc__actions';
    var dl = document.createElement('button');
    dl.type = 'button';
    dl.className = 'btn-b';
    dl.textContent = 'download .txt';
    dl.addEventListener('click', function () {
      CMD.dl([f.id]);
      scroll();
    });
    acts.appendChild(dl);

    var cite = document.createElement('button');
    cite.type = 'button';
    cite.className = 'btn-b';
    cite.textContent = 'mark as read';
    cite.addEventListener('click', function () {
      markRead(f.id);
      cite.disabled = true;
      cite.textContent = 'recorded';
      line('ok', 'recorded ' + f.id + ' — ' + evidenceCount() + '/' + TOTAL);
      scroll();
    });
    acts.appendChild(cite);

    if (PHOTOS[f.id]) {
      var ph = document.createElement('button');
      ph.type = 'button';
      ph.className = 'btn-b';
      ph.textContent = 'view photograph';
      ph.addEventListener('click', function () {
        var old = box.querySelector('.doc__photo');
        if (old) {
          box.removeChild(old);
          ph.textContent = 'view photograph';
          return;
        }
        var fig = document.createElement('figure');
        fig.className = 'doc__photo';
        var img = document.createElement('img');
        img.src = 'assets/img/' + PHOTOS[f.id][0] + '.webp';
        img.alt = PHOTOS[f.id][1];
        img.width = 640;
        img.height = 360;
        img.loading = 'lazy';
        var cap = document.createElement('figcaption');
        cap.textContent = PHOTOS[f.id][1];
        fig.appendChild(img);
        fig.appendChild(cap);
        box.insertBefore(fig, acts);
        ph.textContent = 'hide photograph';
        scroll();
      });
      acts.appendChild(ph);
    }

    box.appendChild(acts);
    elIn.appendChild(box);

    line('meta', 'read ' + f.id + ' · ' + evidenceCount() + '/' + TOTAL + (counts ? '' : ' (raw store)'));
    scroll();
  }

  /* ---------- helpers ---------- */

  function normalise(arg) {
    if (arg === '..') {
      if (cwd === '/') return '/';
      var parts = cwd.split('/').filter(Boolean);
      parts.pop();
      return '/' + parts.join('/');
    }
    if (arg === '~' || arg === '/') return '/';
    if (arg.charAt(0) === '/') {
      return arg.replace(/\/+$/, '') || '/';
    }
    if (cwd === '/') return '/' + arg;
    return cwd + '/' + arg;
  }

  function siteLabel(id) {
    var s = P.SITES.filter(function (x) {
      return x.id === id;
    })[0];
    return s ? s.city : id;
  }

  /* ---------- boot ---------- */

  function boot() {
    line('sys', 'DROPBOX · mount ok · ' + TOTAL + ' objects');
    line('sys', P.ARCHIVE.credsNote);
    line('hdr', 'DIRECTORIES');
    Object.keys(P.ARCHIVE.dirs).forEach(function (d) {
      line('doc', '  ' + (d === '/' ? '/' : d + '/').padEnd(18) + P.ARCHIVE.dirs[d]);
    });
    line('meta', 'Type `help` for commands. `find <term>` searches. `cat <file>` reads.');
    line('meta', 'What you read goes on the evidence board. Start with /INDEX.txt.');
  }

  /* ---------- session guard ---------- */

  function authenticated() {
    try {
      var raw = window.sessionStorage.getItem(SESSION);
      return !!raw && JSON.parse(raw).user === P.CLUES.user.value;
    } catch (err) {
      return false;
    }
  }

  function denied() {
    document.body.className = 'breach';
    elIn.innerHTML = '';
    var wrap = document.createElement('div');
    wrap.className = 'note';
    var box = document.createElement('div');
    box.className = 'note__in';
    var h1 = document.createElement('h1');
    h1.textContent = 'Credential rejected';
    var p = document.createElement('p');
    p.textContent =
      'This room requires an authenticated sub-level 4 session. Sessions live in the browser tab that opened them and are dropped after 400 seconds of inactivity.';
    var p2 = document.createElement('p');
    p2.innerHTML = CREDENTIAL_FAIL;
    box.appendChild(h1);
    box.appendChild(p);
    box.appendChild(p2);
    wrap.appendChild(box);
    document.body.appendChild(wrap);
  }

  function armIdle() {
    if (idleTimer) window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(function () {
      try {
        window.sessionStorage.removeItem(SESSION);
      } catch (err) {
        /* nothing to drop */
      }
      line('warn', 'session expired after 400 seconds of inactivity');
      line('sys', 'The room closes. Anything you already read stays on your disk.');
      scroll();
      window.setTimeout(function () {
        window.location.replace('portal.html');
      }, 1800);
    }, IDLE_MS);
  }

  /* ---------- wiring ---------- */

  function init() {
    elTerm = document.getElementById('term');
    elIn = document.getElementById('term-in');

    if (!authenticated()) {
      denied();
      return;
    }

    evidence = loadEvidence();

    var row = document.createElement('div');
    row.className = 'prompt-row';
    var ps1 = document.createElement('span');
    ps1.className = 'prompt-row__ps1';
    row.appendChild(ps1);
    elInput = document.createElement('input');
    elInput.type = 'text';
    elInput.autocomplete = 'off';
    elInput.spellcheck = false;
    elInput.setAttribute('aria-label', 'Command');
    elInput.placeholder = 'help';
    row.appendChild(elInput);
    elIn.appendChild(row);

    function setPrompt() {
      ps1.textContent = 'root@dropbox:' + cwd + '$ ';
    }
    setPrompt();

    function run(raw) {
      var text = String(raw);
      var parts = text.trim().split(/\s+/);
      var verb = (parts.shift() || '').toLowerCase();
      echo(text);
      if (!verb) {
        scroll();
        return;
      }
      var fn = CMD[verb];
      if (fn) {
        fn(parts);
      } else {
        line('bad', verb + ': command not found. Type `help`.');
      }
      if (CMD.cd === fn) setPrompt();
      scroll();
      armIdle();
    }

    elInput.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter') {
        var v = elInput.value;
        elInput.value = '';
        if (v.trim()) {
          history.push(v);
          histAt = history.length;
        }
        run(v);
        ev.preventDefault();
      } else if (ev.key === 'ArrowUp') {
        if (histAt > 0) {
          histAt -= 1;
          elInput.value = history[histAt] || '';
        }
        ev.preventDefault();
      } else if (ev.key === 'ArrowDown') {
        if (histAt < history.length - 1) {
          histAt += 1;
          elInput.value = history[histAt] || '';
        } else {
          histAt = history.length;
          elInput.value = '';
        }
        ev.preventDefault();
      }
    });

    elInput.addEventListener('focus', armIdle);
    elTerm.addEventListener('click', function () {
      if (window.getSelection && String(window.getSelection()).length === 0) elInput.focus();
    });
    window.addEventListener('keydown', function (ev) {
      if (document.activeElement === elInput) return;
      if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
      elInput.focus();
    });

    boot();
    elInput.focus();
    scroll();
    armIdle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();