# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## When given a React / shadcn / Framer Motion component
Users frequently paste components from 21st.dev, shadcn, Aceternity, mvpblocks, etc. — usually React +
Tailwind + Framer Motion + lucide, sometimes with an install command. This is a **vanilla HTML +
Tailwind (CDN) + plain JS** stack with **no build step, no React, no npm component install**. Do **not**
run `npx shadcn add` / `npx @21st-dev/cli add` and do not drop `.tsx` files anywhere. Instead
**re-implement the effect** in this stack, **reskinned to the project's own design tokens** (never keep
the source's palette). Say so in one sentence when you do it. Full playbook + React→vanilla mapping
table: **`react-to-vanilla.md`** (in this folder).

## Design consistency & CSS gotchas
Before shipping, apply the consistency rules (a repeated pill/chip must be identical everywhere;
label→heading spacing uniform across sections; glow/glass/liquid effects only on backgrounds where they
read well — usually dark, not light) and avoid the animation traps (`box-shadow` transitions need equal
layer counts in both states; a `.reveal`-style utility's `transition` can clobber an element's own).
Details, plus the screenshot/verify gotchas on Windows: **`css-and-workflow.md`** (in this folder).

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- `screenshot.mjs` lives in the project root and **auto-detects any cached Puppeteer Chrome** — no fixed install path. Use it as-is.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000 <label> <width>`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing.
- For **cropped / hover / element-only / 2× detail** shots and the **Windows path + viewport-vs-document clip** gotchas, see **`css-and-workflow.md`**. Remember to wait for animations to finish and to capture hover states before shooting.

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
