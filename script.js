const WORKER_URL = "https://daily-rashifal-app.comparisonlist.workers.dev";
let allRashifalData = [];

// Fetch data on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchRashifalData();
});

async function fetchRashifalData() {
    const container = document.getElementById("result-container");
    const dateBadge = document.getElementById("loading-date");

    try {
        const response = await fetch(`${WORKER_URL}?lang=hi`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Validate response structure
        if (result.success && result.data && Array.isArray(result.data.rashifal)) {
            allRashifalData = result.data.rashifal;
            
            // Set date banner
            if (result.data.date) {
                dateBadge.innerText = `📅 दिनांक / Date: ${result.data.date}`;
            } else {
                dateBadge.innerText = `📅 Daily Planetary Insights`;
            }

            // Render all cards
            renderCards(allRashifalData);
        } else {
            container.innerHTML = `<div class="loading" style="color: #ef4444;">डेटा संरचना मेल नहीं खाती। (Invalid Data Structure)</div>`;
        }
    } catch (err) {
        console.error("Fetch error:", err);
        container.innerHTML = `<div class="loading" style="color: #ef4444;">सर्वर से संपर्क करने में असमर्थ। कृपया बाद में प्रयास करें।</div>`;
    }
}

function renderCards(dataList) {
    const container = document.getElementById("result-container");
    
    if (dataList.length === 0) {
        container.innerHTML = `<div class="loading">कोई परिणाम नहीं मिला (No matching Rashi found)</div>`;
        return;
    }

    container.innerHTML = dataList.map((item) => {
        const p = item.predictions_hi || {};
        const lucky = item.lucky || {};
        const colorsStr = Array.isArray(lucky.colors) ? lucky.colors.join(', ') : (lucky.colors || '');

        return `
            <div class="rashi-card" onclick="toggleCard(this)">
                <div class="card-header">
                    <div class="card-title">${item.rashi_hi} <span>(${item.rashi_en})</span></div>
                    <div class="symbol-pill">⭐ ${p.stars_label || 'शुभ'}</div>
                </div>

                <div class="meta-info">
                    <span>lord: ${item.rashi_lord}</span>
                    <span>Lucky No: ${lucky.number}</span>
                </div>

                <div class="prediction-preview">
                    <strong>सार:</strong> ${p.overall || ''}
                </div>

                <div class="expanded-details">
                    <div class="detail-section">
                        <label>💼 करियर (Career)</label>
                        <p>${p.career || 'N/A'}</p>
                    </div>

                    <div class="detail-section">
                        <label>❤️ प्रेम व संबंध (Love)</label>
                        <p>${p.love || 'N/A'}</p>
                    </div>

                    <div class="detail-section">
                        <label>💰 आर्थिक स्थिति (Finance)</label>
                        <p>${p.finance || 'N/A'}</p>
                    </div>

                    <div class="detail-section">
                        <label>🌿 स्वास्थ्य (Health)</label>
                        <p>${p.health || 'N/A'}</p>
                    </div>

                    <div class="detail-section" style="background: #f8fafc; padding: 10px; border-radius: 8px; margin-top: 10px;">
                        <label>✨ लकी विवरण (Lucky Info)</label>
                        <p><strong>रंग:</strong> ${colorsStr} | <strong>मंत्र:</strong> ${lucky.mantra || 'N/A'}</p>
                    </div>
                </div>

                <span class="click-hint">विस्तार से देखें / Click to expand ▼</span>
            </div>
        `;
    }).join('');
}

// Expand/Collapse individual card interaction
function toggleCard(cardElement) {
    const details = cardElement.querySelector('.expanded-details');
    const hint = cardElement.querySelector('.click-hint');
    
    if (details.style.display === 'block') {
        details.style.display = 'none';
        hint.innerText = 'विस्तार से देखें / Click to expand ▼';
        cardElement.style.borderColor = 'var(--border-color)';
    } else {
        details.style.display = 'block';
        hint.innerText = 'छोटा करें / Click to collapse ▲';
        cardElement.style.borderColor = 'var(--primary)';
    }
}

// Search filter supporting Hindi names, English names, and lords
function filterHoroscope() {
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    
    const filtered = allRashifalData.filter(item => {
        const hi = item.rashi_hi ? item.rashi_hi.toLowerCase() : '';
        const en = item.rashi_en ? item.rashi_en.toLowerCase() : '';
        const lord = item.rashi_lord ? item.rashi_lord.toLowerCase() : '';
        
        return hi.includes(query) || en.includes(query) || lord.includes(query);
    });

    renderCards(filtered);
}
