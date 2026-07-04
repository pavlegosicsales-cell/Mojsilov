# CSS gotchas, screenshot workflow, and design-consistency rules

Hard-won lessons. All brand-agnostic — they apply to any site built in this stack.

## CSS animation gotchas

- **`box-shadow` only transitions smoothly when both states have the same number of shadow layers.**
  If the base state has two layers and `:hover` has one, the shadow *snaps* instead of animating.
  Fix: give both states the **same count** (pad the hover value with a matching first layer).
- **A utility class's `transition` shorthand clobbers the element's own.** e.g. a scroll-reveal class
  (`.reveal`) that sets `transition: opacity, transform` will *drop* `box-shadow`/`border-color` from
  an element that also declares its own transition — so those hover props snap (change in `0s`). Fix:
  restore the full transition on a **more specific selector** (`.card.reveal { transition: opacity,
  transform, box-shadow, border-color … }`).
- **`.reveal.in { transform: none }` also cancels a hover `transform` lift**, not just the transition.
  The reveal end-state and your `.card:hover { transform: translateY(-8px) }` have **equal specificity**
  (both one class + one pseudo/class), and `.reveal.in` is declared *later*, so it wins → the card never
  moves on hover. Symptom: "cards don't lift". Fix: bump the hover selector's specificity so it beats
  `.reveal.in`, e.g. `.card.reveal:hover { transform: … }` (two classes + `:hover`). Do the same for the
  `prefers-reduced-motion` override. Both this and the transition-clobber bug come from `.reveal` sitting
  *later* in the cascade at equal specificity — always qualify with `.reveal` when an element both reveals
  and has hover motion.
- **A 0.7s transition can still *feel* instant if the easing is front-loaded.** `cubic-bezier(0.22,1,0.36,1)`
  (easeOutQuint) covers ~99% of the distance in the first ~0.35s, so a user asking for "gradual over 0.7s"
  still sees it "snap". When the *duration itself* should be perceptible, use an evenly-distributed curve
  like `cubic-bezier(0.4,0,0.2,1)`. Verify by sampling the computed `transform`/`box-shadow` at ~175/350/525ms
  after a scripted hover — the value should climb across the whole window, not jump early.
- **Animate only `transform` and `opacity`** for smoothness; never `transition: all`.
- **Layered hover feels premium when each property has its own duration/easing** — e.g. card lift on a
  slow spring, an accent bar on a medium ease, a number pop on a bounce. Same duration on everything
  reads as "all at once".
- **`backdrop-filter` needs real content behind it to blur.** An element screenshotted in isolation
  looks flat/transparent — judge glass effects in context, not from an element-only capture.
- Add a `@media (prefers-reduced-motion: reduce)` block that disables loops/large motion.

## Screenshot & verify workflow (this stack, on Windows)

- The project ships `serve.mjs` (serves root at `http://localhost:3000`) and `screenshot.mjs`
  (auto-detects any cached Puppeteer Chrome). **Always serve from localhost; never screenshot a
  `file:///` URL.** Start the server in the background; don't start a second instance if it's running.
- `screenshot.mjs http://localhost:3000 <label> <width>` saves a full-page shot to
  `temporary screenshots/`. Read the PNG back with the Read tool to actually see it.
- **Node on Windows resolves `/tmp/x` as `C:\tmp\x`** (usually nonexistent → ENOENT). Write any
  screenshot to a real Windows path (the session scratchpad) or the project folder.
- **A one-off Puppeteer script must live inside the project dir** so `import 'puppeteer'` resolves
  `node_modules`. A script in the system temp dir can't find it.
- **`page.screenshot({clip})` is document-relative, but `getBoundingClientRect()` is
  viewport-relative.** After scrolling they disagree, so a clip built from a rect captures the wrong
  region. Use `elementHandle.screenshot()` (it scrolls the element into view for you) or add
  `window.scrollY` / `scrollX` to the clip origin.
- **`elementHandle.screenshot()` can render blank on an element with a 3D transform / `perspective`.**
  Screenshot the parent section or a full-viewport clip instead.
- For detail work: capture at `deviceScaleFactor` 2–3, crop to the element, capture **hover states** by
  moving the mouse over the target first, and **wait for animations to finish** before shooting
  (count-up ≈ 2.5s, stroke draw-in ≈ 3.5s, beams a full loop).
- Do at least two look/compare/fix rounds; be specific about pixel/size/color mismatches.

## Design-consistency rules

- **One definition per repeated element.** A label chip/pill (or any component used across sections)
  must be *identical* everywhere — same font-size, letter-spacing, padding, dot. Define it once; add
  light/dark **variants only for background/border**, never for typography or size.
- **Keep the label→heading gap identical across every section** (one spacing token). Mismatched
  eyebrow margins are a common "why does this feel off" bug.
- **Match effects to background.** Translucency/glow effects (glass, liquid, animated beams) read well
  on **dark** surfaces and often look cheap on **light** ones. Scope them to dark sections, or build a
  distinct light-surface treatment — don't force one treatment everywhere. When a user says an effect
  "looks bad on the rest of the site", revert it there rather than fighting it.
- **Match a reference, but reskin it.** When copying structure from a named source (another repo, a
  live site, a screenshot), replicate the *layout/proportions/interactions* but always swap its colors
  for **this project's design tokens**. Keep the craft, drop the palette.
- **Respect the project's tokens.** Pull colors, fonts, radii, and spacing from the project's
  design-system file / CSS custom properties. Don't invent one-off hex values inline.
