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
  tiktok: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M16 8.245a6.5 6.5 0 0 0 3.75 1.19V6.66a3.75 3.75 0 0 1-2.02-1.19 3.75 3.75 0 0 1-1.02-2.47H14v11.98a2.31 2.31 0 1 1-1.62-2.2V9.94a5.16 5.16 0 1 0 3.62 4.92z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm5.8 14.2c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.1.24-3.7-.78-3.13-1.23-5.12-4.4-5.28-4.6-.15-.2-1.25-1.66-1.25-3.16s.79-2.24 1.07-2.55c.28-.3.6-.38.8-.38l.58.01c.19.01.44-.07.68.52.24.6.83 2.06.9 2.2.07.15.12.32.02.52-.1.2-.15.32-.3.5l-.44.5c-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.2.73-.85.92-1.14.2-.29.39-.24.66-.15.27.1 1.7.8 2 .95.28.15.47.22.54.34.07.12.07.68-.17 1.35z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  clock: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  pin: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  mail: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>',
  sparkles: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4M22 5h-4M4 17v2M5 18H3"/></svg>',
};

/* --- Navigacija ---------------------------------------------------------- */
const NAV = [
  { label: 'Početna', href: '#pocetna' },
  { label: 'Usluge', href: '#usluge' },
  { label: 'Galerija', href: '#galerija' },
  { label: 'Cenovnik', href: '#cenovnik' },
  { label: 'O nama', href: '#o-nama' },
  { label: 'Kontakt', href: '#kontakt' },
];

const socialLinks = `
  <a href="#" aria-label="Instagram" class="opacity-80 hover:opacity-100 hover:text-akcent transition">${icon.instagram}</a>
  <a href="#" aria-label="Facebook" class="opacity-80 hover:opacity-100 hover:text-akcent transition">${icon.facebook}</a>
  <a href="#" aria-label="TikTok" class="opacity-80 hover:opacity-100 hover:text-akcent transition">${icon.tiktok}</a>
`;

/* --- Header -------------------------------------------------------------- */
function headerHTML() {
  const links = NAV.map(
    (n) => `<a href="${n.href}" class="nav-link text-[15px] lg:text-base font-medium text-white/85 hover:text-white">${n.label}</a>`
  ).join('');
  const mobileLinks = NAV.map(
    (n) => `<a href="${n.href}" data-close-menu class="font-display uppercase text-2xl text-white/90 hover:text-akcent transition">${n.label}</a>`
  ).join('');

  return `
  <div class="header-inner">
    <nav class="max-w-container mx-auto px-5 lg:px-8 h-[96px] lg:h-[124px] relative flex items-center justify-between gap-4">
      <a href="#pocetna" class="flex items-center shrink-0" aria-label="Mojsilov Detailing — početna">
        <img src="brand_assets/mojsilov-logo%201.png" alt="Mojsilov Detailing logo" class="logo-mark h-[42px] lg:h-[62px] w-auto" />
      </a>

      <div class="hidden lg:flex items-center justify-center gap-11 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">${links}</div>

      <div class="flex items-center justify-end gap-4">
        <a href="tel:${TEL}" class="hidden xl:inline-flex items-center gap-2 text-sm font-medium text-white/85 hover:text-white transition">
          ${icon.phone}<span>${TEL_DISPLAY}</span>
        </a>
        <a href="#kontakt" class="glow-btn hidden sm:inline-flex">Zakažite termin ${icon.sparkles}</a>
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
      <a href="#kontakt" data-close-menu class="glow-btn w-full">Zakažite termin ${icon.sparkles}</a>
      <div class="flex items-center gap-5 text-white mt-6">${socialLinks}</div>
    </div>
  </aside>`;
}

/* --- Footer -------------------------------------------------------------- */
function footerHTML() {
  const links = NAV.map(
    (n) => `<li><a href="${n.href}" class="text-white/70 hover:text-white transition text-sm">${n.label}</a></li>`
  ).join('');

  return `
  <div class="ac-footer relative overflow-hidden">
    <div class="ac-footer-glow" aria-hidden="true"></div>
    <div class="max-w-container mx-auto px-5 lg:px-8 relative z-10 pt-16 lg:pt-20">
      <div class="ac-footer-grid">
        <!-- Brend -->
        <div>
          <img src="brand_assets/mojsilov-logo%201.png" alt="Mojsilov Detailing" class="logo-mark h-12 w-auto mb-4"/>
          <p class="ac-tagline">Profesionalni mobilni auto-detailing i restauracija farova — na vašoj adresi u Beogradu, bez odlaska u servis.</p>
          <div class="ac-socials">
            <a href="#" class="fsoc" aria-label="Instagram">${icon.instagram}</a>
            <a href="#" class="fsoc" aria-label="Facebook">${icon.facebook}</a>
            <a href="#" class="fsoc" aria-label="TikTok">${icon.tiktok}</a>
          </div>
        </div>

        <div class="foot-col">
          <h4>Navigacija</h4>
          <ul>${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}</ul>
        </div>

        <div class="foot-col">
          <h4>Usluge</h4>
          <ul>
            <li><a href="#usluge">Poliranje farova</a></li>
            <li><a href="#usluge">Dubinsko pranje auta</a></li>
            <li><a href="#usluge">Pranje enterijera</a></li>
            <li><a href="#usluge">Keramička zaštita</a></li>
          </ul>
        </div>

        <div class="foot-col">
          <h4>Kontakt</h4>
          <ul class="ac-contact">
            <li><a href="tel:${TEL}">${icon.phone}<span>${TEL_DISPLAY}</span></a></li>
            <li><a href="mailto:${EMAIL}" class="break-all">${icon.mail}<span>${EMAIL}</span></a></li>
            <li>${icon.pin}<span>Novobeogradskih graditelja 23a, Ledine, Beograd</span></li>
            <li>${icon.clock}<span>Pon–Ned · 09:00–21:00</span></li>
          </ul>
        </div>
      </div>

      <p class="ac-seo">Mojsilov Detailing — mobilni car detailing Beograd: poliranje farova, dubinsko pranje auta, čišćenje farova, keramička zaštita i restauracija farova na adresi klijenta (Novi Beograd, Zemun i okolina).</p>

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

  /* Count-up brojevi (statistika) — spring fizika + glitch (port iz AICONNECT) */
  function countUp(el) {
    const target = +el.dataset.target;
    const duration = 2;
    const damping = 20 + 40 * (1 / duration);
    const stiffness = 100 * (1 / duration);
    const isStat = !!el.closest('.stat-num');
    let progress = 0, vel = 0, lastTs = null, glitchTimer = 0;
    el.textContent = '0';
    const glitch = () => {
      el.classList.add('glitching');
      setTimeout(() => el.classList.remove('glitching'), 220);
    };
    function step(ts) {
      if (!lastTs) lastTs = ts;
      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;
      vel += ((1 - progress) * stiffness - vel * damping) * dt;
      progress += vel * dt;
      progress = Math.max(0, Math.min(1.04, progress));
      el.textContent = String(Math.min(target, Math.round(progress * target)));
      if (isStat && progress < 0.85) {
        glitchTimer += dt;
        if (glitchTimer > 0.18 + Math.random() * 0.22) { glitchTimer = 0; glitch(); }
      }
      if (Math.abs(1 - progress) > 0.002 || Math.abs(vel) > 0.01) {
        requestAnimationFrame(step);
      } else {
        el.textContent = String(target);
        el.classList.remove('glitching');
      }
    }
    requestAnimationFrame(step);
  }
  const counted = new Set();
  const countSections = document.querySelectorAll('[data-count-section]');
  if (countSections.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.querySelectorAll('.count-num').forEach((el) => {
              if (!counted.has(el)) { counted.add(el); countUp(el); }
            });
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.4 });
      countSections.forEach((s) => io.observe(s));
    } else {
      document.querySelectorAll('.count-num').forEach((el) => { el.textContent = el.dataset.target; });
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

  /* Scroll spy — aktivni nav link */
  const sections = NAV.map((n) => document.querySelector(n.href)).filter(Boolean);
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
          status.textContent = 'Forma još nije povezana — dodajte Web3Forms access key. Do tada nas kontaktirajte telefonom ili preko Vibera.';
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
          if (status) { status.textContent = 'Hvala — poruka je poslata. Javljamo se u najkraćem roku.'; status.className = 'text-sm mt-4 text-green-600'; }
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

  /* Godina u footeru je već postavljena kroz template. */
});
