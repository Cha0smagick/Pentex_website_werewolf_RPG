# Pentex Industries Worldwide

### Chemistry that holds.

A complete, playable fictional breach archive built as a static website. It presents itself
as the public and internal web presence of **Pentex Industries Worldwide, Inc.** — a chemical
conglomerate that treats *peoplehood* as a supply-chain input. Behind the corporate site is a
sub-level-4 controlled-access terminal holding **2,385 internal documents** that nobody was
supposed to publish.

The site is live, deployed, and open for public exploration and roleplay.

> ### Live site
> **https://cha0smagick.github.io/Pentex_website_werewolf_RPG/**
>
> Read it in order. It is meant to be read in order.

---

## Table of contents

- [Fiction disclaimer](#fiction-disclaimer)
- [Start here — the access guide](#start-here--the-access-guide)
  - [Door 1 — The public floor](#door-1--the-public-floor)
  - [Door 2 — The credential](#door-2--the-credential)
  - [Door 3 — The drop box](#door-3--the-drop-box)
  - [Door 4 — The evidence board](#door-4--the-evidence-board)
- [Complete terminal command reference](#complete-terminal-command-reference)
- [The archive — all 19 directories](#the-archive--all-19-directories)
- [The six programmes](#the-six-programmes)
- [The three obfuscated documents](#the-three-obfuscated-documents)
- [Full walkthrough — the spine, in reading order](#full-walkthrough--the-spine-in-reading-order)
- [How the site is built](#how-the-site-is-built)
- [Running it locally](#running-it-locally)
- [Tooling](#tooling)
- [Tests and QA](#tests-and-qa)
- [Deployment](#deployment)
- [Project conventions](#project-conventions)
- [Content and cast](#content-and-cast)
- [Licence](#licence)

---

## Fiction disclaimer

Pentex is a fictional corporation drawn from the World of Darkness tabletop roleplaying game
*Werewolf: The Apocalypse*. Every company, person, product, programme, site, document,
regulatory finding and incident on this site is invented for the fiction.

**Nothing here is a claim, allegation or reference to any real company, organisation, person,
product, or real-world event.** Names, room numbers, sites, patents and case files are
composites. Where the archive names a company, it is a fictional one created for this
project.

The subject matter includes fictional corporate wrongdoing, liability, surveillance and
lethal harm as *narrative*. It is presented as a documentary artefact — a leak — not as
commentary on anything real.

---

## Start here — the access guide

There are four doors. Three are open to anyone. One requires a credential that the company
published on its own website without noticing.

---

### Door 1 — The public floor

Nine pages of plausible corporate communications. This is not filler — **the entire puzzle
lives in this layer**, and the archive's own authors say so explicitly.

| # | Page | What it actually gives you |
|---|------|--------------------------|
| 1 | `index.html` | Corporate front page. Pentex Worldwide, tagline, positioning. |
| 2 | `about.html` | Mission statement, **values**, and the long-horizon framing. |
| 3 | `leadership.html` | Board and executive committee — names, roles, prior boards. |
| 4 | `facilities.html` | Nine principal sites, with room numbers. |
| 5 | `sustainability.html` | Registered programmes, volumes, retired programmes. |
| 6 | `careers.html` | **Certification and accountability directory** — a table of employees with room numbers. |
| 7 | `newsroom.html` | The public record — press releases, award citations. |
| 8 | `contact.html` | Divisions, head offices, site addresses. |
| 9 | `404.html` | Not found. |

Read all nine. Two of them — **`careers.html`** and **`about.html`** — contain the halves of
the credential.

---

### Door 2 — The credential

The portal at **`portal.html`** is titled *Pentex — sub-level 4 controlled access*. It asks
for two fields:

- **Employee identifier**
- **Passphrase**

It also tells you, in its own words, how it works:

> Attempts are logged against the badge identifier entered below.
>
> Successful verifications open a session that expires after **400 seconds of inactivity**;
> anything already read stays cached locally.

And below the form, a notice that is either a compliance footnote or a confession:

> Legacy notice. Retention.
>
> Failed verifications are retained for the statutory period and are reviewed by Corporate
> Security. Successful verifications open a session that expires after 400 seconds of
> inactivity; anything already read stays cached locally.

> ### ⚠️ There is no lockout.
> This is a puzzle, not a security control. You may try as many combinations as you like.
> Nothing is brute-forced, because nothing is secret.

---

#### How the credential is derived

The site never states the credential. It publishes **both halves** and lets you assemble it.
The refusal message on the third failed attempt confirms this was deliberate:

> *Credential rejected. Both halves of this credential were published. Neither half is
> secret; that is the finding.*

**Half one — the employee identifier.**
Go to **`careers.html`** → *Certification and accountability directory*. It is a table of
staff with room numbers. Find:

| Field | Value |
|-------|-------|
| Employee | **J. Venner** |
| Room | **22-09 — Regulatory Engineering** |

The portal's login button is labelled *Authenticate*, and the field is *Employee identifier*
— so enter the **badge as printed in the directory**: `j.venner`.

**Half two — the passphrase.**
Go to **`about.html`** → the Group's published **values**. The second value listed is:

> **Measured Benefit**

The passphrase is its first word, lowercased:

```
measured
```

**The credential:**

```
Employee identifier:  j.venner
Passphrase:           measured
```

> **On the record:** `/legal/credential_review_finding.txt` — internal reference `lg-h03`,
> titled *Group Credential Standard CS-2004-11 — review finding*, dated 2016-03-02, authored
> by Group Information Security and reviewed by Group Legal — is reachable only *after* you
> authenticate. It formalises this derivation, proposing that the Group-value route is the
> accepted method, with the earlier mission-statement route deferred. Reading it is the
> reward for solving the gate. The archive agrees with you: *You do not build a verification
> standard for a small thing.*

---

### Door 3 — The drop box

On success the portal hands you **`archive.html`** — the **DROPBOX**, sub-level 4.

It presents as a terminal over the corporate skin. You get a prompt, a working directory, and
a filesystem containing **2,385 documents across 19 directories**, plus an `/INDEX.txt` entry
point at the root.

Three structural facts worth knowing before you start:

1. **Start at the root.** `/INDEX.txt` is the entry point the archive provides for itself.
2. **Directories lazy-load.** *Directories with no documents yet are loaded the first time you
   `ls` or `cd` into them.* So a directory can look empty on first touch and populate the
   next time.
3. **Reading is the only thing that counts.** The terminal says it outright:
   > *Reading a document is the only thing that counts. Searching is not reading.*

   `find` will not advance the evidence board. Only opening a document does.

---

### Door 4 — The evidence board

**`evidence.html`** — case **R9F-114**.

> Every document you actually opened in the drop box is recorded here, in the order the room
> kept it. This board lives in your browser. Clearing your browser clears the board.

- Progress counter: **`0 / 2385`**, incrementing as you read.
- Ordered record of what you actually opened.
- Persisted in `localStorage`, so it survives reloads and tab closes.
- **Clear this board** wipes it.

The board is the scoreboard *and* the case file. Its own case note:

> Thirty-two documents. Six programmes. Nine sites. One habit: the paperwork is always
> written by someone with a room number, and the room number is printed on the public site.
>
> Nothing here is exotic. There is no curse, no blood potion, no cult in a basilica. There is
> a chain of approvals, a method for shortening the distance between an approval and a death,
> and a company that publishes its accountability rooms because assessors ask for them.
>
> The archive's own authors named it: *they built the verifier.*
>
> Case R9F-114 stays open. We are nine people and one of us is a veterinarian who did not
> know she was in the company.

Links back: **Drop box**, **Lock** (returns to the gate), **Public site**.

---

## Complete terminal command reference

Extracted verbatim from the terminal's own `help`. There are no hidden commands.

| Command | What it does |
|---------|--------------|
| `ls [dir]` | List a directory |
| `cd <dir>` | Change directory |
| `pwd` | Print working directory |
| `cat <file>` | Open a document |
| `dec <file>` | Decode a stored document (`b64`, `hex`, `rot13`) |
| `find <term>` | Search every document for a term |
| `stat <file>` | Document metadata |
| `dl <file>` | Download a document as `.txt` |
| `tree` | The whole drop box |
| `who` | The people named in this material |
| `product [code]` | The catalogue, and what each line is for |
| `patent [number]` | The patent estate |
| `magi [name]` | External practitioners Pentex retains |
| `garou [name]` | The Garou watch — allies, enemies, unresolved |
| `party [name]` | Shippers, nominees, contractors, adversaries |
| `photos` | The photographs recovered with it |
| `evidence` | What you have actually read |
| `clear` | Clear the screen |

**Notes**

- `dec` is the decode command — not `open`, not `base64`. It accepts `b64`, `hex` and `rot13`.
- `tree` gives you the entire drop box structure in one command. Use it before exploring.
- The `product`, `patent`, `magi`, `garou` and `party` commands are **indexes over the
  archive**, not separate data stores — they take an optional substring filter.
- `dl` writes a real `.txt` file client-side via a `Blob`. Requires an HTTP origin — see
  [Running it locally](#running-it-locally).
- `find` searches document text but **does not count as reading** for the evidence board.
- The session has a **400-second idle timeout**. The terminal shows an `idle` indicator.

---

## The archive — all 19 directories

The root holds `/INDEX.txt` plus nineteen directories:

| Directory | Holds |
|-----------|-------|
| `/black_programs` | Programme agendas, board papers, the mechanisms themselves |
| `/board` | Board minutes, resolutions, sub-committee material |
| `/clinical` | Clinical programme records, trials, subjects |
| `/counterparties` | Shippers, nominees, contractors, adversaries |
| `/field_ops` | Site-level operational reports, rotations, deployments |
| `/finance` | Wire ledgers, transfer trails, the Foundation's money |
| `/garou` | The Garou watch — allies, enemies, unresolved |
| `/legal` | Statutes, hearings, legal opinions, standards proposals |
| `/magi` | External practitioners Pentex retains |
| `/patents` | The patent estate — what is claimed and what it is for |
| `/personnel` | Personnel records, the largest corpus |
| `/press` | Drafted releases that were never issued |
| `/products` | Product datasheets and the catalogue |
| `/r_and_d` | Research and development, the technical spine |
| `/real_estate` | Property, sites, rooms, the physical footprint |
| `/regulatory` | Filings, compliance findings, statutory correspondence |
| `/security` | Corporate Security, access logs, rotation orders |
| `/sublevel4` | The material that was never meant to leave the building |
| `/supply` | Supply chain, of every kind — including the worst kind |

**150 of these documents are CSV ledgers** (concentrated in `/black_programs` and the
financial directories). They are readable with `cat` and downloadable with `dl`, and all 150
are covered by the test suite.

---

## The three obfuscated documents

Three documents are stored encoded and must be decoded in-terminal with `dec`.

| Encoding | Command argument | Exact path |
|----------|------------------|------------|
| ROT13 | `rot13` | `/legal/kill_authorization.txt` |
| Hex | `hex` | `/legal/culprit_excerpt.txt` |
| Base64 | `b64` | `/black_programs/houston_unpermitted_area.txt` |

The terminal lists the available decoders itself via `help`. If a document has an `enc`
field, `dec <file>` handles it and `cat <file>` shows you the encoded form.

---

## The six programmes

The archive is organised around six recurring programme codes. They appear as a column
value throughout the CSV ledgers in `/finance` and `/black_programs`, and each has a
hand-authored summary document:

| Programme | Summary document |
|-----------|------------------|
| CARRION | `/black_programs/carrion_summary.txt` |
| REDLINE | `/black_programs/redline_summary.txt` |
| MAYFLY | `/black_programs/mayfly_summary.txt` |
| CHOIR | `/black_programs/choir_summary.txt` |
| PALIMPSEST | `/black_programs/palimpsest_summary.txt` |
| CAULDRON | `/black_programs/cauldron_summary.txt` |

**Read `/black_programs/programme_crosswalk.txt` first.** It maps all six onto each other and
is the fastest way into the corpus. This is what the evidence board means by *six
programmes*.

---

## Full walkthrough — the spine, in reading order

If you want the intended path rather than the whole corpus, this is it.

**200 of the 2,385 documents are hand-authored** — 32 spine documents in `data.js` and 168
in the `archive/*_hand.js` chunks. Those are the ones worth reading; the remaining 2,185 are
procedurally generated and exist for scale and texture. This walkthrough is entirely
hand-authored material.

**Stage 1 — public layer (no credential needed)**

1. `about.html` → the **values**. Write down the second one.
2. `careers.html` → the **certification directory**. Find **J. Venner**, room **22-09**.
3. Assemble: `j.venner` / `measured`.

**Stage 2 — authenticate, then orient**

4. `portal.html` → enter the credential → lands in `archive.html`.
5. `tree` — learn the shape of the whole thing.
6. `cat /INDEX.txt` — the drop box manifest; the archive introduces itself.
7. `pwd`, `ls` — get oriented. `who` — learn the cast.

**Stage 3 — the spine**

8. `/legal/credential_review_finding.txt` (`lg-h03`) — *Group Credential Standard
   CS-2004-11 — review finding*. **This is the document that closes Door 2 from the inside.**
9. `/black_programs/programme_crosswalk.txt` — maps all six programmes onto each other.
   Read this before anything else in the archive.
10. `/black_programs/why_the_files_are_kept.txt` — why the paperwork exists at all.
11. `/products/catalogue_cover_letter.txt` — then the catalogue: `product`.
12. `/patents` — `patent` for the estate. `pt_h01`–`pt_h05` are the hand-authored notes.
13. `/r_and_d/the_faculty.txt` — the technical spine. This is where the chemistry stops
    being chemistry.
14. `/sublevel4/the_four_authorised_eyes.txt` (`s4-h05`) — *The Four Authorised Eyes*,
    1988-02-22, filed by **"Unnumbered, unfiled"**. The centre of the thing.
15. `/sublevel4/threshold_definition.txt` and `/sublevel4/risk_acceptance_register.txt` —
    what the threshold is, and who accepted the risk.

**Stage 4 — the six programmes**

16. Each `*_summary.txt` in `/black_programs`: CARRION, REDLINE, MAYFLY, CHOIR, PALIMPSEST,
    CAULDRON.
17. `/black_programs/standing_order_11.txt` — the standing order behind them.
18. `/black_programs/the_man_who_refused.txt` — and the one who would not.

**Stage 5 — the money**

19. `/finance` — the wire ledgers. `/finance/foundation_ledger.csv` is the Foundation's
    laundering ledger.
20. `/finance/the_one_that_pays.csv` — the ledger that matters.
21. `/real_estate/cota_plot6_soils.txt` and the land registers — where it went.
22. `/board/standing_order_4_destruction.txt` — the paper trail for the paperwork.

**Stage 6 — the method and the practitioners**

23. `/magi/faculty_roll.txt` and `/magi/policy_79a.txt` — who Pentex retains.
24. `/magi/gaia_ichor.txt`, `/magi/gaunt_construction.txt`, `/magi/rites_determination.txt` —
    what it is they are actually doing.
25. `/magi/the_two_who_were_told.txt` — and who was kept in the dark.
26. `/counterparties` — who actually moved the material.

**Stage 7 — the people**

27. `/personnel` — the hand-authored records are `pn_h01`–`pn_h09`.
28. `/clinical/cl_h01.txt`–`cl_h09.txt` — and what was done.
29. `/garou/to_whoever_finds_this.txt` — the watch. Allies, enemies, unresolved.
30. `/garou/the_pack_letter.txt` — why they filed it here.

**Stage 8 — the record**

31. `/black_programs/CULPRIT_forensic_annex.txt` — *CULPRIT — forensic annex, Kilifi*.
32. `/security/policy_11_photographic.txt` and
    `/security/the_photographer_statement.txt` — the photographer.
33. `/security/manaus_rotation.txt` and `/field_ops/security_rotation_Manaus.txt` — the
    Manaus rotation.
34. `/security/the_gate_line.txt`, `/security/four_men_no_names.txt` — the gate and the four.
35. `/regulatory/intake_monitoring_omissions.txt` — what was not reported.
36. `/regulatory/non_reportable_exceedances.txt` and
    `/regulatory/notification_hour_96.txt` — the reporting system, defeated.

**Stage 9 — the encoded documents**

37. `/legal/kill_authorization.txt` — `dec` it (**rot13**).
38. `/legal/culprit_excerpt.txt` — `dec` it (**hex**).
39. `/black_programs/houston_unpermitted_area.txt` — `dec` it (**b64**).

**Stage 10 — close it out**

40. `/sublevel4/the_member_who_stopped_attending.txt` — the nine people, and the
    veterinarian.
41. `evidence` in the terminal, then open `evidence.html`. Read the case note again.
42. Work toward `2385 / 2385`.

---

## How the site is built

**A static site. No build step. No dependencies. No server-side code. No database. No API.**

That is a deliberate constraint, and it is why the whole thing runs from GitHub Pages for
free and why nothing here can break at 3am.

```
.
├── index.html            corporate home
├── about.html            mission, values, long horizon
├── leadership.html       board and executive committee
├── facilities.html       nine principal sites
├── sustainability.html   registered programmes
├── careers.html          certification and accountability directory
├── newsroom.html         public record
├── contact.html          divisions and addresses
├── portal.html           sub-level 4 gate
├── archive.html          the drop box terminal
├── evidence.html         evidence board / case R9F-114
├── 404.html
├── .nojekyll             disables Jekyll on Pages
├── .github/workflows/
│   └── deploy-pages.yml  automated Pages deploy
├── assets/
│   ├── css/
│   │   ├── base.css      one reset + shared tokens
│   │   ├── corporate.css public site
│   │   └── breach.css    portal, archive, evidence
│   ├── img/              79 .webp photographs
│   └── js/
│       ├── data.js       32 hand-authored spine docs + company, cast, clues
│       ├── lore.js       world model + growth API that chunks register into
│       ├── site.js       public-site renderers
│       ├── auth.js       the gate
│       ├── terminal.js   the file server
│       ├── evidence.js   the case board
│       └── archive/      35 chunks, loaded on demand
├── tools/                see Tooling
├── PLAN.md               the build plan
└── README.md             this file
```

### How the pieces fit

- **`data.js`** defines `window.PENTEX` as an IIFE. It holds the 32 hand-authored spine
  documents, the company record, the cast, and the credential clues.
- **`lore.js`** builds the world model and exposes a growth API that the archive chunks
  register into at runtime.
- **`archive/*.js`** — 35 chunks: 16 generated halves (2,185 documents) and 19 `_hand`
  halves (168 documents). They call `PENTEX.REGISTER(dir, docs)`. Directories that have not
  been loaded yet pull their chunk the first time you `ls` or `cd` into them.
- **`auth.js`** validates the credential and opens the session. It stores the answer in
  `P.CLUES.user.value`, which is what `qa.mjs` asserts against — so the clue and the answer
  cannot silently drift apart.
- **`terminal.js`** is the whole drop box: command dispatch, filesystem, lazy chunk loading,
  the three decoders, CSV rendering, `.txt` downloads via `Blob`, and the 400-second idle
  guard.
- **`evidence.js`** records opened documents in order and drives the `n / 2385` counter.

### Where the 2,385 documents come from

| Origin | Count | Notes |
|--------|-------|-------|
| `data.js` spine | **32** | Hand-authored. The public record and the clue set. Includes the three encoded documents. |
| `archive/*_hand.js` | **168** | Hand-authored. The real story, 5–11 documents per directory. |
| `archive/*.js` generated | **2,185** | Procedural, deterministic, generated by `gen_corpus.mjs`. |
| **Total** | **2,385** | |

**200 documents are hand-authored. Those are the corpus.** The other 2,185 exist so that
searching feels like an archive rather than a brochure — and because `find`, `tree` and the
evidence counter are only meaningful at that scale.

The evidence board's own note — *"Thirty-two documents. Six programmes. Nine sites."* — counts
the `data.js` spine. The nine sites are Houston, Manaus, Bogotá, Nairobi, Novosibirsk,
Singapore, Calgary, Anchorage and New York, which appear as the site-code documents
`hou`, `mau`, `bog`, `nai`, `nov`, `sin`, `cal`, `anc`, `nyc`.

### Client-side state

| Store | Key | What |
|-------|-----|------|
| `sessionStorage` | `pentex.session` | The authenticated session |
| `sessionStorage` | `pentex.attempts` | Failed-credential attempts |
| `localStorage` | evidence board | Every document you have actually read, in order |

All three are browser-local. There is no account, no server, nothing to leak. Clearing
browser storage clears the board — the site says so on the board itself.

---

## Running it locally

**Do not open `index.html` directly from disk.** The pages load `assets/js/data.js` via
`<script>` and the terminal uses `sessionStorage` and `Blob` downloads. Both require a real
HTTP origin. `file://` will fail silently, which is confusing.

From the project root:

```bash
# Python
python -m http.server 8080

# or Node
npx serve .
```

Then open:

```
http://localhost:8080/
```

To work on the gated parts, go to `http://localhost:8080/portal.html` directly — no need to
walk the public pages first. The credential is `j.venner` / `measured`.

---

## Tooling

Six Node scripts. None are runtime dependencies; none are needed to serve the site. All are
run with plain `node`.

### `tools/build_pages.mjs`

Regenerates the **eight secondary pages** from `data.js`.

```bash
node tools/build_pages.mjs
```

> **Note:** it deliberately does **not** touch `index.html`, `portal.html`, `archive.html` or
> `evidence.html`. Those four are hand-maintained. Do not let a build overwrite them.

### `tools/gen_corpus.mjs`

Procedural, **deterministic** document generator. This is how the corpus reached 2,385
documents — the scale is generated, not hand-typed.

```bash
node tools/gen_corpus.mjs            # dry run / report
node tools/gen_corpus.mjs --write    # regenerate and write
```

Output is deterministic, so regenerating does not churn the diff. Generated files are
header-marked `GENERATED by tools/gen_corpus.mjs. Do not hand-edit.`

### `tools/gen_images.mjs`

Generates the photography with **Black Forest Labs Flux.2 Klein 4B** on NVIDIA Build.

```bash
export NVIDIA_API_KEY=...            # or set in your environment
node tools/gen_images.mjs
node tools/gen_images.mjs --force
node tools/gen_images.mjs --only=name,name
```

- The API key is read from the **environment only** and is never stored, echoed, or written
  into any file. `qa.mjs` asserts it appears nowhere in the repository.
- Size ladder: `1280x720` → `1024x576` → `1024x1024`. First success wins.
- **Idempotent** — existing images over 4 KB are skipped.
- Raw downloads land in `assets/img/raw/` (**gitignored**), get converted to `.webp` with
  ImageMagick (`magick`), and intermediates are deleted. Without ImageMagick the raw bytes
  are copied to the `.webp` path — browsers still render them.

### `tools/fix_encoding.mjs`

Repairs mojibake and BOM damage. Run it if you ever see garbled characters in output.

```bash
node tools/fix_encoding.mjs
```

### `tools/qa.mjs`

Pre-ship assertions. **Exits non-zero on any failure.** This is the gate — run it before
every push.

```bash
node tools/qa.mjs
```

### `tools/test_terminal.mjs`

Headless DOM harness for the drop box. **435 assertions across 8 groups.**

```bash
node tools/test_terminal.mjs
```

---

## Tests and QA

Both suites must pass before publishing. Neither requires a browser.

```bash
node tools/qa.mjs              # corpus + site integrity
node tools/test_terminal.mjs   # terminal behaviour
```

### What `qa.mjs` asserts

- No NVIDIA API key anywhere in the repository.
- Every `.js` and `.mjs` file parses.
- `data.js` evaluates and every collection is present.
- **The credential is derivable from published data, and the derivation matches the stored
  value.** This fails if a clue or the answer drifts out of sync.
- Every referenced image exists.
- Every element id a renderer touches exists on the loading page.
- No site secret, person note, unpublished name, or document body has leaked into public
  HTML.
- Every internal link resolves.
- No `console.*`, no `alert()`, no inline `style=`.
- The whole corpus loads — `data.js`, `lore.js`, then all 35 chunks in order — and all
  **2,385** documents are checked for: a leading-slash path, string title and body, unique
  id, unique path, presence in the directory listing, a recognised `enc` value, and no
  replacement characters.

### What `test_terminal.mjs` asserts

435 assertions across 8 groups:

1. Store integrity
2. Shell commands
3. Every directory
4. The three obfuscated stores
5. All 150 CSV ledgers
6. Evidence board
7. Downloads
8. Idle-timeout guard

---

## Deployment

Live at **https://cha0smagick.github.io/Pentex_website_werewolf_RPG/**

### Automated (current method)

`.github/workflows/deploy-pages.yml`:

- **Name:** Deploy static site to GitHub Pages
- **Triggers:** push to `main`, plus `workflow_dispatch`
- **Permissions:** `contents:read`, `pages:write`, `id-token:write`
- **Concurrency:** group `pages`, cancel-in-progress
- **Job:** `deploy` on `ubuntu-latest`, environment `github-pages`
- **Steps:** `checkout@v4` → `configure-pages@v5` → `upload-pages-artifact@v3` (path `.`) →
  `deploy-pages@v4`

Push to `main` and it goes live. Nothing to configure per commit.

### Manual fallback

Settings → Pages → Source: **Deploy from a branch** → branch `main` → `/ (root)`.

### Things that will bite you

- **Push `.nojekyll`.** It is an empty file and it is required. Without it Jekyll will try to
  process the site and ignore directories beginning with `_`.
- **Paths are root-relative to the site root.** The project site lives in a subdirectory and
  works unmodified — do not "fix" the paths.
- **Renaming the repository after publish requires re-saving the Pages settings** so the
  base path is regenerated.
- There is no server-side code, so there is nothing to configure at the host. No database,
  no API keys, no secrets.

---

## Project conventions

These are the project's own rules, from `PLAN.md`. They are worth preserving — they are the
reason the codebase reads like one person's work rather than a pile.

**No frameworks.** No CSS frameworks, no Tailwind. One reset plus two stylesheets, with the
palette defined as custom properties.

**No emoji as UI chrome.**

**No `alert()`. No `console.log` in shipped JavaScript.** Asserted by `qa.mjs`.

**No inline `style=`** — with the sole exception of three-line grid helpers.

**No stock-photo vocabulary.** Banned words: *cutting-edge, synergy, holistic, journey,
unlock, empower, next-level, seamless, passionate.*

**No `letter-spacing` above `0.08em`,** except on uppercase eyebrow labels.

**Data lives in `data.js` as plain objects. Templates render it.** No duplication between
data and markup.

**Images are lazy-loaded** with `width`/`height` set to avoid layout shift.

**Real `<button>` and `<a>` elements with real handlers.**

**Handwritten SVG only** where a shape genuinely cannot be typed. Nothing decorative.

**Bugfix rule: fix minimally.** Never refactor while fixing.

---

## Content and cast

Pentex is drawn from *Werewolf: The Apocalypse*. The company leans into what that game is
actually about — an industrial corporation that has decided the war against the Wyrm is a
**supply chain problem**, and that Gaia's chosen (the Garou) are an input to be managed
alongside silica, catalysts and patent estates.

**The public layer** — mission, leadership, facilities, sustainability, careers, newsroom,
contact — is deliberately plausible. That plausibility is the mechanism: it is why a reader
believes the certification directory.

**The authored spine** is 200 documents. Rather than list them, the shape is better
described: six programmes (CARRION, REDLINE, MAYFLY, CHOIR, PALIMPSEST, CAULDRON), each with
a summary in `/black_programs` and a code that recurs as a column in the `/finance` ledgers;
a `/legal` standard that explains how to walk in; a `/sublevel4` register that names four
people who accepted the risk and one who stopped attending; a `/garou` letter explaining why
the Garou filed material with a chemical company; and three documents stored encoded because
the people who wrote them did not want them readable.

**The through-line:** the paperwork is always written by someone with a room number, and the
room number is printed on the public site. Start at the careers page and work outwards.

---

## Licence

Pentex is a fan work. *Werewolf: The Apocalypse* is a trademark of White Wolf Publishing /
CCP Games. This repository is non-commercial fan material and is not affiliated with,
endorsed by, or connected to White Wolf or CCP Games. All characters, corporations and events
are fictional inventions for this project.

**No licence file is currently present in this repository.** Until one is added, treat the
source as all rights reserved by the author.
