let rashis = [];
const GLYPHS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

function render(list) {
  const box = document.getElementById('result-container');
  if (!list.length) { box.innerHTML = '<div class="loading">No rashi found.</div>'; return; }
  box.innerHTML = list.map((r, i) => `
    <div class="rashi-card" style="animation-delay:${i * 50}ms" onclick="toggleCard(this)">
      <div class="card-header">
        <div class="card-head-left">
          <div class="glyph">${GLYPHS[rashis.indexOf(r)]}</div>
          <div class="card-title">${esc(r.name)}<span>${esc(r.hindi)}</span></div>
        </div>
        <div class="symbol-pill">${esc(r.symbol)}</div>
      </div>
      <div class="meta-info">
        <span>Lucky color: ${esc(r.luckyColor)}</span>
        <span>Lucky no: ${esc(r.luckyNumber)}</span>
      </div>
      <p class="prediction-preview">${esc(r.summary)}</p>
      <div class="expanded-details">
        <div class="detail-section"><label>Love</label><p>${esc(r.love)}</p></div>
        <div class="detail-section"><label>Career</label><p>${esc(r.career)}</p></div>
        <div class="detail-section"><label>Health</label><p>${esc(r.health)}</p></div>
      </div>
      <span class="click-hint">Tap for details</span>
    </div>`).join('');
}

function toggleCard(el) {
  const d = el.querySelector('.expanded-details');
  d.style.display = d.style.display === 'block' ? 'none' : 'block';
}

function filterHoroscope() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  render(rashis.filter(r => (r.name + ' ' + r.hindi).toLowerCase().includes(q)));
}

(async function init() {
  try {
    const res = await fetch('/today.json?' + Date.now(), { cache: 'no-store' });
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    rashis = data.rashis;
    const badge = document.getElementById('loading-date');
    badge.textContent = data.date + ' · Moon in ' + data.moonRashi;
    badge.style.display = 'inline-block';
    render(rashis);
  } catch (err) {
    document.getElementById('result-container').innerHTML =
      '<div class="loading">Could not load: ' + err.message + '</div>';
  }
})();

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');
