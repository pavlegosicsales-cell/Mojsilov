# Site Teardown: Avontiv (car detailing template)

**URL:** https://avontiv.webflow.io
**Built by:** Flow Design Agency (footer credit)
**Platform:** Webflow (class prefix `fda-`, IX2 interactions, rspack-bundled runtime)
**Date analyzed:** 2026-07-07
**Analyzed from:** Contact-one page HTML + shared CSS (`avontiv.webflow.shared.b537f627c.css`, 194KB) + 3 screenshots (Home/About/Services) + Webflow JS chunks.

> Purpose: mine reusable sections/effects to adopt into **Mojsilov** (like we did with Moxom). Everything below is reskinned to the Mojsilov brand — Avontiv is dark + warm orange; Mojsilov is navy + cool blue. **Keep the structure/composition, drop the palette.**

---

## Tech Stack (confirmed from source)

| Technology | Evidence | Purpose |
|---|---|---|
| Webflow | `data-wf-*`, `w-*` classes, `webflow.*.js` | Page builder + hosting |
| Webflow IX2 | `data-w-id` on nearly every element; `webflow.schunk.*.js` (820KB runtime) | Declarative scroll/hover animations (fade-up, opacity 0→1) |
| jQuery 3.5.1 | `<script ...jquery-3.5.1...>` | Webflow dependency (dropdowns, forms) |
| WebFont Loader | `WebFont.load({google:{families:["Inter Tight:300..700"]}})` | Loads Inter Tight |

**Animations are declarative (Webflow IX2), not hand-written GSAP.** `data-w-id` + inline `style="opacity:0"` → IX2 fades/moves elements in on scroll. The `wf3.js` file is just the rspack chunk loader (library, no page config). So there is **no custom animation code to steal** — the effects are simple fade-up-on-scroll + CSS hover transitions. All the "wow" is composition + type scale + photography.

---

## Design System

### Colors (from `:root` + usage)
| Name / usage | Value | Mojsilov equivalent |
|---|---|---|
| Accent (`--reddish-orange`) | `#ff4d24` | `--akcent #2164DA` |
| Accent alt | `#fa471e` | (drop) |
| Base dark (`--black`) | `#000` | `--navy #121358` |
| Warm dark surface (`--charcoal-brown`) | `#1f1915` | `--plava #293681` / navy tint |
| White | `#fff` | `#fff` |
| Secondary text | `#758696`, `#5d6c7b` | `#B6BDC2` / slate |
| Muted gray | `#4d4d4d` | slate-600 |
| Hairline / border | `#e8e8e8`, `#ddd`, `#ccc`, `#fff3` (white 20%) | `rgba(18,19,88,.14)` / `rgba(255,255,255,.14)` |

Theme: near-black backgrounds, ONE warm accent used sparingly (numbers, bars, buttons, corner squares), lots of dramatic car photography. Same restraint model as Mojsilov — just swap warm→cool.

### Typography
| Role | Font | Size (base) | Line-height | Letter-spacing |
|---|---|---|---|---|
| Body | **Inter Tight** 400 | 0.9375rem (15px) | 162.5% | 0 |
| H1 | heading-font* | 2.5rem | 107% | -0.04rem |
| H2 | heading-font* | 1.875rem | 111% | -0.04rem |
| H3 | heading-font* | 1.625rem | 116% | -0.04rem |
| H5 (used as eyebrow/labels) | — | 1.125rem | 125% | -0.04rem |
| Eyebrow subtext | Inter Tight 600 | 0.875rem | — | **0.1rem**, uppercase |
| **Big display** `.fda-big-text` | heading-font* | **clamp(35px, 10.7vw, 180px)** | 115% | -0.06rem |
| Big display 2 `.fda-big-text-two` | heading-font* | clamp(35px, 5.73vw, 110px) | 111% | -0.06rem |

\* `--heading-font: "Chakrapetch", Arial` is declared in `:root`, but **only Inter Tight is actually loaded** (WebFont). So headings effectively render Inter Tight (Chakrapetch not fetched). Mojsilov already uses Oswald (display) + Inter — keep our Oswald for the big-text; the tight negative letter-spacing (-0.04 to -0.06rem) is worth copying.

### Spacing / layout
- Containers: `--xs-container: 82.5rem` (1320px), `--nav-container: 106.875rem` (1710px).
- Section vertical gaps: `--section-small-gap: 7.66rem`, `--section-big-gap: 8.25rem` (big, airy).
- Heading→text gap token `--h2-to-text: 1.25rem`; heading→card `--h2-to-card: 3.5rem`.
- Responsive: standard Webflow breakpoints (≤991 tablet, ≤767 mobile, ≤479 small); big-text uses `vw` clamp so it scales fluidly.

---

## Effects Breakdown

| Effect | Implementation | Complexity | Cloneable? |
|---|---|---|---|
| Fade/slide-up on scroll | Webflow IX2: `style="opacity:0"` → IX2 animates to 1 + translateY on scroll-into-view | Low | Yes (our `.reveal` already does this) |
| **Big bracket labels** `[Maintenance]` | `.fda-big-text` huge `clamp()` type; brackets are literal `[ ]` chars colored accent, word in muted color; car images interleaved between rows | Low | **Yes — high value** |
| **Ghost service numbers** 01–04 | `.fda-text-style-h1` + `color:#ffffff59` (35% white), staggered with margins; real service card sits beside/over | Low | **Yes** |
| Stats row w/ accent dividers | Flex row of counter items; `.fda-counter-glow-line` = 1px × 2.7rem accent vertical bar between; numbers in accent | Low | Yes |
| Numbered list + thumb + arrow | `.fda-number-wrap` (accent circle 2rem) or `/01` text, row with small image + title + arrow icon, hairline divider | Low | Yes |
| Button text-swap hover | Two stacked `.fda-button-text` (text-two `position:absolute; inset:0`); on hover text-one slides up/out, text-two slides in | Low | Yes (nice touch) |
| FAQ plus/minus toggle | `.fda-minus-line` (0.75rem×0.125rem) + `.fda-minus-line.fda-absolute` (vertical) = a "+"; on open the vertical bar hides → "−" | Low | Yes (we use +/× today) |
| CTA glass card + corner squares | `.fda-cta-box` backdrop-blur(3.2rem) + translucent bg + white/20 border; `.fda-cta-square-*` = 0.625rem accent squares abs-positioned at corners + border lines framing the block | Low-Med | Yes (≈ our bracket-frame) |
| Eyebrow bar | `.fda-subtext-border-line` = 0.1875rem-wide accent vertical bar before uppercase 0.875rem/600/0.1rem-tracked label | Low | Yes |

**The reveal:** none of this needs a JS animation library. It is Webflow's stock fade-up plus disciplined CSS. The impact comes from (1) oversized `clamp()` display type, (2) one accent color used only on marks/bars/numbers, and (3) full-bleed car photography. All directly reproducible in our vanilla stack.

---

## Implementation Details (reusable components)

### 1. Big bracket labels `[Poliranje] [Dubinsko] [Keramika]`  ← most distinctive
```
.fda-big-text {
  font-family: heading-font;               /* → Oswald for us */
  font-size: clamp(35px, 10.7vw, 180px);
  line-height: 115%;
  letter-spacing: -.06rem;
  color: var(--black);                      /* word color; white variant on dark */
}
```
- Structure (About page): stacked rows, each a `.fda-big-text` line with the label wrapped in literal `[ ]`. The brackets are a separate span in the **accent** color; the word is muted (gray on dark, or ghost white). Between rows sit landscape car photos (`overflow:hidden`, IX2 fade-up).
- **Mojsilov version:** Oswald uppercase, `clamp(40px, 10vw, 160px)`, word in `rgba(255,255,255,.85)` on navy, brackets in `#2164DA`. Interleave pre/posle photos. Great for a "usluge" showcase on Home or O nama.

### 2. Ghost service numbers (staggered 01–04)
```
.fda-service-number-text-color { color: #ffffff59; }   /* 35% white, H1 size */
```
- Big translucent number behind/beside each service card; cards offset vertically (staggered grid) so numbers read as a rhythm. On light bg use `rgba(18,19,88,.18)` (we already use exactly this for `.how-num` / `.pr-amount` ghosting).
- **Mojsilov:** we already have ghost numbers (`.how-num` navy@18%). Adopt the *staggered offset layout* + larger number, reskin trivially.

### 3. Stats row with accent glow divider
```
.fda-counter-glow-line { background: accent; width:.0625rem; height:2.6875rem; }
```
- Row of stat items separated by a thin accent vertical bar; big number in accent, label muted below. We already have a stats section (`[data-count-section]`) — the glow-line divider is the borrowable detail.

### 4. Button text-swap on hover
```
.fda-button-text.fda-button-text-two { position:absolute; inset:0; }  /* stacked */
/* hover: text-one translateY(-100%), text-two translateY(0) — vertical roll */
```
- Two identical labels stacked; on hover they roll vertically (one out top, one in bottom). Add `overflow:hidden` on the wrapper. Cheap, premium. Could enhance our `.glow-btn`.

### 5. FAQ plus→minus toggle
```
.fda-minus-line { width:.75rem; height:.125rem; background:#fff; }      /* horizontal */
.fda-minus-line.fda-absolute { width:.125rem; height:.75rem; position:absolute; } /* vertical */
/* open state: vertical bar scales to 0 → "+" becomes "−" */
```
- Two crossed bars = "+", collapse the vertical on open = "−". Cleaner than a rotating icon. (We currently rotate a + to ×.)

### 6. CTA: glass card + framed corner squares
```
.fda-cta-box { backdrop-filter: blur(3.23rem); background:#0000002b; border:1px solid #fff3; }
.fda-cta-square-one { width:.625rem; height:.625rem; background:accent; position:absolute; } /* ×4 corners */
```
- A translucent glass CTA card sitting over a full-bleed car photo, with small accent squares pinned to its corners and thin border lines extending out — nearly identical to our existing **`.bracket-frame`** (filled accent corner squares). Reuse our class; just place it over a photo hero CTA.

### 7. Eyebrow (label with accent bar)
```
.fda-subtext-border-line { width:.1875rem; background:accent; }  /* short vertical bar */
/* + uppercase 0.875rem / weight 600 / letter-spacing 0.1rem label */
```
- Ours is a pill with a dot; theirs is a 3px accent bar + tracked caps. Minor alt style if we want variety.

---

## Assets Needed to Recreate (Mojsilov context)
1. **Full-bleed car detailing photos** — landscape crops for the bracket-label interleave (headlights, foam, interior). We already have `assets/far-*`, `poliranje farova hero.jpg`, gallery shots. Reuse.
2. **No custom fonts** — Inter Tight is theirs; we keep Oswald + Inter.
3. **No SVG/lottie assets** — all effects are CSS. Arrows/plus are tiny inline SVGs (we already have equivalents).

---

## Build Plan (adopting into Mojsilov)

### Recommended approach
- **Stack:** our existing vanilla HTML + Tailwind CDN + `css/styles.css` + `js/site.js`. No new deps. Webflow IX2 → our existing `.reveal` IntersectionObserver.
- **Palette map:** `#ff4d24 → #2164DA`, `#1f1915/#000 → #121358`, muted `#758696 → #B6BDC2`. Keep one-accent restraint.
- **Type:** copy the tight tracking (`letter-spacing:-0.04rem` headings, `-0.06rem` on big display) onto our Oswald headings; use `clamp()` for the big-text.

### Priority order (highest value first)
1. **Bracket big-text usluge showcase** (`.fda-big-text`) — new, unique, no equivalent yet. Build as a section: 3–4 huge Oswald rows `[ Usluga ]` with accent brackets, pre/posle photos interleaved, `.reveal` fade-up.
2. **Staggered ghost-number services** — restyle a services grid with big offset ghost numbers (reuse `.how-num` tokens).
3. **Button vertical text-swap** hover on primary CTAs.
4. **FAQ plus→minus** bar toggle (swap our rotate-to-× for the collapse-vertical bar).
5. **Stats accent glow-line** divider + **eyebrow bar** variant — small polish.

## Notes
- Nothing here is premium-plugin-locked; it's a stock Webflow template. All effects are CSS + Webflow's default fade-up.
- **Don't** copy the warm palette or the Chakrapetch heading intent — our navy/Oswald identity stays. Borrow *composition and type scale*, not color.
- Biggest single win = the **bracket big-text section**; it's the one thing Mojsilov doesn't already have an analog for.
