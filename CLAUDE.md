# Mojsilov Detailing sajt (mojsilov.com)

Statičan sajt (HTML + Tailwind CDN). Zajednički header/footer i meni ubacuje `js/site.js` (niz NAV). Lokalno: `PORT=8080 node serve.mjs`.

## Pravila
- Korisnik je Pavle (developer), klijent je Dušan Mojsilov. Kad je provereno, commit i push bez pitanja.
- Autor commita: `pavlegosicsales-cell <lazar22.gosic@gmail.com>`, na kraju poruke `Co-Authored-By` red iz sistemskih uputstava.
- Nikad `git add -A`: dodaj samo fajlove koje si menjao. U folderu ima tuđih nepraćenih fajlova (slike, beleške) koji ne idu u git.
- Bez em-dasheva (—) u tekstu za kupca. Mobilnu verziju radiš sam, u istom potezu.
- Repo je JAVAN na GitHubu i servira se na mojsilov.com. Tajne nikad u git (`.env` je ignorisan).

## Ponude firmama (B2B, PDF)
Sve je u `b2b/` i NE objavljuje se na sajtu (`.vercelignore`). Uputstvo: `b2b/ponuda/UPUTSTVO.md`, brend: `b2b/brend/DIZAJN.md`. PDF: `node b2b/ponuda-pdf.mjs <ponuda.html> [izlaz.pdf]`.
Napomena: GitHub repo je javan, pa ko zna adresu repoa može da vidi i ponude. Ne upisivati poverljive uslove (provizije, interni dogovori) ako Pavle ne kaže da je u redu.

## Cenovnici (PDF)
Običan cenovnik (cene sa sajta): `b2b/cenovnik/cenovnik.html` → `b2b/cenovnik/pdf/`. Cenovnik za pravna lica je PRIVATAN: `../Mojsilov-Dashboard/docs/cenovnik/` (cene za firme su niže od cena na sajtu, pa ne idu u javni repo). PDF istim alatom: `node b2b/ponuda-pdf.mjs <html> <pdf>`.
