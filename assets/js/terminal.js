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
  var CORPUS = 'assets/js/archive/';

  /* The archive is far larger than the drop box root. Directories outside the
     seven that ship with data.js are chunk scripts loaded the first time you
     ls or cd into them. TOTAL therefore grows as you explore, which is why
     `tree` and `evidence` report what is currently mounted rather than a
     constant. */
  var loading = {};
  var mounted = {};

  function total() {
    return P.ARCHIVE.files.length;
  }

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
    'bp-8': ['refinery-night', 'Tank farm A-5. On the permit it is a warehouse.'],

    'bp-h01': ['oil-slick-river', 'The reach below the CARRION standpipes. The sheen reaches the intake on the fourth day, which is the day the sample was taken.'],
    'bp-h02': ['fire-forest-smoke', 'Reach 4. The smoke is visible from the transect road and not from the air, because the road is the only place anyone stands.'],
    'bp-h03': ['blight-pollinator-cage', 'MA-1 and MA-2 cages. The colony in the third cage was not counted, because counting it would have required opening it.'],
    'bp-h04': ['animal-vivarium-rack', 'CHOIR vector housing. Tier 3, the tier with no window, on the grounds that a window is a form of exposure.'],
    'bp-h05': ['toxic-foam-river', 'PALIMPSEST discharge point, Cota station, on an ordinary morning.'],
    'bp-h06': ['ruins-charred-hall', 'The Cota long-term storage hall, nine years after the last cohort was discharged from it.'],
    'bp-h10': ['papers-shredder-room', 'The room the retention policy refers to as a decommissioned facility. It has no decommissioning record.'],

    'fo-h01': ['deforestation-clearcut', 'The transect markers as they stand today. The plan has never been amended.'],
    'fo-h02': ['land-clearcut-burn-stump', 'Block 4, the 2020 burn. The gradient is exactly as the memorandum specifies: the fire is visible where the road is and nowhere else.'],
    'fo-h07': ['animal-dog-kennel', 'Vector housing, nineteen years of the same enclosure. Revision 7 removed the daily observation line, not the enclosure.'],
    'fo-h08': ['papers-corridor-archive', 'Gate 3 interior, taken on a working day. The corridor is 140 metres long and the camera is at the near end only.'],

    'lg-h04': ['security-archive-vault', 'The room the master policy is written against. Section 7.2 has no definition paragraph. The template it was cut from still has one. The difference is four hundred words.'],
    'lg-h05': ['toxic-foam-river', 'Cota station ethics committee. By the date it was convened, four of its seven members had been dosed by the programme it was asked to approve.'],
    'lg-h06': ['toxic-mutation-livestock', 'The selection step, printed. Recruitment ran on low-immunisation-coverage catchments, because that is where a cohort is easiest to enrol and hardest to trace.'],

    'cl-h01': ['lab-freezer-bank', 'Cota long-term bank. 611 withdrawals are recorded. The bank holds 570.'],
    'cl-h02': ['lab-centrifuge-room', 'Study 88-C. The consent form describes a single venepuncture. This room is where they do the second.'],
    'cl-h03': ['toxic-lab-flask', 'Study 44, concentrate. The batch sheet records four in the morning and nine at the end of the day, with no entry between.'],
    'cl-h04': ['blight-pollinator-cage', 'MA-1 adjudication. Both subjects alive at the date of this record and both alive at the date of the last entry.'],
    'cl-h05': ['lab-necropsy-table', 'Kilifi withdrawal 3 of 4. The necropsy is signed by the study veterinarian and countersigned by nobody, because there is no second signature on the form.'],
    'cl-h06': ['lab-scalpel-tray', 'The four by number rather than by name. The tray layout is the only place in the Kilifi file where a person has a position.'],
    'cl-h07': ['lab-mri-corridor', 'The conforming-human study. No Pentex study has ever produced a control group that passed.'],

    'pt-h03': ['lab-cage-rack', 'Reserved application 3 as built. The filed claims selectivity against the target receptor; the rack shows selectivity against nothing at all.'],

    'rd-h06': ['ruins-collapsed-tower', 'The non-human sequence inventory, site SR-007. Eight sequences, one structure, no decommissioning.'],
    'rd-h07': ['deforestation-canopy-hole', 'What the forest shows: standing death at 1.4 per hectare, uniform, with no scorch at the margin.'],

    're-h01': ['land-drainage-ditch', 'Parcel 11. The drain was cut in 1974 and appears in no aerial photograph after 1981.'],
    're-h03': ['blight-soil-core', 'Cota plot 6, nine cores at fifteen-metre spacing. The germination test is positive in every one.'],
    're-h04': ['ruins-demolition', 'Calgary plot 6, remediation year four. The remediation is real. It also treats the wrong soil, because the wrong soil is the thing they made.'],
    're-h07': ['ruins-abandoned-tank', 'The parcel under the house. It has never been cleared, surveyed or sold, and the household has lived above it for thirty-one years.'],
    're-h08': ['land-waste-pit-burn', 'The seventeen unmapped hectares. Two of the three Ember flares are inside the unmapped part, which is the part nobody is permitted to enter.'],
    're-h09': ['deforestation-road-push', 'The concession as measured rather than as permitted: 59,460 hectares of cleared ground outside the surveyed boundary.'],

    'rg-h01': ['toxic-groundwater-pipe', 'The Ibara abstraction licence, clause 14. The pipe is metered. The intake downstream of it is not.'],
    'rg-h02': ['toxic-foam-river', 'Eleven non-reportable exceedances. Event 11 is the river, classified as an existing condition.'],
    'rg-h06': ['oil-spill-sheen', 'Intake monitoring, Ibara. Five metals appear in the permit and none of them appear in the programme.'],
    'rg-h07': ['oil-pipeline-burst', 'The release. Notification was filed at hour 96 because hour 24 requires an operator report and hour 96 requires a form.'],
    'rg-h08': ['toxic-plume-fence', 'Jurong, 2022. The recovery figure is 99.4 percent, and the perimeter fence is the only part of the site that is monitored continuously.'],

    'se-h01': ['security-archive-vault', 'Policy 11 image store. 410,000 photographs, eleven notices granted, nine refused, and at Ibara the grantor is the audited party.'],
    'se-h04': ['security-gate-night', 'Post 5. The walk is recorded as completed on 366 days a year and was performed on four of them in 2021.'],
    'se-h05': ['security-tunnel-camera', 'The maintenance tunnel camera. It has been in the register as serviceable since 2016 and produces no footage.'],
    'se-h08': ['security-convoy-desert', 'The south road, 04:40. The tankers are the only vehicle permitted on it after dusk.'],
    'se-h09': ['security-sublevel-stair', 'Sub-level 4, the stair. The visitor register at the top of it holds forty-four entries a year; the Archivist accounts for thirty-one.'],

    'su-h01': ['toxic-tar-pit', 'Concession input tolerance. 0.18 percent against a threshold of 0.25, set in 2014 after a year that read 0.31.'],
    'su-h02': ['toxic-drum-lot', 'The Kaliningrad entity. Registered, insured, and holding no employees.'],
    'su-h03': ['fire-scrub-line', 'Vegetation management perimeter. The line is defined by marker, and the markers have been moved outward three times.'],
    'su-h05': ['tanker-queue-night', 'Workforce water. Six deliveries a week, no meter at either end, and two of them recorded as repairs.'],
    'su-h06': ['deforestation-log-pile', 'The last lorry out. Six hundred and eleven hectares replanted; the 2018 sowing came up at zero percent.'],
    'su-h07': ['animal-crate-airport', 'Manaus logistics. The permit obliges the operator to supply the concession population. The population is 5,240. The occupants served since 1998 are zero.'],
    'su-h09': ['uranium-ore-sacks', 'Custody transfer CP-4. The gap between the two vehicles is 569 hectares and one year of returns.'],

    'pr-h04': ['blight-dead-orchard', 'X-77 applied area, 1994 to 2019. Ten thousand two hundred and eighty-one tonnes applied; two thousand five hundred tonnes reported.'],
    'pr-h05': ['blight-crop-rotation', 'BS-22 adjuvant, rotation trial. Yield improvement of nineteen percent on plots with a nine-year history of BS-22.'],
    'pr-h06': ['toxic-mutation-livestock', 'PF-40. 611 tonnes manufactured, 4.1 tonnes sold.'],
    'pr-h07': ['animal-pig-farm', 'BS-3 ethics application. One thousand four hundred and seventy subjects dosed against an approved ceiling of forty.'],
    'pr-h09': ['ruins-charred-hall', 'Eighty-four AR-21 warranty claims declined. The denial is the photograph: the letter cites the fire, and the fire is not on the record.'],

    'pw-h03': ['papers-corridor-archive', 'The withdrawn statement. Paragraph four was added on the day of withdrawal; paragraph nine was volunteered and is the only paragraph that was true.'],
    'pw-h08': ['papers-burn-basin', 'The arithmetic paragraph, printed. Cheapest to retire is not a position on a balance sheet; it is a payment to remove what is on one.'],

    'ct-h01': ['munitions-test-range', 'Arrangement one of eight. The name on the lease is not the name on the range.'],
    'ct-h02': ['munitions-silo', 'Forty-one opinions were requested. None was filed. The contents of the silo were reclassified twice to avoid the question.'],
    'ct-h03': ['uranium-container-yard', 'Holloway & Fitch. The firm that will not name its witnesses is the firm that holds the yard.'],
    'ct-h05': ['munitions-factory-line', 'An undisclosed firm at Jurong. The incorporation is real; the address is a forwarding office; the line has a name of its own.'],
    'ct-h06': ['human-sedan-curtain', 'The Shenzhen property vehicle. It is a company, it owns six plots, and it has one employee who is a director.'],
    'ct-h07': ['human-courier-handover', 'Hall\u2019s Witness Service. It will hold, transport and hand over a sealed item without asking what is in it, and it will do so for either side.'],
    'ct-h08': ['munitions-shell-crates', 'The Riverside Group. Shell crates move through it at a rate that reconciles with no production schedule the Group has published.'],
    'ct-h09': ['aero-hangar-night', 'The advisers who reviewed the advisers. The review was performed by a firm incorporated eleven weeks earlier by the firm it reviewed.'],
    'ct-h10': ['aero-wing-frost', 'The 2021 opinion. It is correct on every point and it is addressed to a company that has since changed its name twice.'],
    'ct-h11': ['aero-engine-test-stand', 'The four sentences, on the record, in order, without a subject.'],

    'bd-1': ['uranium-mill-tails', 'Board minute. The item was introduced as a decommissioning liability and carried without discussion.'],
    'bd-2': ['uranium-ore-pile', 'Board minute. Whose trees are these. The answer given was that they are Pentex trees.'],
    'bd-3': ['ruins-flooded-plant', 'Board minute. The property was written down, which is the only thing that ever happens to it.'],

    'gr-h04': ['fire-night-glow', 'Episode seven, 2016. Canopy removed in nine weeks, without burning, because the memorandum said a line and not a fire.']
  };

  var CREDENTIAL_FAIL = 'credential rejected — this room needs the sub-level 4 session. <a href="portal.html">Return to the portal</a>';

  /* ---------- state ---------- */

  var cwd = '/';
  var history = [];
  var histAt = 0;
  var idleTimer = null;
  var evidence = {};
  var byId = P.byId || {};
  var byName = P.byName || {};
  var elTerm = null;
  var elIn = null;
  var elInput = null;

  P.ARCHIVE.files.forEach(function (f) {
    byId[f.id] = f;
    byName[f.path.split('/').filter(Boolean).pop()] = f;
  });

  /* ---------- lazy chunks ----------
     A directory whose documents live in assets/js/archive/<chunk>.js is fetched
     the first time you ls, cd into, or stat inside it. The script calls
     P.REGISTER with its own documents, which is what puts them in FS and byId. */
  /* A directory is backed by one or more chunk scripts. The generated bulk and
     the hand-written material are separate files, so a regeneration of the bulk
     never destroys anything authored by hand. */
  function chunksFor(dir) {
    var out = [];
    var gen = P.dirsKnown && P.dirsKnown[dir];
    if (gen) out.push(gen);
    var hand = P.handChunks && P.handChunks[dir];
    if (hand) out.push(hand);
    return out;
  }

  function loadScript(src, onOk, onFail) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = onOk;
    s.onerror = onFail;
    document.head.appendChild(s);
  }

  /* A directory may have a generated chunk, a hand-written chunk, or both. A
     missing chunk is not an error if the other one loads: several directories
     hold only authored material and have nothing generated to mount. */
  function mount(dir, then) {
    if (mounted[dir] || loading[dir]) {
      then();
      return;
    }
    var chunks = chunksFor(dir);
    if (!chunks.length) {
      then();
      return;
    }
    loading[dir] = true;
    var i = 0;
    var failed = 0;
    (function next() {
      if (i >= chunks.length) {
        loading[dir] = false;
        var rows = (P.FS[dir] || []).length;
        if (failed === chunks.length) {
          line('bad', 'cannot mount ' + dir + '. The store object is missing or unreadable.');
        } else {
          mounted[dir] = true;
          line('meta', 'mounted ' + dir + ' — ' + rows + ' objects');
        }
        then();
        return;
      }
      loadScript(
        CORPUS + chunks[i++] + '.js',
        next,
        function () {
          failed += 1;
          next();
        },
      );
    })();
  }

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

  /* Directories that exist in the store index but have no documents mounted yet.
     They show up in `ls /` as unmounted, which is the honest state. */
  function knownDirs() {
    var out = [];
    Object.keys(P.dirsKnown || {}).forEach(function (d) {
      if (d === '/') return;
      if (out.indexOf(d) === -1) out.push(d);
    });
    Object.keys(P.FS).forEach(function (d) {
      if (d !== '/' && out.indexOf(d) === -1) out.push(d);
    });
    return out;
  }

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
    line('doc', 'product [code]      the catalogue, and what each line is for');
    line('doc', 'patent [number]     the patent estate');
    line('doc', 'magi [name]         external practitioners Pentex retains');
    line('doc', 'garou [name]        the Garou watch — allies, enemies, unresolved');
    line('doc', 'party [name]        shippers, nominees, contractors, adversaries');
    line('doc', 'photos              the photographs recovered with it');
    line('doc', 'evidence            what you have actually read');
    line('doc', 'clear               clear the screen');
    line('meta', 'Reading a document is the only thing that counts. Searching is not reading.');
    line('meta', 'Directories with no documents yet are loaded the first time you ls or cd into them.');
  };

  function pick(list, arg, fields) {
    var q = String(arg || '').toLowerCase();
    return list.filter(function (r) {
      if (!q) return true;
      return Object.keys(r).some(function (k) {
        return String(r[k]).toLowerCase().indexOf(q) !== -1;
      });
    });
  }

  CMD.product = function (args) {
    var rows = pick(P.PRODUCTS, args.join(' '));
    if (!rows.length) {
      line('bad', 'product: nothing in the catalogue matches that.');
      return;
    }
    rows.forEach(function (r) {
      line('hdr', r.code + '  ' + r.name);
      line('doc', '  division  ' + r.div + '   ' + siteLabel(r.site));
      line('doc', '  published  ' + r.use);
      line('warn', '  internal   ' + r.note);
      line('meta', '  ' + r.id);
    });
    line('meta', rows.length + ' of ' + P.PRODUCTS.length + ' catalogue lines.');
  };

  CMD.patent = function (args) {
    var rows = pick(P.PATENTS, args.join(' '));
    if (!rows.length) {
      line('bad', 'patent: no such filing.');
      return;
    }
    rows.forEach(function (r) {
      line('hdr', r.no + '   [' + r.status + ']');
      line('doc', '  ' + r.title);
      line('doc', '  filed ' + r.filed + '   division ' + r.div);
      line('warn', '  ' + r.note);
    });
    line('meta', rows.length + ' of ' + P.PATENTS.length + ' filings.');
  };

  CMD.magi = function (args) {
    var rows = pick(P.MAGI, args.join(' '));
    if (!rows.length) {
      line('bad', 'magi: no such practitioner.');
      return;
    }
    rows.forEach(function (r) {
      line('hdr', r.name + '   ' + r.discipline);
      line('doc', '  ' + r.city);
      line('warn', '  ' + r.note);
    });
    line('meta', rows.length + ' of ' + P.MAGI.length + ' retained.');
  };

  CMD.garou = function (args) {
    var rows = pick(P.GAROU, args.join(' '));
    if (!rows.length) {
      line('bad', 'garou: no such file in the watch.');
      return;
    }
    rows.forEach(function (r) {
      line('hdr', r.name + '   ' + r.breed + (r.stance ? '   [' + r.stance + ']' : ''));
      line('doc', '  ' + r.city);
      line('warn', '  ' + r.note);
    });
    line('meta', rows.length + ' of ' + P.GAROU.length + ' watched.');
    line('warn', 'The stance column is a Pentex classification. It is wrong about at least two.');
  };

  CMD.party = function (args) {
    var rows = pick(P.COUNTERPARTIES, args.join(' '));
    if (!rows.length) {
      line('bad', 'party: no such counterparty.');
      return;
    }
    rows.forEach(function (r) {
      line('hdr', r.name + '   ' + r.kind);
      line('doc', '  ' + r.city);
      line('warn', '  ' + r.note);
    });
    line('meta', rows.length + ' of ' + P.COUNTERPARTIES.length + ' counterparties.');
  };

  CMD.pwd = function () {
    line('ok', cwd);
  };

  CMD.ls = function (args) {
    var target = args[0] ? normalise(args[0]) : cwd;
    if (!P.FS[target] && !(P.dirsKnown && P.dirsKnown[target])) {
      line('bad', 'ls: ' + (args[0] || '') + ': no such directory');
      return;
    }
    if (target !== cwd && target !== '/') {
      line('doc', 'drwxr-xr-x   -   -   -  ../' + entryId(target));
    }
    if (!P.FS[target]) {
      mount(target, function () {
        CMD.ls([target]);
      });
      return;
    }

    if (target === '/') {
      knownDirs().forEach(function (d) {
        var n = (P.FS[d] || []).length;
        line('doc', '  drwxr-xr-x  ' + (n ? String(n).padStart(6) + '  ' : '       ') + d + '/');
        line('meta', '    ' + (P.ARCHIVE.dirs[d] || '') + (n ? '' : '   [not mounted]'));
      });
    }

    var rows = P.FS[target] || [];
    line('hdr', target + '   ' + rows.length + (rows.length === 1 ? ' item' : ' items'));
    rows.forEach(function (e) {
      var enc = e.enc ? '[' + e.enc + ']' : e.fmt === 'csv' ? '[csv ]' : '      ';
      line(
        'doc',
        '  -rw-r--r--  ' + size(e.size).padStart(7) + '  ' + e.date + '  ' + enc + '  ' + e.name
      );
      line('meta', '    ' + e.cls + ' · ' + (byId[e.id] ? byId[e.id].title : ''));
    });
  };

  CMD.tree = function () {
    line('hdr', 'DROPBOX');
    knownDirs().forEach(function (d) {
      var rows = P.FS[d] || [];
      line('doc', '  ' + d + '/   (' + (P.ARCHIVE.dirs[d] || '') + ')');
      if (!rows.length) {
        line('meta', '    not mounted — cd ' + d + ' to pull it');
        return;
      }
      rows.forEach(function (e) {
        var enc = e.enc ? '  [' + e.enc + ']' : e.fmt === 'csv' ? '  [csv]' : '';
        line('meta', '    ' + e.name + enc + '  — ' + e.cls);
      });
    });
    line('hdr', '/');
    (P.FS['/'] || []).forEach(function (e) {
      line('meta', '    ' + e.name + '  — ' + e.cls);
    });
    line('warn', total() + ' documents mounted. ' + evidenceCount() + ' read.');
  };

  CMD.cd = function (args) {
    if (!args[0]) {
      line('ok', cwd);
      return;
    }
    var target = normalise(args[0]);
    if (!P.FS[target]) {
      if (P.dirsKnown && P.dirsKnown[target]) {
        mount(target, function () {
          if (P.FS[target]) {
            cwd = target;
            CMD.ls([]);
          }
        });
        return;
      }
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
    if (f.fmt === 'csv') {
      renderSheet(f);
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
    line('doc', '  ' + evidenceCount() + ' of ' + total() + ' documents read.');
    line('meta', '  board: evidence.html');
  };

  CMD.dl = function (args) {
    var f = resolve(args[0]);
    if (!f) {
      line('bad', 'dl: ' + (args[0] || '') + ': no such file');
      return;
    }
    download(f, plain(f), f.fmt === 'csv' ? '.csv' : '.txt');
    if (!f.enc) markRead(f.id);
    line('meta', 'A copy on your disk is not evidence. Reading it here is.');
  };

  function download(f, body, ext) {
    // The stored name already carries its extension. Only append when it does
    // not, or the file lands on disk as `report.txt.csv`.
    var name = entryId(f.path);
    if (ext && !/\.[a-z0-9]+$/i.test(name)) name += ext;
    var blob = new Blob([body], {
      type: (/\.csv$/i.test(name) ? 'text/csv' : 'text/plain') + ';charset=utf-8',
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 2000);
    line('ok', 'wrote ' + name + ' (' + size(body.length) + ')');
  }

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
      line('ok', 'recorded ' + f.id + ' — ' + evidenceCount() + '/' + total());
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

    line('meta', 'read ' + f.id + ' · ' + evidenceCount() + '/' + total() + (counts ? '' : ' (raw store)'));
    scroll();
  }

  /* ---------- ledger rendering ----------
     A .csv is not a document, it is a document with rows. Rendering it as
     monospaced text loses the only thing that matters about a ledger, which is
     which column the money went to. So it gets a table, and the rows worth
     looking at get marked. */
  function parseCsv(text) {
    var rows = [];
    var row = [];
    var cell = '';
    var q = false;
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (q) {
        if (ch === '"') {
          if (text.charAt(i + 1) === '"') {
            cell += '"';
            i++;
          } else q = false;
        } else cell += ch;
      } else if (ch === '"') q = true;
      else if (ch === ',') {
        row.push(cell);
        cell = '';
      } else if (ch === '\n') {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = '';
      } else if (ch !== '\r') cell += ch;
    }
    if (cell !== '' || row.length) {
      row.push(cell);
      rows.push(row);
    }
    return rows.filter(function (r) {
      return r.length && String(r[0]).trim() !== '';
    });
  }

  var MONEY = /^[^,]*$/;

  function moneyish(v) {
    var t = String(v).trim().replace(/[\s,]/g, '');
    return /^[-+]?[$€£¥]?\d+(\.\d+)?$/.test(t) && /\d/.test(t);
  }

  function renderSheet(f) {
    markRead(f.id);
    var rows = parseCsv(plain(f));
    if (!rows.length) {
      line('bad', f.path + ' has no rows.');
      return;
    }
    var head = rows[0].map(function (c) {
      return String(c).trim();
    });
    var bodyRows = rows.slice(1);

    var width = head.map(function (h, i) {
      var w = h.length;
      bodyRows.forEach(function (r) {
        w = Math.max(w, String(r[i] === undefined ? '' : r[i]).length);
      });
      return Math.min(w, 26);
    });
    // Named rowW, not total: `total` is the archive-wide count and shadowing it
    // here silently breaks every evidence line inside this function.
    var rowW = width.reduce(function (a, b) {
      return a + b + 2;
    }, 0);
    if (rowW > 104) {
      var scale = 104 / rowW;
      width = width.map(function (w) {
        return Math.max(6, Math.floor(w * scale));
      });
    }

    var box = document.createElement('div');
    box.className = 'doc doc--sheet';

    var bar = document.createElement('div');
    bar.className = 'doc__bar';
    var b0 = document.createElement('b');
    b0.textContent = entryId(f.path);
    bar.appendChild(b0);
    bar.appendChild(document.createTextNode(f.date));
    var fl = document.createElement('span');
    fl.className = 'flag';
    fl.textContent = 'ledger · ' + bodyRows.length + ' rows';
    bar.appendChild(fl);
    var cl = document.createElement('span');
    cl.textContent = f.tags.indexOf('press') !== -1 ? 'PUBLIC' : 'RESTRICTED';
    bar.appendChild(cl);
    box.appendChild(bar);

    var wrap = document.createElement('div');
    wrap.className = 'sheet';

    function emit(cells, kind, flags) {
      var r = document.createElement('div');
      r.className = 'sheet__r' + (kind ? ' sheet__r--' + kind : '');
      cells.forEach(function (c, i) {
        var cell = document.createElement('span');
        cell.className = 'sheet__c' + (flags && flags[i] ? ' sheet__c--' + flags[i] : '');
        var t = String(c === undefined ? '' : c).trim();
        cell.textContent = width[i] < 6 ? t.slice(0, 6) : t.length > width[i] ? t.slice(0, width[i] - 1) + '…' : t;
        r.appendChild(cell);
      });
      wrap.appendChild(r);
    }

    emit(head, 'head', null);

    // A row is interesting if any cell says so. The corpus marks them.
    bodyRows.forEach(function (r) {
      var flagged = [];
      var any = false;
      r.forEach(function (c, i) {
        var t = String(c === undefined ? '' : c).toLowerCase();
        if (t.indexOf('!!') === 0 || t.indexOf('flag:') === 0) {
          flagged[i] = 'hot';
          any = true;
        } else if (moneyish(t)) {
          flagged[i] = 'num';
        }
      });
      emit(r, any ? 'hot' : null, flagged);
    });

    box.appendChild(wrap);

    var acts = document.createElement('div');
    acts.className = 'doc__actions';
    var dl = document.createElement('button');
    dl.type = 'button';
    dl.className = 'btn-b';
    dl.textContent = 'download .csv';
    dl.addEventListener('click', function () {
      download(f, plain(f), '.csv');
      scroll();
    });
    acts.appendChild(dl);
    var sum = document.createElement('button');
    sum.type = 'button';
    sum.className = 'btn-b';
    sum.textContent = 'column totals';
    sum.addEventListener('click', function () {
      columnTotals(f, head, bodyRows);
      scroll();
    });
    acts.appendChild(sum);
    var cite = document.createElement('button');
    cite.type = 'button';
    cite.className = 'btn-b';
    cite.textContent = 'mark as read';
    cite.addEventListener('click', function () {
      markRead(f.id);
      cite.disabled = true;
      cite.textContent = 'recorded';
      line('ok', 'recorded ' + f.id + ' — ' + evidenceCount() + '/' + total());
      scroll();
    });
    acts.appendChild(cite);

    if (f.note) {
      var nt = document.createElement('p');
      nt.className = 'sheet__note';
      nt.textContent = f.note;
      box.insertBefore(nt, acts);
    }

    box.appendChild(acts);
    elIn.appendChild(box);
    line('meta', 'read ' + f.id + ' · ' + evidenceCount() + '/' + total());
    scroll();
  }

  function columnTotals(f, head, rows) {
    line('hdr', 'COLUMN TOTALS — ' + entryId(f.path));
    head.forEach(function (h, i) {
      var sum = 0;
      var seen = 0;
      var neg = 0;
      rows.forEach(function (r) {
        var t = String(r[i] === undefined ? '' : r[i]).trim().replace(/[\s,]/g, '');
        if (/^[-+]?[$€£¥]?\d+(\.\d+)?$/.test(t)) {
          var v = parseFloat(t.replace(/[$€£¥]/g, ''));
          if (!isNaN(v)) {
            sum += v;
            seen++;
            if (v < 0) neg++;
          }
        }
      });
      if (!seen) {
        line('doc', '  ' + h.padEnd(22) + '—');
        return;
      }
      var out = size(Math.abs(sum)).padStart(9) + (sum < 0 ? ' out' : ' in');
      line('doc', '  ' + h.padEnd(22) + out);
      if (neg) line('warn', '  ' + ' '.repeat(22) + neg + ' negative line(s)');
    });
    line('meta', 'Totals are arithmetic. Where the money went is not.');
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
    line('sys', 'DROPBOX · mount ok · ' + total() + ' objects in the index');
    line('sys', P.ARCHIVE.credsNote);
    line('hdr', 'DIRECTORIES');
    knownDirs().forEach(function (d) {
      var n = (P.FS[d] || []).length;
      line('doc', '  ' + (d + '/').padEnd(18) + (P.ARCHIVE.dirs[d] || ''));
      if (!n) line('meta', '  ' + ' '.repeat(18) + '[not mounted]');
    });
    line('meta', 'Directories with no documents yet are pulled the first time you ls or cd into them.');
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