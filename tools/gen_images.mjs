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