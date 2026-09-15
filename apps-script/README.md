# Mojsilov Detailing — backend forme (Google Apps Script)

Kontakt forma (wizard) na `index.html` i `kontakt.html` šalje upit ovom Apps Script
web app-u, koji: (1) upisuje red u Google Sheet i (2) šalje jedno brendirano
obaveštenje na mejl. Bez Web3Forms.

## Deploy (jednom)

1. Napravi Google Sheet (npr. „Mojsilov lidovi"). U njemu: **Extensions > Apps Script**.
2. U `Code.gs` obriši sve i **nalepi ceo sadržaj** `Code.gs` iz ovog foldera.
3. `NOTIFY_TO` je već postavljen na klijentov mejl `MojsilovDetailing@gmail.com`
   (odluka: preskočiti test na sopstveni mejl). PAŽNJA: svaka proba obrasca
   stiže direktno klijentu (Dušanu).
4. **Deploy > New deployment > Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Authorize (Google će tražiti dozvolu prvi put).
5. Kopiraj **/exec URL**.
6. Otvori `js/site.js`, nađi `const FORM_ENDPOINT = '';` i nalepi URL:
   `const FORM_ENDPOINT = 'https://script.google.com/macros/s/…/exec';`
   Push na `main` (Vercel auto-deploy).

## Kad menjaš `Code.gs` kasnije

**Deploy > Manage deployments > (olovka) edit > Version: New version > Deploy.**
Sama izmena skripte NE menja živi URL. Ovo je zamka koja sve zbuni.

## Go-live

`NOTIFY_TO` je već na `MojsilovDetailing@gmail.com`, tako da je forma live čim
deployuješ i nalepiš `/exec` URL u `FORM_ENDPOINT`. Nema naknadne izmene mejla.

## Polja koja forma šalje

`name`, `phone`, `email`, `service`, `velicina`, `keramika`, `termin`, `message`, `page`
(plus `botcheck` honeypot koji backend tiho odbacuje).
Kolone u Sheet-u: Primljeno, Ime, Telefon, Email, Usluga, Veličina, Keramika, Termin, Poruka, Strana.

Napomena o koracima: veličina vozila se pita samo za dubinsko pranje auta/enterijera/motora
(preskače se za poliranje farova, brzo pranje i nameštaj). Poliranje farova umesto toga pita
sa keramikom / bez (3.500 / 4.700 din). Brzo pranje je fiksno 2.900.

## Poznata ograničenja

- Sajt šalje **GET + no-cors** (Apps Script 302-redirektuje POST i gubi telo).
  Zato browser ne može da pročita odgovor: poruka „Upit je poslat" se prikaže
  bez obzira da li je mejl stvarno otišao. Zato prvo testiraj na svoj mejl.
- Gmail besplatni nalog: 100 mejlova/dan (sasvim dovoljno za formu).
- Reply na obaveštenje ide direktno pošiljaocu upita (`replyTo`).

## Preview mejla

Renderovan i proveren (glavni + 8 edge slučajeva: samo email, samo telefon,
junk telefon, bez poruke, prazno, hostile/XSS, overflow, nameštaj bez veličine).
Sve provere prošle (bez raw `<script>`, bez ranog zatvaranja `style`/`href`).
