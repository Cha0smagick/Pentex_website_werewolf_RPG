// Pentex — campaign image generator.
//
// Model: black-forest-labs/flux.2-klein-4b on NVIDIA Build.
//
//   set NVIDIA_API_KEY=...        (PowerShell: $env:NVIDIA_API_KEY="...")
//   node tools/gen_images.mjs
//   node tools/gen_images.mjs --force
//
// The key is read from the environment and is never written to this file.
// Requires Node 18+ (global fetch). No dependencies.
//
// Idempotent: an image already present in assets/img is skipped. Raw PNGs are
// written to assets/img/raw/ and converted to .webp with ImageMagick when it is
// on PATH; otherwise the PNG is used as-is.

import { mkdir, readdir, writeFile, unlink, stat, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const run = promisify(execFile);

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const OUT = join(ROOT, "assets", "img");
const RAW = join(OUT, "raw");

const INVOKE_URL =
  "https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.2-klein-4b";

// Tried in order; first success wins. Klein-4b is happiest near 1024 on the long
// edge, so the 16:9 attempts are listed first but the square is the safety net.
const SIZES = [
  [1280, 720],
  [1024, 576],
  [1024, 1024],
];

// Prompts carry an explicit no-text clause. Flux will otherwise hallucinate
// signage, and fake signage is worse than no signage on a corporate site.
const NO_TEXT =
  "no text, no lettering, no captions, no signage, no logos, no watermarks, no UI overlay, no people facing camera with visible badges";

// Surfaces. Each one is a lie the campaign can expose later.
const IMAGES = {
  "hq-tower": {
    prompt:
      "corporate headquarters skyscraper at blue hour, black glass and pale steel, sharp rectilinear geometry, clean plaza, cool overcast light, wide architectural photograph, muted desaturated palette, 35mm",
  },
  "boardroom": {
    prompt:
      "empty executive boardroom, long dark walnut table, twelve leather chairs, single window with city haze, low key interior lighting, architectural interior photograph, desaturated cool tones",
  },
  "lab-sterile": {
    prompt:
      "bright biotechnology laboratory interior, white epoxy floor, stainless steel, pipetting robot, glassware, fluorescent ceiling panels, clinical, spotless, wide angle photograph, cool white palette",
  },
  "press-conference": {
    prompt:
      "empty press conference podium with a cluster of microphones, blue backdrop, hotel ballroom lighting, shallow depth of field, press photograph, neutral corporate palette",
  },
  "datacentre": {
    prompt:
      "server hall interior, long rows of black racks receding, cold aisle containment, cyan indicator lights, polished floor, vanishing point, wide photograph, dark cool palette",
  },
  "refinery-night": {
    prompt:
      "petrochemical refinery at night, distillation columns, pipe racks, flare stack burning, orange sodium vapour lights, low angle wide photograph, heavy industry, dark palette",
  },
  "amazon-canopy": {
    prompt:
      "pristine Amazon rainforest canopy from the air at low sun, unbroken emerald treetops, mist between rivers, golden light raking across, aerial photograph, rich green and gold",
  },
  "amazon-river": {
    prompt:
      "aerial photograph of a wide black river in the Amazon, dark water with faint iridescent sheen, dense forest on both banks, overcast light, unsettling, desaturated",
  },
  "clearing": {
    prompt:
      "sharp rectangular clearing cut into dense rainforest, raw stumps in rows, bare red soil, remaining forest wall in shadow, aerial photograph, stark geometric intrusion, muted green and ochre",
  },
  "burn-line": {
    prompt:
      "controlled burn front moving through forest edge, orange flame line, thick grey smoke, scorched black ground, viewed from a distance, documentary photograph, desaturated",
  },
  "blight": {
    prompt:
      "stand of dead leafless trees, grey trunks, cracked earth, fog, no foliage, desolate, overcast, documentary photograph, cold desaturated palette",
  },
  "animal-cages": {
    prompt:
      "rows of stainless steel animal cages in an institutional facility, concrete floor, drain channel, harsh overhead fluorescent light, empty, clinical and cold, wide photograph",
  },
  "tanker": {
    prompt:
      "white chemical tanker truck parked on a dirt access road beside dense jungle at dusk, headlights on, wet ground, no markings on the tank, documentary photograph, desaturated",
  },
  "security-guard": {
    prompt:
      "corporate private security officer standing at a glass lobby desk, dark navy suit, earpiece, mid forties, neutral expression, plain background, corporate portrait photograph, cool neutral lighting",
  },
  "vault": {
    prompt:
      "records archive room, floor to ceiling grey filing cabinets in long rows, single fluorescent tube overhead, dust, deep perspective, archival photograph, desaturated",
  },
  "wolf-fog": {
    prompt:
      "a large grey wolf standing in dense fog at the edge of a pine forest, eyes catching a faint light, shoulders above the mist, cold blue hour, telephoto photograph, ominous",
  },
  "night-raid": {
    prompt:
      "night rural operation, a line of dark vehicles with headlights on an unpaved road, heavy rain, red taillight reflections in standing water, shot from a distance, documentary photograph, very dark",
  },
};

/* --------------------------------------------------------------------------
 * Second art pass. Same film stock, worse news.
 * Names here are the filenames the archive and the case board reference.
 * -------------------------------------------------------------------------- */
Object.assign(IMAGES, {
  "fire-forest-smoke": {
    prompt:
      "a wide column of black smoke rising from a forest fire beyond a cleared area, orange ember glow at the base, heavy grey overcast, shot from a distant ridge, documentary photograph, desaturated except the fire",
  },
  "fire-scrub-line": {
    prompt:
      "controlled burn scar running across dry grassland, a thin line of flame consuming scrub, ash rising in the still air, rusted tanker parked on a fire break, documentary photograph, desaturated",
  },
  "fire-night-glow": {
    prompt:
      "night forest fire seen from a distance, orange glow lighting the underside of smoke, silhouetted dead trunks, no people, documentary photograph, very dark with a warm core",
  },
  "oil-spill-sheen": {
    prompt:
      "iridescent oil sheen spreading across calm coastal water at low tide, dead mangrove trunks protruding, grey sky, no boats, documentary photograph, muted",
  },
  "oil-slick-river": {
    prompt:
      "thick dark oil film on a slow brown river between two forest banks, a band of rainbow sheen catching the light, dead fish on the mud edge, documentary photograph, desaturated",
  },
  "oil-pipeline-burst": {
    prompt:
      "a ruptured pipeline section venting a hard jet of dark liquid onto frozen ground, vapour cloud rising, emergency valve assembly, no people, industrial documentary photograph, cold palette",
  },
  "tanker-queue-night": {
    prompt:
      "a queue of white tankers on a dirt road at night, headlights cutting through dust, no markings on the tanks, distant floodlight tower, documentary photograph, desaturated",
  },
  "toxic-plume-fence": {
    prompt:
      "a chemical plant releasing a pale yellowish plume over a perimeter fence at dawn, dead grass inside the fence line, cold grey light, documentary photograph",
  },
  "toxic-foam-river": {
    prompt:
      "thick white foam covering a slow stretch of river beside a concrete outfall, foam clinging to reeds, overcast, documentary photograph, desaturated",
  },
  "toxic-groundwater-pipe": {
    prompt:
      "a rusted monitoring well casing protruding from cracked earth, stained ground around it, dead scrub, flat grey light, documentary photograph, close view",
  },
  "toxic-tar-pit": {
    prompt:
      "a black viscous waste pit with a crust of set sludge, pipes feeding it from a low shed, dead vegetation at the rim, overcast, documentary photograph, desaturated",
  },
  "toxic-drum-lot": {
    prompt:
      "hundreds of unmarked steel drums in rows on a concrete pad, several collapsed and corroded, dead weeds between the rows, overcast daylight, documentary photograph, desaturated",
  },
  "toxic-lab-flask": {
    prompt:
      "a cracked borosilicate flask on a bench holding opaque amber liquid, stained steel tray, unlabelled vials in a rack behind, cold clinical light, close documentary photograph",
  },
  "toxic-mutation-livestock": {
    prompt:
      "a single hairless calf lying on straw in a dim barn pen, ribs visible, harsh work lamp, no people visible, veterinary documentary photograph, cold and unpleasant",
  },
  "uranium-ore-pile": {
    prompt:
      "a conical stockpile of dark ore on a graded pad at a remote mine, dust haze, conveyor gantry, no people, industrial documentary photograph, desaturated",
  },
  "uranium-mill-tails": {
    prompt:
      "a vast flat field of pale tailings with settling ponds, a small processing shed, dead grass margins, overcast sky, wide documentary photograph, very desaturated",
  },
  "uranium-ore-sacks": {
    prompt:
      "stacked jute sacks on wooden pallets in a bare warehouse, wide aisle, one hanging lamp, cold institutional photograph, desaturated, no people",
  },
  "uranium-container-yard": {
    prompt:
      "rows of steel shipping containers in a fenced yard under floodlights, two of them carrying hazard placards with no readable text, night security photograph, cold blue",
  },
  "munitions-factory-line": {
    prompt:
      "an automated assembly line of small dark metal components moving along a rail, overhead gantry, no people, sterile industrial photograph, cool desaturated tones",
  },
  "munitions-silo": {
    prompt:
      "a row of concrete storage silos at dusk, blast doors closed, chain-link fence in foreground, empty yard, wide industrial photograph, desaturated",
  },
  "munitions-shell-crates": {
    prompt:
      "wooden crates with stencilled hazard diamonds, lids partly open showing packing straw, warehouse floor, no people, documentary photograph, cold",
  },
  "munitions-test-range": {
    prompt:
      "an empty live-fire test range, concrete firing bays, a berm of scorched earth, spent brass scattered on the concrete, overcast, documentary photograph, desaturated",
  },
  "aero-hangar-night": {
    prompt:
      "a vast aircraft hangar at night, one wide door open onto wet tarmac, a dark angular experimental airframe inside on stands, floodlights, no people, documentary photograph, cold blue",
  },
  "aero-engine-test-stand": {
    prompt:
      "a jet engine on an outdoor test stand surrounded by instrumentation cabling, heat shimmer, blast fence behind, overcast, industrial documentary photograph, desaturated",
  },
  "aero-wing-frost": {
    prompt:
      "a swept wing under ground de-icing, frost and spray ice on the leading edge, service vehicles beneath, dawn cold light, aviation documentary photograph, desaturated",
  },
  "deforestation-clearcut": {
    prompt:
      "a hard straight edge where mature rainforest meets bare logged ground, stumps in the foreground, dead brush, flat overcast light, aerial documentary photograph, desaturated",
  },
  "deforestation-canopy-hole": {
    prompt:
      "a square hole cut into dense tropical canopy seen from above, raw pale edges, remaining forest dark and intact, aerial documentary photograph",
  },
  "deforestation-log-pile": {
    prompt:
      "a huge stack of cut timber logs in a cleared area, ends facing camera, a bulldozer track in the mud, overcast, documentary photograph, desaturated",
  },
  "deforestation-road-push": {
    prompt:
      "a wide dirt road bulldozed straight through dense forest to the horizon, deep ruts, fallen trees at the edges, aerial documentary photograph, desaturated",
  },
  "blight-dead-orchard": {
    prompt:
      "rows of dead fruit trees in an orchard, bark peeling, no leaves, hard light, irrigation channel dry beside them, documentary photograph, cold palette",
  },
  "blight-crop-rotation": {
    prompt:
      "a field where the crop has failed in a rectangular pattern of stunted grey plants, healthy green beyond the boundary, aerial documentary photograph, overcast",
  },
  "blight-soil-core": {
    prompt:
      "a soil core sample held above a labelled tray in a field laboratory, roots blackened through the profile, window light, close documentary photograph",
  },
  "blight-pollinator-cage": {
    prompt:
      "a field cage of fine mesh containing beehive boxes, dead bees on the mesh, agricultural documentary photograph, flat overcast light, desaturated",
  },
  "lab-scalpel-tray": {
    prompt:
      "a stainless steel dissection tray with fine instruments laid out in a row, a small covered dish, cold overhead light, close clinical documentary photograph",
  },
  "lab-centrifuge-room": {
    prompt:
      "a row of benchtop centrifuges in a plain laboratory, one lid open, no people, cold fluorescent light, documentary photograph, desaturated",
  },
  "lab-cage-rack": {
    prompt:
      "a tall rack of small stainless animal cages in a dim room, one door ajar, straw and bedding, no people visible, clinical documentary photograph, cold",
  },
  "lab-freezer-bank": {
    prompt:
      "a bank of chest freezers against a wall in an unmarked room, one lid raised, cold vapour spilling, harsh overhead light, documentary photograph",
  },
  "lab-necropsy-table": {
    prompt:
      "a stainless necropsy table with a shallow drain channel, tiled wall, surgical lamp above, empty and wiped down, cold clinical documentary photograph",
  },
  "lab-mri-corridor": {
    prompt:
      "a bare concrete corridor with an empty imaging suite visible through a window, cable trunking, one flickering fluorescent, institutional documentary photograph, desaturated",
  },
  "animal-dog-kennel": {
    prompt:
      "a row of empty stainless kennels in a concrete run with a drain channel, chain-link gate, no animals, harsh overhead light, documentary photograph, cold",
  },
  "animal-pig-farm": {
    prompt:
      "an empty concrete pig housing block with feed troughs and a slurry channel, heavy rain outside, no animals, industrial agricultural documentary photograph, desaturated",
  },
  "animal-crate-airport": {
    prompt:
      "stacked wooden livestock crates on an airport apron at night, one crate door forced open, ground crew vehicle in the distance with no markings, documentary photograph, dark",
  },
  "animal-vivarium-rack": {
    prompt:
      "a wall of small ventilated cages in a windowless animal room, a cage door open, bedding disturbed, no animals, cold institutional documentary photograph",
  },
  "security-tunnel-camera": {
    prompt:
      "a bare concrete service tunnel with conduit runs, a single caged camera on the ceiling, one caged wall lamp, deep shadow, documentary photograph, very dark",
  },
  "security-sublevel-stair": {
    prompt:
      "a service stairwell in a concrete core, painted floor number, steel handrail, single overhead lamp, no signage, brutalist institutional photograph, cold desaturated",
  },
  "security-gate-night": {
    prompt:
      "a sliding steel vehicle gate at night with a spike barrier, floodlight glare, wet concrete, a guard booth with dark glass, documentary photograph, cold",
  },
  "security-archive-vault": {
    prompt:
      "a small document vault with a heavy steel door half open, shelving of grey boxes behind, single overhead lamp, concrete floor, documentary photograph, desaturated",
  },
  "security-convoy-desert": {
    prompt:
      "two unmarked vehicles on a desert highway at dusk, long shadows, dust plume behind, vast empty landscape, documentary photograph, desaturated",
  },
  "ruins-demolition": {
    prompt:
      "a half demolished industrial structure with exposed steel, a dust cloud hanging in still air, rubble in the foreground, overcast, demolition documentary photograph, desaturated",
  },
  "ruins-abandoned-tank": {
    prompt:
      "a derelict storage tank in scrub, rust streaks, a collapsed ladder, weeds through the floor plate, overcast, industrial decay documentary photograph",
  },
  "ruins-flooded-plant": {
    prompt:
      "a flooded industrial ground floor, water reflecting rusted machinery, a collapsed roof panel, grey daylight through missing cladding, documentary photograph, desaturated",
  },
  "ruins-charred-hall": {
    prompt:
      "a long charred corridor with blackened walls and no ceiling, ash on the floor, a single surviving light fitting, daylight from a blown-out end wall, documentary photograph",
  },
  "ruins-collapsed-tower": {
    prompt:
      "a collapsed concrete floor plate folded into the ground below, tangled rebar, dust, heavy overcast, demolition documentary photograph, desaturated",
  },
  "land-clearcut-burn-stump": {
    prompt:
      "blackened tree stumps across a cleared slope, thin smoke between them, a cut track disappearing over the ridge, documentary photograph, desaturated",
  },
  "land-drainage-ditch": {
    prompt:
      "a straight drainage ditch carrying opaque grey liquid between two banks of dead grass, culvert mouth at the far end, overcast, documentary photograph, desaturated",
  },
  "land-waste-pit-burn": {
    prompt:
      "an open waste pit with a burning surface, black smoke drifting low, a perimeter berm, no people, documentary photograph, heavy desaturated",
  },
  "papers-corridor-archive": {
    prompt:
      "a long archive corridor of grey document boxes on steel shelving receding into darkness, one shelf pulled out, a single caged lamp, documentary photograph, desaturated",
  },
  "papers-burn-basin": {
    prompt:
      "a metal burn basin outdoors with paper edges curling in flame, ash lifting, wet ground around it, no people, documentary photograph, cold palette",
  },
  "papers-shredder-room": {
    prompt:
      "an industrial cross-cut shredder room, a floor of shredded paper strips, a hopper of intact files, no people, cold industrial documentary photograph",
  },
  "human-sedan-curtain": {
    prompt:
      "a blacked out sedan stopped on a wet forest road at night, curtain drawn on the rear window, another car behind, no plates, documentary photograph, very dark",
  },
  "human-courier-handover": {
    prompt:
      "a gloved hand passing a document wallet across a car window at night, faces out of frame, streetlight, documentary photograph, cold desaturated",
  },
});

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const ONLY = args.find((a) => a.startsWith("--only="))?.slice(7);

const key = process.env.NVIDIA_API_KEY;
if (!key) {
  console.error(
    "NVIDIA_API_KEY is not set.\n" +
      '  PowerShell:  $env:NVIDIA_API_KEY="nvapi-..."\n' +
      "  cmd:         set NVIDIA_API_KEY=nvapi-...\n" +
      "  bash:        NVIDIA_API_KEY=nvapi-... node tools/gen_images.mjs",
  );
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function alreadyHave(name) {
  for (const ext of ["webp", "png"]) {
    const p = join(OUT, `${name}.${ext}`);
    if (existsSync(p) && (await stat(p)).size > 4096) return p;
  }
  return null;
}

async function invoke(prompt, width, height, seed) {
  const payload = {
    prompt,
    width,
    height,
    seed,
    steps: 4,
  };

  const res = await fetch(INVOKE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Authorization": `Bearer ${key}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  });

  if (res.status !== 200) {
    const err = await res.text();
    throw new Error(`HTTP ${res.status} ${err.slice(0, 400)}`);
  }

  const body = await res.json();
  const b64 = pickBase64(body);
  if (!b64) {
    throw new Error(`unexpected response shape: ${JSON.stringify(body).slice(0, 300)}`);
  }
  const buf = Buffer.from(b64, "base64");
  if (buf.length < 1024) throw new Error("decoded payload too small to be an image");
  return { buf, ext: sniffImageType(buf) };
}

function pickBase64(body) {
  const art = body?.artifacts?.[0];
  if (typeof art?.base64 === "string") return art.base64;
  const d = body?.data?.[0];
  if (typeof d?.b64_json === "string") return d.b64_json;
  if (typeof d?.image === "string") return d.image;
  if (typeof body?.image === "string") return body.image;
  if (typeof body?.b64_json === "string") return body.b64_json;
  return null;
}

function sniffImageType(buf) {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.toString("ascii", 1, 4) === "PNG") return "png";
  if (buf.toString("ascii", 0, 3) === "GIF") return "gif";
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    return "webp";
  }
  return "png";
}

async function toWebp(srcPath, webpPath) {
  try {
    await run("magick", [
      srcPath,
      "-resize",
      "1600x1600>",
      "-quality",
      "82",
      "-define",
      "webp:method=5",
      webpPath,
    ]);
    await unlink(srcPath);
    return webpPath;
  } catch (err) {
    if (!existsSync("C:/Program Files/ImageMagick-7.1.2-Q16-HDRI/magick.exe")) {
      console.warn("      magick unavailable, copying raw bytes to webp path");
      await copyFile(srcPath, webpPath);
      await unlink(srcPath);
      return webpPath;
    }
    throw err;
  }
}

async function generate(name, spec, seedBase) {
  const done = await alreadyHave(name);
  if (done && !FORCE) {
    console.log(`  skip  ${name}.${done.split(".").pop()} (exists)`);
    return;
  }

  const prompt = `${spec.prompt}, ${NO_TEXT}`;
  let lastErr;

  for (const [w, h] of SIZES) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      const seed = seedBase + attempt - 1;
      try {
        const { buf, ext } = await invoke(prompt, w, h, seed);
        const raw = join(RAW, `${name}.${ext}`);
        await writeFile(raw, buf);
        const out = await toWebp(raw, join(OUT, `${name}.webp`));
        const { size } = await stat(out);
        console.log(
          `  ok    ${name} ${w}x${h} seed${seed} -> ${out.split("\\").pop()} ${(
            size / 1024
          ).toFixed(0)}kb`,
        );
        return;
      } catch (err) {
        lastErr = err;
        await sleep(2500 * attempt);
      }
    }
    console.log(`  ..    ${name} failed at ${w}x${h}, trying smaller`);
  }

  console.error(`  FAIL  ${name}: ${lastErr?.message ?? "unknown"}`);
  process.exitCode = 1;
}

await mkdir(OUT, { recursive: true });
await mkdir(RAW, { recursive: true });

const names = ONLY ? ONLY.split(",") : Object.keys(IMAGES);
console.log(`Pentex art pass — ${names.length} image(s), model flux.2-klein-4b\n`);

let seedBase = 4100;
for (const name of names) {
  if (!IMAGES[name]) {
    console.error(`  skip  ${name} (no prompt defined)`);
    continue;
  }
  await generate(name, IMAGES[name], (seedBase += 37));
}

const left = (await readdir(RAW)).filter((f) => /\.(png|jpg|webp|gif)$/i.test(f));
if (left.length === 0) await rmSafe(RAW);

async function rmSafe(dir) {
  try {
    const { rmdir } = await import("node:fs/promises");
    await rmdir(dir);
  } catch {
    /* leave the empty dir, harmless */
  }
}

console.log(`\ndone.${process.exitCode ? "  failures present." : ""}`);