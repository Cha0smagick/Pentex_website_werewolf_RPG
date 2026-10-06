# Pentex Industries Worldwide

A two-layer static website for a fictional company.

The surface layer is a competent multinational corporate site: mission, leadership,
facilities, sustainability reporting, careers, newsroom, contact. It reads like a
company that has an investor-relations department and a real ethics committee.

Underneath it is a small game. A restricted portal opens onto a file server where
32 internal documents sit behind a credential that can be derived entirely from the
public pages. Some are stored obfuscated. Reading them marks them on an evidence
board. The site never tells you how to log in, and it never tells you when you are done.

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
about.html        mission, values, strategy, the credential standard
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
assets/js/data.js         every string and record on the site
assets/js/site.js         corporate page renderers
assets/js/auth.js         the gate
assets/js/terminal.js     the file server
assets/js/evidence.js     the case board

assets/img/               photographs, .webp
tools/gen_images.mjs      image generator (NVIDIA Build, Flux)
tools/build_pages.mjs     regenerates the eight secondary pages
tools/fix_encoding.mjs    detects and repairs mojibake and stray BOMs
tools/qa.mjs              pre-ship assertions
PLAN.md                   the build plan
```

`assets/js/data.js` is the only place content lives. Pages ship empty containers and
`site.js` fills them. No page has a hardcoded company fact in it, which is why the
terminal, the case board, and the public pages cannot drift apart.

## The credential

Not written down here on purpose. Both halves are derivable from public pages:
the badge identifier appears in the directory table on `careers.html`, and the
passphrase is the first word of the second published Group value on `about.html`.
The site's own copy admits this, in the refusal message, on the third failed attempt.

Wrong attempts are not locked out. The gate is a puzzle, not a security control.

## Regenerating images

The sixteen photographs come from `black-forest-labs/flux.2-klein-4b` on NVIDIA
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
```

Exits non-zero on any failure. It asserts, among other things:

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

The leak check is the one that matters most. The whole design depends on the public
layer staying public.

## A note on the aesthetic

Two visual systems, deliberately not reconciled. The corporate layer uses the
Pentex mark, a squared-off industrial grotesque, and a navy-and-teal palette with
zero border radius — the logo has hard corners, so nothing softens against it.

The breach layer is a different instrument: near-black, amber phosphor, a fixed
scanline overlay, a blinking block cursor, monospace throughout. It is not the
corporate site with the colours inverted. It is a different machine.

Neither layer is allowed an emoji, a CSS framework, a gradient button, or a rounded
card. The restraint is the point.