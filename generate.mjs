import * as A from 'astronomy-engine';
import fs from 'fs';

const AYANAMSA = 23.857; // Lahiri at J2000; positions below are in the J2000 frame
const R = [
  ['Aries','मेष','Ram'],['Taurus','वृषभ','Bull'],['Gemini','मिथुन','Twins'],
  ['Cancer','कर्क','Crab'],['Leo','सिंह','Lion'],['Virgo','कन्या','Maiden'],
  ['Libra','तुला','Scales'],['Scorpio','वृश्चिक','Scorpion'],['Sagittarius','धनु','Archer'],
  ['Capricorn','मकर','Goat'],['Aquarius','कुंभ','Water Bearer'],['Pisces','मीन','Fish']
];
const COLORS = ['Red','Green','Yellow','White','Orange','Blue','Pink','Maroon','Gold','Black','Sky Blue','Sea Green'];

// Moon's house counted from each rashi
const SUMMARY = [
  'A day to focus on yourself. Confidence is high, but watch your temper.',
  'Money and family talks take centre stage. Speak kindly.',
  'Good day for communication, short trips and meeting siblings or friends.',
  'Home and emotions come first. Rest and spend time with loved ones.',
  'Creativity and romance are favoured. Children or studies bring joy.',
  'Routine work and health need care. Avoid conflicts at work.',
  'Partnerships and agreements go well. Listen before you decide.',
  'Be careful with sudden expenses and sensitive topics. Stay patient.',
  'Luck supports you. Learning, travel and elders bring benefit.',
  'Career and reputation are in focus. Your effort gets noticed.',
  'Gains from friends and networks. A wish may move forward.',
  'Quiet, reflective day. Rest, prayer and private time help.'
];
const LOVE = ['Warm words go a long way.','Avoid assumptions with your partner.','A small gesture brings you closer.'];
const CAREER = ['Finish pending tasks first.','Teamwork brings results.','Stay patient with seniors.'];
const HEALTH = ['Drink enough water.','Take short walks and rest well.','Keep meals light today.'];

const now = new Date();
const moon = A.Ecliptic(A.GeoVector(A.Body.Moon, now, true)).elon;
const sid = (moon - AYANAMSA + 360) % 360;
const m = Math.floor(sid / 30);
const day = Math.floor(now / 864e5);

const rashis = R.map(([name, hindi, symbol], r) => {
  const house = ((m - r + 12) % 12);
  return {
    name, hindi, symbol,
    luckyColor: COLORS[(r + day) % 12],
    luckyNumber: ((r * 7 + day) % 9) + 1,
    summary: SUMMARY[house],
    love: LOVE[(day + r) % 3],
    career: CAREER[(day + r * 2) % 3],
    health: HEALTH[(day + r * 3) % 3]
  };
});

const date = now.toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric' });
fs.writeFileSync('today.json', JSON.stringify({ date, moonRashi: R[m][0], rashis }, null, 2));
console.log('Moon in', R[m][0], sid.toFixed(2));
