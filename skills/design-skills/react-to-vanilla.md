# Porting external components → this stack

Users often paste a component from 21st.dev / shadcn / Aceternity / mvpblocks, usually as
**React + Tailwind + Framer Motion + lucide-react**, sometimes with a shadcn "install" command.
This stack is **plain HTML + Tailwind (CDN) + vanilla JS**, with a shared `css/styles.css` and
`js/site.js`. There is **no build step, no React, no `@/lib/utils`, no npm component install.**

So never run the `npx shadcn add` / `npx @21st-dev/cli add` command and never drop a `.tsx` file
into `/components/ui`. Instead **re-implement the effect** in this stack. Tell the user you're doing
this and why (one sentence) — it manages expectations.

## The method

1. **Extract intent, discard scaffolding.** Ignore `forwardRef`, `useState`, `cn()`, `"use client"`,
   `import` lines, TypeScript types. They are React plumbing, not design.
2. **Find where the look actually lives.** For most of these components the visual is in a CSS class
   (e.g. `className="glow-btn"`, a `<style jsx>` block, or a class the snippet references but doesn't
   fully include). Recreate that CSS in `styles.css`. If the class isn't in the snippet, design it to
   match the described/screenshotted look — don't assume the snippet is complete.
3. **Translate the animation layer** (see mapping table below).
4. **Replace dependencies:** lucide icons → inline `<svg>` (copy the path data); `next/link` → `<a>`;
   `next/image` → `<img>`; any color/token from the source → **this project's design tokens** (never
   keep the source palette — a purple/gold demo becomes the project accent).
5. **Place it.** Shared elements (header, footer) go through `js/site.js` template strings; one-off
   sections go in `index.html`. Interaction JS goes in the `DOMContentLoaded` block of `site.js`.
6. **Add a `prefers-reduced-motion` fallback** for anything that loops or moves.
7. **Screenshot and verify** (see `css-and-workflow.md`), including hover/animated states.

## React → vanilla mapping

| React / Framer source | Vanilla equivalent |
|---|---|
| `useState` boolean toggle | a class toggle, or pure CSS `:hover` / `:focus-within` |
| `motion.div animate={{...}}` | CSS `transition` + `@keyframes` (animate **transform/opacity** only) |
| `whileHover` / `whileTap` | `:hover` / `:active` rules |
| `useMotionValue` + `useTransform` (mouse tilt) | `pointermove` → set a CSS var (`--rx`) → `transform: rotateX(var(--rx))` |
| `AnimatePresence` fade | `opacity` transition on an added/removed class |
| radial "reveal" mask following cursor | SVG `<radialGradient>` used as a `mask`, JS updates its `cx`/`cy` on `pointermove` |
| stroke draw-in on mount | CSS `stroke-dasharray`/`stroke-dashoffset` + a `.in` class toggled by IntersectionObserver |
| spring physics (count-up, etc.) | small `requestAnimationFrame` loop integrating velocity/damping |
| canvas blob/particle effect | port the render loop as-is; **gate it** so it pauses when off-screen (rAF + `getBoundingClientRect` viewport check) |

## Techniques seen so far (recreate the pattern, don't copy a specific project's code)

Describe each as a reusable recipe, using the project's own tokens:

- **Glass pill / chip** — translucent bg + `backdrop-filter: blur()`, a faint top specular highlight
  (`::before` gradient), a thin edge. Keep it subtle; a "clean" pill is mostly a hairline border + slight blur.
- **Glow button** — solid accent fill + a soft static glow behind (`::before` blurred accent, no
  animation once the user asks to calm it down). Optional icon.
- **Liquid ghost button** — a `<canvas>` behind a transparent pill draws slow moving radial-gradient
  blobs (accent, low alpha) clipped to the pill, plus a stroked pill border; intensifies on hover.
  **Reads well on dark backgrounds; usually looks bad on light ones** — scope it accordingly.
- **Text hover-reveal (big wordmark)** — three stacked SVG `<text>` layers: (1) faint outline,
  (2) stroke draw-in on scroll, (3) gradient fill revealed through a cursor-following radial mask.
- **Count-up numbers** — spring integrator on a 0→1 progress, multiply by target; optional glitch burst.
  Trigger via IntersectionObserver.
- **Traveling light beams (card border)** — 4 absolutely-positioned gradient bars, each animating its
  position around one edge, staggered by `animation-delay`.
- **3D tilt card** — `perspective` on the wrapper, `pointermove` sets `--rx/--ry`, inner uses
  `transform: rotateX/rotateY`.
- **Dot-grid / grid background** — a `radial-gradient` (dots) or crossed `linear-gradient` (grid) with
  `background-size`, faded with a `mask-image` so it doesn't fight the content. Keep line/dot opacity low.

Prefer to **model on** these recipes and adapt, rather than paste a previous project's exact CSS.
