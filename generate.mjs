import * as A from 'astronomy-engine';
import fs from 'fs';

const AYANAMSA = 23.857;
const SYMBOLS = ['Ram','Bull','Twins','Crab','Lion','Maiden','Scales','Scorpion','Archer','Goat','Water Bearer','Fish'];

const ok = d => d.names?.length === 12 && d.colors?.length === 12 && d.summary?.length === 12 &&
  d.love?.length === 3 && d.career?.length === 3 && d.health?.length === 3;

const L = {};
for (const c of ['en', 'hi', 'bn', 'or']) {
  try {
    const d = JSON.parse(fs.readFileSync(`lang-${c}.json`, 'utf8'));
    if (!ok(d)) throw new Error('wrong number of items');
    L[c] = d;
  } catch (e) { console.log('Skipping', c, e.message); }
}
if (!L.en) throw new Error('lang-en.json is required');

const now = new Date();
const moon = A.Ecliptic(A.GeoVector(A.Body.Moon, now, true)).elon;
const sid = (moon - AYANAMSA + 360) % 360;
const m = Math.floor(sid / 30);
const day = Math.floor(now / 864e5);

const rashis = L.en.names.map((name, r) => {
  const house = (m - r + 12) % 12;
  const ci = (r + day) % 12, li = (day + r) % 3, cai = (day + r * 2) % 3, hi = (day + r * 3) % 3;
  const i18n = {};
  for (const k of Object.keys(L)) {
    i18n[k] = { name: L[k].names[r], color: L[k].colors[ci], summary: L[k].summary[house],
      love: L[k].love[li], career: L[k].career[cai], health: L[k].health[hi] };
  }
  return { name, hindi: L.hi ? L.hi.names[r] : name, symbol: SYMBOLS[r],
    luckyColor: L.en.colors[ci], luckyNumber: ((r * 7 + day) % 9) + 1,
    summary: i18n.en.summary, love: i18n.en.love, career: i18n.en.career, health: i18n.en.health, i18n };
});

const date = now.toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric' });
fs.writeFileSync('today.json', JSON.stringify({ date, moonRashi: L.en.names[m], rashis }, null, 2));
console.log('Languages:', Object.keys(L).join(','), '| Moon in', L.en.names[m]);
