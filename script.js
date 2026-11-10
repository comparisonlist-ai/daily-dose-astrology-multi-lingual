
<div id="horoscope-container">
  <p>Loading horoscopes...</p>
</div>

<!-- Paste JavaScript right here -->
<script>
  async function loadHoroscopes() {
    try {
      const response = await fetch('https://risonlist.workers.dev');
      const result = await response.json();
      
      if (!result.success || !result.data || !result.data.rashifal) {
        document.getElementById('horoscope-container').innerHTML = '<p>Failed to load data.</p>';
        return;
      }
      
      const container = document.getElementById('horoscope-container');
      container.innerHTML = '';

      result.data.rashifal.forEach(item => {
        const card = document.createElement('div');
        card.className = 'rashi-card';
        card.style.cssText = 'border: 1px solid #e2e8f0; padding: 20px; margin-bottom: 20px; border-radius: 8px; background: #fff;';
        
        card.innerHTML = `
          <h2>${item.rashi_en} (${item.rashi_hi}) &mdash; Symbol: ${item.symbol}</h2>
          <p><strong>Lord:</strong> ${item.rashi_lord} | <strong>Day:</strong> ${item.day} | <strong>Color:</strong> ${item.colors}</p>
          <p><strong>Mantra:</strong> ${item.mantra}</p>
          <p><strong>Auspicious Hours:</strong> ${item.auspicious_hours}</p>
          <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 15px 0;">
          
          <h3>English Predictions</h3>
          <p><strong>Overall:</strong> ${item.predictions.en.overall}</p>
          <p><strong>Career:</strong> ${item.predictions.en.career}</p>
          <p><strong>Health:</strong> ${item.predictions.en.health}</p>
          <p><strong>Finance:</strong> ${item.predictions.en.finance}</p>
          <p><strong>Love:</strong> ${item.predictions.en.love}</p>
          <p><strong>Spirit:</strong> ${item.predictions.en.spirit}</p>
          
          <h3 style="margin-top: 15px;">Hindi Predictions</h3>
          <p><strong>Overall:</strong> ${item.predictions.hi.overall}</p>
          <p><strong>Career:</strong> ${item.predictions.hi.career}</p>
          <p><strong>Health:</strong> ${item.predictions.hi.health}</p>
          <p><strong>Finance:</strong> ${item.predictions.hi.finance}</p>
          <p><strong>Love:</strong> ${item.predictions.hi.love}</p>
          <p><strong>Spirit:</strong> ${item.predictions.hi.spirit}</p>
        `;
        container.appendChild(card);
      });
    } catch (error) {
      console.error('Error fetching horoscopes:', error);
      document.getElementById('horoscope-container').innerHTML = '<p>Error loading horoscope content.</p>';
    }
  }

  loadHoroscopes();
</script>

</body>
