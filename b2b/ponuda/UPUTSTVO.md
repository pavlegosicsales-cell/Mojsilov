# Ponude za saradnju (B2B) — uputstvo za Claude (radi i sa telefona)

Pre rada pročitaj `b2b/brend/DIZAJN.md` (boje, fontovi, ton: množina, „Vi", bez em-dasheva).

## Gotova ponuda
- `b2b/ponuda/bg-apartments.html` — 6 strana A4: naslovna, ideja, kako radi, **šta Vi dobijate**, cene + pre/posle, zašto mi + kontakt.
- Stil je zajednički: `b2b/ponuda/ponuda.css`. Ne menjaj ga za jednu ponudu; ako nešto mora, piši inline `style=""`.

## Kad Pavle pošalje Dušanov dogovor
1. U `bg-apartments.html` (strana 4) zameni ceo `<div class="popuni" …>…</div>` stavkama, isti oblik kao na strani 2:
   ```html
   <div style="margin-top:9mm">
     <div class="stavka"><div class="broj">01</div><div><h3>Naslov stavke</h3><p>Jedna do dve rečenice.</p></div></div>
     <div class="stavka"><div class="broj">02</div><div><h3>…</h3><p>…</p></div></div>
   </div>
   ```
   Najviše 4 stavke, da strana ne pređe na sledeću.

   **Ako Dušan ima svoj plan za ceo PDF** (drugi redosled, nove strane, drugi tekst): prati njegov plan. Strane slaži od postojećih klasa iz `ponuda.css` (`.strana`, `.tamna`, `.oznaka`, `.stavka`, `.okvir`, `.cene`, `.pp`, `.brojke`, `.foto-traka`), da izgled ostane isti. Svaka `.strana` je tačno jedna A4: posle izmena proveri da se sadržaj ne preliva (vidi dno uputstva).
2. Proveri da nigde nema em-dasha (—), da se piše u množini i da nema obećanja koja Dušan nije rekao.
3. PDF: `node b2b/ponuda-pdf.mjs b2b/ponuda/bg-apartments.html b2b/ponuda/pdf/BG-Apartments-Mojsilov-Detailing.pdf`
   - Alat odbija da napravi PDF dok postoji žuti okvir „POPUNJAVA DUŠAN". To je namerno.
   - Ako nema Chrome-a (oblak), alat sam instalira Playwright chromium. Fontovi se vuku sa Google Fonts, treba mreža.
   - Probni PDF sa žutim okvirom: dodaj `--nacrt`.
4. Commit + push PDF-a (samo fajlove u `b2b/`, nikad `git add -A`). Pavle ga skida sa telefona: GitHub aplikacija → Mojsilov → `b2b/ponuda/pdf/` → fajl → Podeli / Preuzmi, pa ga šalje Dušanu, a Dušan partneru na Viber.

## Nova ponuda za drugog partnera
Kopiraj `bg-apartments.html` u `b2b/ponuda/<partner>.html`, zameni „BG Apartments" (naslovna, zaglavlja svih strana, `<title>`) i prilagodi tekst strana 2 i 3 njihovom poslu. Strana 4 opet ostaje `popuni` dok Dušan ne javi dogovor.

## Provera izgleda bez PDF čitača
`chrome --headless=new --window-size=794,6800 --screenshot=strane.png file:///…/bg-apartments.html` pa iseci po 1153 px visine (jedna A4 strana + razmak).
