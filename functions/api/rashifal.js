// Inside your main initialization function or page load event in script.js
async function loadDailyHoroscope() {
  let titleDisplay = "";

  // 👉 PUT THE FETCH BLOCK RIGHT HERE IN script.js
  try {
    const response = await fetch(`/api/horoscope`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    // Assign your fresh API data to your variables
    titleDisplay = data.title; 
    
    // Update your DOM elements here with the live data
    // document.getElementById('title-element').innerText = titleDisplay;

  } catch (error) {
    console.error("Failed to fetch from GrahaApi:", error);
    
    // If the fetch fails, your code will safely fall back to 
    // your old prefilled static data here instead of breaking
  }
}

// Call the function when your app loads
loadDailyHoroscope();
