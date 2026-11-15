import json, os, time, datetime, urllib.request
from zoneinfo import ZoneInfo

KEY = os.environ["GEMINI_API_KEY"]
MODEL = os.environ.get("GEMINI_MODEL", "gemini-4-hydrogen")
FILE = os.environ.get("TODAY_JSON", "today.json")
FIELDS = ["color", "summary", "love", "career", "health"]
LANGS = {"hi": "Hindi", "bn": "Bangla (Bengali)", "or": "Odia"}
PAUSE = 20  # seconds between calls, keeps you under the per-minute limit


def call(prompt, names, need_number):
    """Call Gemini, return validated dict, or stop the script."""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"
    body = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseMimeType": "application/json", "temperature": 0.9},
    }).encode()
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, data=body, headers={
                "Content-Type": "application/json", "x-goog-api-key": KEY})
            with urllib.request.urlopen(req, timeout=90) as r:
                data = json.load(r)
            out = json.loads(data["candidates"][0]["content"]["parts"][0]["text"])
            validate(out, names, need_number)
            return out
        except Exception as e:
            print(f"attempt {attempt + 1} failed: {e}")
            time.sleep(30 * (attempt + 1))
    raise SystemExit("Gemini failed. Keeping yesterday's file.")


def validate(out, names, need_number):
    assert set(out.keys()) == set(names), "sign names do not match"
    for n in names:
        for f in FIELDS:
            v = out[n].get(f)
            assert isinstance(v, str) and v.strip(), f"{n}.{f} empty"
        if need_number:
            num = out[n].get("number")
            assert isinstance(num, int) and 1 <= num <= 9, f"{n}.number bad"


def main():
    with open(FILE, encoding="utf-8") as f:
        data = json.load(f)
    names = [r["name"] for r in data["rashis"]]
    today = datetime.datetime.now(ZoneInfo("Asia/Kolkata"))
    date_str = f"{today.day} {today:%b %Y}"

    en = call(
        f"Write today's daily horoscope (rashifal) for an entertainment app. Date: {date_str}.\n"
        f"Return ONE JSON object whose keys are exactly these 12 signs: {names}.\n"
        "Each value is an object with: color (one simple color name), number (integer 1-9), "
        "summary (1-2 short sentences), love, career, health (one short sentence each).\n"
        "Tone: positive, gentle, practical. No medical, legal or money guarantees, no fear. "
        "Make every sign different and do not repeat yesterday's wording.",
        names, True)

    out = {"en": en}
    for code, lang in LANGS.items():
        time.sleep(PAUSE)
        src = {n: {f: en[n][f] for f in FIELDS} for n in names}
        out[code] = call(
            f"Translate these horoscope texts into natural, simple {lang} that ordinary readers use daily.\n"
            "Return ONE JSON object with exactly the same keys and fields. "
            "Translate values only, keep meaning, no extra text.\n" + json.dumps(src, ensure_ascii=False),
            names, False)

    # everything is valid: now update the file
    for r in data["rashis"]:
        n = r["name"]
        r["luckyColor"] = en[n]["color"]
        r["luckyNumber"] = en[n]["number"]
        for f in ["summary", "love", "career", "health"]:
            r[f] = en[n][f]
        for code in ["en", "hi", "bn", "or"]:
            for f in FIELDS:
                r["i18n"][code][f] = out[code][n][f]
    data["date"] = date_str
    with open(FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("today.json updated for", date_str)


main()
