// PDF od ponude za saradnju (A4), kroz headless Chrome.
// node b2b/ponuda-pdf.mjs b2b/ponuda/bg-apartments.html [izlaz.pdf] [--nacrt]
// Bez --nacrt odbija da napravi PDF dok u ponudi ima žutog okvira „POPUNJAVA DUŠAN" (class="popuni") ili [[...]].
// Chrome: Windows instalacija, CHROME_PATH, sistemski chromium, ili Playwright chromium (sam se instalira u oblaku).
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const [ulaz, izlazArg] = args.filter((a) => !a.startsWith("--"));
const nacrt = args.includes("--nacrt");
if (!ulaz) { console.error("Upotreba: node b2b/ponuda-pdf.mjs <ponuda.html> [izlaz.pdf] [--nacrt]"); process.exit(1); }
const html = resolve(ulaz);
const izlaz = resolve(izlazArg || html.replace(/\.html$/i, ".pdf"));

const tekst = readFileSync(html, "utf8");
if (!nacrt && (/class="popuni"/.test(tekst) || /\[\[/.test(tekst))) {
  console.error("Ponuda još ima mesta za popunjavanje (žuti okvir „POPUNJAVA DUŠAN\" ili [[...]]). Popuni ih ili dodaj --nacrt.");
  process.exit(2);
}

function playwrightChromium() {
  const baza = join(homedir(), ".cache", "ms-playwright");
  if (!existsSync(baza)) return null;
  for (const d of readdirSync(baza).filter((x) => x.startsWith("chromium")).sort().reverse()) {
    for (const p of ["chrome-linux/chrome", "chrome-linux64/chrome", "chrome-mac/Chromium.app/Contents/MacOS/Chromium", "chrome-win/chrome.exe"]) {
      if (existsSync(join(baza, d, p))) return join(baza, d, p);
    }
  }
  return null;
}
function nadjiChrome() {
  const kandidati = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"];
  const c = kandidati.find((p) => p && existsSync(p)) || playwrightChromium();
  if (c) return c;
  console.log("Chrome nije nađen, instaliram Playwright chromium (jednom)…");
  spawnSync("npx", ["-y", "playwright@1.49.1", "install", "chromium"], { stdio: "inherit", shell: process.platform === "win32" });
  return playwrightChromium();
}

const chrome = nadjiChrome();
if (!chrome) { console.error("Nema Chrome-a ni Playwright chromiuma."); process.exit(1); }
execFileSync(chrome, [
  "--headless=new", "--disable-gpu", "--no-sandbox", "--no-first-run", "--hide-scrollbars",
  "--run-all-compositor-stages-before-draw", "--virtual-time-budget=10000",
  "--no-pdf-header-footer", `--print-to-pdf=${izlaz}`, pathToFileURL(html).href,
], { stdio: "ignore", timeout: 120000 });
if (!existsSync(izlaz)) { console.error("PDF nije napravljen."); process.exit(1); }
console.log(`PDF: ${izlaz} (${Math.round(statSync(izlaz).size / 1024)} KB)`);
