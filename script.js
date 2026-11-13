          <div class="detail-section"><label>🌿 स्वास्थ्य</label><p>${esc(p.health)}</p></div>
        </div>

        <span class="click-hint">विवरण देखें ▾</span>
      </div>
    `;
  }).join("");
}

// Expand / collapse a card
function toggleCard(card) {
  const details = card.querySelector(".expanded-details");
  const hint = card.querySelector(".click-hint");
  const isOpen = details.style.display === "block";
  details.style.display = isOpen ? "none" : "block";
  hint.textContent = isOpen ? "विवरण देखें ▾" : "बंद करें ▴";
}

// Called by the search box (onkeyup)
function filterHoroscope() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  if (!q) {
    renderCards(cachedRashifalData);
    return;
  }
  const filtered = cachedRashifalData.filter((r) =>
    String(r.rashi_hi ?? "").toLowerCase().includes(q) ||
    String(r.rashi_en ?? "").toLowerCase().includes(q)
  );
  renderCards(filtered);
}
