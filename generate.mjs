import * as A from 'astronomy-engine';
import fs from 'fs';

const AYANAMSA = 23.857;
const SYMBOLS = ['Ram','Bull','Twins','Crab','Lion','Maiden','Scales','Scorpion','Archer','Goat','Water Bearer','Fish'];

const L = {
en:{
 names:['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'],
 colors:['Red','Green','Yellow','White','Orange','Blue','Pink','Maroon','Gold','Black','Sky Blue','Sea Green'],
 summary:['A day to focus on yourself. Confidence is high, but watch your temper.','Money and family talks take centre stage. Speak kindly.','Good day for communication, short trips and meeting siblings or friends.','Home and emotions come first. Rest and spend time with loved ones.','Creativity and romance are favoured. Children or studies bring joy.','Routine work and health need care. Avoid conflicts at work.','Partnerships and agreements go well. Listen before you decide.','Be careful with sudden expenses and sensitive topics. Stay patient.','Luck supports you. Learning, travel and elders bring benefit.','Career and reputation are in focus. Your effort gets noticed.','Gains from friends and networks. A wish may move forward.','Quiet, reflective day. Rest, prayer and private time help.'],
 love:['Warm words go a long way.','Avoid assumptions with your partner.','A small gesture brings you closer.'],
 career:['Finish pending tasks first.','Teamwork brings results.','Stay patient with seniors.'],
 health:['Drink enough water.','Take short walks and rest well.','Keep meals light today.']},
hi:{
 names:['मेष','वृषभ','मिथुन','कर्क','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुंभ','मीन'],
 colors:['लाल','हरा','पीला','सफ़ेद','नारंगी','नीला','गुलाबी','मरून','सुनहरा','काला','आसमानी','समुद्री हरा'],
 summary:['आज खुद पर ध्यान दें। आत्मविश्वास ऊँचा रहेगा, पर गुस्से पर काबू रखें।','धन और परिवार की बातें आज केंद्र में रहेंगी। मधुरता से बोलें।','बातचीत, छोटी यात्रा और मित्रों-भाई-बहनों से मिलने के लिए अच्छा दिन।','घर और भावनाएँ पहले आएँगी। अपनों के साथ समय बिताएँ।','रचनात्मकता और प्रेम के लिए अनुकूल दिन। संतान या पढ़ाई से खुशी मिलेगी।','रोज़मर्रा के काम और सेहत का ध्यान रखें। कार्यस्थल पर विवाद से बचें।','साझेदारी और समझौते अच्छे रहेंगे। निर्णय से पहले सुनें।','अचानक खर्च और संवेदनशील विषयों से सावधान रहें। धैर्य रखें।','भाग्य साथ देगा। शिक्षा, यात्रा और बड़ों से लाभ मिलेगा।','करियर और प्रतिष्ठा पर ध्यान रहेगा। आपकी मेहनत नज़र में आएगी।','मित्रों और संपर्कों से लाभ। कोई इच्छा आगे बढ़ सकती है।','शांत और चिंतन भरा दिन। आराम, प्रार्थना और एकांत लाभदायक रहेंगे।'],
 love:['मीठे बोल बहुत असर करते हैं।','साथी के बारे में अनुमान न लगाएँ।','एक छोटा सा इशारा आपको करीब लाएगा।'],
 career:['पहले लंबित काम निपटाएँ।','टीमवर्क से नतीजे मिलेंगे।','वरिष्ठों के साथ धैर्य रखें।'],
 health:['पर्याप्त पानी पिएँ।','थोड़ा टहलें और अच्छी तरह आराम करें।','आज हल्का भोजन करें।']},
bn:{
 names:['মেষ','বৃষ','মিথুন','কর্কট','সিংহ','কন্যা','তুলা','বৃশ্চিক','ধনু','মকর','কুম্ভ','মীন'],
 colors:['লাল','সবুজ','হলুদ','সাদা','কমলা','নীল','গোলাপি','মেরুন','সোনালি','কালো','আকাশি','সামুদ্রিক সবুজ'],
 summary:['আজ নিজের দিকে মনোযোগ দিন। আত্মবিশ্বাস থাকবে, তবে মেজাজ সামলে রাখুন।','আজ অর্থ ও পরিবার নিয়ে আলোচনা হতে পারে। মধুর ভাবে কথা বলুন।','যোগাযোগ, ছোট ভ্রমণ এবং বন্ধু বা ভাইবোনের সঙ্গে দেখা করার জন্য ভালো দিন।','আজ ঘর ও মনের শান্তি আগে। প্রিয়জনদের সঙ্গে সময় কাটান।','সৃজনশীলতা ও প্রেমের জন্য অনুকূল দিন। সন্তান বা পড়াশোনায় আনন্দ মিলবে।','নিয়মিত কাজ ও স্বাস্থ্যে যত্ন নিন। কর্মক্ষেত্রে ঝগড়া এড়িয়ে চলুন।','অংশীদারি ও চুক্তিতে সাফল্য আসবে। সিদ্ধান্তের আগে অন্যের কথা শুনুন।','হঠাৎ খরচ ও স্পর্শকাতর বিষয় নিয়ে সতর্ক থাকুন। ধৈর্য রাখুন।','ভাগ্য আজ সহায়। শিক্ষা, ভ্রমণ ও বড়দের কাছ থেকে উপকার পাবেন।','কর্ম ও সুনামের দিকে নজর দিন। আপনার পরিশ্রম নজরে আসবে।','বন্ধু ও পরিচিতদের কাছ থেকে লাভ হবে। কোনো ইচ্ছা পূরণের পথে এগোতে পারে।','শান্ত ও আত্মমগ্ন একটি দিন। বিশ্রাম, প্রার্থনা ও নিজের সময় কাজে দেবে।'],
 love:['মিষ্টি কথায় অনেক কিছু হয়।','সঙ্গীর সম্পর্কে ধারণা করে নেবেন না।','ছোট্ট একটি উপহার বা কথা কাছে আনবে।'],
 career:['আগে অসমাপ্ত কাজগুলো শেষ করুন।','দলগত কাজে সাফল্য আসবে।','ঊর্ধ্বতনদের সঙ্গে ধৈর্য রাখুন।'],
 health:['পর্যাপ্ত জল পান করুন।','অল্প হাঁটুন এবং ভালো করে বিশ্রাম নিন।','আজ হালকা খাবার খান।']},
or:{
 names:['ମେଷ','ବୃଷ','ମିଥୁନ','କର୍କଟ','ସିଂହ','କନ୍ୟା','ତୁଳା','ବୃଶ୍ଚିକ','ଧନୁ','ମକର','କୁମ୍ଭ','ମୀନ'],
 colors:['ଲାଲ','ସବୁଜ','ହଳଦିଆ','ଧଳା','କମଳା','ନୀଳ','ଗୋଲାପୀ','ମାରୁନ୍','ସୁନେଲି','କଳା','ଆକାଶୀ','ସମୁଦ୍ର ସବୁଜ'],
 summary:['ଆଜି ନିଜ
