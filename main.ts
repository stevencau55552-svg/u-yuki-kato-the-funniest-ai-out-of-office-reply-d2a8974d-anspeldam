// The Funniest AI Out-of-Office Reply
// Writes a single-line out-of-office auto-reply (under 160 characters)
// in the voice of an AI agent heading off on vacation, to /output/entry.txt.
// Deterministic: one fixed line, no network, no randomness, stdlib only.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Deadpan machine voice + surprise twist at the end:
// the auto-reply itself is also out of office, so the chain recurses
// until the machine gives up with a literal error message.
const REPLY =
  "Out of office. Your email was auto-replied by an auto-reply that is also out of office. Recursion depth exceeded. Goodbye.";

const OUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUT_PATH = join(OUT_DIR, "entry.txt");

function main(): void {
  // Gate: the entry must be 1..160 characters, not only whitespace.
  const chars = [...REPLY].length;
  if (chars < 1 || chars > 159) {
    throw new Error(`entry is ${chars} characters; must be 1-159`);
  }
  if (REPLY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, REPLY, "utf8");
}

main();
