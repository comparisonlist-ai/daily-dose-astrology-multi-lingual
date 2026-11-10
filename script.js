const WORKER_URL = "https://daily-rashifal-app.comparisonlist.workers.dev";
let allData = [];

async function loadData() {
  try {
    const response = await fetch(WORKER_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) throw new Error(`Server status ${response.status}`);

    const result = await response.json();
    
    if (Array.isArray(result)) {
      allData = result;
    } else if (result.data && Array.isArray(result.data.rashifal)) {
      allData = result.data.rashifal;
    } else if (result.data && Array.isArray(result.data)) {
      allData = result.data;
    } else {
      throw new Error("Invalid data format");
    }

    if (allData.length > 0) {
      renderCards(allData);
    } else {
      document.getElementById("result-container").innerHTML = "<div class='loading'>No records found.</div>";
    }
  } catch (err) {
    console.error("Fetch error:", err);
    document.getElementById("result-container").innerHTML = "<div class='loading'>Unable to load predictions. Check connection.</div>";
  }
}

function renderCards(dataList) {
  let html = "";
  dataList.forEach((item, index) => {
    const rashiEn = item.rashi_en || item.sign || 'Zodiac';
    const rashiHi = item.rashi_hi || '';
    const symbol = item.symbol || '';
    const lord = item.rashi_lord || '';
    const day = item.day || '';
    const color = item.colors || '';
    const mantra = item.mantra || '';
    
    const enOverall = item.predictions?.en?.overall || item.predictions_en?.overall || 'Details unavailable.';
    const hiOverall = item.predictions?.hi?.overall || item.predictions_hi?.overall || '';

    html += `
      <div class="rashi-card" onclick="toggleCard(${index})" style="cursor: pointer;">
        <h3>${rashiEn} (${rashiHi}) ${symbol ? `- ${symbol}` : ''}</h3>
        <p><strong>Lord:</strong> ${lord} | <strong>Day:</strong> ${day}</p>
        <p><strong>Color:</strong> ${color}</p>
        <div id="details-${index}" style="display: none; margin-top: 10px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
          <p><strong>Mantra:</strong> ${mantra}</p>
          <p><strong>English:</strong> ${enOverall}</p>
          ${hiOverall ? `<p><strong>Hindi:</strong> ${hiOverall}</p>` : ''}
        </div>
      </div>
    `;
  });
  document.getElementById("result-container").innerHTML = html;
}

function toggleCard(index) {
  const details = document.getElementById(`details-${index}`);
  if (details) {
    details.style.display = details.style.display === 'none' ? 'block' : 'none';
  }
}

function filterHoroscope() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  if (!query) {
    renderCards(allData);
    return;
  }
  const filtered = allData.filter(item => {
    const en = (item.rashi_en || item.sign || '').toLowerCase();
    const hi = (item.rashi_hi || '').toLowerCase();
    return en.includes(query) || hi.includes(query);
  });
  renderCards(filtered);
}

loadData();
