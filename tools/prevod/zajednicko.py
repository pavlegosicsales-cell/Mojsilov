# Zajedničke funkcije za englesku verziju sajta (izvlačenje teksta i sastavljanje /en/ strana).
import re, json

STRANE = ["index.html", "o-nama.html", "poliranje-farova.html", "dubinsko-pranje.html", "namestaj.html",
          "kontakt.html", "aplikacija.html", "saradnja.html", "b2b-aplikacija.html"]
TOKEN = re.compile(r"(<!--.*?-->|<script\b.*?</script>|<style\b.*?</style>|<[^>]+>)", re.S | re.I)
SLOVA = re.compile(r"[A-Za-zČĆŽŠĐčćžšđ]")
ATRIBUTI = ("alt", "placeholder", "aria-label", "title", "data-tooltip")
META = re.compile(r'<meta\s+(?:name|property)="(description|og:title|og:description|og:image:alt|twitter:title|twitter:description)"\s+content="([^"]*)"', re.I)
LD_KLJUCEVI = {"name", "description", "text", "headline", "alternateName", "priceRange", "servesCuisine", "slogan", "caption", "title"}

def norm(s):
    return " ".join(s.split())

def je_tekst(s):
    s = norm(s)
    return bool(s) and bool(SLOVA.search(s)) and not s.startswith(("http", "{", "[")) and not re.fullmatch(r"[\w.\-]+@[\w.\-]+", s)

def ld_stringovi(o, out):
    if isinstance(o, dict):
        for k, v in o.items():
            if k in LD_KLJUCEVI and isinstance(v, str) and je_tekst(v) and not v.startswith("http"):
                out.append(norm(v))
            else:
                ld_stringovi(v, out)
    elif isinstance(o, list):
        for x in o: ld_stringovi(x, out)

def izvuci(html):
    out = []
    t = re.search(r"<title>(.*?)</title>", html, re.S)
    if t: out.append(norm(t.group(1)))
    for m in META.finditer(html): out.append(norm(m.group(2)))
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', html, re.S):
        try: ld_stringovi(json.loads(m.group(1)), out)
        except Exception: pass
    body = html[html.lower().find("<body"):]
    for tok in TOKEN.split(body):
        if not tok: continue
        if tok.startswith("<"):
            if tok.startswith("<script") or tok.startswith("<style") or tok.startswith("<!--"): continue
            for a in ATRIBUTI:
                for m in re.finditer(r'\s%s="([^"]*)"' % a, tok):
                    if je_tekst(m.group(1)): out.append(norm(m.group(1)))
        elif je_tekst(tok):
            out.append(norm(tok))
    seen, res = set(), []
    for s in out:
        if s not in seen: seen.add(s); res.append(s)
    return res
