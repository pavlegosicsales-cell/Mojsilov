# Izvlači srpski tekst sa strana (i iz site.js) koji još nema prevod u sr-en.json.
# python tools/prevod/izvuci.py   -> tools/prevod/fali.json
import json, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from zajednicko import STRANE, izvuci, je_tekst, norm

OVDE = os.path.dirname(os.path.abspath(__file__))
KOREN = os.path.join(OVDE, "..", "..")
recnik_put = os.path.join(OVDE, "sr-en.json")
recnik = json.load(open(recnik_put, encoding="utf-8")) if os.path.exists(recnik_put) else {}

fali = {}
for s in STRANE:
    html = open(os.path.join(KOREN, s), encoding="utf-8").read()
    l = [x for x in izvuci(html) if x not in recnik]
    if l:
        fali[s] = l

# site.js: tekst iz string literala (delovi između HTML tagova i ${...})
js = open(os.path.join(KOREN, "js", "site.js"), encoding="utf-8").read()
js = re.sub(r"/\*.*?\*/", "", js, flags=re.S)
js = "\n".join(l for l in js.split("\n") if not l.strip().startswith("//"))
BT, SQ, DQ = "`", "'", '"'
LIT = re.compile(BT + r"((?:[^" + BT + r"\\]|\\.)*)" + BT + "|" + SQ + r"((?:[^" + SQ + r"\\\n]|\\.)*)" + SQ + "|" + DQ + r"((?:[^" + DQ + r"\\\n]|\\.)*)" + DQ)
delovi = []
for m in LIT.finditer(js):
    s = m.group(1) or m.group(2) or m.group(3) or ""
    for d in re.split(r"\$\{[^}]*\}|<[^>]+>", s):
        d = norm(d)
        if not je_tekst(d) or re.search(r"[{};=]|^[a-z_-]+$|\.(js|css|png|jpg|html)\b|^[a-z]+[A-Z]", d):
            continue
        if re.search(r"[čćžšđČĆŽŠĐ]", d) or (" " in d and d[0].isupper()) or re.fullmatch(r"[A-ZČĆŽŠĐ][a-zčćžšđ]+", d):
            delovi.append(d)
js_fali = [d for d in dict.fromkeys(delovi) if d not in recnik]
if js_fali:
    fali["site.js"] = js_fali

json.dump(fali, open(os.path.join(OVDE, "fali.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print({k: len(v) for k, v in fali.items()}, "ukupno", sum(len(v) for v in fali.values()))
