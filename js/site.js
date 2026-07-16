/* ==========================================================================
   Mojsilov Detailing — deljena logika sajta
   - Tailwind config (custom boje/fontovi)  → mora pre nego što Tailwind obradi klase
   - Injekcija deljenog header-a i footer-a  (DRY preko svih strana)
   - Mobilni meni, FAQ akordeon, pre/posle slajder, scroll reveal, forma
   ========================================================================== */

/* --- Tailwind config (izvršava se odmah, pre obrade) --------------------- */
window.tailwind = window.tailwind || {};
tailwind.config = {
  theme: {
    extend: {
      colors: {
        navy: '#121358',
        plava: '#293681',
        akcent: '#2164da',
        siva: '#b6bdc2',
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: { container: '1500px' },
    },
  },
};

/* --- Konstante brenda ---------------------------------------------------- */
const TEL = '+381621523470';
const TEL_DISPLAY = '062 152 3470';
const WA = 'https://wa.me/381621523470';
const VIBER = 'viber://chat?number=%2B381621523470';
const EMAIL = 'MojsilovDetailing@gmail.com';

/* --- Ikonice (inline SVG) ------------------------------------------------ */
const icon = {
  phone: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm5.8 14.2c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.1.24-3.7-.78-3.13-1.23-5.12-4.4-5.28-4.6-.15-.2-1.25-1.66-1.25-3.16s.79-2.24 1.07-2.55c.28-.3.6-.38.8-.38l.58.01c.19.01.44-.07.68.52.24.6.83 2.06.9 2.2.07.15.12.32.02.52-.1.2-.15.32-.3.5l-.44.5c-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.2.73-.85.92-1.14.2-.29.39-.24.66-.15.27.1 1.7.8 2 .95.28.15.47.22.54.34.07.12.07.68-.17 1.35z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  clock: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  pin: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  mail: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>',
  sparkles: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4M22 5h-4M4 17v2M5 18H3"/></svg>',
};

/* --- Navigacija ---------------------------------------------------------- */
/* Multi-page: hash stavke vode na sekcije početne strane; `page` stavke na
   zasebne stranice. Sa podstranice se hash linkovi prefiksuju sa index.html. */
const IS_SUBPAGE = /\/[^/]+\.html$/i.test(location.pathname) && !/index\.html$/i.test(location.pathname);
const NAV = [
  { label: 'Početna', hash: '#pocetna' },
  { label: 'O nama', page: 'o-nama.html' },
  { label: 'Usluge', hash: '#usluge', dropdown: [
    { label: 'Dubinsko pranje', page: 'dubinsko-pranje.html' },
    { label: 'Poliranje farova', page: 'poliranje-farova.html' },
    { label: 'Pranje nameštaja', page: 'namestaj.html' },
  ] },
  { label: 'Kontakt', page: 'kontakt.html' },
];
/* Flat lista za mobilni meni i footer — dropdown roditelj se zamenjuje podstavkama */
const NAV_FLAT = NAV.flatMap((n) => (n.dropdown ? n.dropdown : [n]));
/* href za nav stavku, ispravan i sa početne i sa podstranice */
const navHref = (n) => (n.page ? n.page : (IS_SUBPAGE ? 'index.html' + n.hash : n.hash));
/* href za proizvoljan hash sa bilo koje strane (CTA dugmad, footer linkovi) */
const homeHash = (hash) => (IS_SUBPAGE ? 'index.html' + hash : hash);
/* CTA „Pozovite nas": na podstranicama vodi na kontakt kanale, na početnoj na sekciju kontakt */
/* „Pozovite nas" dugmad (nav + mobilni meni) vode direktno u dialer, ne na sekciju. */
const ctaHref = 'tel:' + TEL;
/* da li je nav stavka trenutna stranica (za aktivno stanje na podstranici) */
const isCurrentPage = (n) => n.page && location.pathname.toLowerCase().endsWith('/' + n.page);

const socialLinks = `
  <a href="#" aria-label="Instagram" class="opacity-80 hover:opacity-100 hover:text-akcent transition">${icon.instagram}</a>
  <a href="#" aria-label="Facebook" class="opacity-80 hover:opacity-100 hover:text-akcent transition">${icon.facebook}</a>
`;

/* --- Header -------------------------------------------------------------- */
function headerHTML() {
  /* Nav linkovi u Oswald-u (font-display, uppercase) kao naslovi sajta */
  const linkCls = 'nav-link font-display uppercase tracking-wide text-[15px] lg:text-base text-white/85 hover:text-white';
  const links = NAV.map((n) => {
    if (n.dropdown) {
      const parentActive = n.dropdown.some(isCurrentPage);
      const items = n.dropdown
        .map((d) => `<a href="${navHref(d)}" class="nav-dd-link${isCurrentPage(d) ? ' is-active' : ''}">${d.label}</a>`)
        .join('');
      return `<div class="nav-dd">
        <a href="${navHref(n)}" class="${linkCls}${parentActive ? ' is-active' : ''}" aria-haspopup="true">${n.label}
          <svg class="nav-dd-caret" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </a>
        <div class="nav-dd-panel">${items}</div>
      </div>`;
    }
    return `<a href="${navHref(n)}" class="${linkCls}${isCurrentPage(n) ? ' is-active' : ''}">${n.label}</a>`;
  }).join('');
  const mobileLinks = NAV_FLAT.map(
    (n) => `<a href="${navHref(n)}" data-close-menu class="font-display uppercase text-2xl text-white/90 hover:text-akcent transition">${n.label}</a>`
  ).join('');

  return `
  <div class="header-inner">
    <nav class="max-w-container mx-auto px-5 lg:px-8 h-[96px] lg:h-[124px] relative flex items-center justify-between gap-4">
      <a href="${homeHash('#pocetna')}" class="flex items-center gap-3 shrink-0" aria-label="Mojsilov Detailing, početna">
        <img src="brand_assets/mojsilov-logo%201.png" alt="Mojsilov Detailing logo" class="logo-mark h-[42px] lg:h-[62px] w-auto" />
        ${!IS_SUBPAGE ? '<span class="nav-wordmark font-display">MOJSILOV</span>' : ''}
      </a>

      <div class="hidden lg:flex items-center justify-center gap-11 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">${links}</div>

      <!-- Mobilni: dugme sa brojem telefona u centru nav bara -->
      <a href="tel:${TEL}" aria-label="Pozovite nas" class="nav-phone lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white whitespace-nowrap">
        ${icon.phone}<span>${TEL_DISPLAY}</span>
      </a>

      <div class="flex items-center justify-end gap-4">
        <a href="tel:${TEL}" class="nav-phone hidden xl:inline-flex items-center gap-2 text-sm font-medium text-white hover:text-white transition">
          ${icon.phone}<span>${TEL_DISPLAY}</span>
        </a>
        <a href="${ctaHref}" class="glow-btn hidden lg:inline-flex">Pozovite nas ${icon.sparkles}</a>
        <button id="menu-open" class="lg:hidden text-white p-2 -mr-2" aria-label="Otvorite meni">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
        </button>
      </div>
    </nav>
  </div>

  <!-- Mobilni meni -->
  <div id="menu-overlay" class="fixed inset-0 bg-black/50 z-[60] opacity-0 pointer-events-none transition-opacity duration-300"></div>
  <aside class="mobile-menu fixed top-0 right-0 bottom-0 w-[86%] max-w-sm bg-navy z-[70] p-7 flex flex-col">
    <div class="flex items-center justify-between mb-10">
      <img src="brand_assets/mojsilov-logo.png" alt="Mojsilov Detailing" class="logo-img h-12 w-auto"/>
      <button id="menu-close" class="text-white p-2 -mr-2" aria-label="Zatvorite meni">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
      </button>
    </div>
    <div class="flex flex-col gap-6">${mobileLinks}</div>
    <div class="mt-auto pt-8 border-t border-white/10">
      <a href="tel:${TEL}" class="flex items-center gap-2 text-white/85 mb-4">${icon.phone}<span>${TEL_DISPLAY}</span></a>
      <a href="${ctaHref}" data-close-menu class="glow-btn w-full">Pozovite nas ${icon.sparkles}</a>
    </div>
  </aside>`;
}

/* --- Footer -------------------------------------------------------------- */
function footerHTML() {
  const links = NAV_FLAT.map(
    (n) => `<li><a href="${navHref(n)}" class="text-white/70 hover:text-white transition text-sm">${n.label}</a></li>`
  ).join('');

  return `
  <div class="ac-footer relative overflow-hidden">
    <div class="ac-footer-glow" aria-hidden="true"></div>
    <!-- Moxom „cool linije" — vertikalne 1px vodilje koje dopiru do ivica sekcije -->
    <div class="ac-footer-lines" aria-hidden="true">
      <span class="afl" style="left:0"></span>
      <span class="afl" style="left:25%"></span>
      <span class="afl" style="left:50%"></span>
      <span class="afl" style="left:75%"></span>
      <span class="afl" style="left:100%"></span>
    </div>
    <div class="max-w-container mx-auto px-5 lg:px-8 relative z-10 pt-16 lg:pt-20">
      <div class="ac-footer-grid">
        <!-- Brend -->
        <div>
          <img src="brand_assets/mojsilov-logo%201.png" alt="Mojsilov Detailing" class="logo-mark h-12 w-auto mb-4"/>
          <p class="ac-tagline">Profesionalni mobilni auto-detailing i restauracija farova na vašoj adresi u Beogradu, bez odlaska u servis.</p>
        </div>

        <div class="foot-col corner-frame">
          <h4>Navigacija</h4>
          <ul>${NAV_FLAT.map((n) => `<li><a href="${navHref(n)}">${n.label}</a></li>`).join('')}</ul>
        </div>

        <div class="foot-col corner-frame">
          <h4>Usluge</h4>
          <ul>
            <li><a href="poliranje-farova.html">Poliranje farova</a></li>
            <li><a href="dubinsko-pranje.html">Dubinsko pranje auta</a></li>
            <li><a href="dubinsko-pranje.html">Pranje enterijera</a></li>
            <li><a href="namestaj.html">Pranje nameštaja</a></li>
          </ul>
        </div>

        <div class="foot-col corner-frame">
          <h4>Kontakt</h4>
          <ul class="ac-contact">
            <li><a href="tel:${TEL}">${icon.phone}<span>${TEL_DISPLAY}</span></a></li>
            <li><a href="mailto:${EMAIL}" class="break-all">${icon.mail}<span>${EMAIL}</span></a></li>
            <li>${icon.pin}<span>Novobeogradskih graditelja 23a, Ledine, Beograd</span></li>
            <li>${icon.clock}<span>Pon–Ned · 09:00–21:00</span></li>
          </ul>
        </div>
      </div>

      <p class="ac-seo">Mojsilov Detailing, mobilni car detailing Beograd: poliranje farova, dubinsko pranje auta, čišćenje farova, keramička zaštita i restauracija farova na adresi klijenta (Novi Beograd, Zemun i okolina).</p>

      <div class="ac-footer-bar">
        <div class="ac-copy">© ${new Date().getFullYear()} Mojsilov Detailing. Sva prava zadržana.</div>
        <div class="ac-copy">${EMAIL}</div>
      </div>
    </div>

    <!-- Veliki MOJSILOV sa hover-reveal efektom (iscrtavanje + gradient prati kursor) -->
    <div class="footer-text-section max-w-container mx-auto px-5 lg:px-8 relative z-[2] moj-wrap">
      <svg class="moj-svg" viewBox="0 0 900 120" width="100%" xmlns="http://www.w3.org/2000/svg" aria-label="MOJSILOV" role="img">
        <defs>
          <linearGradient id="mojGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="900" y2="120">
            <stop offset="0%" stop-color="#7fb0ff"/>
            <stop offset="32%" stop-color="#2164da"/>
            <stop offset="66%" stop-color="#5566cf"/>
            <stop offset="100%" stop-color="#8fbaff"/>
          </linearGradient>
          <radialGradient id="mojReveal" gradientUnits="userSpaceOnUse" r="175" cx="450" cy="60">
            <stop offset="0%" stop-color="white"/>
            <stop offset="100%" stop-color="black"/>
          </radialGradient>
          <mask id="mojMask"><rect x="0" y="0" width="900" height="120" fill="url(#mojReveal)"/></mask>
        </defs>
        <text class="moj-outline" x="450" y="66" text-anchor="middle" dominant-baseline="middle" textLength="860" lengthAdjust="spacingAndGlyphs" font-size="104">MOJSILOV</text>
        <text class="moj-draw" x="450" y="66" text-anchor="middle" dominant-baseline="middle" textLength="860" lengthAdjust="spacingAndGlyphs" font-size="104">MOJSILOV</text>
        <text class="moj-fill" x="450" y="66" text-anchor="middle" dominant-baseline="middle" textLength="860" lengthAdjust="spacingAndGlyphs" font-size="104" mask="url(#mojMask)">MOJSILOV</text>
      </svg>
    </div>
  </div>`;
}

/* --- Interakcije --------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  if (header) header.innerHTML = headerHTML();
  const footer = document.getElementById('site-footer');
  if (footer) footer.innerHTML = footerHTML();

  /* Fill-up hover na numerisanim step karticama (Avontiv about) — puni se odozdo
     navy, tekst/broj postaju beli. Samo .how-cell koje imaju .how-num (koraci). */
  document.querySelectorAll('.how-cell').forEach((cell) => {
    if (!cell.querySelector('.how-num')) return;
    cell.classList.add('fill-up');
    const bg = document.createElement('span');
    bg.className = 'fill-bg';
    bg.setAttribute('aria-hidden', 'true');
    cell.insertBefore(bg, cell.firstChild);
  });

  /* Hero grid „uklapanje" (Avontiv gold): kockice grida = dimenzije staklene
     kartice, poravnate na njene ivice → kartica sedi tačno u jednoj ćeliji.
     Samo desktop; mobilni koristi CSS fallback. */
  const alignHeroGrid = () => {
    document.querySelectorAll('.hero2').forEach((hero) => {
      const grid = hero.querySelector('.hero2-grid');
      const card = hero.querySelector('.hero2-card');
      if (!grid || !card) return;
      if (!window.matchMedia('(min-width:1024px)').matches) {
        grid.style.backgroundSize = '';
        grid.style.backgroundPosition = '';
        grid.classList.add('is-aligned');
        return;
      }
      const hr = hero.getBoundingClientRect();
      const cr = card.getBoundingClientRect();
      /* Kartica ima .reveal (translateY) — oduzmi trenutni transform da bismo
         poravnali na FINALNU poziciju od prvog frejma (bez „snap"-a kad se
         reveal slegne). */
      let tx = 0, ty = 0;
      const tf = getComputedStyle(card).transform;
      if (tf && tf !== 'none') {
        try { const m = new DOMMatrixReadOnly(tf); tx = m.m41; ty = m.m42; } catch (e) {}
      }
      grid.style.backgroundSize = cr.width + 'px ' + cr.height + 'px';
      grid.style.backgroundPosition = ((cr.left - hr.left) - tx) + 'px ' + ((cr.top - hr.top) - ty) + 'px';
      grid.classList.add('is-aligned');
    });
  };
  if (document.querySelector('.hero2')) {
    alignHeroGrid();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(alignHeroGrid);
    window.addEventListener('load', alignHeroGrid);
    window.addEventListener('resize', alignHeroGrid);
    /* Hero2 sadržaj je uvek iznad preloma → prikaži ga ODMAH (uz fade). Reveal
       observer bi na nižim ekranima promašio donji sadržaj (naslov/kartica) jer
       je poravnat na dno, pa bi ostao nevidljiv dok se ne skroluje. */
    requestAnimationFrame(() => {
      document.querySelectorAll('.hero2 .reveal').forEach((el) => el.classList.add('in'));
    });
  }

  /* Home hero (#pocetna): traka 01–04 je deo hero prostora (delom vidljiva već pri
     učitavanju), pa treba da se pojavi ODMAH sa hero-om, a ne tek na skrol. Reveal
     observer bi je inače držao skrivenom dok se ne skroluje — na svim ekranima. */
  const homeHero = document.getElementById('pocetna');
  if (homeHero) {
    requestAnimationFrame(() => {
      homeHero.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    });
  }

  /* Mobilni scroll-highlight (isti princip):
     - path-grid: vertikalna linija se „pali" + zoom ikonice dostignute faze
     - .how-cell.fill-up (numerisane step kartice): broj + kartica prelaze u navy
       kumulativno, u zavisnosti dokle je korisnik skrolovao. */
  const pathGrids = document.querySelectorAll('.path-grid');
  const litCells = document.querySelectorAll('.how-cell.fill-up');
  if (pathGrids.length || litCells.length) {
    let sTick = false;
    const updateScrollFx = () => {
      sTick = false;
      const mobile = window.matchMedia('(max-width: 1023.98px)').matches;
      const vh = window.innerHeight;
      const anchor = vh * 0.55;
      pathGrids.forEach((grid) => {
        if (!mobile) {
          grid.style.removeProperty('--path-progress');
          grid.querySelectorAll('.path-cell.is-reached').forEach((c) => c.classList.remove('is-reached'));
          return;
        }
        const line = grid.querySelector('.path-line');
        if (line) {
          const lr = line.getBoundingClientRect();
          let p = lr.height ? (anchor - lr.top) / lr.height : 0;
          p = Math.max(0, Math.min(1, p));
          grid.style.setProperty('--path-progress', p.toFixed(4));
        }
        grid.querySelectorAll('.path-cell').forEach((cell) => {
          const icon = cell.querySelector('.path-icon');
          if (!icon) return;
          const ir = icon.getBoundingClientRect();
          cell.classList.toggle('is-reached', (ir.top + ir.height / 2) <= anchor);
        });
      });
      litCells.forEach((cell) => {
        if (!mobile) { cell.classList.remove('is-reached'); return; }
        const num = cell.querySelector('.how-num');
        const ref = num || cell;
        const r = ref.getBoundingClientRect();
        cell.classList.toggle('is-reached', r.top < vh * 0.72);
      });
    };
    const onScrollFx = () => { if (!sTick) { sTick = true; requestAnimationFrame(updateScrollFx); } };
    window.addEventListener('scroll', onScrollFx, { passive: true });
    window.addEventListener('resize', onScrollFx, { passive: true });
    updateScrollFx();
  }

  /* Usluga stranice: „blueprint" ram — u svaku sekciju ubaci vertikalne vodilje
     poravnate sa kolonom sadržaja (dopiru do ivica sekcije) + ugaone oznake.
     Strukturalno, ne nasumično; sadržaj (.max-w-container) je iznad (z-1). */
  if (document.body.classList.contains('deco')) {
    const plusCorners = ['tr', 'bl', 'tl', 'br'];
    document.querySelectorAll('main > section').forEach((sec, i) => {
      // Home hero (#pocetna) je pun-širinski slajder + traka 01–04 — blueprint
      // uframe vodilje bi presekle spoljne ćelije trake (na širem hero-shell-u),
      // pa preskačemo dekoraciju za ovu sekciju.
      if (sec.id === 'pocetna') return;
      const dark = sec.classList.contains('bg-navy');
      const f = document.createElement('div');
      f.className = 'uframe' + (dark ? ' uframe--dark' : '');
      f.setAttribute('aria-hidden', 'true');
      f.innerHTML = '<div class="uf-col"><span class="uf-line uf-line--l"></span><span class="uf-line uf-line--r"></span></div>';
      sec.insertBefore(f, sec.firstChild);

      /* Koncentrični prstenovi uklonjeni po zahtevu. Dijagonalni hatch (edgy)
         ostaje na svetlim sekcijama; preskoči tanku traku brojki. */
      const isStats = !!sec.querySelector('[data-count-section]');
      if (!isStats && !dark && !sec.querySelector('.baf-showcase')) {
        const h = document.createElement('span');
        h.className = 'hatch-deco hatch-deco--' + plusCorners[(i + 1) % 4];
        h.setAttribute('aria-hidden', 'true');
        sec.appendChild(h);
      }
      /* „+" node oznaka (blueprint) — suptilno, naizmenični ugao po sekciji */
      const p = document.createElement('span');
      p.className = 'plus-node plus-node--' + plusCorners[i % 4] + (dark ? ' plus-node--light' : '');
      p.setAttribute('aria-hidden', 'true');
      sec.appendChild(p);
    });
  }

  /* Grid draw-in appear — u svaku sekciju sa .hero-grid pozadinom ubaci overlay
     linija (port „accent-lines" iz React hero-minimalism komponente) koje se
     iscrtavaju kad sekcija uđe u vidokrug. Postojeće grid pozadine se ne diraju. */
  document.querySelectorAll('.hero-grid').forEach((grid) => {
    const gdl = document.createElement('div');
    gdl.className = 'gdl';
    gdl.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 6; i++) {
      const s = document.createElement('span');
      s.className = i < 3 ? 'gdl-h' : 'gdl-v';
      gdl.appendChild(s);
    }
    grid.insertAdjacentElement('afterend', gdl);
    if ('IntersectionObserver' in window) {
      /* Nizak threshold: na visokim sekcijama (npr. brojke+osnivač) veći procenat
         nikad nije u viewportu, pa bi animacija izostala (kao raniji count-up bag). */
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { gdl.classList.add('play'); io.disconnect(); }
        });
      }, { threshold: 0.06 });
      io.observe(gdl.parentElement || grid);
    } else {
      gdl.classList.add('play');
    }
  });

  /* Veliki MOJSILOV — gradient reveal prati kursor + iscrtavanje na scroll */
  const mojSvg = document.querySelector('.moj-svg');
  if (mojSvg) {
    const reveal = mojSvg.querySelector('#mojReveal');
    mojSvg.addEventListener('pointermove', (e) => {
      const r = mojSvg.getBoundingClientRect();
      reveal.setAttribute('cx', ((e.clientX - r.left) / r.width) * 900);
      reveal.setAttribute('cy', ((e.clientY - r.top) / r.height) * 120);
    });
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { mojSvg.classList.add('in'); io.disconnect(); }
        });
      }, { threshold: 0.35 });
      io.observe(mojSvg);
    } else {
      mojSvg.classList.add('in');
    }
  }

  /* Brojke — PO-CIFRA roll: svaka cifra dobija svoju masku i klizi iz nje, a
     susedne cifre u SUPROTNIM smerovima (naizmenično odozdo/odozgo), sporo uz
     stagger. Suffiksi (+, –, h, %, „do") ostaju statični. Svaka cifra: masku
     .dgt (overflow hidden) sa .dgt-in koji klizi; naizmenično .dgt--up/.dgt--down;
     --i = globalni indeks cifre (za transition-delay). */
  /* Odometar reel: svaka cifra = maska .dgt sa .dgt-reel kolonom koja sadrži
     LEAD_CYCLES punih 0–9 ciklusa pa 0..cifra. --stop = koliko em da klizne gore
     da stane na ciljnu cifru. Duži roll (prolazi kroz više cifara), brz pa uspori. */
  const LEAD_CYCLES = 3;
  const splitStatDigits = (el) => {
    el.querySelectorAll('.count-num').forEach((c) => { c.textContent = c.dataset.target; });
    let idx = 0;
    const makeReel = (digit) => {
      const d = Number(digit);
      const mask = document.createElement('span');
      mask.className = 'dgt';
      mask.style.setProperty('--i', idx);
      mask.style.setProperty('--stop', LEAD_CYCLES * 10 + d);
      const reel = document.createElement('span');
      reel.className = 'dgt-reel';
      let html = '';
      for (let k = 0; k < LEAD_CYCLES; k++) for (let n = 0; n <= 9; n++) html += '<span>' + n + '</span>';
      for (let n = 0; n <= d; n++) html += '<span>' + n + '</span>';
      reel.innerHTML = html;
      mask.appendChild(reel);
      idx++;
      return mask;
    };
    const walk = (node) => {
      Array.from(node.childNodes).forEach((ch) => {
        if (ch.nodeType === 3) {
          if (!/\d/.test(ch.textContent)) return;
          const frag = document.createDocumentFragment();
          for (const c of ch.textContent) {
            if (/\d/.test(c)) frag.appendChild(makeReel(c));
            else frag.appendChild(document.createTextNode(c));
          }
          node.replaceChild(frag, ch);
        } else if (ch.nodeType === 1 && !ch.classList.contains('dgt')) {
          walk(ch);
        }
      });
    };
    walk(el);
  };
  document.querySelectorAll('.stat-num').forEach((el) => {
    if (!el.querySelector('.dgt')) splitStatDigits(el);
  });
  const rollStat = (sec) => {
    sec.querySelectorAll('.stat-num').forEach((el, i) => {
      setTimeout(() => el.classList.add('rolled'), i * 90);
    });
  };
  const countSections = document.querySelectorAll('[data-count-section]');
  if (countSections.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { rollStat(en.target); io.unobserve(en.target); }
        });
      }, { threshold: 0.4 });
      countSections.forEach((s) => io.observe(s));
    } else {
      document.querySelectorAll('.stat-num').forEach((el) => el.classList.add('rolled'));
    }
  }

  /* Usluge — hover boji i deljene ivice susednih kartica (leva ivica = desni border
     levog suseda; gornja ivica = donji border kartice iznad). Samo na lg (3 kolone). */
  const svcCells = Array.from(document.querySelectorAll('.svc-grid .svc-cell'));
  svcCells.forEach((cell, i) => {
    const left = i % 3 !== 0 ? svcCells[i - 1] : null;
    const above = i >= 3 ? svcCells[i - 3] : null;
    cell.addEventListener('pointerenter', () => {
      if (!window.matchMedia('(min-width:1024px)').matches) return;
      if (left) left.classList.add('lit-right');
      if (above) above.classList.add('lit-bottom');
    });
    cell.addEventListener('pointerleave', () => {
      if (left) left.classList.remove('lit-right');
      if (above) above.classList.remove('lit-bottom');
    });
  });

  /* Cenovnik — toggle veličine vozila menja cene za dubinsko pranje auta i enterijera;
     poliranje farova ostaje isto (nema data-svc). */
  const prTabs = document.querySelectorAll('.pr-tab[data-size]');
  if (prTabs.length) {
    const PRICES = {
      auta:      { mali: '9.900',  srednji: '10.900', veliki: '12.900' },
      enterijer: { mali: '7.900',  srednji: '8.900',  veliki: '9.900'  },
    };
    const amounts = document.querySelectorAll('.pr-amount[data-svc]');
    const setSize = (size) => {
      prTabs.forEach((t) => {
        const on = t.dataset.size === size;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      amounts.forEach((el) => {
        const val = PRICES[el.dataset.svc] && PRICES[el.dataset.svc][size];
        if (!val || el.textContent === val) return;
        el.textContent = val;
        el.classList.remove('is-updating'); void el.offsetWidth; el.classList.add('is-updating');
      });
    };
    prTabs.forEach((t) => t.addEventListener('click', () => setSize(t.dataset.size)));
    const initial = document.querySelector('.pr-tab[data-size].is-active');
    setSize(initial ? initial.dataset.size : 'srednji');
  }

  /* Poliranje farova — toggle bez/sa keramikom (nezavisan od veličine vozila).
     Menja cenu + garanciju (.far-swap sa data-polir/data-keramika). */
  const farTabs = document.querySelectorAll('.pr-tab[data-far]');
  if (farTabs.length) {
    const farEls = document.querySelectorAll('.far-swap');
    const setFar = (far) => {
      farTabs.forEach((t) => {
        const on = t.dataset.far === far;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      farEls.forEach((el) => {
        const val = el.dataset[far];
        if (val == null || el.textContent === val) return;
        el.textContent = val;
        if (el.classList.contains('pr-amount')) { el.classList.remove('is-updating'); void el.offsetWidth; el.classList.add('is-updating'); }
      });
    };
    farTabs.forEach((t) => t.addEventListener('click', () => setFar(t.dataset.far)));
    const initF = document.querySelector('.pr-tab[data-far].is-active');
    setFar(initF ? initF.dataset.far : 'polir');
  }


  /* Pre/posle galerija — paginacija (desktop 3-po-3, mobilni 1) + strelice.
     Podaci: <script type="application/json" class="baf-pairs"> unutar .baf-showcase.
     Kartica zadržava compare-drag (prevlačenje pomera granicu PRE|POSLE). */
  const bafArrow = (dir) =>
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    (dir < 0 ? '<polyline points="15 18 9 12 15 6"/>' : '<polyline points="9 18 15 12 9 6"/>') + '</svg>';
  const wireCard = (card) => {
    let dragging = false;
    const setPos = (clientX) => {
      const r = card.getBoundingClientRect();
      let pct = ((clientX - r.left) / r.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      card.style.setProperty('--baf-split', pct + '%');
    };
    card.addEventListener('pointerdown', (e) => { dragging = true; card.setPointerCapture(e.pointerId); setPos(e.clientX); });
    card.addEventListener('pointermove', (e) => { if (dragging) setPos(e.clientX); });
    card.addEventListener('pointerup', () => { dragging = false; });
    card.addEventListener('pointercancel', () => { dragging = false; });
  };
  const buildBafCard = (pair) => {
    const el = document.createElement('div');
    el.className = 'baf-card';
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', pair.alt || 'Pre i posle, prevucite za poređenje');
    el.innerHTML =
      '<img class="baf-img baf-img--posle" src="' + pair.posle + '" alt="' + (pair.altPosle || 'Posle') + '" loading="lazy" />' +
      '<img class="baf-img baf-img--pre" src="' + pair.pre + '" alt="' + (pair.altPre || 'Pre') + '" loading="lazy" />' +
      '<span class="baf-badge baf-badge--posle">Posle</span>' +
      '<span class="baf-badge baf-badge--pre">Pre</span>' +
      '<span class="baf-handle" aria-hidden="true"></span>';
    wireCard(el);
    return el;
  };
  document.querySelectorAll('.baf-showcase').forEach((showcase) => {
    const dataEl = showcase.querySelector('.baf-pairs');
    const row = showcase.querySelector('.baf-row');
    if (!dataEl || !row) return;
    let pairs = [];
    try { pairs = JSON.parse(dataEl.textContent); } catch (e) { return; }
    if (!pairs.length) return;

    const controls = document.createElement('div');
    controls.className = 'baf-controls' + (showcase.dataset.controls === 'dark' ? ' baf-controls--dark' : '');
    controls.innerHTML =
      '<button class="baf-nav baf-prev" type="button" aria-label="Prethodne slike">' + bafArrow(-1) + '</button>' +
      '<span class="baf-counter"></span>' +
      '<button class="baf-nav baf-next" type="button" aria-label="Sledeće slike">' + bafArrow(1) + '</button>';
    showcase.after(controls);
    const counter = controls.querySelector('.baf-counter');
    const prevBtn = controls.querySelector('.baf-prev');
    const nextBtn = controls.querySelector('.baf-next');

    let page = 0;
    const perPage = () => (window.matchMedia('(min-width:1024px)').matches ? 3 : 1);
    const pageCount = () => Math.ceil(pairs.length / perPage());

    const render = (animate) => {
      const per = perPage();
      const pc = pageCount();
      page = Math.max(0, Math.min(page, pc - 1));
      const slice = pairs.slice(page * per, page * per + per);
      const draw = () => {
        row.querySelectorAll('.baf-card').forEach((c) => c.remove());
        slice.forEach((p) => row.appendChild(buildBafCard(p)));
        layoutBafLines();
        row.classList.remove('is-swapping');
      };
      if (animate) { row.classList.add('is-swapping'); setTimeout(draw, 200); }
      else { draw(); }
      counter.textContent = (page + 1) + ' / ' + pc;
      controls.classList.toggle('is-hidden', pc <= 1);
      prevBtn.disabled = page === 0;
      nextBtn.disabled = page === pc - 1;
    };
    prevBtn.addEventListener('click', () => { if (page > 0) { page--; render(true); } });
    nextBtn.addEventListener('click', () => { if (page < pageCount() - 1) { page++; render(true); } });
    let wasDesktop = window.matchMedia('(min-width:1024px)').matches;
    window.addEventListener('resize', () => {
      const isDesktop = window.matchMedia('(min-width:1024px)').matches;
      if (isDesktop !== wasDesktop) { wasDesktop = isDesktop; page = 0; render(false); }
    });
    render(false);
  });

  /* Precizne akcent linije: u razmacima traka|slika1, s1|s2, s2|s3, s3|traka;
     krajevi linija između kraja slike i kraja trake. Samo na lg (traka vidljiva). */
  function layoutBafLines() {
    /* Više galerija po strani (početna: farovi + dubinsko) → obradi svaku. */
    document.querySelectorAll('.baf-showcase').forEach((showcase) => {
      const band = showcase.querySelector('.baf-band');
      const lines = showcase.querySelectorAll('.baf-vline');
      const cards = showcase.querySelectorAll('.baf-card');
      if (!band || lines.length < 4 || cards.length < 3) return;
      if (getComputedStyle(band).display === 'none') return; // mobilni — linije skrivene
      // Linije su deca .baf-row (offset parent) → sve mere idu relativno na njega,
      // inače bi showcase padding pomerio linije nadole (asimetrično).
      const row = showcase.querySelector('.baf-row');
      const r = row.getBoundingClientRect();
      const b = band.getBoundingClientRect();
      const c = [...cards].map((el) => el.getBoundingClientRect());
      const xs = [
        (b.left + c[0].left) / 2,
        (c[0].right + c[1].left) / 2,
        (c[1].right + c[2].left) / 2,
        (c[2].right + b.right) / 2,
      ];
      const top = (c[0].top + b.top) / 2 - r.top;
      const bottom = (c[0].bottom + b.bottom) / 2 - r.top;
      lines.forEach((ln, i) => {
        ln.style.left = xs[i] - r.left + 'px';
        ln.style.top = top + 'px';
        ln.style.bottom = 'auto';
        ln.style.height = bottom - top + 'px';
      });
    });
  }
  if (document.querySelector('.baf-showcase')) {
    layoutBafLines();
    window.addEventListener('load', layoutBafLines);
    window.addEventListener('resize', layoutBafLines);
  }

  /* Grid pozadina brojke/recenzije: stranica kockice = razmak između linije desno
     od prve brojke (200+) i linije pored prvog imena (Srđan) → 8.33% kontejnera. */
  const nrSection = document.querySelector('[data-count-section]');
  const nrGrid = nrSection && nrSection.querySelector('.hero-grid');
  const sizeNrGrid = () => {
    if (!nrGrid) return;
    const stat1 = nrSection.querySelector('.nr-stat');
    const name1 = nrSection.querySelector('.nr-name');
    if (!stat1 || !name1) return;
    if (!window.matchMedia('(min-width:1024px)').matches) { nrGrid.style.backgroundSize = ''; return; }
    const d = name1.getBoundingClientRect().right - stat1.getBoundingClientRect().right;
    if (d > 4) nrGrid.style.backgroundSize = d + 'px ' + d + 'px';
  };
  if (nrGrid) {
    sizeNrGrid();
    window.addEventListener('load', sizeNrGrid);
    window.addEventListener('resize', sizeNrGrid);
  }

  /* Recenzije — pager (3 po strani) sa strelicama levo/desno.
     Dizajn i šema linija ostaju netaknuti; menja se samo sadržaj (ime + komentar). */
  /* Sve Google recenzije (5/5). Imena i komentari doslovno kako stoje na Google-u.
     Redosled: grupisano po dužini teksta, da strane budu ujednačene visine. */
  const HOME_REVIEWS = [
    { n: 'Strahinja Marković', t: 'С обзиром да је ауто стар 23 године, фарови изгледају као да сам ставио нове. Чак сам добио жељу да ставим лед лампе. Свака част мајстору.' },
    { n: 'Igor Filipovic', t: 'Свака препорука за овог момка! Млад је, али више него професионалан. Верујем да ће за неколико година имати свој тим! Фарови су као нови. Извукао је максимум из њих. Свака препорука, и дефинитивно ћу ускоро пробати дубинско прање!' },
    { n: 'Zoran Petkovic', t: 'Све похвале за професионализам и квалитет! Душан је дошао тачно на договорену адресу и врхунски исполирао фарове. Фарови сада изгледају као нови. Препоручујем свима који желе брзу и педантну услугу без одласка у сервис.' },
    { n: 'Kikela Popovic', t: 'Изузетно професионална услуга од почетка до краја. Момак је тачан, пријатан и веома посвећен свом послу. Фарови су фантастични након полимеризације и фарбања, с обзиром на претходно стање, резултат је далеко изнад мојих очекивања. Ретко се наилази на тако квалитетан рад. Честитам и велика, искрена препорука!' },
    { n: 'V V', t: 'Одличан рад. Фарови изгледају као нови (аутомобил стар 20 година и сада са новим делом ;)). Све препоруке. Долазак на адресу заиста штеди време, а резултат је фантастичан по веома приступачној цени. Професионалан приступ, пријатна комуникација. Хвала пуно. Вукица' },
    { n: 'Ivan Petrovic', t: 'Професионалан, педантно педантан, ефикасан, детаљан и брз. Веома културан младић, што је реткост ових дана. Све је урађено како је договорено, стигао је на адресу на време, крајњи резултат је за сваку похвалу! Честитам Душане, желим ти још много задовољних купаца!' },
    { n: 'Dušan Mirković', t: 'Све похвале за момка који ради дубинско прање! Изузетно је тачан, прецизан, вредан и веома одговоран. Ретко се сретне неко ко свом послу приступа са толико пажње и посвећености. Аутомобил је очишћен до најситнијих детаља, од седишта, са којих су мрље потпуно уклоњене, преко темељно освежених патоси, до неприступачних места око педала и у доњем делу кабине где се прљавштина највише накупља. Сва тврдокорна прљавштина је уклоњена, а унутрашњост аутомобила сада изгледа и мирише буквално као нова. Сваки детаљ је испоштован до крајњих граница, посао је урађен без иједне грешке, педантно и тачно на време. Ако вам је потребан неко ко је изузетно поуздан и ко се труди у ономе што ради, имате моју топлу препоруку!' },
    { n: 'Vuk Jarčov', t: 'Све похвале за дечка, млад је и веома пријатан. Ауто је био потпуно очишћен, а услуга преузимања је феноменална, веома аутентично искуство.' },
    { n: 'DANIJELA PAVLOVIĆ', t: 'Све похвале за полирање мојих старих фарова, буквално изгледају као нови. Млади мајстор је веома љубазан, веома професионалан и стигао је у договорено време. Највиша оцена 🙂' },
    { n: 'Srdjan Medojevic', t: 'Презадовољан сам резултатом. Момак је јако педантан, културан и професионалан. Све похвале за људску и професионалну страну. Свака препорука, од срца.' },
    { n: 'Vladimir Milakovic', t: 'Одличан момак. Полирање фарова, урађено на Пежоу 3008, врхунски. Флексибилан по питању времена доласка и увече. Топло препоручујем.' },
    { n: 'Aleksandar Kitic', t: 'Фарови савршено полирани и заштићени. Све је урађено на време и како је договорено. Велика уштеда времена и веома позитивно искуство.' },
    { n: 'Marko Kekic', t: 'Професионално урађен посао. Све препоруке за момка. Полирање фарова на вашој адреси је одлична идеја, само напред. Подршка млађој генерацији!' },
    { n: 'Zoric Marko', t: 'Све похвале за обављени посао! Професионалан, фин, културан, васпитан момак. Договор је у потпуности поштовао. За сваку препоруку!' },
    { n: 'Uros Cvetkovic', t: 'Момак који је изузетно посвећен свом послу и што је најважније, воли оно што ради. Све препоруке.' },
    { n: 'Milan Radeka', t: 'Честитам на добро обављеном послу. Млад и перспективан. Фарови су сада као нови, моја искрена препорука.' },
    { n: 'bosko cvorkov', t: 'Врхунски мајстор, долази на адресу и ради врхунске фарове са керамичком заштитом, све похвале...' },
    { n: 'Andjela Petrovic', t: 'Свака част момку! Све је урадио савршено, заиста немам речи за услугу и брзину. Све препоруке 😃' },
    { n: 'DZOKER97', t: 'Све препоруке за момка. Професионално урађен посао. Фарови су сада као нови!!! Срећно у будућем раду.' },
    { n: 'Andrej H', t: 'Све похвале за одличан посао, моји фарови сада изгледају као нови. Препоручио бих свима!!!' },
    { n: 'Ivan Terzic', t: 'Све препоруке за савршено полирање фарова! Човек ради са љубављу, што се ретко где виђа.' },
    { n: 'Milica Štrbac', t: 'Веома љубазан и фин момак, урадио је фантастичан посао, све похвале ❤️' },
    { n: 'Damir Seha', t: 'Одлична услуга, веома квалитетна обрада и полирање фарова. Топло препоручујем.' },
    { n: 'Zdenka Moric', t: 'Одличан посао...брзо...у договорено време. Срећно у даљем раду...све препоруке.' },
    { n: 'Zafir Butuc', t: 'Задовољан момак, добро ради свој посао, препоручујем га.' },
    { n: 'Pavle', t: 'Веома добар момак, одлично полира, млад је али искусан, све похвале' },
    { n: 'Petar Bjelic', t: 'Браво! Свака препорука за човека је оцена 5/5!' },
    { n: 'Nikola Belada', t: 'Након полирања, фарови су као нови. Свака препорука' },
    { n: 'Grzi', t: 'За сваку препоруку! Ажурно, темељно, професионално.' },
    { n: 'Tena Nekretnine', t: 'Договор испуњен. Професионално обављен посао.' },
    { n: 'Branislav Platiša', t: 'Веома професионално! Топло препоручујем! Препоручујем.' },
    { n: 'IVAN KUZMANOVIC', t: 'Добар момак, јако сам задовољан услугом.' },
    { n: 'Aleksandar Lasica', t: 'Одлично полирање, топло препоручујем' },
    { n: 'Mateja Stankovic', t: 'Врхунска услуга, свака препорука.' },
    { n: 'Irina Zlatkovic', t: 'Све похвале, одлична услуга' },
    { n: 'Dejan Đorđević', t: 'Веома задовољан услугом, хвала!!!' },
    { n: 'Marko Vučinić', t: 'Одлично полирање фарова' },
    { n: 'Dusan Djuric', t: 'Веома задовољан услугом' },
    { n: 'david maric', t: 'Одлична услуга, топло препоручујем' },
    { n: 'Emilija Radić', t: 'Сајт је фантастичан!' },
    { n: 'Stanko Sorajic', t: 'Добра препорука' },
    { n: 'Nikola Lazović', t: 'добар дечко' },
    { n: 'Aleksandar Maletic', t: 'Top' },
    { n: 'Dušan Jakovljević', t: 'Свака препорука!' },
  ];
  const nrReviews = document.querySelector('.nr-reviews[data-reviews]');
  if (nrReviews && HOME_REVIEWS.length) {
    const rPer = 3;
    const rPages = Math.ceil(HOME_REVIEWS.length / rPer);
    const rc = document.createElement('div');
    rc.className = 'baf-controls baf-controls--dark nr-controls';
    rc.innerHTML =
      '<button class="baf-nav nr-prev" type="button" aria-label="Prethodne recenzije">' + bafArrow(-1) + '</button>' +
      '<span class="baf-counter"></span>' +
      '<button class="baf-nav nr-next" type="button" aria-label="Sledeće recenzije">' + bafArrow(1) + '</button>';
    nrReviews.after(rc);
    const rCounter = rc.querySelector('.baf-counter');
    const rPrev = rc.querySelector('.nr-prev');
    const rNext = rc.querySelector('.nr-next');
    let rPage = 0;
    const rDraw = () => {
      nrReviews.querySelectorAll('.nr-name, .nr-text, .nr-stars').forEach((e) => e.remove());
      // Poslednja strana se poravnava na kraj liste (44 nije deljivo sa 3) — uvek 3
      // kolone, bez prazne treće; cena je da se jedna recenzija ponovi na kraju.
      const rStart = Math.min(rPage * rPer, Math.max(0, HOME_REVIEWS.length - rPer));
      HOME_REVIEWS.slice(rStart, rStart + rPer).forEach((r) => {
        const name = document.createElement('div'); name.className = 'nr-name'; name.textContent = r.n;
        const text = document.createElement('p'); text.className = 'nr-text'; text.textContent = '„' + r.t + '"';
        const stars = document.createElement('div'); stars.className = 'nr-stars'; stars.setAttribute('aria-label', 'Ocena 5 od 5'); stars.textContent = '★★★★★';
        nrReviews.append(name, text, stars);
      });
      // Linije moraju ostati POSLEDNJA deca — nth-child pravila (border-left kolona,
      // border-top na mobilnom) računaju od prve recenzije, kao u statičkom markupu.
      nrReviews.querySelectorAll('.nr-vline').forEach((v) => nrReviews.appendChild(v));
      rCounter.textContent = (rPage + 1) + ' / ' + rPages;
      rPrev.disabled = rPage === 0;
      rNext.disabled = rPage === rPages - 1;
      nrReviews.classList.remove('nr-swapping');
      sizeNrGrid();
    };
    const rGo = (p) => {
      rPage = Math.max(0, Math.min(p, rPages - 1));
      nrReviews.classList.add('nr-swapping');
      setTimeout(rDraw, 180);
    };
    rPrev.addEventListener('click', () => { if (rPage > 0) rGo(rPage - 1); });
    rNext.addEventListener('click', () => { if (rPage < rPages - 1) rGo(rPage + 1); });
    /* Prevlačenje prstom (telefon) — ne samo strelice. Horizontalni swipe menja
       stranu; vertikalni pokret ostaje skrol stranice (zato poredimo dx i dy). */
    let rsx = null, rsy = null;
    nrReviews.addEventListener('touchstart', (e) => {
      rsx = e.touches[0].clientX; rsy = e.touches[0].clientY;
    }, { passive: true });
    nrReviews.addEventListener('touchend', (e) => {
      if (rsx === null) return;
      const dx = e.changedTouches[0].clientX - rsx;
      const dy = e.changedTouches[0].clientY - rsy;
      rsx = null; rsy = null;
      if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return; // skrol, ne swipe
      const n = rPage + (dx < 0 ? 1 : -1);
      if (n >= 0 && n < rPages) rGo(n);
    }, { passive: true });
    rDraw();
  }

  /* Liquid ghost dugmad (canvas liquid blobovi + animiran border) — port AICONNECT */
  document.querySelectorAll('.liq-btn').forEach((wrapper) => {
    const canvas = wrapper.querySelector('.liq-btn-canvas');
    const btn = wrapper.querySelector('.btn-liq');
    if (!canvas || !btn) return;
    const ctx = canvas.getContext('2d');
    let t = 0, hov = false, dpr = 1;
    btn.addEventListener('pointerenter', () => (hov = true));
    btn.addEventListener('pointerleave', () => (hov = false));
    const pill = (x, y, w, h) => {
      const r = h / 2;
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = btn.offsetWidth * dpr;
      canvas.height = btn.offsetHeight * dpr;
      canvas.style.width = btn.offsetWidth + 'px';
      canvas.style.height = btn.offsetHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    new ResizeObserver(resize).observe(btn);
    const s = Math.sin, c = Math.cos;
    function render() {
      requestAnimationFrame(render);
      const r = wrapper.getBoundingClientRect();
      if (r.bottom < -50 || r.top > window.innerHeight + 50) return; // van ekrana → pauza
      t += hov ? 0.032 : 0.009;
      const w = btn.offsetWidth, h = btn.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.save(); ctx.beginPath(); pill(0, 0, w, h); ctx.clip();
      const pts = [
        [w * (0.5 + 0.45 * s(t)), h * (0.5 + 0.35 * c(t * 1.3))],
        [w * (0.5 + 0.40 * c(t * 0.71)), h * (0.5 + 0.40 * s(t * 1.68))],
        [w * (0.5 + 0.30 * s(t * 1.41)), h * (0.5 + 0.25 * c(t * 0.89))],
      ];
      const a = hov ? 0.24 : 0.09;
      pts.forEach(([px, py], i) => {
        const radius = Math.max(w, h) * (0.85 + 0.1 * i);
        const g = ctx.createRadialGradient(px, py, 0, px, py, radius);
        g.addColorStop(0, `rgba(33,100,218,${a - i * 0.02})`);
        g.addColorStop(0.5, `rgba(41,54,129,${(a - i * 0.02) * 0.4})`);
        g.addColorStop(1, 'rgba(33,100,218,0)');
        ctx.globalCompositeOperation = i === 0 ? 'source-over' : 'screen';
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });
      ctx.restore();
      ctx.globalCompositeOperation = 'source-over';
      ctx.beginPath(); pill(0.5, 0.5, w - 1, h - 1);
      ctx.strokeStyle = `rgba(33,100,218,${hov ? 0.85 : 0.4})`;
      ctx.lineWidth = 1; ctx.stroke();
      wrapper.style.filter = hov
        ? 'drop-shadow(0 0 14px rgba(33,100,218,0.4))'
        : 'drop-shadow(0 0 6px rgba(33,100,218,0.16))';
    }
    render();
  });

  /* Sticky header senka pri skrolu */
  const headerInner = document.querySelector('.header-inner');
  const onScroll = () => {
    if (!headerInner) return;
    headerInner.classList.toggle('header-scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobilni meni */
  const menu = document.querySelector('.mobile-menu');
  const overlay = document.getElementById('menu-overlay');
  const openMenu = () => {
    menu?.classList.add('open');
    overlay?.classList.remove('opacity-0', 'pointer-events-none');
    document.body.classList.add('menu-open');
  };
  const closeMenu = () => {
    menu?.classList.remove('open');
    overlay?.classList.add('opacity-0', 'pointer-events-none');
    document.body.classList.remove('menu-open');
  };
  document.getElementById('menu-open')?.addEventListener('click', openMenu);
  document.getElementById('menu-close')?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);
  document.querySelectorAll('[data-close-menu]').forEach((el) => el.addEventListener('click', closeMenu));

  /* FAQ akordeon */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          const oa = other.querySelector('.faq-a');
          if (oa) oa.style.maxHeight = '0px';
        }
      });
      item.classList.toggle('open', !isOpen);
      if (a) a.style.maxHeight = isOpen ? '0px' : a.scrollHeight + 'px';
    });
  });
  /* Item otvoren na učitavanju (class="open") — postavi njegovu visinu odmah */
  document.querySelectorAll('.faq-item.open .faq-a').forEach((a) => {
    a.style.maxHeight = a.scrollHeight + 'px';
  });

  /* Pre/posle slajder */
  document.querySelectorAll('.ba-slider').forEach((slider) => {
    const after = slider.querySelector('.ba-after');
    const handle = slider.querySelector('.ba-handle');
    let dragging = false;

    const setPos = (clientX) => {
      const rect = slider.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      if (after) after.style.clipPath = `inset(0 0 0 ${pct}%)`;
      if (handle) handle.style.left = `${pct}%`;
    };

    slider.addEventListener('pointerdown', (e) => {
      dragging = true;
      slider.setPointerCapture(e.pointerId);
      setPos(e.clientX);
    });
    slider.addEventListener('pointermove', (e) => { if (dragging) setPos(e.clientX); });
    slider.addEventListener('pointerup', () => { dragging = false; });
    slider.addEventListener('pointercancel', () => { dragging = false; });
    // Klik bilo gde pomera slajder
    slider.addEventListener('click', (e) => setPos(e.clientX));
  });

  /* Scroll reveal — rAF-throttled position check.
     Reveals any element in or above the viewport, so fast/jump scrolling can
     never leave a section permanently hidden (IntersectionObserver can miss
     elements jumped entirely past between frames). Elements below the fold stay
     hidden until scrolled to, preserving the entrance animation. */
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  let revealTicking = false;
  const revealCheck = () => {
    revealTicking = false;
    const vh = window.innerHeight;
    for (let i = revealEls.length - 1; i >= 0; i--) {
      const r = revealEls[i].getBoundingClientRect();
      if (r.top < vh * 0.92) {
        revealEls[i].classList.add('in');
        revealEls.splice(i, 1);
      }
    }
  };
  const onRevealScroll = () => {
    if (!revealTicking) {
      revealTicking = true;
      requestAnimationFrame(revealCheck);
    }
  };
  window.addEventListener('scroll', onRevealScroll, { passive: true });
  window.addEventListener('resize', onRevealScroll, { passive: true });
  revealCheck();

  /* Scroll spy — aktivni nav link (samo hash stavke; na podstranici sekcije ne postoje) */
  const sections = NAV.filter((n) => n.hash && !n.dropdown).map((n) => document.querySelector(n.hash)).filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = '#' + entry.target.id;
            document.querySelectorAll('.nav-link').forEach((l) =>
              l.classList.toggle('is-active', l.getAttribute('href') === id)
            );
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* Kontakt cf-card — 3D tilt na pomeranje miša (AICONNECT) */
  const cfCard = document.getElementById('cf-card');
  const cfInner = document.getElementById('cf-card-inner');
  if (cfCard && cfInner && window.matchMedia('(pointer:fine)').matches) {
    cfCard.addEventListener('pointermove', (e) => {
      const r = cfCard.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cfInner.style.setProperty('--ry', (px * 6).toFixed(2) + 'deg');
      cfInner.style.setProperty('--rx', (-py * 6).toFixed(2) + 'deg');
    });
    cfCard.addEventListener('pointerleave', () => {
      cfInner.style.setProperty('--rx', '0deg');
      cfInner.style.setProperty('--ry', '0deg');
    });
  }

  /* Kontakt forma (Web3Forms) */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const btn = form.querySelector('button[type="submit"]');
      const btnLabel = form.querySelector('.cf-submit-text') || btn;
      const key = form.querySelector('input[name="access_key"]')?.value || '';

      if (key.includes('ZAMENITI')) {
        if (status) {
          status.textContent = 'Forma još nije povezana. Dodajte Web3Forms access key. Do tada nas kontaktirajte telefonom ili preko Vibera.';
          status.className = 'text-sm mt-4 text-akcent';
        }
        return;
      }

      const data = new FormData(form);
      if (btn) { btn.disabled = true; btnLabel.textContent = 'Šaljem…'; }
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });
        const json = await res.json();
        if (json.success) {
          form.reset();
          if (status) { status.textContent = 'Hvala, poruka je poslata. Javljamo se u najkraćem roku.'; status.className = 'text-sm mt-4 text-green-600'; }
        } else {
          throw new Error(json.message || 'Greška');
        }
      } catch (err) {
        if (status) { status.textContent = 'Došlo je do greške pri slanju. Pokušajte ponovo ili nas pozovite.'; status.className = 'text-sm mt-4 text-red-500'; }
      } finally {
        if (btn) { btn.disabled = false; btnLabel.textContent = 'Pošaljite upit'; }
      }
    });
  }

  /* Hero slajder — auto-rotirajući carousel (crossfade + progres tačke).
     Sadržaj se pojavljuje preko .is-active klase (ne .reveal) → vidljiv odmah,
     bez „ne učitava dok se ne skroluje" buga. */
  const heroSlider = document.querySelector('.hero-slider');
  if (heroSlider) {
    const slides = [...heroSlider.querySelectorAll('.hero-slide')];
    const dots = [...heroSlider.querySelectorAll('.hs-dot')];
    const prevBtn = heroSlider.querySelector('.hs-prev');
    const nextBtn = heroSlider.querySelector('.hs-next');
    const N = slides.length;
    const DUR = 6000;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cur = 0, timer = null;
    const setActive = (n) => {
      cur = (n + N) % N;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === cur));
      dots.forEach((d, i) => { d.classList.toggle('is-active', i === cur); d.setAttribute('aria-selected', i === cur ? 'true' : 'false'); });
    };
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const play = () => { if (reduce || N < 2) return; stop(); timer = setInterval(() => setActive(cur + 1), DUR); };
    const goTo = (n) => { setActive(n); play(); };
    nextBtn && nextBtn.addEventListener('click', () => goTo(cur + 1));
    prevBtn && prevBtn.addEventListener('click', () => goTo(cur - 1));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
    heroSlider.addEventListener('mouseenter', () => { heroSlider.classList.add('is-paused'); stop(); });
    heroSlider.addEventListener('mouseleave', () => { heroSlider.classList.remove('is-paused'); play(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else play(); });
    heroSlider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(cur - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); goTo(cur + 1); }
    });
    let sx = null;
    heroSlider.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; stop(); }, { passive: true });
    heroSlider.addEventListener('touchend', (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 40) goTo(cur + (dx < 0 ? 1 : -1)); else play();
    }, { passive: true });
    setActive(0);
    play();
  }

  /* Zona rada — Leaflet mapa sa granicom pokrivenosti (grad Beograd + šira okolina).
     Poligon je „hull" oko svih mesta koja je klijent naveo; centralni pin = Beograd.
     Leaflet je učitan preko CDN-a u <head> pre ovog skripta. */
  const zonaEl = document.getElementById('mapa-zona');
  if (zonaEl && window.L) {
    // Granica zone (lat, lng), u smeru kazaljke — obuhvata sva navedena mesta:
    // Vojka/St. Pazova (SZ) → Banovci → Padinska skela → Vinča/V. selo → Grocka →
    // Mladenovac (J) → Sopot → Lazarevac/Barajevo (JZ) → Obrenovac → Jakovo → nazad.
    const zona = [
      [45.03, 20.17], [45.00, 20.31], [44.94, 20.47], [44.82, 20.62], [44.68, 20.75],
      [44.50, 20.78], [44.40, 20.68], [44.35, 20.50], [44.34, 20.25], [44.55, 20.12],
      [44.72, 20.13], [44.88, 20.11], [44.99, 20.12],
    ];
    const map = L.map(zonaEl, {
      scrollWheelZoom: false, // da ne otima skrol stranice
      zoomControl: true, attributionControl: true,
      minZoom: 8, maxZoom: 16,
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd', maxZoom: 19,
    }).addTo(map);
    const poly = L.polygon(zona, {
      color: '#2164DA', weight: 2.5, opacity: 0.95,
      fillColor: '#2164DA', fillOpacity: 0.1,
    }).addTo(map);
    const pin = L.divIcon({ className: 'zona-pin', html: '<span></span>', iconSize: [22, 22], iconAnchor: [11, 11] });
    L.marker([44.8176, 20.4569], { icon: pin }).addTo(map)
      .bindPopup('<b>Mojsilov Detailing</b><br>Dolazimo na vašu adresu');
    const fit = () => { map.invalidateSize(); map.fitBounds(poly.getBounds(), { padding: [26, 26] }); };
    fit();
    window.addEventListener('load', fit);
    // Leaflet zna dimenzije tek kad je vidljiv — osveži pri prvom ulasku u vidokrug.
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => { if (e.isIntersecting) { fit(); obs.disconnect(); } });
      }, { threshold: 0.15 });
      io.observe(zonaEl);
    }
  }

  /* Godina u footeru je već postavljena kroz template. */
});
