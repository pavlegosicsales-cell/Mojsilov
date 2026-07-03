# Dizajn sistem — Mojsilov Detailing

> Vizuelni jezik sajta: tipografija, boje, struktura stranica. Referenca za Claude Design i Claude Code — primeniti konzistentno na svaku stranicu.

**Pravac:** premium, topao ali profesionalan. Kondenzovani akcenat inspirisan „Moxom" šablonom, ali ublažen — bez hladnog korporativnog tona. Sav sadržaj na srpskom.

---

## Tipografija

### Fontovi (Google Fonts, besplatni, puna podrška za č ć š ž đ)

- **Display / veliki naslovi:** Oswald (600), alternativa Archivo Narrow. Kondenzovani, bold, uppercase.
- **Body / podnaslovi / opisi:** Inter (400/500/600), alternativa Manrope.

```
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
```

### Pravila upotrebe

- Kondenzovani font (Oswald) **samo** za H1/H2 i velike naslove sekcija (npr. „NAŠE USLUGE", „CENOVNIK"). Koristiti štedljivo — inače sklizne u hladan korporativni ton.
- Sve ostalo (H3 naniže, podnaslovi, body, dugmad, FAQ, cene) — Inter.
- **Uppercase samo za kratke naslove sekcija i CTA.** Nikada uppercase u body tekstu — na srpskom je teže za čitanje i deluje kao „vikanje" (v. brand-voice.md).
- Body tekst uvek normalne veličine, dovoljan line-height za čitljivost (1.5–1.7).

### Preporučena skala (okvirno)

| Element | Font | Veličina (desktop) | Težina |
|---------|------|-------------------|--------|
| H1 (hero) | Oswald | 56–72px | 700 |
| H2 (sekcija) | Oswald | 36–48px | 600 |
| H3 | Inter | 22–28px | 600 |
| Body | Inter | 16–18px | 400 |
| Podnaslov/labela | Inter | 13–14px, letter-spacing | 500–600 |
| Dugme (CTA) | Inter | 15–16px | 600 |

---

## Boje

### Paleta

| Naziv | Hex | Upotreba |
|-------|-----|----------|
| Navy plava | `#121358` | Primarna tamna — pozadine sekcija, hero, footer |
| Plava | `#293681` | Sekundarna — kartice, akcenti, hover stanja |
| Akcent plava | `#2164DA` | CTA dugmad, ključni linkovi, akcenti — najživlja boja, koristiti štedljivo |
| Crna | `#000000` | Tekst na svetloj podlozi, maksimalni kontrast |
| Svetlo siva | `#B6BDC2` | Sekundarni tekst, ivice, suptilne pozadine |
| Bela | `#FFFFFF` | Svetle pozadine, tekst na tamnoj podlozi |

### Akcentna boja — pravila

Akcent plava `#2164DA` je najživlja boja u paleti i nosi vizuelnu težinu — jasno se izdvaja od tamne navy i daje CTA-ovima da „skaču".

- Koristiti **samo** za primarna CTA dugmad, ključne linkove i suptilne akcente (npr. ikonice, brojevi, linije).
- Ne koristiti za velike površine ni za body tekst — gubi vrednost ako se prekomerno koristi.
- Primarno dugme: akcent plava pozadina + beli tekst. Sekundarno dugme: outline akcent plava ili navy.
- Na tamnoj (navy) podlozi akcent plava se najlepše ističe — koristiti tu za glavne CTA.
- Paleta je sad kohezivno plava (navy → plava → akcent plava). Da izbegneš hladan korporativni ton, toplinu unosi kroz dovoljno belog prostora i tople fotografije (auti, farovi, enterijer) — ne kroz akcent.

### Smernice primene

- Tamne sekcije (navy `#121358`) za hero, footer i sekcije koje treba da deluju premium — beli tekst preko.
- Svetle sekcije (bela) za usluge, cenovnik, FAQ — crn/navy tekst, dovoljno vazduha.
- Naizmenično svetlo/tamno između sekcija za ritam i razdvajanje.
- Svetlo siva za sekundarni tekst (labele, napomene), nikad za glavni body na beloj podlozi (slab kontrast).

---

## Struktura stranica

### Home page
Glavna konverziona stranica. Redosled sekcija definiše se kasnije (u Claude Code promptu, uz Moxom inspiraciju). Načelno: sekcije mapirane na barijere kupca (v. ICP.md — hero→vreme, proces→poverenje, galerija→kvalitet, cenovnik→vrednost, FAQ→sumnje).

### O nama
Priča o brendu (v. istorija brenda u business-details.md — 4 faze), profil osnivača, vrednosti. Gradi poverenje kroz autentičnu priču.

### Usluge (pregledna stranica)
Sve usluge na jednom mestu sa kratkim opisima i linkovima ka detaljnim stranicama.

### Poliranje farova (detaljna stranica)
Potpis usluga. Proces (šmirglanje, 3 faze poliranja), paketi (sa/bez keramike), cene, garancija 12/24 meseca, pre/posle galerija, FAQ specifičan za farove.

### Dubinsko pranje auta (detaljna stranica)
Paketi (kompletno / enterijer / sedišta), šta uključuje, cene po kategoriji vozila, trajanje, pre/posle galerija.

### Kontakt
Telefon, Viber/WhatsApp, email, radno vreme, adresa. Jasan poziv na zakazivanje (slanje slika za procenu). Bez formi koje stvaraju trenje — primarno telefon/poruka.

---

## Opšte smernice (v. brand-voice.md za detalje)

- Bez FOMO, urgentnosti, uzvičnika u body tekstu.
- Em dash obrazac za flow: tvrdnja — pojašnjenje/korist.
- Cena kao investicija, nikad trošak.
- Dovoljno belog prostora — nikad zid teksta.
- Fotografije pre/posle su heroj sadržaj — dizajn treba da ih istakne, ne da se takmiči sa njima.