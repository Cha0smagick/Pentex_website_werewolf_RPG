// Detects and repairs mojibake in text files.
//
// Symptom it fixes: an em dash written by hand as U+2014 was re-encoded twice, so
// the bytes on disk are C3 A2 E2 82 AC E2 80 9D instead of E2 80 94. Browsers then
// render "â€”". Some files also carry a UTF-8 BOM.
//
// Repair: read as utf8 -> re-encode every character back to one latin1 byte ->
// decode those bytes as utf8. That is the exact inverse of a double utf8 encode,
// and it is a no-op for any file that was never double encoded.
//
//   node tools/fix_encoding.mjs          report only
//   node tools/fix_encoding.mjs --write  repair in place

import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const WRITE = process.argv.includes("--write");
const EXTS = new Set([".html", ".css", ".js", ".mjs", ".md"]);
const SKIP = new Set(["node_modules", ".git", ".codegraph", ".opencode", ".omo", "undefined", "img"]);

// Characters that only appear when utf8 bytes were read as latin1 and re-encoded.
// E2 80 94 (em dash) read as latin1 is U+00E2 U+20AC U+2122 — so the lead byte is
// not followed by another Latin-1 supplement character and a naive /[^\x00-\x7F]/
// test misses it. Match the canonical lead sequences instead.
const MOJIBAKE =
  /\u00E2\u20AC|\u00C3[\u0080-\u00BF\u2122\u0153\u017E]|\u00C2[\u0080-\u00BF]/;

// U+FFFD means a previous repair already destroyed the character: latin1 decoding
// cannot represent U+20AC or U+2122, so the double-encoded em dash collapses to
// "replacement char + control char" instead of coming back. Those are unrecoverable
// by re-encoding, so they are reported and left for a human to restore.
const DESTROYED = /\uFFFD/g;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (EXTS.has(extname(entry.name))) yield p;
  }
}

const reported = [];
const repaired = [];

const SELF = fileURLToPath(import.meta.url);

for await (const rel of walk(ROOT)) {
  const path = rel.startsWith(ROOT) ? rel.slice(ROOT.length) : rel;
  // This file contains the mojibake signatures in its own patterns.
  if (rel === SELF) continue;
  const buf = await readFile(rel);
  const bom = buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf;
  const text = buf.toString("utf8");
  const bad = MOJIBAKE.test(text);
  if (!bom && !bad) continue;

  const body = bom ? text.slice(1) : text;
  const destroyed = DESTROYED.test(body);
  const notes = [bom && "BOM", bad && "MOJIBAKE", destroyed && "DESTROYED"].filter(
    Boolean,
  );
  reported.push(`${path}  ${notes.join("+")}`);

  if (!WRITE) continue;
  if (destroyed && !bad) {
    repaired.push(`${path}  MANUAL (${body.match(DESTROYED).length} lost character(s))`);
    continue;
  }

  const fixed = bad ? Buffer.from(body, "latin1").toString("utf8") : body;
  if (DESTROYED.test(fixed)) {
    repaired.push(`${path}  MANUAL (repair would lose characters)`);
    continue;
  }
  if (Buffer.from(fixed, "utf8").toString("utf8") !== fixed) {
    repaired.push(`${path}  SKIPPED (repair would not round-trip)`);
    continue;
  }
  await writeFile(rel, fixed, "utf8");
  repaired.push(`${path}  fixed`);
}

for (const line of reported) console.log(`  ${line}`);
console.log(
  WRITE
    ? `\n${repaired.length} file(s) written.`
    : `\n${reported.length} file(s) flagged. rerun with --write to repair.`,
);
for (const line of repaired) console.log(`  ${line}`);