# Workflow: Build a Frontend Page

**Objective:** Produce a high-craft frontend page for the Mojsilov site that matches the
brief (and reference image, if any).

## Required Inputs
- Design brief or reference image (layout, content, intent)
- Any brand assets in `brand_assets/` (logo, palette, fonts)

## Steps
1. Invoke the `ui-ux-pro-max` skill before writing any frontend code (see `skills/ui-ux-pro-max/SKILL.md`).
   This project is **vanilla HTML + Tailwind (CDN) + plain JS, no build step** — ui-ux-pro-max is
   stack-agnostic, so still read the project-specific companions in `skills/design-skills/`:
   `line-grid-aesthetic.md` (house style), `react-to-vanilla.md` (re-implement React/shadcn snippets
   in this stack), `css-and-workflow.md` (Windows screenshot + CSS gotchas).
2. Check `brand_assets/` — use real assets if present; otherwise placeholders
   (`https://placehold.co/WIDTHxHEIGHT`, generic copy).
3. Build/edit `index.html` (Tailwind via CDN, mobile-first, inline styles by default).
4. Start the dev server if not already running: `node serve.mjs` (http://localhost:3000).
5. Screenshot: `node screenshot.mjs http://localhost:3000 <label>`.
6. Read the PNG from `temporary screenshots/` and compare against the reference.
   Be specific about pixel/size/color mismatches.
7. Fix mismatches and repeat 5–6. Do **at least 2** comparison rounds. Stop only when no
   visible differences remain (or the user says so).

## Expected Output
- `index.html` (and any assets) served correctly at http://localhost:3000
- Screenshots in `temporary screenshots/` documenting the final result

## Edge Cases / Notes
- Puppeteer must be installed (`npm install`). Use the local `screenshot.mjs`; never screenshot a
  `file:///` URL — always serve from localhost. Windows-specific gotchas: `css-and-workflow.md`.
- ui-ux-pro-max ships Python search scripts. **Python 3.12 is installed.** Bare `python` is shadowed
  by a Windows Store alias in some shells, so invoke with the full path:
  `"$LOCALAPPDATA/Programs/Python/Python312/python.exe" skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system -p "Mojsilov"`
  (PowerShell: `& "$env:LOCALAPPDATA\Programs\Python\Python312\python.exe" ...`). Treat its output as a
  starting point — reskin to the existing navy/blue brand tokens, don't adopt its generic palette.
- Follow ui-ux-pro-max's Quick Reference (§1–§10) + Pre-Delivery Checklist, plus the project
  Anti-Generic guardrails documented in `line-grid-aesthetic.md`.
