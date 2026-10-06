# Pentex Industries Worldwide

A two-layer static website for a fictional company.

The surface layer is a competent multinational corporate site: mission, leadership,
facilities, sustainability reporting, careers, newsroom, contact. It reads like a
company that has an investor-relations department and a real ethics committee.

Underneath it is a small game. A restricted portal opens onto a file server holding
**2,385 internal documents** across **20 directories** — board minutes, plant
reports, product safety data, patent drafts, wire ledgers, personnel records, the
papers of a people who work for the company and describe what they saw. All of it
sits behind a credential that can be derived entirely from the public pages. Some of
it is stored obfuscated; some of it is a spreadsheet. Reading a document marks it on
an evidence board. The site never tells you how to log in, and it never tells you
when you are done.

There is no monster in the archive. What is in the archive is a company, and the
decisions it took, and the paperwork that made them deniable.

Everything is fictional. Pentex does not exist. Neither does any person, division,
site, programme, or document named here. The company is drawn from the World of
Darkness tabletop roleplaying game *Werewolf: The Apocalypse*, and the writing leans
hard into what that setting implies about an industrial conglomerate that treats
peoplehood as a supply chain input. Nothing in this repository is a claim about any
real company, product, or event.

---

## Running it

Any static file server works. From the project root:

```sh
npx serve .
```

or with Python:

```sh
python -m http.server 8080
```

Then open `http://localhost:8080/`.

Opening `index.html` directly from disk will not work. The pages load their
content from `assets/js/data.js` via a `<script>` tag and the terminal uses
`sessionStorage` and `Blob` downloads, both of which need an HTTP origin.

## Publishing to GitHub Pages

The repository is a complete static site with no build step. Nothing is compiled.

1. Push everything to GitHub — including the `.nojekyll` file, which is present and
   empty. It stops Pages from running Jekyll, which would otherwise ignore the
   underscore-free asset layout.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Pick the branch and the `/ (root)` folder. Save.
5. The site is published at `https://<user>.github.io/<repo>/`.

Paths in the markup are all root-relative to the site root, so a project site
served from a subdirectory works without modification. If you rename the repository
after the first publish, re-save the Pages settings so the base path is regenerated.

There is no server-side code, no database, and no API. The "session" that unlocks the
archive is a `sessionStorage` key; the evidence board is a `localStorage` key. Both
live in the browser and neither leaves the machine.

## Layout

```
index.html        corporate landing page
about.html        mission, values, strategy, the credential standard,
                  and a plain-language guide to the setting
leadership.html   board and executive directory (published names only)
facilities.html   the nine sites
sustainability.html  programmes and press releases
careers.html      the open-role process and the internal directory
newsroom.html     releases and their index
contact.html      division contacts and site addresses
portal.html       credential gate for sub-level 4
archive.html      the file server
evidence.html     the case board
404.html

assets/css/base.css       tokens, reset, type scale
assets/css/corporate.css  the corporate layer
assets/css/breach.css     the breach layer
assets/js/data.js         the 32 spine documents, the company, the cast, the clues
assets/js/lore.js         the world model + the growth API the chunks register into
assets/js/site.js         corporate page renderers
assets/js/auth.js         the gate
assets/js/terminal.js     the file server
assets/js/evidence.js     the case board
assets/js/archive/*.js    35 archive chunks, loaded on demand

assets/img/               79 photographs, .webp
tools/build_pages.mjs     regenerates the eight secondary pages
tools/gen_images.mjs      image generator (NVIDIA Build, Flux)
tools/gen_corpus.mjs      procedural document generator (deterministic)
tools/fix_encoding.mjs    detects and repairs mojibake and stray BOMs
tools/qa.mjs              pre-ship assertions
tools/test_terminal.mjs   headless test harness for the terminal
PLAN.md                   the build plan
```

`assets/js/data.js` is the only place the public company's facts live. Pages ship
empty containers and `site.js` fills them. No page has a hardcoded company fact in
it, which is why the terminal, the case board, and the public pages cannot drift
apart.

The archive is split. `data.js` holds 32 documents written to be read by hand. The
rest lives in `assets/js/archive/` as 35 chunks and is loaded on demand — `cd /finance`
pulls one file down and evaluates it. Sixteen of those chunks are procedural and
regenerated from a seeded PRNG; nineteen are hand-written and are the ones worth
reading. The world model (`lore.js`) exports `REGISTER(dir, files)`, which is what
lets a chunk add itself to both the document list and the directory tree without
knowing anything about either.

## The credential

Not written down here on purpose. Both halves are derivable from public pages:
the badge identifier appears in the directory table on `careers.html`, and the
passphrase is the first word of the second published Group value on `about.html`.
The site's own copy admits this, in the refusal message, on the third failed attempt.

Wrong attempts are not locked out. The gate is a puzzle, not a security control.

## Regenerating images

The seventy-nine photographs come from `black-forest-labs/flux.2-klein-4b` on NVIDIA
Build. The key is read from the environment and is never stored in the repository:

```sh
# PowerShell
$env:NVIDIA_API_KEY = "nvapi-..."
node tools/gen_images.mjs

# bash
NVIDIA_API_KEY=nvapi-... node tools/gen_images.mjs
```

Useful flags:

- `--force` — regenerate images that already exist.
- `--only=name,name` — regenerate a named subset.

The script is idempotent: anything already in `assets/img/` over 4 KB is skipped, so
a partial run can be resumed by rerunning it. Raw downloads land in `assets/img/raw/`
and are converted to `.webp` with ImageMagick when it is on `PATH`; the intermediate
files are deleted afterwards. If `magick` is missing the raw bytes are copied to the
`.webp` path instead, which browsers will still render.

## Regenerating the archive

Two thirds of the corpus is generated, one third is written. Both halves are
reproducible.

The procedural half comes from `tools/gen_corpus.mjs`, which is seeded, so the same
seed always produces the same sixteen chunk files:

```sh
node tools/gen_corpus.mjs          # report only
node tools/gen_corpus.mjs --write  # rewrite assets/js/archive/*.js
```

The nineteen hand-written chunks follow one convention, and copying an existing
chunk is the fastest way to start a new one:

```js
(function (global) {
  'use strict';
  var P = global.PENTEX;

  function doc(id, name, title, date, src, tags, body) {
    return {
      id: id,
      path: '/legal/' + name,
      name: '/legal/' + name,   // hand chunks set name === path
      title: title,
      date: date,
      src: src,
      tags: tags,
      body: body.replace(/\n[ \t]+$/gm, '\n').trim()
    };
  }

  function reg(dir, arr) {
    var fs = P.FS[dir] || (P.FS[dir] = []);
    var seen = {};
    fs.forEach(function (e) { seen[e.name] = 1; });
    var kept = arr.filter(function (d) { return !seen[d.name]; });
    if (kept.length) P.REGISTER(dir, kept);
    return kept.length;
  }

  var G = [];
  G.push(doc('lg-h01', 'settlement_clauses.txt', '...', '1998-06-02', 'Legal', ['legal'], '...'));
  reg('/legal', G);
})(typeof window !== 'undefined' ? window : this);
```

Two things that are easy to get wrong. A chunk must resolve the archive through
`global.PENTEX`, not `window.PENTEX` — the loader that headless checks use rewrites
both, but the browser only has one of them in scope. And `reg` filters against
`P.FS[dir]` before registering, because the procedural chunk for a directory is
usually loaded first and already owns most of the filenames; a hand chunk that
skips this check silently overwrites procedural documents or fails to register at
all.

## Regenerating the secondary pages

`index.html`, `portal.html`, `archive.html` and `evidence.html` are hand-written
because their structure is not repetitive. The other eight pages are emitted by
`tools/build_pages.mjs`, which bakes in the shared masthead, navigation state, and
footer:

```sh
node tools/build_pages.mjs
```

It overwrites those eight files. It does not touch the four hand-written ones.

## Checks

```sh
node tools/qa.mjs
node tools/test_terminal.mjs
```

`qa.mjs` exits non-zero on any failure. It asserts, among other things:

- no NVIDIA key anywhere in the tree
- every `.js` and `.mjs` file parses
- `data.js` evaluates and every collection is present
- the credential is actually derivable from published data, and the derivation
  matches the stored value — if the clue and the answer ever drift, this fails
- every image referenced by markup or script exists on disk
- every element id a renderer reaches for exists on the page that loads it
- no site secret, private person note, unpublished name, or document body has
  leaked into a public HTML file
- every internal link resolves
- no `console.*`, no `alert()`, no inline `style=` attributes
- the whole corpus loads: `data.js`, `lore.js` and all 35 chunks are evaluated in
  order, then 2,385 documents are checked for a leading-slash path, a string title
  and body, a unique id, a unique path, presence in the directory listing, a
  recognised `enc`, and no replacement characters

The leak check is the one that matters most. The whole design depends on the public
layer staying public.

`test_terminal.mjs` is a headless DOM harness for the minigame. It boots the real
`data.js`, `lore.js`, chunks and `terminal.js` against a stub `localStorage`,
`sessionStorage` and `document`, then drives the shell the way a player would:
435 assertions across eight groups — store integrity, shell commands, every
directory, the three obfuscated stores, all 149 CSV ledgers, the evidence board,
downloads, and the idle-timeout guard.

## A note on the aesthetic

Two visual systems, deliberately not reconciled. The corporate layer uses the
Pentex mark, a squared-off industrial grotesque, and a navy-and-teal palette with
zero border radius — the logo has hard corners, so nothing softens against it.

The breach layer is a different instrument: near-black, amber phosphor, a fixed
scanline overlay, a blinking block cursor, monospace throughout. It is not the
corporate site with the colours inverted. It is a different machine.

Neither layer is allowed an emoji, a CSS framework, a gradient button, or a rounded
card. The restraint is the point.

## Appendix: how to get in (spoilers)

<details>
<summary>The two halves of the credential, and where to start reading</summary>

**Badge:** `j.venner`

Open `careers.html` and read the certification directory table. It publishes room
number, role, department, site, badge and mailbox for every director and officer the
Group considers publishable. One of them sits in room **22-09**, Regulatory
Engineering, and that row's badge is `j.venner`. The portal asks for the badge, not
the mailbox, which is why typing the address does not work.

**Passphrase:** `measured`

Open `about.html` and read the published Group values — the second card is
**Measured Benefit**. The passphrase is its first word, lowercased. This is not a
guess; `/legal/lg-h03` is a 1998 internal review of the credential standard that
proposes exactly this derivation and records the recommendation as *accepted* and
the implementation as *deferred*, which is why the gate is still trivially open.

**Where to start.** `cat /INDEX.txt` after you are through. Then follow the dates,
not the amounts: `/finance` holds the wire ledgers, `/legal` holds the clauses, and
`/garou` holds a letter from the only people in this story who have nothing to gain
from writing it.

If you want the shortest path to the thing the campaign is actually about, read
`/sublevel4/s4-h05` — the four authorised eyes — and then find out who the fourth
one is.

The evidence board at `evidence.html` fills as you read. It is not a puzzle with an
answer; it is a count, and the last document is worth more than the first two
thousand.

</details>