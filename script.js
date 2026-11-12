const WORKER_URL = "https://daily-rashifal-app.comparisonlist.workers.dev";
let cachedRashifalData = [];

// पेज लोड होते ही डेटा फेच करें
document.addEventListener("DOMContentLoaded", () => {
    fetchAndStoreData();
});

async function fetchAndStoreData() {
    try {
        const response = await fetch(`${WORKER_URL}?lang=hi`);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const result = await response.json();

        if (result.success && result.data && Array.isArray(result.data.rashifal)) {
            cachedRashifalData = result.data.rashifal;
            
            // डिफ़ॉल्ट रूप से पहली राशि (मेष / rashi_index: 0) को स्क्रीन पर दिखाएँ
            renderRashiByIndex(0);
        } else {
            console.error("Invalid JSON structure");
        }
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

// जब आप किसी भी राशि के बटन पर क्लिक करेंगे, यह फंक्शन चलेगा
function selectRashi(rashiIndex) {
    renderRashiByIndex(rashiIndex);
}

// स्क्रीन पर डेटा रेंडर करने का फंक्शन
function renderRashiByIndex(index) {
    const matched = cachedRashifalData.find(r => r.rashi_index === index);
    if (!matched) return;

    const p = matched.predictions_hi || {};
    const lucky = matched.lucky || {};

    // आपके HTML में परिणाम दिखाने के लिए जो भी कंटेनर हो (जैसे #result-container या नया डिव), उसमें डेटा भरें
    let container = document.getElementById("result-container");
    
    if (container) {
        container.innerHTML = `
            <div style="background: #ffffff; color: #0f172a; padding: 24px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin-top: 20px;">
                <h3 style="color: #7c3aed; margin-bottom: 12px; font-size: 20px;">
                    ${matched.rashi_hi} (${matched.rashi_en}) 
                    <span style="font-size: 14px; background: #fef3c7; color: #d97706; padding: 4px 10px; border-radius: 10px; float: right;">⭐ ${p.stars_label || 'शुभ'}</span>
                </h3>
                
                <p style="margin-bottom: 12px; line-height: 1.6;"><strong>सार (Overview):</strong> ${p.overall}</p>
                
                <div style="margin-top: 10px; font-size: 14px; line-height: 1.5;">
                    <p style="margin-bottom: 6px;">💼 <strong>करियर:</strong> ${p.career}</p>
                    <p style="margin-bottom: 6px;">❤️ <strong>प्रेम:</strong> ${p.love}</p>
                    <p style="margin-bottom: 6px;">💰 <strong>आर्थिक:</strong> ${p.finance}</p>
                    <p style="margin-bottom: 6px;">🌿 <strong>स्वास्थ्य:</strong> ${p.health}</p>
                </div>

                <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b;">
                    🔢 <strong>लकी नंबर:</strong> ${lucky.number} | 🎨 <strong>रंग:</strong> ${Array.isArray(lucky.colors) ? lucky.colors.join(', ') : lucky.colors}
                </div>
            </div>
        `;
    }
}
