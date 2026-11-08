// --- 1. Global State & Configuration ---
let currentLang = localStorage.getItem('astroseek_lang') || 'hi';

const appData = {
  selectedRashi: 'मेष', // डिफ़ॉल्ट रूप से मेष सिलेक्टेड रहेगा ताकि पेज खाली न दिखे

  translations: {
    hi: {
      appTitle: "Daily Rashifal App",
      appSubtitle: "आज का राशिफल",
      zodiacHeading: "अपनी राशि चुनें",
      finderTitle: "🔍 नाम या जन्म तिथि से राशि जानें",
      tabName: "नाम से (By Name)",
      tabDob: "जन्मतिथि से (By DOB)",
      namePlaceholder: "अपना पहला नाम लिखें (e.g. Rahul)",
      loveTitle: "❤️ प्रेम",
      careerTitle: "💼 करियर",
      moneyTitle: "💰 धन",
      healthTitle: "❤️‍🩹 स्वास्थ्य",
      luckyNumTitle: "🔢 शुभ अंक",
      luckyColorTitle: "🎨 शुभ रंग",
      adviceTitle: "🙏 आज की सलाह",
      nameNotFound: "कृपया वैध नाम दर्ज करें।",
      rashiFoundMsg: (rashi) => `आपकी राशि: ${rashi}`,
      dobNotFound: "कृपया सही दिन, महीना और वर्ष चुनें।"
    },
    en: {
      appTitle: "Daily Rashifal App",
      appSubtitle: "Today's Horoscope",
      zodiacHeading: "Select Your Zodiac Sign",
      finderTitle: "🔍 Find Your Zodiac by Name or DOB",
      tabName: "By Name",
      tabDob: "By DOB",
      namePlaceholder: "Enter your first name (e.g. Rahul)",
      loveTitle: "❤️ Love",
      careerTitle: "💼 Career",
      moneyTitle: "💰 Money",
      healthTitle: "❤️‍🩹 Health",
      luckyNumTitle: "🔢 Lucky Number",
      luckyColorTitle: "🎨 Lucky Color",
      adviceTitle: "🙏 Today's Advice",
      nameNotFound: "Please enter a valid name.",
      rashiFoundMsg: (rashi) => `Your Zodiac Sign: ${rashi}`,
      dobNotFound: "Please select a valid day, month, and year."
    },
    or: {
      appTitle: "Daily Rashifal App",
      appSubtitle: "ଆଜିର ରାଶିଫଳ",
      zodiacHeading: "ନିଜ ରାଶି ବାଛନ୍ତୁ",
      finderTitle: "🔍 ନାମ ବା ଜନ୍ମ ତାରିଖରୁ ରାଶି ଜାଣନ୍ତୁ",
      tabName: "ନାମରୁ (By Name)",
      tabDob: "ଜନ୍ମ ତାରିଖରୁ (By DOB)",
      namePlaceholder: "ଆପଣଙ୍କ ପ୍ରଥମ ନାମ ଲେଖନ୍ତୁ (e.g. Rahul)",
      loveTitle: "❤️ ପ୍ରେମ",
      careerTitle: "💼 କ୍ୟାରିଅର୍",
      moneyTitle: "💰 ଧନ",
      healthTitle: "❤️‍🩹 ସ୍ୱାସ୍ଥ୍ୟ",
      luckyNumTitle: "🔢 ଭାଗ୍ୟଶାଳୀ ନମ୍ବର",
      luckyColorTitle: "🎨 ଭାଗ୍ୟଶାଳୀ ରଙ୍ଗ",
      adviceTitle: "🙏 ଆଜିର ପରାମର୍ଶ",
      nameNotFound: "ଦୟାକରି ଏକ ବୈଧ ନାମ ପ୍ରବେଶ କରନ୍ତୁ।",
      rashiFoundMsg: (rashi) => `ଆପଣଙ୍କ ରାଶି: ${rashi}`,
      dobNotFound: "ଦୟାକରି ସଠିକ୍ ଦିନ, ମାସ ଏବଂ ବର୍ଷ ବାଛନ୍ତୁ।"
    },
    bn: {
      appTitle: "Daily Rashifal App",
      appSubtitle: "আজকের রাশিফল",
      zodiacHeading: "আপনার রাশি বেছে নিন",
      finderTitle: "🔍 নাম বা জন্ম তারিখ দিয়ে রাশি জানুন",
      tabName: "নাম দ্বারা (By Name)",
      tabDob: "জন্ম তারিখ দ্বারা (By DOB)",
      namePlaceholder: "আপনার প্রথম নাম লিখুন (e.g. Rahul)",
      loveTitle: "❤️ প্রেম",
      careerTitle: "💼 ক্যারিয়ার",
      moneyTitle: "💰 ধন",
      healthTitle: "❤️‍🩹 স্বাস্থ্য",
      luckyNumTitle: "🔢 শুভ নম্বর",
      luckyColorTitle: "🎨 শুভ রং",
      adviceTitle: "🙏 আজকের পরামর্শ",
      nameNotFound: "অনুগ্রহ করে একটি বৈধ নাম লিখুন।",
      rashiFoundMsg: (rashi) => `আপনার রাশি: ${rashi}`,
      dobNotFound: "অনুগ্রহ করে সঠিক দিন, মাস এবং বছর নির্বাচন করুন।"
    }
  }
};

function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('astroseek_lang', lang);
  updateUI();
}

function updateUI() {
  const t = appData.translations[currentLang];
  if (!t) return;
  
  if(document.getElementById('appTitle')) document.getElementById('appTitle').innerHTML = `<img src="icon-512.png" alt="Logo" class="site-logo">${t.appTitle}`;
  if(document.getElementById('appSubtitle')) document.getElementById('appSubtitle').innerText = t.appSubtitle;
  if(document.getElementById('zodiacHeading')) document.getElementById('zodiacHeading').innerText = t.zodiacHeading;
  if(document.getElementById('finderTitle')) document.getElementById('finderTitle').innerText = t.finderTitle;
  if(document.getElementById('tabNameBtn')) document.getElementById('tabNameBtn').innerText = t.tabName;
  if(document.getElementById('tabDobBtn')) document.getElementById('tabDobBtn').innerText = t.tabDob;
  if(document.getElementById('userNameInput')) document.getElementById('userNameInput').placeholder = t.namePlaceholder;
  
  if(document.getElementById('hLove')) document.getElementById('hLove').innerText = t.loveTitle;
  if(document.getElementById('hCareer')) document.getElementById('hCareer').innerText = t.careerTitle;
  if(document.getElementById('hMoney')) document.getElementById('hMoney').innerText = t.moneyTitle;
  if(document.getElementById('hHealth')) document.getElementById('hHealth').innerText = t.healthTitle;
  if(document.getElementById('hLuckyNum')) document.getElementById('hLuckyNum').innerText = t.luckyNumTitle;
  if(document.getElementById('hLuckyColor')) document.getElementById('hLuckyColor').innerText = t.luckyColorTitle;
  if(document.getElementById('hAdvice')) document.getElementById('hAdvice').innerText = t.adviceTitle;

  updateTodayDate();
}

function updateTodayDate() {
  const dateEl = document.getElementById("todayDate");
  if (!dateEl) return;
  
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let locale = currentLang === 'en' ? 'en-US' : (currentLang === 'bn' ? 'bn-BD' : 'hi-IN');
  
  try {
    dateEl.textContent = now.toLocaleDateString(locale, options);
  } catch (e) {
    dateEl.textContent = now.toDateString();
  }
}

function switchFinderTab(tab) {
  const nameBox = document.getElementById("nameFinderBox");
  const dobBox = document.getElementById("dobFinderBox");
  const nameBtn = document.getElementById("tabNameBtn");
  const dobBtn = document.getElementById("tabDobBtn");

  if (tab === 'name') {
    nameBox.classList.remove("hidden");
    dobBox.classList.add("hidden");
    nameBtn.style.background = "#f7f3ff";
    nameBtn.style.color = "#6a1b9a";
    nameBtn.style.borderColor = "#6a1b9a";
    dobBtn.style.background = "#fff";
    dobBtn.style.color = "#777";
    dobBtn.style.borderColor = "#ccc";
  } else {
    dobBox.classList.remove("hidden");
    nameBox.classList.add("hidden");
    dobBtn.style.background = "#f7f3ff";
    dobBtn.style.color = "#6a1b9a";
    dobBtn.style.borderColor = "#6a1b9a";
    nameBtn.style.background = "#fff";
    nameBtn.style.color = "#777";
    nameBtn.style.borderColor = "#ccc";
  }
}

function findRashiByName() {
  const input = document.getElementById("userNameInput").value.trim().toLowerCase();
  const msgEl = document.getElementById("nameResultMsg");
  const t = appData.translations[currentLang];

  if (!input) {
    msgEl.textContent = t.nameNotFound;
    return;
  }

  const firstLetter = input[0];
  const letterToRashi = {
    'a': 'मेष', 'b': 'वृषभ', 'c': 'मिथुन', 'd': 'कर्क', 'e': 'सिंह',
    'f': 'कन्या', 'g': 'तुला', 'h': 'वृश्चिक', 'i': 'धनु', 'j': 'मकर',
    'k': 'कुंभ', 'l': 'मीन', 'm': 'मेष', 'n': 'वृषभ', 'o': 'मिथुन',
    'p': 'कर्क', 'q': 'सिंह', 'r': 'कन्या', 's': 'तुला', 't': 'वृश्चिक',
    'u': 'धनु', 'v': 'मकर', 'w': 'कुंभ', 'x': 'मीन', 'y': 'मेष', 'z': 'वृषभ'
  };

  const matchedRashi = letterToRashi[firstLetter] || 'मेष';
  msgEl.textContent = t.rashiFoundMsg(matchedRashi);
  showRashi(matchedRashi);
}

function findRashiByDobFriendly() {
  const day = parseInt(document.getElementById("dobDay").value);
  const month = parseInt(document.getElementById("dobMonth").value);
  const year = parseInt(document.getElementById("dobYear").value);
  const msgEl = document.getElementById("dobResultMsg");
  const t = appData.translations[currentLang];

  if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
    msgEl.textContent = t.dobNotFound;
    return;
  }

  let rashi = "मेष";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) rashi = "मेष";
  else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) rashi = "वृषभ";
  else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) rashi = "मिथुन";
  else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) rashi = "कर्क";
  else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) rashi = "सिंह";
  else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) rashi = "कन्या";
  else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) rashi = "तुला";
  else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) rashi = "वृश्चिक";
  else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) rashi = "धनु";
  else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) rashi = "मकर";
  else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) rashi = "कुंभ";
  else rashi = "मीन";

  msgEl.textContent = t.rashiFoundMsg(rashi);
  showRashi(rashi);
}

async function showRashi(rashiName) {
  appData.selectedRashi = rashiName;

  document.querySelectorAll('.rashi-card').forEach(card => {
    if (card.getAttribute('data-rashi') === rashiName) {
      card.classList.add('selected');
    } else {
      card.classList.remove('selected');
    }
  });

  const predSection = document.getElementById("prediction");
  if (predSection) {
    predSection.classList.remove("hidden");
  }

  if(document.getElementById("rashiTitle")) {
    document.getElementById("rashiTitle").textContent = `${rashiName} - Loading...`;
  }

  try {
    const response = await fetch(`https://daily-rashifal-app.comparisonlist.workers.dev`, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      const json = await response.json();
      let rashifalList = [];
      
      if (Array.isArray(json)) rashifalList = json;
      else if (json.success && json.data && Array.isArray(json.data.rashifal)) rashifalList = json.data.rashifal;
      else if (json.rashifal && Array.isArray(json.rashifal)) rashifalList = json.rashifal;

      const matchedObj = rashifalList.find(item => item.rashi_hi === rashiName || (item.rashi_en && item.rashi_en.toLowerCase() === rashiName.toLowerCase()));

      if (matchedObj) {
        const langKey = `predictions_${currentLang}`;
        const preds = matchedObj[langKey] || matchedObj.predictions_hi || matchedObj.predictions_en || {};
        
        document.getElementById("rashiTitle").textContent = `${matchedObj.rashi_en || rashiName} (${rashiName}) राशिफल`;
        document.getElementById("love").textContent = preds.love || "उपलब्ध नहीं है";
        document.getElementById("career").textContent = preds.career || "उपलब्ध नहीं है";
        document.getElementById("money").textContent = preds.finance || preds.money || "उपलब्ध नहीं है";
        document.getElementById("health").textContent = preds.health || "उपलब्ध नहीं है";
        document.getElementById("luckyNumber").textContent = matchedObj.lucky?.number?.toString() || "N/A";
        document.getElementById("luckyColor").textContent = matchedObj.lucky?.colors ? matchedObj.lucky.colors.join(', ') : "N/A";
        document.getElementById("advice").textContent = preds.overall || "";
        return;
      }
    }
    throw new Error("Data not found");
  } catch (error) {
    console.error("Live fetch error:", error);
    document.getElementById("rashiTitle").textContent = `${rashiName} राशिफल`;
    document.getElementById("love").textContent = "लाइव डेटा लोड करने में समस्या आ रही है। कृपया इंटरनेट कनेक्शन जांचें।";
    document.getElementById("career").textContent = "";
    document.getElementById("money").textContent = "";
    document.getElementById("health").textContent = "";
    document.getElementById("luckyNumber").textContent = "";
    document.getElementById("luckyColor").textContent = "";
    document.getElementById("advice").textContent = "";
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const daySelect = document.getElementById('dobDay');
  if (daySelect && daySelect.options.length <= 1) {
    for (let i = 1; i <= 31; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = i;
      daySelect.appendChild(opt);
    }
  }

  const langSelect = document.getElementById('languageSelect');
  if (langSelect) {
    langSelect.value = currentLang;
  }

  document.querySelectorAll('.rashi-card').forEach(card => {
    card.addEventListener('click', () => {
      const rashiName = card.getAttribute('data-rashi');
      showRashi(rashiName);
    });
  });

  updateUI();
  
  // पेज खुलते ही डिफ़ॉल्ट रूप से मेष राशि का डेटा लोड करें ताकि स्क्रीन खाली न लगे
  showRashi('मेष');
});
