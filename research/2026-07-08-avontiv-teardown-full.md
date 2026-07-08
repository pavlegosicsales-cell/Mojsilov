# Site Teardown: Avontiv — FULL (source-verified)

**URL:** https://avontiv.webflow.io
**Built by:** Flow Design Agency (class prefix `fda-`)
**Platform:** Webflow (IX2 interactions, jQuery 3.5.1, rspack runtime)
**Date analyzed:** 2026-07-08
**Sources (all saved locally in this folder):** `avontiv-home.html`, `avontiv-about.html`, `avontiv-service-one.html`, `avontiv-pricing-one.html`, `avontiv-contact-one.html`, `avontiv.webflow.shared.css` (198KB), `avontiv-webflow.*.js`.

> Ovo je dopuna [2026-07-07-avontiv-teardown.md](2026-07-07-avontiv-teardown.md) — sada iz **sirovih fajlova**, sa tačnim CSS pravilima (ne WebFetch sažecima). Sva pravila su copy-paste iz `avontiv.webflow.shared.css`. Cilj: adaptacija u **Mojsilov** (navy + hladno-plava). Uzima se kompozicija/tip-skala, ne paleta.

---

## Ispravke ranijeg teardown-a (bitno)

1. **Chakrapetch SE učitava.** CSS ima realan `@font-face` (linija 2049) sa CDN `src` za `ChakraPetch-Regular.ttf`. `:root --heading-font: Chakrapetch, Arial`. Znači naslovi renderuju u **Chakrapetch**-u (tehnički, blago kondenzovan), a NE Inter Tight kako je ranije rečeno. WebFont.load fetuje samo Inter Tight (body), ali `@font-face` lazy-fetuje Chakrapetch kad se glif upotrebi. (Za nas nebitno — mi ostajemo na Oswald.)
2. **Counter „train" nema CSS** — reel se pomera isključivo inline IX2 transformama. Odometar mehanika (v. dole).
3. Postoji i **image curtain reveal** (4 crna panela se povlače) — nije bio u ranijem teardown-u.

---

## Tech Stack (potvrđeno iz izvora)

| Tehnologija | Dokaz | Uloga |
|---|---|---|
| Webflow | `data-wf-*`, `w-*` klase | Builder + hosting |
| Webflow IX2 | `data-w-id` na skoro svakom elementu; inline `opacity:0`/`transform` u `<head><style>` | Deklarativne scroll/hover animacije |
| jQuery 3.5.1 | `<script ...jquery-3.5.1...>` (CDN) | Webflow zavisnost (dropdown, slider, forme) |
| WebFont Loader | `WebFont.load({google:{families:["Inter Tight:300..700"]}})` | Body font |
| tram + webflow.schunk | `avontiv-webflow.schunk.*.js` (820KB) | Stock IX2 runtime — **nula custom animacija** |
| `@keyframes` | Samo jedan: `spin` (loader) | Sve ostalo je IX2 |

**Reveal:** ceo „wow" = (1) ogromna `clamp()` display tipografija, (2) jedna akcent boja samo na markicama/brojevima/barovima, (3) full-bleed foto, (4) Webflow stock fade-up (`translateY(3.125rem)` + `opacity:0` + `blur(0.3125rem)` → 0 na scroll-in). Naš `.reveal` to pokriva.

---

## Design System (tačne vrednosti iz `:root`, linije 2073–2118)

### Boje
| Naziv / var | Vrednost | Mojsilov ekvivalent |
|---|---|---|
| `--reddish-orange` (akcent) | `#ff4d24` | `--akcent #2164da` |
| akcent alt (h3.text-orange) | `#fa471e` | (drop) |
| `--black` | `#000` | `--navy #121358` |
| `--charcoal-brown` | `#1f1915` | `--plava #293681` |
| `--dark-gray` | `#4d4d4d` | slate-600 |
| `--soft-light-gray` | `#e8e8e8` | `rgba(18,19,88,.14)` |
| `--white` | `#fff` | `#fff` |
| hairline (borderi) | `#fff3` (belo 20%) / `#0000004d` (crno 30%) | `rgba(255,255,255,.14)` / `rgba(18,19,88,.14)` |
| ghost broj | `#ffffff59` (belo 35%) | `rgba(18,19,88,.18)` (na svetlom) |
| ghost reč (big-text) | `#fff6` (belo 40%) | `rgba(255,255,255,.85)` na navy |

### Tipografija (`:root`)
| Uloga | Font | Size | Line-height | Letter-spacing |
|---|---|---|---|---|
| Body | Inter Tight 400 | `.9375rem` (15px) | 162.5% | 0 |
| H1 | Chakrapetch | `2.5rem` | 107.14% | `-.04rem` |
| H2 | Chakrapetch | `1.875rem` | 111.11% | `-.04rem` |
| H3 | Chakrapetch | `1.625rem` | 116.66% | `-.04rem` |
| H4 | Chakrapetch | `1.375rem` | 120.83% | `-.04rem` |
| H5 (eyebrow/labele) | Chakrapetch | `1.125rem` | 125% | `-.04rem` |
| Subtext (eyebrow tekst) | Inter Tight 600 | `.875rem` | 171% | **`.1rem`**, uppercase |
| **`.fda-big-text`** | Chakrapetch | **`clamp(35px,10.7vw,180px)`** | 115% | **`-.06rem`** |
| **`.fda-big-text-two`** | Chakrapetch | `clamp(35px,5.73vw,110px)` | 111% | `-.06rem` |

→ Za Mojsilov: Oswald umesto Chakrapetch, ali **kopiraj tight tracking** (`-.04rem` naslovi, `-.06rem` big-text) i `clamp()` skalu.

### Spacing tokeni (`:root`)
- `--xs-container: 82.5rem` (1320px), `--nav-container: 106.875rem` (1710px)
- `--section-small-gap: 7.65625rem`, `--section-big-gap: 8.25rem`
- `--gutter-space: .9375rem`, `--h2-to-text: 1.25rem`, `--h2-to-card: 3.5rem`, `--subtext-to-h2: 1rem`, `--text-to-button: 2.125rem`

### Responsive
Standardni Webflow breakpointi: `max-width: 991px` (tablet), `767px` (mobile-landscape), `479px` (mobile). Plus nekoliko `min-width: 1280/1440/1920`. Big-text koristi `vw` clamp pa skalira fluidno.

---

## Effects Breakdown

| Efekat | Implementacija | Složenost | Cloneable? |
|---|---|---|---|
| Fade/slide-up on scroll | IX2: inline `translateY(3.125rem)+opacity:0+blur(.31rem)` → 0 | Low | Da (`.reveal`) |
| **Counter „train" (odometar)** | `.fda-counter-box` (overflow:clip, h 2.375rem) + stack cifara; IX2 pomera svaki `.fda-counter-train` za `-100%` korake do ciljne cifre | Med | Da — vredi |
| **Bracket big-text `[Maintenance]`** | Sticky sekcija; red = `[`(akcent)+reč(40% ghost)+`]`; slike između redova | Low | **Da — najjače** |
| **Staggered ghost service brojevi** | Kolekcija kartica sa `border-left`; parne kartice `padding-top:20rem` (stagger); ghost `01` = h1 @35% belo | Low | **Da** |
| Image curtain reveal | 4 crna panela (`.fda-overlay-*`, svaki 25%) IX2 povlači sa 4 strane | Low-Med | Da |
| Button text-swap hover | 2 ista labela (`text-two` je `position:absolute;inset:0`); IX2 vertikalni roll | Low | Da |
| Stats accent glow-line | `.fda-counter-glow-line` 1px × 2.6875rem akcent vertikala | Low | Da |
| CTA glass + corner squares | `.fda-cta-box` blur(3.23rem) + 4 akcent kvadrata `.625rem` na ćoškovima | Low | Da (= `.bracket-frame`) |
| Eyebrow bar | `.fda-subtext-border-line` `.1875rem` akcent vertikala + caps `.1rem` tracking | Low | Da |

---

## Implementation Details (tačan CSS + markup)

### 1. Bracket big-text `[ Maintenance ]` — sticky showcase  ← najjače
**CSS:**
```css
.fda-big-text {                       /* linija 4692 */
  font-family: var(--heading-font);   /* → Oswald za nas */
  color: var(--black);
  letter-spacing: -.06rem;
  font-size: clamp(35px, 10.7vw, 180px);
  line-height: 115%;
}
.fda-big-text.fda-service-v5-text-color { color: #fff6; }   /* ghost reč 40% */
.fda-big-text.fda-text-orange           { color: var(--reddish-orange); } /* [ ] */
.fda-service-v5-sticky-wrapper { display:flex; flex-flow:column; align-items:center; gap:2.5rem; }
.fda-service-v5-text-wrapper   { display:flex; justify-content:center; align-items:center; width:100%; }
.fda-1-left  { flex:1; display:flex; justify-content:flex-end; align-items:center; }  /* drži [ */
.fda-1-right { flex:1; }                                                              /* drži ] */
.fda-service-v5-image-main     { width:65.3125rem; height:36.25rem; overflow:hidden; }
```
**Markup (About):**
```html
<div class="fda-service-v5-text-wrapper">
  <div class="fda-1-left"><div class="fda-big-text fda-text-orange">[</div></div>
  <div class="fda-big-text fda-service-v5-text-color">Maintenance</div>
  <div class="fda-1-right"><div class="fda-big-text fda-text-orange">]</div></div>
</div>
<!-- između redova: .fda-service-v5-image-main sa 4x .fda-overlay-* (curtain reveal) -->
```
**Mojsilov:** Oswald uppercase, `clamp(40px,10vw,160px)`, reč `rgba(255,255,255,.85)` na navy, `[ ]` u `#2164DA`. Redovi: `[ Poliranje ]`, `[ Dubinsko ]`, `[ Keramika ]`, sa pre/posle slikama između. Idealno za „usluge" showcase na početnoj ili O nama.

### 2. Staggered ghost service brojevi
**CSS:**
```css
.fda-text-style-h1.fda-service-number-text-color { color:#ffffff59; }   /* 35% belo, h1 size */
.fda-service-v4-card        { border-left:1px solid #fff3; display:flex; flex-flow:column; height:100%; }
.fda-service-v4-card.fda-card-2 { padding-top:20.125rem; }              /* ← STAGGER svake druge */
.fda-service-v4-text-wrapper{ display:flex; flex-flow:column; gap:12rem; }  /* sadržaj ↕ broj */
```
**Markup:** kartica = tekst blok (h4 naslov + p + „View more" button) i na dnu `<div class="fda-text-style-h1 fda-service-number-text-color">01</div>`. Parne kartice gurnute `20rem` naniže → brojevi čitaju kao ritam.
**Mojsilov:** već imamo ghost brojeve (`.how-num` navy@18%). Preuzmi **staggered offset layout** + veći broj + `border-left` hairline. Trivijalan reskin.

### 3. Counter „train" (odometar) — IX2, ne CSS
**CSS (jedino ovo):**
```css
.fda-counter-box.fda-2 { display:flex; height:2.375rem; overflow:clip;
                         justify-content:flex-start; align-items:flex-start; }
```
**Mehanika:** unutar box-a su 2 `.fda-counter-train` (svaka je vertikalni stack cifara `<div>9</div><div>0</div>...`). IX2 svakom train-u setuje inline `transform: translate3d(null, -100%, 0)` (ili `0%`) — reel klizi naviše za korake od 100% dok ciljna cifra ne stane u prozor visine 2.375rem. Nema `@keyframes`, sve je inline transform iz IX2. Odometar efekat (npr. „12k+", „90%", „21+").
**Mojsilov:** naš per-cifra digit roll (`.dgt`/`.dgt-in`) daje sličan osećaj jednim potezom; Avontiv verzija „prevrti" kroz više cifara. Ako želimo taj odometar: stack `0-9` po cifri u maski fiksne visine, `transform: translateY(-N*10%)` na scroll-in, sa stagger delay-em.

### 4. Button text-swap (vertikalni roll)
```css
.fda-button-text { font-family:var(--body-font); font-weight:600; font-size:.9375rem; color:var(--black); }
.fda-button-text.fda-button-text-two { position:absolute; inset:0%; }  /* drugi label preko prvog */
.fda-button-v3-border-line { background:var(--reddish-orange); height:.0625rem; }  /* underline koji raste */
```
Dva ista labela stacked; na hover IX2 roll-uje text-one gore/van, text-two odozdo. Wrapper `.fda-position-relative.fda-overflow-hidden`. `fda-button-v1` ima `border-left:.1875rem solid akcent` + beli/crni bg; `fda-button-v2` je pun akcent pill (h 3.125rem).
**Mojsilov:** dodaj na `.glow-btn` (dva `<span>` + `overflow:hidden`).

### 5. CTA glass box + corner squares (≈ naš `.bracket-frame`)
```css
.fda-cta-box { backdrop-filter:blur(3.23125rem); background:#0000002b; border:1px solid #fff3;
               width:100%; padding:2.8125rem 3.75rem; position:relative; }
.fda-cta-square-one   { width:.625rem; height:.625rem; background:var(--reddish-orange);
                        position:absolute; inset:-.6rem auto auto -.6rem; }   /* TL */
.fda-cta-square-two   { position:absolute; inset:-.7rem -.625rem auto auto; } /* TR */
.fda-cta-square-three { position:absolute; inset:auto auto -.65rem -.6rem; }  /* BL */
.fda-cta-square-four  { position:absolute; inset:auto -.7rem -.6rem auto; }   /* BR */
```
Translucentna staklena CTA preko foto-heroja + 4 akcent kvadrata na ćoškovima. **Skoro identično našem `.bracket-frame`** — reuse, samo je postavi preko foto CTA.

### 6. Eyebrow bar + counter glow-line (mala polirka)
```css
.fda-subtext-wrapper     { display:flex; align-items:stretch; gap:.625rem; }
.fda-subtext-border-line { background:var(--reddish-orange); width:.1875rem; }  /* kratka vertikala */
.fda-counter-glow-line   { position:absolute; z-index:1; background:var(--reddish-orange);
                           width:.0625rem; height:2.6875rem; }                 /* divider u stats redu */
```
Naš eyebrow je pill sa tačkicom; njihov je 3px akcent bar + caps `.1rem` tracking (alt varijanta ako želimo raznovrsnost). Glow-line = tanak akcent divider između stat stavki.

### 7. Section grid borderi (counter-v3 mreža)
```css
.fda-position-relative.fda-bottom-border { border-bottom:1px solid #fff3; }
.fda-position-relative.fda-right-border  { border-right:1px solid #fff3; }
.fda-counter-v3-main        { display:flex; justify-content:space-between; gap:1.875rem; }
.fda-counter-v3-left-wrapper{ display:grid; grid-template-columns:1fr 1fr; grid-template-rows:auto auto; }
.fda-counter-v3-text-box    { border-bottom:.1875rem solid var(--reddish-orange); background:var(--black); }
```
2×2 mreža ćelija razdvojena `#fff3` hairline-ovima (`bottom-border`/`right-border` klase po ćeliji) — isti „otvorena bordered mreža" jezik kao naš `.svc-grid`/`.nr-stats`.

---

## Assets za rekreaciju (Mojsilov)
1. **Full-bleed foto** (landscape) za bracket interleave + CTA hero — imamo `far-*`, `poliranje farova hero.jpg`, galeriju. Reuse.
2. **Bez custom fontova** — Oswald + Inter ostaju.
3. **Bez SVG/lottie** — svi efekti su CSS/IX2; strelice/plus su mali inline SVG (imamo).

---

## Build plan (prioritet, najveća vrednost prvo)
1. **Bracket big-text usluge showcase** — nov, nema analog. Sticky sekcija, 3–4 Oswald reda `[ Usluga ]` sa akcent zagradama, pre/posle foto između, `.reveal` fade-up.
2. **Staggered ghost-number usluge** — reskin postojećeg grida sa velikim offset ghost brojevima (`.how-num` tokeni + `padding-top` stagger + `border-left`).
3. **Counter odometar** (opciono, ako želimo bogatiji od digit roll-a) — po-cifra reel u maski fiksne visine.
4. **Button vertikalni text-swap** na `.glow-btn`.
5. **Eyebrow bar varijanta** + **stats glow-line divider** — sitna polirka.

## Notes
- Sve je stock Webflow — nema premium plugina, nema licencnih prepreka.
- **Ne kopiraj** toplu paletu ni Chakrapetch — navy/Oswald identitet ostaje. Uzmi kompoziciju i tip-skalu.
- Najveći pojedinačni dobitak = **bracket big-text sekcija** (jedino za šta Mojsilov nema analog).
- Kompletan izvor je lokalno; za bilo koje dodatno `fda-` pravilo grep po `avontiv.webflow.shared.css`.
