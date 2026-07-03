// Image generation tool for the Mojsilov site (WAT Layer 3 — deterministic execution).
// Uses Pollinations.ai (Flux model) — free, no API key, no billing.
//
// Usage:
//   node tools/generate_image.mjs --prompt "..." --out assets/hero-car.jpg
//   node tools/generate_image.mjs --prompt "..." --out assets/x.jpg --width 1536 --height 960 --seed 42
//
// For before/after pairs, reuse the same --seed with only the condition words changed so the
// composition/frame stays close and a before/after slider wipes over a matching layout.
import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)); // project root (Mojsilov/)
const MODEL = process.env.MODEL || 'flux';

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--prompt') args.prompt = argv[++i];
    else if (a === '--out') args.out = argv[++i];
    else if (a === '--width') args.width = argv[++i];
    else if (a === '--height') args.height = argv[++i];
    else if (a === '--seed') args.seed = argv[++i];
  }
  return args;
}

async function main() {
  const { prompt, out, width = '1024', height = '768', seed } = parseArgs(process.argv.slice(2));
  if (!prompt || !out) {
    console.error('Usage: node tools/generate_image.mjs --prompt "..." --out assets/x.jpg [--width W --height H --seed S]');
    process.exit(1);
  }

  const params = new URLSearchParams({ width, height, nologo: 'true', model: MODEL });
  if (seed !== undefined) params.set('seed', seed);
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params}`;

  const MAX_RETRIES = 4;
  let lastErr;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, { headers: { Accept: 'image/jpeg' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      // Guard against error pages / empty bodies masquerading as 200.
      if (buf.length < 3000) throw new Error(`Suspiciously small response (${buf.length} bytes)`);
      const outPath = join(ROOT, out);
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, buf);
      console.log(`Saved ${out} (${buf.length} bytes)`);
      return;
    } catch (err) {
      lastErr = err;
      console.error(`Attempt ${attempt}/${MAX_RETRIES} failed: ${err.message}`);
      if (attempt < MAX_RETRIES) await new Promise((r) => setTimeout(r, 2500 * attempt));
    }
  }
  console.error(`Giving up after ${MAX_RETRIES} attempts: ${lastErr?.message}`);
  process.exit(1);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
