let rashis = [], meta = {};
const GLYPHS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
const LANGS = [['bn','বাংলা'],['or','ଓଡ଼ିଆ'],['en','English'],['hi','हिन्दी']];
const UI = {
  bn:{title:'আজকের রাশিফল | Astroseek',sub:'আজকের রাশিফল ও গ্রহের প্রভাব',search:'রাশি খুঁজুন (যেমন মেষ, Aries)...',color:'শুভ রং',num:'শুভ সংখ্যা',tap:'বিস্তারিত দেখতে ট্যাপ করুন',love:'প্রেম',career:'কর্মজীবন',health:'স্বাস্থ্য',none:'কোনো রাশি পাওয়া যায়নি।',err:'রাশিফল লোড করা যায়নি',moon:'চন্দ্র রাশি'},
  or:{title:'ଆଜିର ରାଶିଫଳ | Astroseek',sub:'ଆଜିର ରାଶିଫଳ ଓ ଗ୍ରହ ପ୍ରଭାବ',search:'ରାଶି ଖୋଜନ୍ତୁ (ଯେପରି ମେଷ, Aries)...',color:'ଶୁଭ ରଙ୍ଗ',num:'ଶୁଭ ସଂଖ୍ୟା',tap:'ବିବରଣୀ ପାଇଁ ଟ୍ୟାପ୍ କରନ୍ତୁ',love:'ପ୍ରେମ',career:'କ୍ୟାରିୟର',health:'ସ୍ୱାସ୍ଥ୍ୟ',none:'କୌଣସି ରାଶି ମିଳିଲା ନାହିଁ।',err:'ରାଶିଫଳ ଲୋଡ୍ ହେଇପାରିଲା ନାହିଁ',moon:'ଚନ୍ଦ୍ର ରାଶି'},
  en:{title:'Astroseek - Daily Horoscope',sub:'Daily Rashifal & Planetary Insights',search:'Search Rashi (e.g. Aries, मेष)...',color:'Lucky color',num:'Lucky no',tap:'Tap for details',love:'Love',career:'Career',health:'Health',none:'No rashi found.',err:'Could not load rashifal',moon:'Moon sign'},
  hi:{title:'आज का राशिफल | Astroseek',sub:'आज का राशिफल और ग्रहों की जानकारी',search:'राशि खोजें (जैसे मेष, Aries)...',color:'शुभ रंग',num:'शुभ अंक',tap:'विवरण के लिए टैप करें',love:'प्रेम',career:'करियर',health:'स्वास्थ्य',none:'कोई राशि नहीं मिली।',err:'राशिफल लोड नहीं हो सका',moon:'चंद्र राशि'}
};
let lang = 'bn';
try { const s = localStorage.getItem('lang'); if (s && UI[s]) lang = s; } catch (e) {}

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const t = r => (r.i18n && r.i18n[lang]) || {name:r.name,color:r.luckyColor,summary:r.summary,love:r.love,career:r.career,health:r.health};
const INSTALL = {
  bn:['📲 অ্যাপ ইনস্টল করুন','ইনস্টল করতে: Share বোতাম → Add to Home Screen'],
  or:['📲 ଆପ୍ ଇନଷ୍ଟଲ୍ କରନ୍ତୁ','ଇନଷ୍ଟଲ୍ ପାଇଁ: Share ବଟନ୍ → Add to Home Screen'],
  en:['📲 Install App','To install: tap Share → Add to Home Screen'],
  hi:['📲 ऐप इंस्टॉल करें','इंस्टॉल के लिए: Share बटन → Add to Home Screen']
};
let deferredPrompt = null;
const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; updateInstall(); });
window.addEventListener('appinstalled', () => { deferredPrompt = null; updateInstall(); });

function updateInstall() {
  let b = document.getElementById('installBtn');
  const show = !isStandalone() && (deferredPrompt || isIOS);
  if (!show) { if (b) b.remove(); return; }
  if (!b) {
    b = document.createElement('button');
    b.id = 'installBtn'; b.className = 'install-btn';
    document.querySelector('.search-wrapper').before(b);
  }
  b.textContent = INSTALL[lang][deferredPrompt ? 0 : 1];
  b.onclick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    updateInstall();
  };
}

const _applyUI = applyUI;
applyUI = function () { _applyUI(); updateInstall(); };

function buildBar() {
  let bar = document.getElementById('langBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'langBar'; bar.className = 'lang-bar';
    document.querySelector('.search-wrapper').before(bar);
  }
  bar.innerHTML = LANGS.map(([c, n]) =>
    `<button class="lang-btn${c === lang ? ' active' : ''}" onclick="setLang('${c}')">${n}</button>`).join('');
}

function applyUI() {
  const u = UI[lang];
  document.documentElement.lang = lang;
  document.title = u.title;
  document.querySelector('.hero p').textContent = u.sub;
  document.getElementById('searchInput').placeholder = u.search;
  const badge = document.getElementById('loading-date');
  if (meta.date) {
    const m = rashis.find(r => r.name === meta.moonRashi);
    badge.textContent = meta.date + (m ? ' · ' + u.moon + ': ' + t(m).name : '');
    badge.style.display = 'inline-block';
  }
  buildBar();
}

function setLang(l) {
  lang = l;
  try { localStorage.setItem('lang', l); } catch (e) {}
  applyUI();
  filterHoroscope();
}

function render(list) {
  const u = UI[lang];
  const box = document.getElementById('result-container');
  if (!list.length) { box.innerHTML = '<div class="loading">' + u.none + '</div>'; return; }
  box.innerHTML = list.map((r, i) => {
    const x = t(r);
    const other = lang === 'en' ? r.hindi : r.name;
    return `
    <div class="rashi-card" style="animation-delay:${i * 50}ms" onclick="toggleCard(this)">
      <div class="card-header">
        <div class="card-head-left">
          <div class="glyph">${GLYPHS[rashis.indexOf(r)]}</div>
          <div class="card-title">${esc(x.name)}<span>${esc(other)}</span></div>
        </div>
        ${lang === 'en' ? `<div class="symbol-pill">${esc(r.symbol)}</div>` : ''}
      </div>
      <div class="meta-info">
        <span>${u.color}: ${esc(x.color)}</span>
        <span>${u.num}: ${esc(r.luckyNumber)}</span>
      </div>
      <p class="prediction-preview">${esc(x.summary)}</p>
      <div class="expanded-details">
        <div class="detail-section"><label>${u.love}</label><p>${esc(x.love)}</p></div>
        <div class="detail-section"><label>${u.career}</label><p>${esc(x.career)}</p></div>
        <div class="detail-section"><label>${u.health}</label><p>${esc(x.health)}</p></div>
      </div>
      <span class="click-hint">${u.tap}</span>
    </div>`;
  }).join('');
}

function toggleCard(el) {
  const d = el.querySelector('.expanded-details');
  d.style.display = d.style.display === 'block' ? 'none' : 'block';
}

function filterHoroscope() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  render(rashis.filter(r =>
    [r.name, r.hindi, ...Object.values(r.i18n || {}).map(x => x.name)].join(' ').toLowerCase().includes(q)));
}

buildBar();
applyUI();

(async function init() {
  try {
    const res = await fetch('/today.json?' + Date.now(), { cache: 'no-store' });
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    rashis = data.rashis;
    meta = { date: data.date, moonRashi: data.moonRashi };
    applyUI();
    render(rashis);
  } catch (err) {
    document.getElementById('result-container').innerHTML =
      '<div class="loading">' + UI[lang].err + ': ' + err.message + '</div>';
  }
})();

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');
