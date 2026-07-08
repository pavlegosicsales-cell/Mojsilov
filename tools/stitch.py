# -*- coding: utf-8 -*-
"""Google Stitch MCP wrapper — direktni JSON-RPC pozivi ka stitch.googleapis.com.

Zašto postoji: Stitch-ov MCP server vraća tool šeme sa $defs referencama koje
Claude Code-ov MCP parser ne razrešava ("can't resolve reference #/$defs/ScreenInstance"),
pa integracija preko `claude mcp add` puca na fetch-u alata. Sam API radi normalno,
zato ovaj deterministički wrapper zove alate direktno.

Upotreba:
  python tools/stitch.py list                      # spisak dostupnih alata
  python tools/stitch.py <tool_name> ['<json>']    # poziv alata sa JSON argumentima

Primeri:
  python tools/stitch.py list_projects
  python tools/stitch.py create_project '{"title": "Mojsilov Detailing"}'
  python tools/stitch.py generate_screen_from_text '{"project": "...", "prompt": "..."}'

Ključ: STITCH_API_KEY u .env (project root).
"""
import io
import json
import os
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENDPOINT = "https://stitch.googleapis.com/mcp"


def load_key():
    key = os.environ.get("STITCH_API_KEY")
    if key:
        return key
    env_path = os.path.join(ROOT, ".env")
    if os.path.exists(env_path):
        with io.open(env_path, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line.startswith("STITCH_API_KEY="):
                    return line.split("=", 1)[1].strip()
    sys.exit("STITCH_API_KEY nije nadjen ni u okruzenju ni u .env")


def rpc(method, params, key, rpc_id=1):
    body = json.dumps({"jsonrpc": "2.0", "id": rpc_id, "method": method, "params": params}).encode("utf-8")
    req = urllib.request.Request(
        ENDPOINT,
        data=body,
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json, text/event-stream",
            "X-Goog-Api-Key": key,
        },
    )
    with urllib.request.urlopen(req, timeout=300) as resp:
        raw = resp.read().decode("utf-8")
    # Server može odgovoriti čistim JSON-om ili SSE stream-om (data: {...})
    if raw.lstrip().startswith("{"):
        return json.loads(raw)
    for line in raw.splitlines():
        if line.startswith("data:"):
            return json.loads(line[5:].strip())
    sys.exit("Neprepoznat odgovor servera:\n" + raw[:500])


def main():
    if len(sys.argv) < 2 or sys.argv[1] in ("-h", "--help"):
        print(__doc__)
        sys.exit(0)

    key = load_key()
    name = sys.argv[1]

    if name == "list":
        out = rpc("tools/list", {}, key)
        for t in out["result"]["tools"]:
            desc = (t.get("description") or "").strip().splitlines()[0]
            print("- %s :: %s" % (t["name"], desc))
            props = t.get("inputSchema", {}).get("properties", {})
            if props:
                print("    args: %s" % ", ".join(sorted(props)))
        return

    args = json.loads(sys.argv[2]) if len(sys.argv) > 2 else {}
    out = rpc("tools/call", {"name": name, "arguments": args}, key)

    if "error" in out:
        print("GRESKA:", json.dumps(out["error"], ensure_ascii=False, indent=2))
        sys.exit(1)
    result = out.get("result", {})
    # structuredContent je najkorisniji deo odgovora kad postoji
    if "structuredContent" in result:
        print(json.dumps(result["structuredContent"], ensure_ascii=False, indent=2))
    else:
        for item in result.get("content", []):
            print(item.get("text", json.dumps(item, ensure_ascii=False)))
    if result.get("isError"):
        sys.exit(1)


if __name__ == "__main__":
    main()
