# Mojsilov Detailing: brend za dokumente (ponude, PDF, štampa)

Izvor istine je sajt mojsilov.com (ovaj repo, `css/styles.css` i `js/site.js`). Ovo je sažetak za sve što ide **van sajta**: ponude firmama, PDF, letke, kartice. Aplikacija Mojsilov Klub ima namerno drugačiji izgled (mat crna, `#1a5bff`, Montserrat) i NE koristi se za dokumente.

## Boje
| Ime | Hex | Upotreba |
|---|---|---|
| Navy | `#121358` | naslovi, tamne strane, brojevi u kvadratima |
| Navy duboka | `#0b0c3a` | dno tamnog preliva |
| Plava | `#293681` | sporedna tamna |
| Akcent | `#2164da` | druga linija naslova, oznake, ivice okvira, dugmad |
| Akcent na tamnom | `#5d8dff` / `#8fb4ff` | akcent kad je podloga navy |
| Siva | `#b6bdc2` | sitni natpisi u zaglavlju |
| Tekst | `#1d2230`, sporedni `#5b6275` | telo teksta |

Tamna strana = navy preliv + plavi sjaj gore desno + tanka rešetka 14 mm koja bledi naniže (kao hero na sajtu).

## Fontovi
- **Oswald** 500/600, VERZAL: naslovi, brojevi, cene, nazivi usluga.
- **Inter** 400/600: sav ostali tekst.
- Naslov u dve linije: prva navy, druga akcent plava („Cene i **rezultati**").

## Elementi
- **Oznaka** iznad naslova: pilula sa plavom tačkom, verzal, razmaknuta slova („IDEJA", „ZAŠTO MI").
- **Okvir sa zagradama**: tanka ivica + plave ugaone zagrade gore levo i dole desno.
- **Stavke**: broj (01, 02…) u navy kvadratu, naslov u Oswaldu, rečenica ispod.
- **Pre/posle**: dve fotke jedna do druge, oznaka „PRE" tamna, „POSLE" plava.
- **Brojke**: 300+ usluga, 100+ pozitivnih ocena, 24 meseca garancije, 0 nezadovoljnih (isto kao na sajtu; ne izmišljati nove).

## Ton i pisanje
- Firma govori u **množini**: „dolazimo", „radimo", nikad „ja".
- Klijentu se obraća sa **Vi / Vaš** (veliko V u ponudama).
- **Bez em-dasheva (—)**. Dušan smatra da izgledaju kao AI tekst. Zarez, tačka ili dve tačke.
- Kratke rečenice, konkretno, bez preterivanja. Bez obećanja koja Dušan nije potvrdio (provizije, popusti, rokovi).

## Fajlovi
- `logo.png` (tamni logo, za belu podlogu), `logo-belo.png` (za navy), `logo-mali.png` (MD znak, zaglavlje strane).
- `slike/`: samo Dušanove fotke radova (telefon), smanjene na 1100 px. Parovi pre/posle: `farovi-1`, `farovi-2`, `pedale`, `sediste`, `konzola`, `pod`, `motor`, `motor-2` (npr. `farovi-1-pre.jpg` i `farovi-1-posle.jpg`). Atmosfera: `kombiji.jpg` (prava fotografija), `kombi-mojsilov.jpg` (brendirani kombi, prikaz).
- **Bez AI slika.** Na sajtu su AI: `hero-car.jpg`, `proces.jpg`, `farovi-pre/posle.jpg`, `enterijer-pre/posle.jpg`, `karoserija-pre/posle.jpg` (u EXIF-u piše `sana`), kao i `dubinsko pranje hero.jpg`. Te ne stavljati u dokumente.
- Više slika: `assets/` u korenu ovog repoa (pun sajt), smanjiti pre ubacivanja u PDF.

## Kontakt (uvek isti)
Dušan Mojsilov, osnivač · 062 152 3470 (telefon, Viber, WhatsApp) · MojsilovDetailing@gmail.com · mojsilov.com · aplikacija klub.mojsilov.com

## Cene (stanje 19.11.2026, proveriti u `lib/opcije.ts` i `lib/cenovnik.ts`)
Brzo pranje 3.900 · Dubinsko enterijera od 8.900 (mali/srednji/veliki 8.900/9.900/10.900) · Dubinsko sedišta 4.000 · Poliranje farova 3.500 · Farovi + keramika 4.700 · Jedan far 2.500 · Stop svetla 3.500 · Dubinsko motora od 4.000. Dubinsko pranje auta spolja se trenutno NE nudi.
