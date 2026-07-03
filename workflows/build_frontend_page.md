# Workflow: Build a Frontend Page

**Objective:** Produce a high-craft frontend page for the Mojsilov site that matches the
brief (and reference image, if any).

## Required Inputs
- Design brief or reference image (layout, content, intent)
- Any brand assets in `brand_assets/` (logo, palette, fonts)

## Steps
1. Invoke the `frontend-design` skill before writing any frontend code (see `Front-end-design.md`).
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
- Puppeteer must be installed (`npm install`). The paths in `Front-end-design.md` reference a
  different user account and do not apply on this machine — use the local `screenshot.mjs`.
- Never screenshot a `file:///` URL — always serve from localhost.
- Follow the Anti-Generic Guardrails and Hard Rules in `Front-end-design.md`.
