# Avontiv — sačuvani izvorni fajlovi

Sirovi izvor Avontiv Webflow templejta (https://avontiv.webflow.io), preuzet 2026-07-08 za matchovanje elemenata u Mojsilov sajt. Analiza i mapiranje na brend: [2026-07-07-avontiv-teardown.md](2026-07-07-avontiv-teardown.md).

## Fajlovi

| Fajl | Sadržaj / ključni elementi |
|------|----------------------------|
| `avontiv.webflow.shared.css` | **Kompletan stylesheet (194KB)** — sva `fda-*` pravila. Izvor istine za tačne vrednosti. |
| `avontiv-home.html` | Home: `fda-counter-v3` (per-cifra counter train), hero, slider |
| `avontiv-about.html` | About: **`fda-big-text` bracket labels** (najvredniji element), ghost brojevi |
| `avontiv-service-one.html` | Services: staggered ghost service numbers, `fda-number-wrap` |
| `avontiv-pricing-one.html` | Pricing tabele |
| `avontiv-contact-one.html` | Contact: `fda-cta-box` glass + corner squares |
| `avontiv-webflow.main.js` | Webflow entry loader (1.8KB) |
| `avontiv-webflow.schunk.36b8fb49.js` | Runtime chunk |
| `avontiv-webflow.schunk.57f77f52.js` | **IX2 interakcije runtime (820KB)** — tram tween lib + moduli (dropdown, forms, scroll, touch) |
| `avontiv-webflow.schunk.61b534da.js` | Runtime chunk |

## JS napomena
Svi `webflow.*.js` su **stock Webflow runtime** — nema page-specific animacija. Animaciona konfiguracija ove stranice živi u `data-w-id` atributima i `<style>` bloku u `<head>` svakog HTML-a (već tu). Ništa od JS-a se ne portuje; naš `.reveal` IntersectionObserver zamenjuje IX2 fade-up. (jQuery 3.5.1 i webfont.js su eksterni CDN, nisu preuzimani.)

## Napomene
- **Nema custom JS animacija** — sve je Webflow IX2 fade-up (`data-w-id` + inline `opacity:0`) + CSS. Naš `.reveal` to pokriva. Webflow JS runtime nije preuzet (samo rspack loader, bez page konfiguracije).
- Paleta se NE kopira: `#ff4d24 → #2164DA`, `#000/#1f1915 → #121358`. Preuzima se kompozicija, tip skala i tight letter-spacing (`-0.04` do `-0.06rem`), ne boja.
- Klase su prefiksovane `fda-` (Flow Design Agency). Grep po `fda-big-text`, `fda-counter`, `fda-cta-box` u `.css` za tačna pravila.
