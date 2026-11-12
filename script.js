const WORKER_URL = "https://daily-rashifal-app.comparisonlist.workers.dev";
let allRashifalData = [];

document.addEventListener("DOMContentLoaded", () => {
    fetchRashifalData();
});

async function fetchRashifalData() {
    const dateBadge = document.getElementById("loading-date");
    // अगर आपकी HTML में date दिखा रहा है
    try {
        const response = await fetch(`${WORKER_URL}?lang=hi`);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const result = await response.json();

        if (result.success && result.data && Array.isArray(result.data.rashifal)) {
            allRashifalData = result.data.rashifal;
            
            if (result.data.date) {
                if (dateBadge) dateBadge.innerText = `📅 दिनांक: ${result.data.date}`;
            }

            // बाय डिफ़ॉल्ट मेष (Aries, index 0) लोड करें या जो भी पसंद हो
            loadRashiDetails(1);
        } else {
            console.error("Invalid data structure from worker");
        }
    } catch (err) {
        console.error("Fetch error:", err);
        if (dateBadge) dateBadge.innerText = "📅 डेटा लोड विफल";
    }
}

// जब यूजर किसी राशि बटन पर क्लिक करे
function selectRashi(rashiNumber, rashiNameHi) {
    loadRashiDetails(rashiNumber);
}

function loadRashiDetails(rashiNumber) {
    // अगर आपके पास मुख्य परिणाम दिखाने के लिए कोई कार्ड/डिव है, तो यहाँ डेटा भरें।
    // चूंकि आपके HTML में राशि बटन ऊपर हैं, हम चाहें तो क्लिक करने पर एक अलर्ट या डायनामिक कार्ड दिखा सकते हैं।
    const matched = allRashifalData.find(r => r.rashi_index === (rashiNumber - 1));
    if (!matched) return;

    const p = matched.predictions_hi || {};
    
    // यदि आपके HTML में कोई परिणाम दिखाने वाला कंटेनर है (जैसे #rashifalContent या इसी तरह), तो उसे अपडेट करें:
    let contentBox = document.getElementById("rashifalContent") || document.getElementById("result-container");
    
    if (contentBox) {
        contentBox.innerHTML = `
            <div style="background: #fff; color: #0f172a; padding: 20px; border-radius: 12px; margin-top: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <h3 style="color: #7c3aed; margin-bottom: 10px;">${matched.rashi_hi} (${matched.rashi_en}) - ⭐ ${p.stars_label || 'शुभ'}</h3>
                <p><strong>सार:</strong> ${p.overall}</p>
                <p style="margin-top: 8px;"><strong>करियर:</strong> ${p.career}</p>
                <p style="margin-top: 8px;"><strong>स्वास्थ्य:</strong> ${p.health}</p>
                <p style="margin-top: 8px;"><strong>आर्थिक:</strong> ${p.finance}</p>
                <p style="margin-top: 8px;"><strong>प्रेम:</strong> ${p.love}</p>
            </div>
        `;
    }
}
