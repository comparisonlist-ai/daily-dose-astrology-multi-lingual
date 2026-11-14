
const AFFILIATE_URL = ''; // paste your birth-chart affiliate link here
const FX = {
bn:{it:'📲 প্রতিদিনের রাশিফল পেতে অ্যাপটি ইনস্টল করুন',ih:'অথবা ব্রাউজারের উপরের ডানদিকের ⋮ মেনুতে গিয়ে "Install app" বা "Add to Home screen" চাপুন',ii:'ইনস্টল করতে: Share বোতাম → Add to Home Screen',ft:'আপনার রাশি জানুন',tb1:'জন্মতারিখ',tb2:'নাম',nph:'আপনার নাম লিখুন (ইংরেজি অক্ষরে)',go:'রাশি দেখুন',w:'পশ্চিমী সূর্য রাশি',v:'বৈদিক সূর্য রাশি (প্রায়)',nr:'নামের অক্ষর অনুযায়ী রাশি (প্রায়)',moon:'দৈনিক রাশিফল চন্দ্র রাশির উপর নির্ভর করে, যা জানতে জন্মের সময় ও স্থান লাগে।',read:'আজকের রাশিফল পড়ুন',chart:'সম্পূর্ণ জন্মকুণ্ডলী দেখুন →',aff:'এটি একটি অ্যাফিলিয়েট লিংক; এর মাধ্যমে আমরা কমিশন পেতে পারি।',nf:'নামটি চেনা গেল না। জন্মতারিখ দিয়ে চেষ্টা করুন।',dte:'জন্মতারিখ দিন',priv:'গোপনীয়তা নীতি',terms:'শর্তাবলী',disc:'রাশিফল শুধুমাত্র বিনোদন ও সাধারণ তথ্যের জন্য।'},
or:{it:'📲 ପ୍ରତିଦିନର ରାଶିଫଳ ପାଇଁ ଆପ୍ ଇନଷ୍ଟଲ୍ କରନ୍ତୁ',ih:'କିମ୍ବା ବ୍ରାଉଜରର ଉପର ଡାହାଣ ⋮ ମେନୁକୁ ଯାଇ "Install app" ବା "Add to Home screen" ଦବାନ୍ତୁ',ii:'ଇନଷ୍ଟଲ୍ ପାଇଁ: Share ବଟନ୍ → Add to Home Screen',ft:'ଆପଣଙ୍କ ରାଶି ଜାଣନ୍ତୁ',tb1:'ଜନ୍ମ ତାରିଖ',tb2:'ନାମ',nph:'ଆପଣଙ୍କ ନାମ ଲେଖନ୍ତୁ (ଇଂରାଜୀ ଅକ୍ଷରରେ)',go:'ରାଶି ଦେଖନ୍ତୁ',w:'ପାଶ୍ଚାତ୍ୟ ସୂର୍ଯ୍ୟ ରାଶି',v:'ବୈଦିକ ସୂର୍ଯ୍ୟ ରାଶି (ପ୍ରାୟ)',nr:'ନାମର ଅକ୍ଷର ଅନୁସାରେ ରାଶି (ପ୍ରାୟ)',moon:'ଦୈନିକ ରାଶିଫଳ ଚନ୍ଦ୍ର ରାଶି ଉପରେ ନିର୍ଭର କରେ, ଯାହା ଜାଣିବାକୁ ଜନ୍ମ ସମୟ ଓ ସ୍ଥାନ ଦରକାର।',read:'ଆଜିର ରାଶିଫଳ ପଢ଼ନ୍ତୁ',chart:'ସମ୍ପୂର୍ଣ୍ଣ ଜନ୍ମକୁଣ୍ଡଳୀ ଦେଖନ୍ତୁ →',aff:'ଏହା ଏକ ଆଫିଲିଏଟ୍ ଲିଙ୍କ୍; ଏହା ମାଧ୍ୟମରେ ଆମେ କମିଶନ ପାଇପାରିବା।',nf:'ନାମ ଚିହ୍ନଟ ହେଲା ନାହିଁ। ଜନ୍ମ ତାରିଖ ଦେଇ ଚେଷ୍ଟା କରନ୍ତୁ।',dte:'ଜନ୍ମ ତାରିଖ ଦିଅନ୍ତୁ',priv:'ଗୋପନୀୟତା ନୀତି',terms:'ନିୟମାବଳୀ',disc:'ରାଶିଫଳ କେବଳ ମନୋରଞ୍ଜନ ଓ ସାଧାରଣ ସୂଚନା ପାଇଁ।'},
en:{it:'📲 Install the app for your daily rashifal',ih:'Or tap the ⋮ menu at the top right of your browser and choose "Install app" or "Add to Home screen"',ii:'To install: tap Share → Add to Home Screen',ft:'Find your zodiac sign',tb1:'Date of birth',tb2:'Name',nph:'Type your name (English letters)',go:'Show my sign',w:'Western Sun sign',v:'Vedic Sun sign (approx.)',nr:'Sign by name letter (approx.)',moon:'Daily rashifal is based on your Moon sign, which needs your birth time and place.',read:"Read today's rashifal",chart:'See my full birth chart →',aff:'This is an affiliate link; we may earn a commission.',nf:"We couldn't match that name. Try your date of birth.",dte:'Please enter your date of birth',priv:'Privacy Policy',terms:'Terms',disc:'Horoscopes are for entertainment and general information only.'},
hi:{it:'📲 रोज़ का राशिफल पाने के लिए ऐप इंस्टॉल करें',ih:'या ब्राउज़र में ऊपर दाईं ओर ⋮ मेनू खोलकर "Install app" या "Add to Home screen" चुनें',ii:'इंस्टॉल के लिए: Share बटन → Add to Home Screen',ft:'अपनी राशि जानें',tb1:'जन्म तिथि',tb2:'नाम',nph:'अपना नाम लिखें (अंग्रेज़ी अक्षरों में)',go:'राशि देखें',w:'पश्चिमी सूर्य राशि',v:'वैदिक सूर्य राशि (लगभग)',nr:'नाम के अक्षर से राशि (लगभग)',moon:'दैनिक राशिफल चंद्र राशि पर आधारित होता है, जिसके लिए जन्म का समय और स्थान चाहिए।',read:'आज का राशिफल पढ़ें',chart:'पूरी जन्म कुंडली देखें →',aff:'यह एक एफ़िलिएट लिंक है; हमें कमीशन मिल सकता है।',nf:'नाम पहचाना नहीं गया। जन्म तिथि से कोशिश करें।',dte:'कृपया जन्म तिथि दर्ज करें',priv:'गोपनीयता नीति',terms:'नियम और शर्तें',disc:'राशिफल केवल मनोरंजन और सामान्य जानकारी के लिए है।'}
};
const ENAMES = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const START_W = [[120,10],[219,11],[321,0],[420,1],[521,2],[621,3],[723,4],[823,5],[923,6],[1023,7],[1122,8],[1222,9]];
const START_V = [[114,9],[213,10],[314,11],[414,0],[515,1],[615,2],[716,3],[817,4],[917,5],[1017,6],[1116,7],[1216,8]];
const SYL = [
[0,'chu che cho la li lu le lo a'],[1,'i u e o va vi vu ve vo'],[2,'ka ki ku gha chha ke ko ha'],
[3,'hi hu he ho'],[4,'ma mi mu me mo'],[5,'pa pi pu pe po sha'],[6,'ra ri ru re ro ta ti tu te'],
[7,'to na ni nu ne no ya yi yu'],[8,'ye yo bha bhi bhu bhe dha pha'],[9,'bho ja ji khi khu khe kho ga gi'],
[10,'gu ge go sa si su se so da'],[11,'di du de do tha jha cha chi']
];
const SYLMAP = [];
SYL.forEach(([i, s]) => s.split(' ').forEach(p => SYLMAP.push([p, i])));
SYLMAP.sort((a, b) => b[0].length - a[0].length);

function pick(tbl, x, fb) { let s = fb; for (const [k, i] of tbl) if (x >= k) s = i; return s; }
function nameSign(n) {
  const s = n.toLowerCase().replace(/[^a-z]/g, '');
  if (!s) return -1;
  for (const [p, i] of SYLMAP) if (s.startsWith(p)) return i;
  const f = s[0] + 'a';
  for (const [p, i] of SYLMAP) if (p === f) return i;
  return -1;
}
const L2 = () => FX[lang] || FX.en;
const sname = i => rashis[i] ? t(rashis[i]).name : ENAMES[i];

let fMode = 'dob', fRes = null, vDob = '', vName = '';

function buildExtras() {
  const sw = document.querySelector('.search-wrapper');
  if (!sw || document.getElementById('installSlot')) return;
  const slot = document.createElement('div');
  slot.id = 'installSlot'; slot.className = 'inst-box';
  slot.innerHTML = '<div class="inst-title"></div><div id="installBtnHost"></div><div class="inst-hint"></div>';
  const fc = document.createElement('div');
  fc.id = 'finder'; fc.className = 'finder';
  sw.before(slot); sw.before(fc);
  const ft = document.createElement('footer');
  ft.id = 'siteFooter'; ft.className = 'site-footer';
  document.body.appendChild(ft);
  new MutationObserver(() => {
    const b = document.getElementById('installBtn'), h = document.getElementById('installBtnHost');
    if (b && h && b.parentElement !== h) h.appendChild(b);
  }).observe(document.querySelector('.container'), { childList: true });
}

function paintExtras() {
  const x = L2();
  const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const slot = document.getElementById('installSlot');
  slot.style.display = standalone ? 'none' : 'block';
  slot.querySelector('.inst-title').textContent = x.it;
  slot.querySelector('.inst-hint').textContent = /iphone|ipad|ipod/i.test(navigator.userAgent) ? x.ii : x.ih;
  const input = fMode === 'dob'
    ? '<input id="fDobIn" type="date" value="' + esc(vDob) + '" oninput="vDob=this.value">'
    : '<input id="fNameIn" type="text" placeholder="' + esc(x.nph) + '" value="' + esc(vName) + '" oninput="vName=this.value">';
  document.getElementById('finder').innerHTML =
    '<div class="f-title">' + esc(x.ft) + '</div>' +
    '<div class="f-tabs"><button class="f-tab' + (fMode === 'dob' ? ' on' : '') + '" onclick="fSet(\'dob\')">' + esc(x.tb1) + '</button>' +
    '<button class="f-tab' + (fMode === 'name' ? ' on' : '') + '" onclick="fSet(\'name\')">' + esc(x.tb2) + '</button></div>' +
    '<div class="f-row">' + input + '<button class="f-go" onclick="fGo()">' + esc(x.go) + '</button></div><div id="fOut"></div>';
  fShow();
  document.getElementById('siteFooter').innerHTML =
    '<div class="ft-links"><a href="/privacy.html">' + esc(x.priv) + '</a><span>·</span><a href="/terms.html">' + esc(x.terms) + '</a></div>' +
    '<p>' + esc(x.disc) + '</p><p>© ' + new Date().getFullYear() + ' Astroseek</p>';
}

function fSet(m) { fMode = m; fRes = null; paintExtras(); }

function fGo() {
  const x = L2();
  if (fMode === 'dob') {
    if (!vDob) fRes = { err: x.dte };
    else {
      const p = vDob.split('-').map(Number), k = p[1] * 100 + p[2];
      fRes = { w: pick(START_W, k, 9), v: pick(START_V, k, 8) };
    }
  } else {
    const i = nameSign(vName);
    fRes = i < 0 ? { err: x.nf } : { n: i };
  }
  fShow();
}

function fShow() {
  const o = document.getElementById('fOut');
  if (!o) return;
  const x = L2();
  if (!fRes) { o.innerHTML = ''; return; }
  if (fRes.err) { o.innerHTML = '<div class="f-err">' + esc(fRes.err) + '</div>'; return; }
  const line = (lab, i) => '<div class="f-line"><span>' + esc(lab) + '</span><b>' + GLYPHS[i] + ' ' + esc(sname(i)) + '</b></div>';
  const isName = fRes.n !== undefined;
  const main = isName ? fRes.n : fRes.v;
  const lines = isName ? line(x.nr, fRes.n) : line(x.v, fRes.v) + line(x.w, fRes.w);
  const aff = AFFILIATE_URL
    ? '<a class="f-chart" href="' + AFFILIATE_URL + '" target="_blank" rel="sponsored noopener">' + esc(x.chart) + '</a><div class="f-aff">' + esc(x.aff) + '</div>'
    : '';
  o.innerHTML = '<div class="f-res">' + lines + '<p class="f-note">' + esc(x.moon) + '</p>' +
    '<button class="f-read" onclick="fRead(' + main + ')">' + esc(x.read) + '</button>' + aff + '</div>';
}

function fRead(i) {
  document.getElementById('searchInput').value = '';
  filterHoroscope();
  const c = document.querySelectorAll('.rashi-card')[i];
  if (!c) return;
  if (!c.classList.contains('open')) toggleCard(c);
  c.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

const _applyUI2 = applyUI;
applyUI = function () { _applyUI2(); paintExtras(); };
buildExtras();
paintExtras();
