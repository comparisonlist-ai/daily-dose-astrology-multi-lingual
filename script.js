
// --- 1. PLACE AT THE TOP OF SCRIPT.JS ---
const translations = {
    en: { /* ... your english strings ... */ },
    hi: { /* ... your hindi strings ... */ },
    or: { /* ... your odia strings ... */ },
    bn: {
        title: "দৈনিক ডোজ জ্যোতিষ",
        subtitle: "আপনার সঠিক দৈনিক রাশিফল জেনে নিন",
        selectLanguage: "ভাষা নির্বাচন করুন",
        todayRashifal: "আজকের রাশিফল",
        installApp: "প্রতিদিনের আপডেটের জন্য অ্যাপটি ইনস্টল করুন",
        installBtn: "এখনই ইনস্টল করুন",
        loading: "ভবিষ্যদ্বাণী লোড হচ্ছে...",
        rashis: {
            aries: "মেষ", taurus: "বৃষ", gemini: "মিথুন", cancer: "কর্কট",
            leo: "সিংহ", virgo: "কন্যা", libra: "তুলা", scorpio: "বৃশ্চিক",
            sagittarius: "धনু / ধনু", capricorn: "মকর", aquarius: "কুম্ভ", pisces: "মীন"
        }
    }
};

let currentLang = localStorage.getItem('astroseek_lang') || 'bn';


// --- Data Store for Predictions & Translations ---
const appData = {
  currentLang: 'hi',
  selectedRashi: null,

  // UI Translations
  translations: {
    hi: {
      subHeader: "आज का राशिफल",
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
      dobNotFound: "कृपया वैध जन्मतिथि चुनें।"
    },
    en: {
      subHeader: "Today's Horoscope",
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
      dobNotFound: "Please select a valid date of birth."
    },
    or: {
      subHeader: "ଆଜିର ରାଶିଫଳ",
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
      dobNotFound: "ଦୟାକରି ଏକ ବୈଧ ଜନ୍ମ ତାରିଖ ବାଛନ୍ତୁ।"
    }
  },

  // Horoscope Predictions Database (Multilingual)
  predictions: {
    "मेष": {
      enName: "Aries",
      hi: { love: "रिश्तों में मधुरता बनी रहेगी। पार्टनर के साथ समय बिताने का मौका मिलेगा।", career: "कार्यक्षेत्र में नए अवसर मिलेंगे। सहकर्मियों का सहयोग प्राप्त होगा।", money: "आर्थिक स्थिति मजबूत होगी। अटका हुआ धन वापस मिल सकता है।", health: "स्वास्थ्य सामान्य रहेगा, योग और व्यायाम करें।", luckyNumber: "9", luckyColor: "लाल (Red)", advice: "महत्वपूर्ण निर्णय लेते समय जल्दबाजी न करें।" },
      en: { love: "Sweetness will remain in relationships. You will get a chance to spend time with your partner.", career: "New opportunities will open up at work. Support from colleagues will boost progress.", money: "Financial condition will strengthen. Stuck money may be recovered.", health: "Health will be normal; practice yoga and light exercise.", luckyNumber: "9", luckyColor: "Red", advice: "Do not rush while making important decisions." },
      or: { love: "ସମ୍ପର୍କରେ ମଧୁରତା ରହିବ। ସାଥୀଙ୍କ ସହିତ ସମୟ ବିତାଇବାର ସୁଯୋଗ ମିଳିବ।", career: "କାର୍ଯ୍ୟକ୍ଷେତ୍ରରେ ନୂତନ ସୁଯୋଗ ମିଳିବ। ସହକର୍ମୀଙ୍କ ସହଯୋଗ ମିଳିବ।", money: "ଆର୍ଥିକ ସ୍ଥିତି ଦୃଢ଼ ହେବ। ଅଟକି ରହିଥିବା ଟଙ୍କା ଫେରିପାରେ।", health: "ସ୍ୱାସ୍ଥ୍ୟ ଭଲ ରହିବ, ଯୋଗ ଏବଂ ବ୍ୟାୟାମ କରନ୍ତୁ।", luckyNumber: "9", luckyColor: "ଲାଲ୍ (Red)", advice: "ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ନିଷ୍ପତ୍ତି ନେବାବେଳେ βତଡ଼ା କରନ୍ତୁ ନାହିଁ।" }
    },
    "वृषभ": {
      enName: "Taurus",
      hi: { love: "परिवार में सुख-शांति बनी रहेगी। वैवाहिक जीवन आनंदमय रहेगा।", career: "व्यापार में लाभ के योग हैं। उच्च अधिकारियों का मार्गदर्शन मिलेगा।", money: "धन लाभ के नए स्रोत बन सकते हैं। खर्चों पर नियंत्रण रखें।", health: "खान-पान का ध्यान रखें, पेट से जुड़ी समस्या हो सकती है.", luckyNumber: "6", luckyColor: "गुलाबी (Pink)", advice: "अनावश्यक वाद-विवाद से दूर रहें।" },
      en: { love: "Peace and harmony will prevail at home. Married life will be joyful.", career: "Profits are likely in business. Guidance from seniors will be beneficial.", money: "New sources of income may open. Keep a check on unnecessary expenses.", health: "Take care of your diet; stomach issues may arise.", luckyNumber: "6", luckyColor: "Pink", advice: "Stay away from unnecessary arguments." },
      or: { love: "ପରିବାରରେ ଶାନ୍ତି ଏବଂ ଖୁସି ରହିବ। ବୈବାହିକ ଜୀବନ ଆନନ୍ଦଦାୟକ ହେବ।", career: "ବ୍ୟାପାରରେ ଲାଭର ଯୋଗ ରହିଛି। ବରିଷ୍ଠ ଅଧିକାରୀଙ୍କ ମାର୍ଗଦର୍ଶନ ମିଳିବ।", money: "ଧନଲାଭର ନୂତନ ଉତ୍ସ ସୃଷ୍ଟି ହୋଇପାରେ। ଖର୍ଚ୍ଚ ଉପରେ ନିୟନ୍ତ୍ରଣ ରଖନ୍ତୁ।", health: "ଖାଦ୍ୟପେୟ ପ୍ରତି ଧ୍ୟାନ ଦିନ୍ତୁ, ପେଟ ସମସ୍ୟା ହୋଇପାରେ।", luckyNumber: "6", luckyColor: "ଗୋଲାପୀ (Pink)", advice: "ଅନାବଶ୍ୟକ ଯୁକ୍ତିତର୍କରୁ ଦୂରେଇ ରୁହନ୍ତୁ।" }
    },
    "मिथुन": {
      enName: "Gemini",
      hi: { love: "प्रेम जीवन में संवाद की कमी न होने दें। भावनाएं खुलकर व्यक्त करें।", career: "क्रिएटिव कार्यों से जुड़े लोगों को बड़ी सफलता मिल सकती है।", money: "आय में वृद्धि हो सकती है। निवेश के लिए दिन अच्छा है।", health: "मानसिक तनाव से बचें, पर्याप्त नींद लें।", luckyNumber: "5", luckyColor: "हरा (Green)", advice: "दूसरों की बातों में आने से बचें।" },
      en: { love: "Do not let communication lag in love life. Express your feelings openly.", career: "People in creative fields can achieve major success.", money: "Income may increase. Favorable day for smart investments.", health: "Avoid mental stress and get adequate sleep.", luckyNumber: "5", luckyColor: "Green", advice: "Avoid getting influenced by others' opinions." },
      or: { love: "ପ୍ରେମ ଜୀବନରେ ଯୋଗାଯୋଗରେ ଅବହେଳା କରନ୍ତୁ ନାହିଁ। ଭାବନା ପ୍ରକାଶ କରନ୍ତୁ।", career: "ସୃଜନଶୀଳ କାର୍ଯ୍ୟରେ ଜଡିତ ବ୍ୟକ୍ତିମାନେ ବଡ଼ ସଫଳତା ପାଇପାରିବେ।", money: "ଆୟ ବୃଦ୍ଧି ପାଇପାରେ। ନିବେଶ ପାଇଁ ଦିନଟି ଭଲ ଅଛି।", health: "ମାନସିକ ଚାପରୁ ଦୂରେଇ ରୁହନ୍ତୁ, ପର୍ଯ୍ୟାପ୍ତ ନିଦ ନିଅନ୍ତୁ।", luckyNumber: "5", luckyColor: "ସବୁଜ (Green)", advice: "ଅନ୍ୟମାନଙ୍କ କଥାରେ ପ୍ରଭାବିତ ହୁଅନ୍ତୁ ନାହିଁ।" }
    },
    "कर्क": {
      enName: "Cancer",
      hi: { love: "जीवनसाथी का पूरा सहयोग मिलेगा। मन प्रसन्न रहेगा।", career: "नौकरीपेशा जातकों को प्रमोशन या नई जिम्मेदारी मिल सकती है।", money: "धन संचय करने में सफल रहेंगे। आर्थिक मजबूती आएगी।", health: "स्वास्थ्य उत्तम रहेगा। ऊर्जावान महसूस करेंगे।", luckyNumber: "2", luckyColor: "चांदी जैसा सफेद (White)", advice: "सकारात्मक सोच बनाए रखें।" },
      en: { love: "Full support will be received from your life partner. Mind will remain happy.", career: "Salaried individuals may get a promotion or new responsibilities.", money: "You will succeed in saving money. Financial strength will improve.", health: "Health will be excellent. You will feel energetic.", luckyNumber: "2", luckyColor: "White", advice: "Maintain a positive outlook throughout the day." },
      or: { love: "ଜୀବନସାଥୀଙ୍କର ପୂର୍ଣ୍ଣ ସହଯୋଗ ମିଳିବ। ମନ ପ୍ରସନ୍ନ ରହିବ।", career: "ଚାକିରି କରୁଥିବା ବ୍ୟକ୍ତିଙ୍କୁ ପଦୋନ୍ନତି କିମ୍ବା ନୂତନ ଦାୟିତ୍ୱ ମିଳିପାରେ।", memory: "ଧନ ସଞ୍ଚୟ କରିବାରେ ସଫଳ ହେବେ। ଆର୍ଥିକ ଦୃଢ଼ତା ଆସିବ।", health: "ସ୍ୱାସ୍ଥ୍ୟ ଉତ୍ତମ ରହିବ। ଶକ୍ତିଶାଳୀ ଅନୁଭବ କରିବେ।", luckyNumber: "2", luckyColor: "ଧଳା (White)", advice: "ସକାରାତ୍ମକ ଚିନ୍ତାଧାରା ବଜାୟ ରଖନ୍ତୁ।" }
    },
    "सिंह": {
      enName: "Leo",
      hi: { love: "प्रेम संबंधों में आत्मीयता बढ़ेगी। कहीं घूमने जाने का प्लान बन सकता है।", career: "नेतृत्व क्षमता की सराहना होगी। ऑफिस में आपका दबदबा रहेगा.", money: "धन लाभ के प्रबल योग हैं। लग्जरी चीजों पर खर्च हो सकता है।", health: "थकान महसूस हो सकती है, आराम पर ध्यान दें।", luckyNumber: "1", luckyColor: "सुनहरा (Gold)", advice: "अहंकार से दूर रहें।" },
      en: { love: "Intimacy in love relationships will increase. Plans for an outing can be made.", career: "Leadership skills will be appreciated. Your dominance in the office will grow.", money: "Strong chances of financial gain. Expenses on luxury items are possible.", health: "You may feel tired; focus on getting proper rest.", luckyNumber: "1", luckyColor: "Gold", advice: "Keep ego at bay." },
      or: { love: "ପ୍ରେମ ସମ୍ପର୍କରେ ଆନ୍ତରିକତା ବୃଦ୍ଧି ପାଇବ। ବୁଲିବାକୁ ଯିବାର ଯୋଜନା ହୋଇପାରେ।", career: "ନେତୃତ୍ୱ କ୍ଷମତାର ପ୍ରଶଂସା କରାଯିବ। ଅଫିସରେ ଆପଣଙ୍କର ପ୍ରଭାବ ରହିବ।", money: "ଧନଲାଭର ପ୍ରବଳ ଯୋଗ ରହିଛି। ବିଳାସପୂର୍ଣ୍ଣ ଜିନିଷରେ ଖର୍ଚ୍ଚ ହୋଇପାରେ।", health: "କ୍ଳାନ୍ତ ଅନୁଭବ ହୋଇପାରେ, ବିଶ୍ରାମ ପ୍ରତି ଧ୍ୟାନ ଦିଅନ୍ତୁ।", luckyNumber: "1", luckyColor: "ସୁନା ରଙ୍ଗ (Gold)", advice: "ଅହଂକାରଠାରୁ ଦୂରେଇ ରୁହନ୍ତୁ।" }
    },
    "कन्या": {
      enName: "Virgo",
      hi: { love: "रिश्तों में पारदर्शिता रखें। दिल की बात साफ-साफ कहें।", career: "विद्यार्थियों के लिए समय उत्तम है। परीक्षा में सफलता मिलेगी।", money: "बजट बनाकर चलें, अनावश्यक खर्चों से बचें।", health: "पाचन तंत्र का ख्याल रखें, हल्का भोजन लें।", luckyNumber: "5", luckyColor: "हरा (Green)", advice: "दूसरों की आलोचना करने से बचें।" },
      en: { love: "Keep transparency in relationships. Express your heart clearly.", career: "Favorable time for students. Success is foreseen in examinations.", money: "Stick to a budget and avoid unnecessary expenses.", health: "Take care of your digestive system and eat light food.", luckyNumber: "5", luckyColor: "Green", advice: "Avoid criticizing others." },
      or: { love: "ସମ୍ପର୍କରେ ସ୍ୱଚ୍ଛତା ରଖନ୍ତୁ। ମନର କଥା ସ୍ପଷ୍ଟ ଭାବରେ କୁହନ୍ତୁ।", career: "ଛାତ୍ରଛାତ୍ରୀମାନଙ୍କ ପାଇଁ ସମୟ ଉତ୍ତମ ଅଛି। ପରୀକ୍ଷାରେ ସଫଳତା ମିଳିବ।", money: "ବଜେଟ୍ ପ୍ରସ୍ତୁତ କରି ଚାଲନ୍ତୁ, ଅନାବଶ୍ୟକ ଖର୍ଚ୍ଚରୁ ବଞ୍ଚନ୍ତୁ।", health: "ପାଚନତନ୍ତ୍ରର ଯତ୍ନ ନିଅନ୍ତୁ, ହାଲୁକା ଖାଦ୍ୟ ଖାଆନ୍ତୁ।", luckyNumber: "5", luckyColor: "ସବୁଜ (Green)", advice: "ଅନ୍ୟର ସମାଲୋଚନା କରିବାରୁ ବିରତ ରୁହନ୍ତୁ।" }
    },
    "तुला": {
      enName: "Libra",
      hi: { love: "दांपत्य जीवन में मधुरता आएगी। पुराने गिले-शिकवे दूर होंगे।", career: "व्यापारियों को नई डील्स मिलने की संभावना है।", money: "आर्थिक मामलों में सावधानी बरतें, किसी को उधार न दें।", health: "जोड़ों में दर्द या थकान की शिकायत हो सकती है।", luckyNumber: "6", luckyColor: "हल्का नीला (Light Blue)", advice: "संतुलित रवैया अपनाएं।" },
      en: { love: "Sweetness will come in conjugal life. Old grievances will be resolved.", career: "Businesspersons are likely to crack new deals.", money: "Exercise caution in financial matters; avoid lending money.", health: "Joint pain or fatigue complaints may arise.", luckyNumber: "6", luckyColor: "Light Blue", advice: "Adopt a balanced approach." },
      or: { love: "ଦାମ୍ପତ୍ୟ ଜୀବନରେ ମଧୁରତା ଆସିବ। ପୁରୁଣା ମତାମତ ଦୂର ହେବ।", career: "ବ୍ୟବସାୟୀମାନଙ୍କୁ ନୂତନ ଡିଲ୍ ମିଳିବାର ସମ୍ଭାବନା ଅଛି।", money: "ଆର୍ଥିକ ମାମଲାରେ ସତର୍କତା ଅବଲମ୍ବନ କରନ୍ତୁ, କାହାକୁ ଧାର ଦିଅନ୍ତୁ ନାହିଁ।", health: "ଗଣ୍ଠି ଯନ୍ତ୍ରଣା କିମ୍ବା କ୍ଳାନ୍ତ ଅନୁଭବ ହୋଇପାରେ।", luckyNumber: "6", luckyColor: "ହାଲୁକା ନୀଳ (Light Blue)", advice: "ସନ୍ତୁଳିତ ଆଚରଣ ଗ୍ରହଣ କରନ୍ତୁ।" }
    },
    "वृश्चिक": {
      enName: "Scorpio",
      hi: { love: "भावनाओं पर नियंत्रण रखें। पार्टनर की भावनाओं को समझें।", career: "कार्यस्थल पर कोई गुप्त विरोधी परेशान कर सकता है, सतर्क रहें।", money: "अचानक धन लाभ के योग बन रहे हैं। शेयर बाजार में सोच-समझकर निवेश करें।", health: "तनावमुक्त रहने के लिए मेडिटेशन करें।", luckyNumber: "9", luckyColor: "मैरून (Maroon)", advice: "हर किसी पर तुरंत भरोसा न करें।" },
      en: { love: "Keep your emotions in check. Try to understand your partner's feelings.", career: "A secret opponent at work might create trouble; stay alert.", money: "Chances of sudden financial gains. Invest wisely in the market.", health: "Meditate to stay stress-free.", luckyNumber: "9", luckyColor: "Maroon", advice: "Do not trust everyone blindly." },
      or: { love: "ଭାବନା ଉପରେ ନିୟନ୍ତ୍ରଣ ରଖନ୍ତୁ। ସାଥୀଙ୍କ ଭାବନାକୁ ବୁଝନ୍ତୁ।", career: "କାର୍ଯ୍ୟକ୍ଷେତ୍ରରେ କେହି ଗୁପ୍ତ ଶତ୍ରୁ ସମସ୍ୟା ସୃଷ୍ଟି କରିପାରେ, ସତର୍କ ରୁହନ୍ତୁ।", money: "ଅତର୍କିତ ଧନଲାଭର ଯୋଗ ରହିଛି। ବଜାରରେ ଚିନ୍ତାକରି ନିବେଶ କରନ୍ତୁ।", health: "ଚାପମୁକ୍ତ ରହିବା ପାଇଁ ଧ୍ୟାନ କରନ୍ତୁ।", luckyNumber: "9", luckyColor: "ମେରୁନ୍ (Maroon)", advice: "ସମସ୍ତଙ୍କୁ ତୁରନ୍ତ ବିଶ୍ୱାସ କରନ୍ତୁ ନାହିଁ।" }
    },
    "धनु": {
      enName: "Sagittarius",
      hi: { love: "धार्मिक यात्रा या लॉन्ग ड्राइव पर जाने का योग है।", career: "नौकरी में प्रमोशन या स्थान परिवर्तन की संभावना है।", money: "आय के नए स्रोत बनेंगे। आर्थिक स्थिति मजबूत होगी।", health: "स्वास्थ्य अच्छा रहेगा, ऊर्जा बनी रहेगी।", luckyNumber: "3", luckyColor: "पीला (Yellow)", advice: "बड़ों का आशीर्वाद लें।" },
      en: { love: "Chances of a religious trip or a long drive with partner.", career: "Promotion or transfer is likely in your job.", money: "New sources of income will emerge. Financial condition will strengthen.", health: "Health will be good; energy levels will remain high.", luckyNumber: "3", luckyColor: "Yellow", advice: "Seek blessings from elders." },
      or: { love: "ଧାର୍ମିକ ଯାତ୍ରା କିମ୍ବା ଲଙ୍ଗ୍ ଡ୍ରାଇଭ୍ ଯିବାର ଯୋଗ ରହିଛି।", career: "ଚାକିରିରେ ପଦୋନ୍ନତି କିମ୍ବା ସ୍ଥାନ ପରିବର୍ତ୍ତନର ସମ୍ଭାବନା ଅଛି।", money: "ଆୟର ନୂତନ ଉତ୍ସ ସୃଷ୍ଟି ହେବ। ଆର୍ଥିକ ସ୍ଥିତି ଦୃଢ଼ ହେବ।", health: "ସ୍ୱାସ୍ଥ୍ୟ ଭଲ ରହିବ, ଶକ୍ତି ବଜାୟ ରହିବ।", luckyNumber: "3", luckyColor: "ହଳଦିଆ (Yellow)", advice: "ବଡ଼ମାନଙ୍କ ଆଶୀର୍ବାଦ ନିଅନ୍ତୁ।" }
    },
    "मकर": {
      enName: "Capricorn",
      hi: { love: "पारिवारिक जीवन में सामंजस्य बना रहेगा।", career: "मेहनत का पूरा फल मिलेगा। बॉस आपके काम से संतुष्ट रहेंगे।", money: "धन निवेश के लिए समय अनुकूल है। संपत्ति से लाभ हो सकता है।", health: "घुटनों या हड्डियों से जुड़ी समस्या हो सकती है, ध्यान रखें।", luckyNumber: "8", luckyColor: "गहरा नीला (Dark Blue)", advice: "कड़ी मेहनत जारी रखें।" },
      en: { love: "Harmony will prevail in family life.", career: "You will reap full rewards for your hard work. Boss will be satisfied.", money: "Time is favorable for investments. Property gains are likely.", health: "Knee or bone-related issues might arise; take precautions.", luckyNumber: "8", luckyColor: "Dark Blue", advice: "Continue working hard with dedication." },
      or: { love: "ପାର୍ବାରିକ ଜୀବନରେ ସାମଞ୍ଜସ୍ୟ ବଜାୟ ରହିବ।", career: " ପରିଶ୍ରମର ପୂର୍ଣ୍ଣ ଫଳ ମିଳିବ। ବସ୍ ଆପଣଙ୍କ କାମରେ ସନ୍ତୁଷ୍ଟ ରହିବେ।", money: "ଧନ ନିବେଶ ପାଇଁ ସମୟ ଅନୁକୂଳ ଅଛି। ସମ୍ପତ୍ତିରୁ ଲାଭ ମିଳିପାରେ।", health: "ଆଣ୍ଠୁ କିମ୍ବା ହାଡ଼ ସମସ୍ୟା ହୋଇପାରେ, ଯତ୍ନ ନିଅନ୍ତୁ।", luckyNumber: "8", luckyColor: "ଗାଢ଼ ନୀଳ (Dark Blue)", advice: "କଠିନ ପରିଶ୍ରମ ଜାରି ରଖନ୍ତୁ।" }
    },
    "कुंभ": {
      enName: "Aquarius",
      hi: { love: "मित्रों का सहयोग मिलेगा। प्रेम संबंधों में प्रगाढ़ता आएगी।", career: "नई तकनीक या आइडिया पर काम करने का अवसर मिलेगा।", money: "अचानक खर्चे सामने आ सकते हैं, बजट का ध्यान रखें।", health: "मानसिक रूप से तरोताजा महसूस करेंगे।", luckyNumber: "4", luckyColor: "आसमानी (Sky Blue)", advice: "नया सीखने का प्रयास करें।" },
      en: { love: "Support from friends will be helpful. Intimacy in love will increase.", career: "Opportunity to work on new technology or innovative ideas.", money: "Sudden expenses may pop up; keep an eye on your budget.", health: "You will feel mentally refreshed and active.", luckyNumber: "4", luckyColor: "Sky Blue", advice: "Always keep trying to learn new things." },
      or: { love: "ବନ୍ଧୁମାନଙ୍କର ସହଯୋଗ ମିଳିବ। ପ୍ରେମ ସମ୍ପର୍କରେ ଘନିଷ୍ଠତା ବୃଦ୍ଧି ପାଇବ।", career: "ନୂତନ ପ୍ରଯୁକ୍ତିବିଦ୍ୟା କିମ୍ବା ବିଚାରରେ କାର୍ଯ୍ୟ କରିବାର ସୁଯୋଗ ମିଳିବ।", money: "ଅତର୍କିତ ଖର୍ଚ୍ଚ ସାମ୍ନାକୁ ଆସିପାରେ, ବଜେଟ୍ ପ୍ରତି ଧ୍ୟାନ ଦିଅନ୍ତୁ।", health: "ମାନସିକ ଭାବରେ ସତେଜ ଅନୁଭବ କରିବେ।", luckyNumber: "4", luckyColor: "ଆକାଶ ନୀଳ (Sky Blue)", advice: "କିଛି ନୂଆ ଶିଖିବା ପାଇଁ ଚେଷ୍ଟା କରନ୍ତୁ।" }
    },
    "मीन": {
      enName: "Pisces",
      hi: { love: "रोमांस के लिहाज से दिन बहुत अच्छा है। पार्टनर से सरप्राइज मिल सकता है।", career: "कला और संगीत से जुड़े लोगों को मंच मिलेगा।", money: "आर्थिक स्थिति स्थिर रहेगी। रुका हुआ धन मिल सकता है।", health: "पानी खूब पिएं, त्वचा का ख्याल रखें।", luckyNumber: "3", luckyColor: "पीला (Yellow)", advice: "दूसरों की मदद करने के लिए आगे आएं।" },
      en: { love: "Great day for romance. You might receive a surprise from your partner.", career: "Artists and people in media/music will get a good platform.", money: "Financial status will remain stable. Stuck funds may recover.", health: "Drink plenty of water and take care of your skin.", luckyNumber: "3", luckyColor: "Yellow", advice: "Step forward to help others." },
      or: { love: "ରୋମାନ୍ସ ଦୃଷ୍ଟିରୁ ଦିନଟି ବହୁତ ଭଲ ଅଛି। ସାଥୀଙ୍କଠାରୁ ସରପ୍ରାଇଜ୍ ମିଳିପାରେ।", career: "କଳା ଏବଂ ସଙ୍ଗୀତରେ ଜଡିତ ବ୍ୟକ୍ତିମାନେ ମଞ୍ଚ ପାଇବେ।", money: "ଆର୍ଥିକ ସ୍ଥିତି ସ୍ଥିର ରହିବ। ଅଟକି ରହିଥିବା ଟଙ୍କା ମିଳିପାରେ।", health: "ପାଣି ପ୍ରଚୁର ପରିମାଣରେ ପିଅନ୍ତୁ, ଚର୍ମର ଯତ୍ନ ନିଅନ୍ତୁ।", luckyNumber: "3", luckyColor: "ହଳଦିଆ (Yellow)", advice: "ଅନ୍ୟମାନଙ୍କୁ ସାହାଯ୍ୟ କରିବା ପାଇଁ ଆଗକୁ ଆସନ୍ତୁ।" }
    }
  }
};

// Helper: Get English name from Hindi rashi key
function getEnglishName(hindiRashi) {
  return appData.predictions[hindiRashi]?.enName || "";
}

// --- Initialize App on Load ---
document.addEventListener("DOMContentLoaded", () => {
  updateTodayDate();
  
  // Attach card click event listeners
  document.querySelectorAll('.rashi-card').forEach(card => {
    card.addEventListener('click', () => {
      const rashi = card.getAttribute('data-rashi');
      showRashi(rashi);
    });
  });
});

// --- 2. PLACE IN YOUR CORE FUNCTIONS SECTION ---
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('astroseek_lang', lang);
    updateUI();
}

function updateUI() {
    const t = translations[currentLang];
    
    // Update static DOM texts safely (match your HTML element IDs)
    if(document.getElementById('appTitle')) document.getElementById('appTitle').innerText = t.title;
    if(document.getElementById('appSubtitle')) document.getElementById('appSubtitle').innerText = t.subtitle;
    if(document.getElementById('todayHeading')) document.getElementById('todayHeading').innerText = t.todayRashifal;
    if(document.getElementById('pwaText')) document.getElementById('pwaText').innerText = t.installApp;
    if(document.getElementById('pwaBtn')) document.getElementById('pwaBtn').innerText = t.installBtn;
    
    // Refresh your Rashi grid dynamically
    if(typeof renderRashiGrid === 'function') renderRashiGrid();
}

async function fetchRashifal(rashiId) {
    const apiLangMap = { en: 'en', hi: 'hi', or: 'or', bn: 'bn' };
    const requestLang = apiLangMap[currentLang] || 'en';

    try {
        const response = await fetch(`https://api.astroseek.solutions/v1/horoscope?rashi=${rashiId}&lang=${requestLang}`);
        const data = await response.json();
        return data.prediction;
    } catch (error) {
        console.error("Error fetching horoscope:", error);
        return currentLang === 'bn' ? "দুঃখিত, তথ্য লোড করতে সমস্যা হচ্ছে।" : "Error loading data.";
    }
}


// --- Dynamic Date Formatter ---
function updateTodayDate() {
  const dateEl = document.getElementById("todayDate");
  if (!dateEl) return;
  
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
  let locale = 'hi-IN';
  if (appData.currentLang === 'en') locale = 'en-US';
  if (appData.currentLang === 'or') locale = 'or-IN';
  
  try {
    dateEl.textContent = now.toLocaleDateString(locale, options);
  } catch (e) {
    dateEl.textContent = now.toDateString();
  }
}

// --- Language Switcher ---
function setLanguage(lang) {
  appData.currentLang = lang;
  const t = appData.translations[lang];
  if (!t) return;

  // Update UI Elements
  const headerSub = document.querySelector(".header p");
  if (headerSub) headerSub.textContent = t.subHeader;

  const zodiacHeading = document.getElementById("zodiacHeading");
  if (zodiacHeading) zodiacHeading.textContent = t.zodiacHeading;

  const finderTitle = document.getElementById("finderTitle");
  if (finderTitle) finderTitle.textContent = t.finderTitle;

  const tabNameBtn = document.getElementById("tabNameBtn");
  if (tabNameBtn) tabNameBtn.textContent = t.tabName;

  const tabDobBtn = document.getElementById("tabDobBtn");
  if (tabDobBtn) tabDobBtn.textContent = t.tabDob;

  const userNameInput = document.getElementById("userNameInput");
  if (userNameInput) userNameInput.placeholder = t.namePlaceholder;

  // Update search buttons text to "Search" for all languages
  document.querySelectorAll('button[onclick="findRashiByName()"], button[onclick="findRashiByDob()"]').forEach(btn => {
    btn.textContent = t.findBtn;
  });

  const installPrompt = document.getElementById("installPrompt");
  if (installPrompt) {
    installPrompt.innerHTML = `${t.installText} <a id="installLink" href="install.html">${t.installLink}</a>`;
  }

  // Update prediction items headers if a rashi is selected
  if (appData.selectedRashi) {
    showRashi(appData.selectedRashi);
  }

  updateTodayDate();
}

// --- Finder Tab Switcher ---
function switchFinderTab(tab) {
  const nameBox = document.getElementById("nameFinderBox");
  const dobBox = document.getElementById("dobFinderBox");
  const nameBtn = document.getElementById("tabNameBtn");
  const dobBtn = document.getElementById("tabDobBtn");

  if (tab === 'name') {
    nameBox.classList.remove("hidden");
    dobBox.classList.add("hidden");
    nameBtn.style.background = "var(--panel-light)";
    nameBtn.style.color = "var(--gold)";
    nameBtn.style.borderColor = "var(--gold)";
    dobBtn.style.background = "var(--panel)";
    dobBtn.style.color = "var(--muted)";
    dobBtn.style.borderColor = "var(--border)";
  } else {
    dobBox.classList.remove("hidden");
    nameBox.classList.add("hidden");
    dobBtn.style.background = "var(--panel-light)";
    dobBtn.style.color = "var(--gold)";
    dobBtn.style.borderColor = "var(--gold)";
    nameBtn.style.background = "var(--panel)";
    nameBtn.style.color = "var(--muted)";
    nameBtn.style.borderColor = "var(--border)";
  }
}

// --- Rashi Finder by First Letter ---
function findRashiByName() {
  const input = document.getElementById("userNameInput").value.trim().toLowerCase();
  const msgEl = document.getElementById("nameResultMsg");
  const t = appData.translations[appData.currentLang];

  if (!input) {
    msgEl.textContent = t.nameNotFound;
    return;
  }

  const firstLetter = input[0];
  let matchedRashi = null;

  const letterToRashiEn = {
    'a': 'मेष', 'b': 'वृषभ', 'c': 'मिथुन', 'd': 'कर्क', 'e': 'सिंह',
    'f': 'कन्या', 'g': 'तुला', 'h': 'वृश्चिक', 'i': 'धनु', 'j': 'मकर',
    'k': 'कुंभ', 'l': 'मीन', 'm': 'मेष', 'n': 'वृषभ', 'o': 'मिथुन',
    'p': 'कर्क', 'q': 'सिंह', 'r': 'कन्या', 's': 'तुला', 't': 'वृश्चिक',
    'u': 'धनु', 'v': 'मकर', 'w': 'कुंभ', 'x': 'मीन', 'y': 'मेष', 'z': 'वृषभ'
  };

  matchedRashi = letterToRashiEn[firstLetter] || 'मेष';

  msgEl.textContent = t.rashiFoundMsg(matchedRashi);
  showRashi(matchedRashi);
}

// --- Rashi Finder by Date of Birth ---
function findRashiByDob() {
  const dobVal = document.getElementById("userDobInput").value;
  const msgEl = document.getElementById("dobResultMsg");
  const t = appData.translations[appData.currentLang];

  if (!dobVal) {
    msgEl.textContent = t.dobNotFound;
    return;
  }

  const date = new Date(dobVal);
  const month = date.getMonth() + 1;
  const day = date.getDate();

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

// --- Display Selected Rashi Prediction ---
function showRashi(rashiName) {
  appData.selectedRashi = rashiName;
  const lang = appData.currentLang;
  const rashiObj = appData.predictions[rashiName];

  if (!rashiObj) return;

  const data = rashiObj[lang] || rashiObj['hi'];

  // Highlight active card
  document.querySelectorAll('.rashi-card').forEach(card => {
    if (card.getAttribute('data-rashi') === rashiName) {
      card.classList.add('selected');
    } else {
      card.classList.remove('selected');
    }
  });

  // Populate content
  const titleDisplay = lang === 'en' 
    ? `${rashiName} (${rashiObj.enName}) - Horoscope` 
    : `${rashiName} (${rashiObj.enName}) राशिफल`;

  document.getElementById("rashiTitle").textContent = titleDisplay;
  document.getElementById("love").textContent = data.love;
  document.getElementById("career").textContent = data.career;
  document.getElementById("money").textContent = data.money;
  document.getElementById("health").textContent = data.health;
  document.getElementById("luckyNumber").textContent = data.luckyNumber;
  document.getElementById("luckyColor").textContent = data.luckyColor;
  document.getElementById("advice").textContent = data.advice;

  // Show prediction box and scroll smoothly to it
  const predSection = document.getElementById("prediction");
  predSection.classList.remove("hidden");
  predSection.scrollIntoView({ behavior: 'smooth' });
}

// --- 3. PLACE AT THE BOTTOM OF SCRIPT.JS ---
document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.value = currentLang;
    }
    updateUI();
});

