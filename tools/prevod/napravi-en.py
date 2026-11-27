# Pravi englesku verziju sajta u /en/ iz srpskih strana i rečnika sr-en.json.
#   python tools/prevod/napravi-en.py
# Posle izmene teksta na srpskoj strani: python tools/prevod/izvuci.py (šta fali), dopuni sr-en.json, pa ponovo ovaj alat.
# Radi i: hreflang oznake na srpskim stranama, js/prevod-en.js (rečnik za tekst koji ubacuje site.js), sitemap.xml.
import json, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from zajednicko import STRANE, TOKEN, ATRIBUTI, LD_KLJUCEVI, norm

OVDE = os.path.dirname(os.path.abspath(__file__))
KOREN = os.path.normpath(os.path.join(OVDE, "..", ".."))
SAJT = "https://mojsilov.com"
D = json.load(open(os.path.join(OVDE, "sr-en.json"), encoding="utf-8"))
SLUGOVI = [s[:-5] for s in STRANE]
fali = set()

def prevedi(s):
    k = norm(s)
    if not k:
        return s
    if k in D:
        lead = s[: len(s) - len(s.lstrip())]
        trail = s[len(s.rstrip()):]
        return lead + D[k] + trail
    fali.add(k)
    return s

def url_sr(slug):
    return SAJT + "/" if slug == "index" else f"{SAJT}/{slug}"

def url_en(slug):
    return SAJT + "/en" if slug == "index" else f"{SAJT}/en/{slug}"

def link_en(href):
    """Interni link na engleskoj strani: ka engleskoj verziji ako postoji, inače ka srpskoj (apsolutno)."""
    if re.match(r"^(https?:|mailto:|tel:|viber:|sms:|whatsapp:|#|javascript:|data:)", href):
        if href.startswith(SAJT):
            put = href[len(SAJT):] or "/"
            return SAJT + link_en(put) if put != "/" else SAJT + "/en"
        return href
    put, _, frag = href.partition("#")
    put = put.lstrip("./")
    slug = put.lstrip("/").replace(".html", "") or "index"
    if slug.startswith(("assets/", "brand_assets/", "css/", "js/", "en/")) or "." in slug.split("/")[-1]:
        return href if href.startswith("/") else "/" + href
    cilj = ("/en" if slug == "index" else "/en/" + slug) if slug in SLUGOVI else ("/" if slug == "index" else "/" + slug)
    return cilj + ("#" + frag if frag else "")

def ld_prevedi(o, slug):
    if isinstance(o, dict):
        out = {}
        for k, v in o.items():
            if k in LD_KLJUCEVI and isinstance(v, str) and not v.startswith("http"):
                out[k] = prevedi(v)
            elif k in ("url", "item") and isinstance(v, str) and v.startswith(SAJT):
                out[k] = link_en(v)
            elif k == "inLanguage":
                out[k] = "en"
            else:
                out[k] = ld_prevedi(v, slug)
        return out
    if isinstance(o, list):
        return [ld_prevedi(x, slug) for x in o]
    return o

def json_prevedi(o):
    if isinstance(o, dict):
        return {k: json_prevedi(v) for k, v in o.items()}
    if isinstance(o, list):
        return [json_prevedi(x) for x in o]
    if isinstance(o, str) and re.search(r"[A-Za-zČĆŽŠĐčćžšđ]", o) and not re.match(r"^(/|https?:|assets/)", o) and norm(o) in D:
        return D[norm(o)]
    return o

def hreflang(slug):
    return (f'<link rel="alternate" hreflang="sr" href="{url_sr(slug)}" />\n  '
            f'<link rel="alternate" hreflang="en" href="{url_en(slug)}" />\n  '
            f'<link rel="alternate" hreflang="x-default" href="{url_sr(slug)}" />')

def dodaj_hreflang(html, slug):
    html = re.sub(r'\s*<link rel="alternate" hreflang="[^"]+" href="[^"]*" />', "", html)
    return re.sub(r'(<link rel="canonical" href="[^"]*" />)', lambda m: m.group(1) + "\n  " + hreflang(slug), html, count=1)

def putanje(html):
    # relativne putanje do fajlova -> apsolutne (strane su u /en/)
    return re.sub(r'(?<=["\'(\s,])(?=(?:assets|brand_assets|css|js|images)/)', "/", html)

def napravi(strana):
    slug = strana[:-5]
    html = open(os.path.join(KOREN, strana), encoding="utf-8").read()
    delovi = TOKEN.split(html)
    out = []
    u_body = False
    for tok in delovi:
        if not tok:
            continue
        if tok.startswith("<"):
            low = tok[:40].lower()
            if low.startswith("<body"):
                u_body = True
            if low.startswith("<script") and "application/ld+json" in low:
                m = re.match(r"(<script[^>]*>)(.*)(</script>)", tok, re.S)
                try:
                    data = ld_prevedi(json.loads(m.group(2)), slug)
                    tok = m.group(1) + "\n  " + json.dumps(data, ensure_ascii=False, indent=2).replace("\n", "\n  ") + "\n  " + m.group(3)
                except Exception:
                    pass
            elif low.startswith("<script") and "application/json" in low:
                m = re.match(r"(<script[^>]*>)(.*)(</script>)", tok, re.S)
                try:
                    tok = m.group(1) + json.dumps(json_prevedi(json.loads(m.group(2))), ensure_ascii=False) + m.group(3)
                except Exception:
                    pass
            elif low.startswith("<title"):
                pass
            elif not low.startswith(("<script", "<style", "<!--")):
                for a in ATRIBUTI:
                    tok = re.sub(r'(\s%s=")([^"]*)(")' % a, lambda m: m.group(1) + (prevedi(m.group(2)) if re.search(r"[A-Za-z]", m.group(2)) else m.group(2)) + m.group(3), tok)
                tok = re.sub(r'(<meta\s+(?:name|property)="(?:description|og:title|og:description|og:image:alt|twitter:title|twitter:description)"\s+content=")([^"]*)(")', lambda m: m.group(1) + prevedi(m.group(2)) + m.group(3), tok)
                tok = re.sub(r'(\shref=")([^"]+)(")', lambda m: m.group(1) + link_en(m.group(2)) + m.group(3), tok) if not low.startswith(("<link rel=\"stylesheet", "<link rel=\"icon", "<link rel=\"preconnect", "<link rel=\"canonical", "<link rel=\"alternate")) else tok
            out.append(tok)
        else:
            out.append(prevedi(tok) if u_body or (out and out[-1].lower().startswith("<title")) else tok)
    en = "".join(out)
    en = re.sub(r'<html lang="sr"', '<html lang="en"', en, count=1)
    en = en.replace('content="sr_RS"', 'content="en_US"')
    en = re.sub(r'<link rel="canonical" href="[^"]*" />', f'<link rel="canonical" href="{url_en(slug)}" />', en, count=1)
    en = re.sub(r'(<meta property="og:url" content=")[^"]*(")', lambda m: m.group(1) + url_en(slug) + m.group(2), en, count=1)
    en = dodaj_hreflang(en, slug)
    en = putanje(en)
    # rečnik za tekst koji ubacuje site.js, pre site.js
    en = re.sub(r'(<script src="/js/site\.js"></script>)', r'<script src="/js/prevod-en.js"></script>\n  \1', en, count=1)
    os.makedirs(os.path.join(KOREN, "en"), exist_ok=True)
    open(os.path.join(KOREN, "en", strana), "w", encoding="utf-8", newline="").write(en)
    # hreflang i na srpskoj strani
    sr = dodaj_hreflang(html, slug)
    if sr != html:
        open(os.path.join(KOREN, strana), "w", encoding="utf-8", newline="").write(sr)

for s in STRANE:
    napravi(s)

# js/prevod-en.js: ceo rečnik + obrasci za dinamički tekst iz site.js
OBRASCI = [
    (r"^\+(\d+) bodova u Klubu$", "+$1 Club points"),
    (r"^Mojsilov Klub: 1 bod na svakih (\d+) din, nagrade i trajni popust$", "Mojsilov Club: 1 point for every $1 RSD, rewards and a permanent discount"),
    (r"^(\d+) / (\d+)$", "$1 / $2"),
    (r"^© (\d+) Mojsilov Detailing\. Sva prava zadržana\.$", "© $1 Mojsilov Detailing. All rights reserved."),
    (r"^Korak (\d+) od (\d+)$", "Step $1 of $2"),
]
js = ("/* SINHRONIZOVANO iz tools/prevod/sr-en.json (napravi-en.py). Ne menjati ručno. */\n"
      "window.PREVOD_EN = { tekst: " + json.dumps(D, ensure_ascii=False) + ",\n  obrasci: ["
      + ", ".join(f"[new RegExp({json.dumps(r)}), {json.dumps(z)}]" for r, z in OBRASCI) + "] };\n")
open(os.path.join(KOREN, "js", "prevod-en.js"), "w", encoding="utf-8", newline="\n").write(js)

# sitemap: engleske adrese (uz postojeće srpske)
sm_put = os.path.join(KOREN, "sitemap.xml")
sm = open(sm_put, encoding="utf-8").read()
sm = re.sub(r"\s*<url>\s*<loc>https://mojsilov\.com/en[^<]*</loc>.*?</url>", "", sm, flags=re.S)
dodatak = "".join(f"\n  <url>\n    <loc>{url_en(s)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>{'0.9' if s == 'index' else '0.6'}</priority>\n  </url>" for s in SLUGOVI)
sm = sm.replace("</urlset>", dodatak.lstrip("\n") + "\n</urlset>") if "</urlset>" in sm else sm
open(sm_put, "w", encoding="utf-8", newline="").write(sm)

print("napravljeno:", ", ".join("en/" + s for s in STRANE))
if fali:
    print(f"BEZ PREVODA ({len(fali)}):")
    for f in sorted(fali):
        print("  ", f[:110])
