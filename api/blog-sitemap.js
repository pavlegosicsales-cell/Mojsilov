// Sitemap blog članaka: /sitemap-blog.xml (rewrite u vercel.json, prijavljen u robots.txt).
const API = 'https://mojsilov-dashboard.vercel.app/api/javno/blog';

export default async function handler(req, res) {
  let clanci = [];
  try { const r = await fetch(API); if (r.ok) clanci = (await r.json()).clanci || []; } catch { /* prazan sitemap */ }
  const url = (loc, mod) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${String(mod || new Date().toISOString()).slice(0, 10)}</lastmod>\n  </url>`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
    url('https://mojsilov.com/blog', clanci[0]?.izmenjen),
    ...clanci.map((c) => url(`https://mojsilov.com/blog/${c.slug}`, c.izmenjen)),
  ].join('\n')}\n</urlset>\n`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');
  res.end(xml);
}
