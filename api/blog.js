// Blog na mojsilov.com, renderovan na serveru (Vercel funkcija), da Google vidi pun tekst.
// Članke piše Pavle u dashboardu (/blog); ovde se čitaju sa javnog API-ja dashboard-a.
//   /blog          -> lista članaka       (rewrite u vercel.json)
//   /blog/<slug>   -> jedan članak
const API = 'https://mojsilov-dashboard.vercel.app/api/javno/blog';
const SAJT = 'https://mojsilov.com';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const datum = (iso) => (iso ? new Date(iso).toLocaleDateString('sr-Latn-RS', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Belgrade' }) : '');
const strelica = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

function strana({ naslov, opis, url, slika, jsonld, telo, noindex, ogTip = 'website' }) {
  const og = slika || `${SAJT}/assets/za-firme-hero.jpg`;
  return `<!doctype html>
<html lang="sr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <base href="/" />
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17733929811"></script>
  <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag("js", new Date()); gtag("config", "AW-17733929811"); gtag("config", "G-4H6GZK3X0V");</script>
  <title>${esc(naslov)}</title>
  <meta name="description" content="${esc(opis)}" />
  ${noindex ? '<meta name="robots" content="noindex" />' : ''}
  <meta name="theme-color" content="#121358" />
  <link rel="canonical" href="${esc(url)}" />
  <meta property="og:type" content="${ogTip}" />
  <meta property="og:site_name" content="Mojsilov Detailing" />
  <meta property="og:url" content="${esc(url)}" />
  <meta property="og:title" content="${esc(naslov)}" />
  <meta property="og:description" content="${esc(opis)}" />
  <meta property="og:image" content="${esc(og)}" />
  <meta property="og:locale" content="sr_RS" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(naslov)}" />
  <meta name="twitter:description" content="${esc(opis)}" />
  <meta name="twitter:image" content="${esc(og)}" />
  <link rel="icon" href="/brand_assets/mojsilov-logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="/css/styles.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="/js/site.js"></script>
  ${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>` : ''}
</head>
<body class="bg-white deco">
  <header id="site-header" class="min-h-[96px] lg:min-h-[124px]"></header>
  <main>
${telo}
  </main>
  <footer id="site-footer" class="bg-navy text-white"></footer>
</body>
</html>`;
}

function kartica(c) {
  return `
          <a href="/blog/${esc(c.slug)}" class="blog-kartica group reveal">
            ${c.slika ? `<div class="blog-kartica-slika"><img src="${esc(c.slika)}" alt="${esc(c.slikaAlt || c.naslov)}" loading="lazy" /></div>` : ''}
            <div class="blog-kartica-telo">
              <p class="svc-label mb-2">${esc(c.kategorija)} · ${esc(datum(c.objavljen))}</p>
              <h3 class="text-xl font-semibold text-navy mb-3 group-hover:text-akcent transition-colors">${esc(c.naslov)}</h3>
              <p class="text-slate-600 leading-relaxed">${esc(c.opis)}</p>
              <span class="link-arrow text-akcent text-sm font-semibold mt-4 inline-flex">Pročitajte članak ${strelica}</span>
            </div>
          </a>`;
}

function hero(eyebrow, naslov, podnaslov, putanja) {
  return `
    <section class="relative bg-navy text-white overflow-hidden grain sec-radial" data-hero-odmah>
      <div class="sec-radial-bg" aria-hidden="true"></div>
      <div aria-hidden="true" class="hero-grid"></div>
      <div class="max-w-container mx-auto px-5 lg:px-8 relative z-10 pt-2 lg:pt-4" style="padding-bottom: clamp(3.5rem, 7vw, 6rem)">
        <nav class="app-breadcrumb reveal" aria-label="Putanja">${putanja}</nav>
        <div class="max-w-3xl mt-6">
          <div class="mb-5 reveal"><span class="eyebrow-pill eyebrow-pill--dark"><span class="ep-dot"></span><span class="eyebrow text-akcent">${eyebrow}</span></span></div>
          <h1 class="h-section text-4xl md:text-5xl lg:text-6xl reveal">${naslov}</h1>
          ${podnaslov ? `<p class="mt-5 text-lg text-white/80 leading-relaxed reveal">${podnaslov}</p>` : ''}
        </div>
      </div>
    </section>`;
}

const cta = `
    <section class="relative py-16 lg:py-24 bg-[#f5f6fa] overflow-hidden">
      <div class="max-w-container mx-auto px-5 lg:px-8 relative z-10">
        <div class="text-center max-w-2xl mx-auto reveal">
          <div class="mb-5"><span class="eyebrow-pill"><span class="ep-dot"></span><span class="eyebrow text-akcent">Zakazivanje</span></span></div>
          <h2 class="h-section text-3xl md:text-5xl text-navy">Dolazimo na<br><span class="text-akcent-light">vašu adresu</span></h2>
          <p class="mt-4 text-slate-600 leading-relaxed">Pozovite nas ili pošaljite poruku. Cenu i prvi slobodan termin dobijate odmah, a dolazak na adresu u Beogradu i okolini je uključen u cenu.</p>
          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <a href="tel:+381621523470" class="glow-btn">Pozovite 062 152 3470 ${strelica}</a>
            <a href="/kontakt" class="btn btn-outline">Kontakt</a>
          </div>
        </div>
      </div>
    </section>`;

function lista(clanci) {
  const url = `${SAJT}/blog`;
  const telo = hero('Blog', 'Saveti za negu <span class="text-akcent-light">automobila</span>',
    'Iskustva sa terena: poliranje farova, dubinsko pranje i nega enterijera, iz ugla ljudi koji to rade svaki dan.',
    '<a href="/">Početna</a><span aria-hidden="true">/</span><span>Blog</span>') + `
    <section class="relative py-16 lg:py-24 bg-white overflow-hidden">
      <div class="dots-bg" aria-hidden="true"></div>
      <div class="max-w-container mx-auto px-5 lg:px-8 relative z-10">
        ${clanci.length
          ? `<div class="blog-mreza">${clanci.map(kartica).join('')}
        </div>`
          : '<p class="text-slate-600 text-lg reveal">Prvi članci stižu uskoro.</p>'}
      </div>
    </section>` + cta;
  const jsonld = {
    '@context': 'https://schema.org', '@type': 'Blog', name: 'Mojsilov Detailing blog', url, inLanguage: 'sr',
    publisher: { '@type': 'AutoRepair', name: 'Mojsilov Detailing', url: `${SAJT}/`, telephone: '+381621523470' },
    blogPost: clanci.map((c) => ({ '@type': 'BlogPosting', headline: c.naslov, url: `${SAJT}/blog/${c.slug}`, datePublished: c.objavljen })),
  };
  return strana({ naslov: 'Blog | Mojsilov Detailing, mobilni car detailing Beograd', opis: 'Saveti za poliranje farova, dubinsko pranje i negu enterijera automobila, iz iskustva Mojsilov Detailinga u Beogradu.', url, jsonld, telo });
}

function clanak(c, ostali) {
  const url = `${SAJT}/blog/${c.slug}`;
  const telo = hero(esc(c.kategorija), esc(c.naslov), esc(c.opis),
    `<a href="/">Početna</a><span aria-hidden="true">/</span><a href="/blog">Blog</a><span aria-hidden="true">/</span><span>${esc(c.naslov)}</span>`) + `
    <section class="relative py-12 lg:py-20 bg-white overflow-hidden">
      <div class="max-w-container mx-auto px-5 lg:px-8 relative z-10">
        <article class="blog-clanak">
          <p class="blog-meta">Dušan Mojsilov · ${esc(datum(c.objavljen))} · ${esc(c.minuta)} min čitanja</p>
          ${c.slika ? `<figure class="blog-naslovna"><img src="${esc(c.slika)}" alt="${esc(c.slikaAlt || c.naslov)}" /></figure>` : ''}
          <div class="blog-sadrzaj">
${c.html}
          </div>
        </article>
      </div>
    </section>` + (ostali.length ? `
    <section class="relative py-16 lg:py-20 bg-[#f5f6fa] overflow-hidden">
      <div class="max-w-container mx-auto px-5 lg:px-8 relative z-10">
        <h2 class="h-section text-3xl md:text-4xl text-navy mb-10 reveal">Pročitajte <span class="text-akcent-light">još</span></h2>
        <div class="blog-mreza">${ostali.map(kartica).join('')}
        </div>
      </div>
    </section>` : '') + cta;
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting', headline: c.naslov, description: c.opis, url, mainEntityOfPage: url, inLanguage: 'sr',
        datePublished: c.objavljen, dateModified: c.izmenjen, image: c.slika ? [c.slika] : undefined,
        author: { '@type': 'Person', name: 'Dušan Mojsilov' },
        publisher: { '@type': 'Organization', name: 'Mojsilov Detailing', logo: { '@type': 'ImageObject', url: `${SAJT}/brand_assets/mojsilov-logo.png` } },
      },
      {
        '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Početna', item: `${SAJT}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SAJT}/blog` },
          { '@type': 'ListItem', position: 3, name: c.naslov, item: url },
        ],
      },
    ],
  };
  return strana({ naslov: `${c.naslov} | Mojsilov Detailing`, opis: c.opis, url, slika: c.slika, jsonld, telo, ogTip: 'article' });
}

function nijePronadjen() {
  const telo = hero('Blog', 'Članak nije <span class="text-akcent-light">pronađen</span>', 'Možda je adresa promenjena. Pogledajte sve članke na blogu.',
    '<a href="/">Početna</a><span aria-hidden="true">/</span><a href="/blog">Blog</a>') + cta;
  return strana({ naslov: 'Članak nije pronađen | Mojsilov Detailing', opis: 'Članak nije pronađen.', url: `${SAJT}/blog`, telo, noindex: true });
}

export default async function handler(req, res) {
  const slug = typeof req.query?.slug === 'string' ? req.query.slug.replace(/[^a-z0-9-]/gi, '').toLowerCase() : '';
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  try {
    const r = await fetch(slug ? `${API}?slug=${encodeURIComponent(slug)}` : API);
    if (slug && r.status === 404) {
      res.statusCode = 404;
      res.setHeader('Cache-Control', 'public, s-maxage=60');
      return res.end(nijePronadjen());
    }
    if (!r.ok) throw new Error(`API ${r.status}`);
    const d = await r.json();
    res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=86400');
    return res.end(slug ? clanak(d.clanak, d.ostali || []) : lista(d.clanci || []));
  } catch (e) {
    res.statusCode = 503;
    res.setHeader('Cache-Control', 'no-store');
    return res.end(strana({ naslov: 'Blog | Mojsilov Detailing', opis: 'Blog trenutno nije dostupan.', url: `${SAJT}/blog`, noindex: true,
      telo: hero('Blog', 'Blog je trenutno <span class="text-akcent-light">nedostupan</span>', 'Pokušajte ponovo za minut.', '<a href="/">Početna</a>') }));
  }
}
