// --- 1. Global State & Configuration ---
let currentLang = localStorage.getItem('astroseek_lang') || 'hi';

const appData = {
  selectedRashi: null,

  // Unified UI Translations for all 4 languages
  translations: {
    hi: {
      appTitle: "Daily Rashifal App",
      appSubtitle: "आज का राशिफल",
      todayRashifal: "आज का राशिफल",
      zodiacHeading: "अपनी राशि चुनें",
      finderTitle: "🔍 नाम या जन्म तिथि से राशि जानें",
      tabName: "नाम से (By Name)",
      tabDob: "जन्मतिथि से (By DOB)",
      namePlaceholder: "अपना पहला नाम लिखें (e.g. Rahul)",
      findBtn: "Search",
      installText: "रोज़ाना राशिफल चाहिए?",
      installLink: "Click here",
      loveTitle: "❤️ प्रेम",
      careerTitle: "💼 करियर",
      moneyTitle: "💰 धन",
      healthTitle: "❤️‍🩹 स्वास्थ्य",
      luckyNumTitle: "🔢 शुभ अंक",
      luckyColorTitle: "🎨 शुभ रंग",
      adviceTitle: "🙏 आज की सलाह",
      nameNotFound: "कृपया वैध नाम दर्ज करें।",
      rashiFoundMsg: (rashi) => `आपकी राशि: ${rashi} (${getEnglishName(rashi)})`,
      dobNotFound: "कृपया सही दिन, महीना और वर्ष चुनें।"
    },
    en: {
      appTitle: "Daily Rashifal App",
      appSubtitle: "Today's Horoscope",
      todayRashifal: "Today's Horoscope",
      zodiacHeading: "Select Your Zodiac Sign",
      finderTitle: "🔍 Find Your Zodiac by Name or DOB",
      tabName: "By Name",
      tabDob: "By DOB",
      namePlaceholder: "Enter your first name (e.g. Rahul)",
      findBtn: "Search",
      installText: "Want daily horoscopes?",
      installLink: "Click here",
      loveTitle: "❤️ Love",
      careerTitle: "💼 Career",
      moneyTitle: "💰 Money",
      healthTitle: "❤️‍🩹 Health",
      luckyNumTitle: "🔢 Lucky Number",
      luckyColorTitle: "🎨 Lucky Color",
      adviceTitle: "🙏 Today's Advice",
      nameNotFound: "Please enter a valid name.",
      rashiFoundMsg: (rashi) => `Your Zodiac Sign: ${rashi} (${getEnglishName(rashi)})`,
      dobNotFound: "Please select a valid day, month, and year."
    },
    or: {
      appTitle: "Daily Rashifal App",
      appSubtitle: "ଆଜିର ରାଶିଫଳ",
      todayRashifal: "ଆଜିର ରାଶିଫଳ",
      zodiacHeading: "ନିଜ ରାଶି ବାଛନ୍ତୁ",
      finderTitle: "🔍 ନାମ ବା ଜନ୍ମ ତାରିଖରୁ ରାଶି ଜାଣନ୍ତୁ",
      tabName: "ନାମରୁ (By Name)",
      tabDob: "ଜନ୍ମ ତାରିଖରୁ (By DOB)",
      namePlaceholder: "ଆପଣଙ୍କ ପ୍ରଥମ ନାମ ଲେଖନ୍ତୁ (e.g. Rahul)",
      findBtn: "Search",
      installText: "ପ୍ରତିଦିନ ରାଶିଫଳ ଚାହାଁନ୍ତି କି?",
      installLink: "Click here",
      loveTitle: "❤️ ପ୍ରେମ",
      careerTitle: "💼 କ୍ୟାରିଅର୍",
      moneyTitle: "💰 ଧନ",
      healthTitle: "❤️‍🩹 ସ୍ୱାସ୍ଥ୍ୟ",
      luckyNumTitle: "🔢 ଭାଗ୍ୟଶାଳୀ ନମ୍ବର",
      luckyColorTitle: "🎨 ଭାଗ୍ୟଶାଳୀ ରଙ୍ଗ",
      adviceTitle: "🙏 ଆଜିର ପରାମର୍ଶ",
      nameNotFound: "ଦୟାକରି ଏକ ବୈଧ ନାମ ପ୍ରବେଶ କରନ୍ତୁ।",
      rashiFoundMsg: (rashi) => `ଆପଣଙ୍କ ରାଶି: ${rashi} (${getEnglishName(rashi)})`,
      dobNotFound: "ଦୟାକରି ସଠିକ୍ ଦିନ, ମାସ ଏବଂ ବର୍ଷ ବାଛନ୍ତୁ।"
    },
    bn: {
      appTitle: "Daily Rashifal App",
      appSubtitle: "আজকের রাশিফল",
      todayRashifal: "আজকের রাশিফল",
      zodiacHeading: "আপনার রাশি বেছে নিন",
      finderTitle: "🔍 নাম বা জন্ম তারিখ দিয়ে রাশি জানুন",
      tabName: "নাম দ্বারা (By Name)",
      tabDob: "জন্ম তারিখ দ্বারা (By DOB)",
      namePlaceholder: "আপনার প্রথম নাম লিখুন (e.g. Rahul)",
      findBtn: "Search",
      installText: "দৈনিক রাশিফল চান?",
      installLink: "Click here",
      loveTitle: "❤️ প্রেম",
      careerTitle: "💼 ক্যারিয়ার",
      moneyTitle: "💰 ধন",
      healthTitle: "❤️‍🩹 স্বাস্থ্য",
      luckyNumTitle: "🔢 শুভ নম্বর",
      luckyColorTitle: "🎨 শুভ রং",
      adviceTitle: "🙏 আজকের পরামর্শ",
      nameNotFound: "অনুগ্রহ করে একটি বৈধ নাম লিখুন।",
      rashiFoundMsg: (rashi) => `আপনার রাশি: ${rashi} (${getEnglishName(rashi)})`,
      dobNotFound: "অনুগ্রহ করে সঠিক দিন, মাস এবং বছর নির্বাচন করুন।"
    }
  },

  // Horoscope Predictions Database (Fallback)
  predictions: {
    "मेष": {
      enName: "Aries",
      hi: { love: "रिश्तों में मधुरता बनी रहेगी। पार्टनर के साथ समय बिताने का मौका मिलेगा।", career: "कार्यक्षेत्र में नए अवसर मिलेंगे। सहकर्मियों का सहयोग प्राप्त होगा।", money: "आर्थिक स्थिति मजबूत होगी। अटका हुआ धन वापस मिल सकता है.", health: "स्वास्थ्य सामान्य रहेगा, योग और व्यायाम करें।", luckyNumber: "9", luckyColor: "लाल (Red)", advice: "महत्वपूर्ण निर्णय लेते समय जल्दबाजी न करें।" },
      en: { love: "Sweetness will remain in relationships. You will get a chance to spend time with your partner.", career: "New opportunities will open up at work. Support from colleagues will boost progress.", money: "Financial condition will strengthen. Stuck money may be recovered.", health: "Health will be normal; practice yoga and light exercise.", luckyNumber: "9", luckyColor: "Red", advice: "Do not rush while making important decisions." },
      or: { love: "ସମ୍ପର୍କରେ ମଧୁରତା ରହିବ। ସାଥୀଙ୍କ ସହିତ ସମୟ ବିତାଇବାର ସୁଯୋଗ ମିଳିବ।", career: "କାର୍ଯ୍ୟକ୍ଷେତ୍ରରେ ନୂତନ ସୁଯୋଗ ମିଳିବ। ସହକର୍ମୀଙ୍କ ସହଯୋଗ ମିଳିବ।", money: "ଆର୍ଥିକ ସ୍ଥିତି ଦୃଢ଼ ହେବ। ଅଟକି ରହିଥିବା ଟଙ୍କା ଫେରିପାରେ।", health: "ସ୍ୱାସ୍ଥ୍ୟ ଭଲ ରହିବ, ଯୋଗ ଏବଂ ବ୍ୟାୟାମ କରନ୍ତୁ।", luckyNumber: "9", luckyColor: "ଲାଲ୍ (Red)", advice: "ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ନିଷ୍ପତ୍ତି ନେବାବେଳେ βତଡ଼ା କରନ୍ତୁ ନାହିଁ।" },
      bn: { love: "সম্পর্কে মাধুর্য বজায় থাকবে। সঙ্গীর সাথে সময় কাটানোর সুযোগ পাবেন।", career: "কর্মক্ষেত্রে নতুন সুযোগ আসবে। সহকর্মীদের সহযোগিতা পাবেন।", money: "আর্থিক অবস্থার উন্নতি হবে। আটকে থাকা টাকা ফেরত পেতে পারেন।", health: "স্বাস্থ্য স্বাভাবিক থাকবে, যোগব্যায়াম করুন।", luckyNumber: "৯", luckyColor: "লাল (Red)", advice: "গুরুত্বপূর্ণ সিদ্ধান্ত নেওয়ার সময় তাড়াহুড়ো করবেন না।" }
    },
    "वृषभ": {
      enName: "Taurus",
      hi: { love: "परिवार में सुख-शांति बनी रहेगी। वैवाहिक जीवन आनंदमय रहेगा.", career: "व्यापार में लाभ के योग हैं। उच्च अधिकारियों का मार्गदर्शन मिलेगा।", money: "धन लाभ के नए स्रोत बन सकते हैं। खर्चों पर नियंत्रण रखें।", health: "खान-पान का ध्यान रखें, पेट से जुड़ी समस्या हो सकती है.", luckyNumber: "6", luckyColor: "गुलाबी (Pink)", advice: "अनावश्यक वाद-विवाद से दूर रहें।" },
      en: { love: "Peace and harmony will prevail at home. Married life will be joyful.", career: "Profits are likely in business. Guidance from seniors will be beneficial.", money: "New sources of income may open. Keep a check on unnecessary expenses.", health: "Take care of your diet; stomach issues may arise.", luckyNumber: "6", luckyColor: "Pink", advice: "Stay away from unnecessary arguments." },
      or: { love: "ପରିବାରରେ ଶାନ୍ତି ଏବଂ ଖୁସି ରହିବ। ବୈବାହିକ ଜୀବନ ଆନନ୍ଦଦାୟକ ହେବ।", career: "ବ୍ୟାପାରରେ ଲାଭର ଯୋଗ ରହିଛି। ବରିଷ୍ଠ ଅଧିକାରୀଙ୍କ ମାର୍ଗଦର୍ଶନ ମିଳିବ।", money: "ଧନଲାଭର ନୂତନ ଉତ୍ସ ସୃଷ୍ଟି ହୋଇପାରେ। ଖର୍ଚ୍ଚ ଉପରେ ନିୟନ୍ତ୍ରଣ ରଖନ୍ତୁ।", health: "ଖାଦ୍ୟପେୟ ପ୍ରତି ଧ୍ୟାନ ଦିଅନ୍ତୁ, ପେଟ ସମସ୍ୟା ହୋଇପାରେ।", luckyNumber: "6", luckyColor: "ଗୋଲାପୀ (Pink)", advice: "ଅନାବଶ୍ୟକ ଯୁକ୍ତିତର୍କରୁ ଦୂରେଇ ରୁହନ୍ତୁ।" },
      bn: { love: "পরিবারে সুখ-শান্তি বজায় থাকবে। বৈবাহিক জীবন আনন্দময় হবে।", career: "ব্যবসায়ে লাভের যোগ রয়েছে। উচ্চপদস্থ কর্মকর্তাদের পরামর্শ পাবেন।", money: "অর্থ লাভের নতুন উৎস তৈরি হতে পারে। খরচের উপর নিয়ন্ত্রণ রাখুন।", health: "খাদ্যাভ্যাসের যত্ন নিন, পেটের সমস্যা হতে পারে।", luckyNumber: "৬", luckyColor: "গোলাপী (Pink)", advice: "অপ্রয়োজনীয় বিতর্ক থেকে দূরে থাকুন।" }
    },
    "मिथुन": {
      enName: "Gemini",
      hi: { love: "प्रेम जीवन में संवाद की कमी न होने दें। भावनाएं खुलकर व्यक्त करें।", career: "क्रिएटिव कार्यों से जुड़े लोगों को बड़ी सफलता मिल सकती है।", money: "आय में वृद्धि हो सकती है। निवेश के लिए दिन अच्छा है।", health: "मानसिक तनाव से बचें, पर्याप्त नींद लें.", luckyNumber: "5", luckyColor: "हरा (Green)", advice: "दूसरों की बातों में आने से बचें।" },
      en: { love: "Do not let communication lag in love life. Express your feelings openly.", career: "People in creative fields can achieve major success.", money: "Income may increase. Favorable day for smart investments.", health: "Avoid mental stress and get adequate sleep.", luckyNumber: "5", luckyColor: "Green", advice:
