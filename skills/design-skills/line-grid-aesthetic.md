# Line-grid editorial aesthetic — the house style

This is the signature look of this project (Mojsilov / Moxom-inspired). When there's **no reference image**
and the user wants "our style" — or says things like *linijski grid, puno linija i oblika, ne generično,
sa osećajem* — build in THIS language. It is **structure-as-decoration**: thin 1px lines everywhere,
content organized into open bordered grids, decorative lines that reach the section edges, grid-pattern
backgrounds, layered shapes. Editorial and precise, not floating rounded cards.

Reference screenshots the client kept pointing to live in `brand_assets/` (files named `moxom *.png`,
`Group *.png`). When in doubt, match Moxom: table-like, bordered, lots of lines.

## The 5 pillars

1. **Open bordered grids, not cards.** Sections are laid out as editorial tables: cells separated by hairline
   borders, content **centered** in each cell, outer left/right borders removed so the grid reads "open".
   Used for services, pricing, stats+reviews. See recipe below.
2. **Lines that leave the box.** Thin accent/neutral lines extend *beyond* the grid — out of corner cells to
   the screen edge, up above a band and down below it, into the section's vertical padding. This is the
   "puno linija" feel. Never let a grid just stop at its border; let a few lines escape it.
3. **Grid-pattern backgrounds** on dark sections — a faint two-gradient grid + radial accent glow + grain.
4. **Cold blue palette + condensed caps type.** Navy base, one accent blue, used sparingly. Oswald (condensed,
   uppercase) for big headings only; Inter for everything else. Warmth comes from whitespace and photos, never
   from warm color.
5. **Physical, precise interactions.** Borders fill with accent on hover, icons spring-pop, numbers count up,
   before/after compares, everything eased over a real duration. Positions are computed, not eyeballed.

## Palette & type tokens (swap hexes per brand, keep the roles)

```
--navy:   #121358;   /* section base (dark) */
--plava:  #293681;   /* mid surface / layered blocks */
--akcent: #2164da;   /* THE accent — CTAs, active lines, key marks. Use sparingly. */
--akcent-svetla: #8fbaff; /* light accent — pops on navy (stars, highlights on dark) */
line color: rgba(18,19,88,0.14) on light · rgba(255,255,255,0.12) on dark
```
Fonts: `Oswald` (600/700, `text-transform:uppercase`, `letter-spacing:-0.01em`) for `<h1>/<h2>` and big
numbers; `Inter` for body. Headings that wrap to two lines want `line-height:1.18` — but Tailwind `text-*`
utilities ship their own line-height, so qualify: `h2.h-section { line-height:1.18 }` (see css-and-workflow).

## Recipe: open bordered grid (the core building block)

```css
.grid { display:grid; grid-template-columns: repeat(N,1fr); }
.grid > * {                       /* every cell */
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  text-align:center; padding: 1.5rem; border-right:1px solid var(--line); border-bottom:1px solid var(--line);
}
.grid > *:nth-child(Nn+1) { }     /* first column — no left border needed (none set = open left) */
/* open right edge: drop right border on the last column's cells */
```
- **No outer left border** (cells only carry border-right) → left edge is open. Drop the **last column's**
  right border for an open right edge. Add the grid's **top** line via the first row only.
- **Row alignment across columns** when each column is a stack (header/features/cta): lay cells **service-major**
  in the DOM and use `grid-auto-flow: column` + `grid-template-rows: repeat(R,auto)` on desktop. Cells in the
  same visual row share a grid track → equal heights → hairlines line up. On mobile switch to
  `grid-template-columns:1fr` (row flow) and the same DOM stacks each group cleanly.
- **Prefer class-based borders over `:nth-child`.** nth-child breaks the moment you insert an element (e.g. a
  per-service control on mobile). Give cells role classes (`.head`, `.cell`, `.col-last`) and border off those.

## Recipe: decorative lines that reach the edges

- **Out of corner cells to the screen edge** (services): an absolute line per corner cell, `width:50vw`
  (horizontal) or `height:100vh` (vertical), anchored at the cell edge. Give it a neutral base
  `background-color` + an accent `linear-gradient` at `background-size:0`, and on the cell's `:hover` animate
  `background-size` to 100% over ~0.7s → the line "fills" with accent from the card outward.
- **Above/below a band** (before/after, stats): lines are children of the row (their offset parent). Extend
  them into the section's vertical padding with `top:-<pad>` / `top:100%; height:<pad>` so they touch the
  section's top/bottom edge. **Position both x and vertical extent from JS** by measuring the real cells/band,
  so lines sit exactly in the gaps and are symmetric — recompute on `resize`. (A CSS-only guess drifts; the
  client will notice a 1px asymmetry.) Verify with a measurement, not just a screenshot.
- Keep most lines the neutral hairline; let only a few be full accent `#2164da`. Restraint sells it.

## Recipe: grid-pattern background (dark sections)

```css
.hero-grid {
  position:absolute; inset:0; z-index:0; pointer-events:none;
  background-image:
    linear-gradient(to right,  rgba(255,255,255,.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,.045) 1px, transparent 1px);
  background-size: 92px 92px;                 /* square cells; can be JS-matched to a real element gap */
  -webkit-mask-image: radial-gradient(120% 62% at 50% 12%, #000 28%, transparent 78%); /* fade out */
}
```
Layer over `background: radial-gradient(...accent glow...)` on a `bg-navy` section, add a `grain` texture
`::before`. `background-position:-10px 0` shifts the first column narrower — handy to align the pattern with
table dividers. To make a grid cell equal a specific on-screen gap, measure the two dividers in JS and set
`backgroundSize`.

## Shapes vocabulary (the "oblika" part)

Layered blocks peeking above/below a hero image; a navy **band** behind portrait image cards with the cards
overflowing it top and bottom; **offset frames** behind cards; eyebrow **pills** with a live dot; **crosshair**
hairlines splitting an image (Moxom); big ghost wordmark behind the hero; accent **corner ticks**. Surfaces
layer base → elevated → floating; never all on one z-plane.

## Interaction language

- **Hover on a grid cell:** background tints, the shared border with neighbors lights to accent, decorative
  exit-lines fill with accent, any icon does a spring-pop (`translateY(-4px) scale(1.1) rotate(-8deg)`,
  `cubic-bezier(0.34,1.56,0.64,1)`).
- **Card lift:** `translateY(-5px)` + layered shadow + accent border, eased ~0.7s with an EVEN curve
  (`cubic-bezier(0.4,0,0.2,1)`) so the duration is felt — easeOutQuint finishes visually in ~0.3s (see
  css-and-workflow).
- **Stats:** count up from 0 on scroll-in; keep the animation.
- **Before/after:** hover-reveal on desktop (default PRE, hover shows POSLE via opacity), **drag slider on
  mobile** (clip-path on the POSLE image driven by a pointer-positioned `--split`, with a visible handle so
  touch users know to drag). Split behavior by breakpoint.
- Respect `prefers-reduced-motion`.

## Mobile behavior for line-grids

Grids collapse to 1–2 columns; keep the hairlines as row separators. Where a control sat as a shared header
row on desktop (e.g. a size toggle spanning columns), **relocate it per-group on mobile** — above each group
whose value it changes, not floating above an unrelated first group. Big numbers stack **over** their label
(centered) instead of beside it, or they overflow narrow columns. Decorative edge-lines and bands are usually
desktop-only (`display:none` below `lg`).
