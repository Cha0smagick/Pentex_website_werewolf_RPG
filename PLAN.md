# PENTEX — Corporate Portal + Breach Archive

Build plan. Atomic steps, tracked top to bottom. Status column updated as work lands.

Target: static site deployable to GitHub Pages (`main` branch, `/root`, `.nojekyll`).
No build step, no server, no framework. Vanilla HTML/CSS/JS.

---

## Premise

Two layers, same site.

| Layer | Look | Content |
|---|---|---|
| Surface | Clean corporate: navy, teal, warm grey, lots of white, stock photography | Mission, vision, values, board, plants, careers, press |
| Underworld | Terminal green on black, grainy, raw text, dead drop box | Kill files, spill reports, burn orders, vivisection logs, internal mail |

The surface is what Pentex wants you to see. The archive is what a dissident
Lycanthrope cell stole. Finding it is the game.

---

## Step list

### 1. Scaffold — DONE
- [x] `PLAN.md`
- [x] Verify toolchain (node v24, ImageMagick, ffmpeg, PIL)
- [x] Directory tree
- [x] `.nojekyll`, `404.html`

### 2. Art direction — DONE
- [x] Inspect `LogoPentex.webp` — heavy industrial wordmark, black on white, blocky
      squared-off grotesque, horizontal bar under the mid-wordmark.
- [x] Derive palette from it: black is the brand, so corporate = near-black navy
      with a single cold accent. Evil = amber phosphor, not "matrix green".
- [x] Corporate: `#0B1220` ink, `#12213A` panel, `#2E7C9E` cold blue,
      `#4FB3A8` teal, `#C9D4E0` text, `#E8EDF2` white, `#8A97A8` muted.
- [x] Breach: `#05070A` black, `#0A0F14` panel, `#FFB020` amber phosphor,
      `#FF6B35` alert, `#5C6B7A` dead text, `#E6F0EA` phosphor pale.

### 3. Lore bible (internal, drives all copy) — DONE
- [x] Pentex = one of the Five Great Powers; Gaia-corporate that quietly serves
      the Wyrm. Publicly: sustainable biotech. Privately: magickal weapons.
- [x] Divisions: PetroChem, BioSynth, Munitions, AeroDyn, AgriGen, Arcane R&D,
      Pentex Foundation (laundering), Legal & Regulatory (obstruction).
- [x] Flagship black programs: MAYFLY (stasis/biodeterioration), CAULDRON
      (synthetic Wyrm-agent), REDLINE (Remote-threshold incendiary doctrine),
      CHOIR (lycanthropic conditioning), CARRION (Amazon biocontrol),
      PALIMPSEST (mass memory/cognition).
- [x] Sites: HQ Tower (New York), Manaus Complex, Bogotá Cota, Nairobi
      Kilifi, Novosibirsk Annex, Houston PetroChem, Singapore PetroChem,
      Calgary AgriGen, Anchorage AeroDyn.
- [x] Cast: board, executives, plant managers, security, the leak cell.
- [ ] All of it written into `assets/js/data.js`.

### 4. Image generation (NVIDIA Flux.2 Klein 4B) — DONE
- [x] `tools/gen_images.mjs` — key from `NVIDIA_API_KEY` env only, never in file.
- [x] Node 24 has global `fetch`; no `node-fetch` import needed.
- [x] Size ladder 1280x720 -> 1024x576 -> 1024x1024, first success wins.
- [x] Idempotent: skips any file already present.
- [x] PNG out, converted to `.webp` via ImageMagick, originals discarded.
- [x] 16 images generated.

### 5. Public site — DONE
- [x] `index.html` hero, "we make the world work" positioning
- [x] `about.html` mission / vision / values / strategy — all corporate-speak,
      each line with a second reading that only the archive confirms
- [x] `leadership.html` sanitized bios with room numbers, emails
- [x] `facilities.html` plant directory, all "fully compliant"
- [x] `sustainability.html` the greenwash page — the one that leaks the passphrase
- [x] `careers.html` the other clue: the username
- [x] `newsroom.html` press releases that contradict the archive
- [x] `contact.html` corporate contact + the "former employee" mailbox
- [x] Shared `nav.js` + `corporate.css`

### 6. The gate — DONE
- [x] `portal.html` — Pentex Partner Portal login
- [x] Credentials: user `j.venner`, password = 5th word of the Mission statement
- [x] Both clues are on public pages. It should take a careful reader 3 minutes.
- [x] Wrong attempts are logged with a diegetic message, never a lockout

### 7. The archive (the minigame) — DONE
- [x] `archive.html` + `terminal.js` — a full filesystem console
- [x] Commands: `help ls cd cat open grep find whoami ps ping trace decode
      hint evidence back clear`
- [x] 26 files across 6 directories
- [x] 3 of them obfuscated: one base64, one hex, one ROT13 — decoded in-terminal
- [x] `evidence.html` case board, localStorage-persisted, 26/26 unlock

### 8. The files themselves — DONE
- [x] 30 documents authored in `data.js` (single source of truth; terminal
      renders them and can download each as a real `.txt` via Blob — so there
      are no duplicated copies on disk and no fetch/CORS dependency on Pages)
- [x] Corporate: press release, award citation, product datasheet, org chart
- [x] Black: CARRION spill report, REDLINE burn authorisation, CHOIR protocol,
      MAYFLY observation log, CULPRIT forensic annex, PALIMPSEST ethics memo,
      Foundation laundering ledger, Wire transfer trail, Lycanthropy exposure
      dossiers, Kill authorization, Houston unpermitted inventory, CAULDRON
      distribution, plus the dissident cell's own last note
- [x] 3 obfuscated: `rot13` (kill authorization), `hex` (Rite excerpt),
      `b64` (Houston inventory)

### 9. QA — DONE
- [x] Chrome pass on all 13 pages, 1440px and 390px, zero console errors,
      zero broken images, zero horizontal overflow
- [x] Terminal: every command, every directory, all 32 files, all 3 encodings
- [x] Evidence counter reaches 32/32 and the verdict panel unlocks
- [x] No `NVIDIA_API_KEY` anywhere in the tree
- [x] `tools/qa.mjs` green — 43 assertions
- [x] Encoding clean — `tools/fix_encoding.mjs` reports no mojibake, no BOM,
      no destroyed characters
- [x] Weight ~2.3 MB, dominated by 18 photographs

Defects found and fixed during QA, recorded so they are not reintroduced:
- The generator expected `data[0].b64_json`; the API returns `artifacts[0].base64`
  as JPEG. Seventeen generations were discarded on the parse.
- `resolve()` looked files up by document id, so `cat <filename>` never matched.
- The three `enc`-tagged bodies were stored as plaintext. `cat` looked right and
  `dec` returned noise. `qa.mjs` now asserts every encoded body decodes.
- The hex and base64 decoders built strings byte-by-byte with `String.fromCharCode`,
  which mangles any multi-byte character. Both now decode UTF-8 via `TextDecoder`.
- `index.html` and `evidence.html` carried a double-encoded em dash and a BOM.

### 10. Ship — DONE
- [x] README.md with publish instructions
- [x] `.gitignore` for tooling scratch
- [x] Vestigial empty `leak/` tree removed — documents live only in `data.js`
- [ ] Commit (left to the user; nothing is committed without being asked)

---

## Anti-slop rules for this build

- No CSS frameworks. One reset, two stylesheets, custom properties for palette.
- No emoji as UI chrome. No "🚀" anywhere.
- No `alert()`. No `console.log` left in shipped JS.
- No stock-photo language in copy ("cutting-edge", "synergy", "holistic",
  "journey", "unlock", "empower", "next-level", "seamless", "passionate").
  Pentex is a bureaucracy, not a startup.
- No Tailwind. No inline `<style>` blocks except 3-line grid helpers.
- Every interactive element is a real `<button>` or `<a>` with a real handler.
- Text wrapping: no `letter-spacing` over 0.08em except uppercase eyebrows.
- Data lives in `data.js` as plain objects. Templates render it. No duplication.
- Images are lazy-loaded, `width`/`height` set to prevent layout shift.
- Handwritten SVG only where a shape can't be typed: nothing decorative.