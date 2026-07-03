// Screenshot utility for the Mojsilov site.
// Usage:
//   node screenshot.mjs http://localhost:3000
//   node screenshot.mjs http://localhost:3000 hero   (adds a label suffix)
// Saves to ./temporary screenshots/screenshot-N.png (auto-incremented, never overwritten).
import { mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

// Find any Chrome that Puppeteer has downloaded into its cache, regardless of
// which version this Puppeteer release pins to. Returns null if none found.
async function findCachedChrome() {
  const base = join(homedir(), '.cache', 'puppeteer', 'chrome');
  let entries;
  try {
    entries = await readdir(base);
  } catch {
    return null;
  }
  for (const dir of entries.sort().reverse()) {
    const exe = join(base, dir, 'chrome-win64', 'chrome.exe');
    if (existsSync(exe)) return exe;
  }
  return null;
}

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const OUT_DIR = join(ROOT, 'temporary screenshots');

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';
const width = process.argv[4] ? parseInt(process.argv[4], 10) : 1440;

async function nextIndex() {
  await mkdir(OUT_DIR, { recursive: true });
  const files = await readdir(OUT_DIR);
  let max = 0;
  for (const f of files) {
    const m = f.match(/^screenshot-(\d+)/);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return max + 1;
}

let puppeteer;
try {
  puppeteer = (await import('puppeteer')).default;
} catch {
  console.error('Puppeteer is not installed. Run: npm install  (see package.json)');
  process.exit(1);
}

const n = await nextIndex();
const outPath = join(OUT_DIR, `screenshot-${n}${label}.png`);

const executablePath = await findCachedChrome();
const browser = await puppeteer.launch({
  headless: 'new',
  ...(executablePath ? { executablePath } : {}),
});
try {
  const page = await browser.newPage();
  // deviceScaleFactor 1: full-page shots of tall pages at 2x exceed Chrome's
  // ~16384px capture limit and corrupt (blank/duplicated regions).
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1, isMobile: width < 600 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

  // Scroll through the page so scroll-triggered reveals/lazy images all fire,
  // then return to top before capturing the full page.
  await page.evaluate(async () => {
    // Disable smooth scrolling so programmatic scroll is instant and actually
    // reaches the bottom (otherwise lazy images below stay unloaded).
    document.documentElement.style.scrollBehavior = 'auto';
    await new Promise((resolve) => {
      let y = 0;
      const step = window.innerHeight * 0.7;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        y += step;
        if (y >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          setTimeout(resolve, 400);
        }
      }, 120);
    });
    // Force any scroll-reveal elements into their final visible state so the
    // full-page screenshot captures every section (the live site keeps its
    // scroll animation — this only affects the captured snapshot).
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
  });
  await new Promise((r) => setTimeout(r, 600));

  await page.screenshot({ path: outPath, fullPage: true });
  console.log(`Saved ${outPath}`);
} finally {
  await browser.close();
}
