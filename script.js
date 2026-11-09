// --- Language Switcher ---
function changeLanguage(lang) {
  console.log('Language changed to:', lang);
  // Add your translation/localization logic here
}

// --- Tab Switching (Name vs DOB) ---
function switchFinderTab(tab) {
  const nameBtn = document.getElementById('tabNameBtn');
  const dobBtn = document.getElementById('tabDobBtn');
  const nameBox = document.getElementById('nameFinderBox');
  const dobBox = document.getElementById('dobFinderBox');

  if (tab === 'name') {
    nameBtn.style.background = '#f7f3ff';
    nameBtn.style.color = '#6a1b9a';
    nameBtn.style.borderColor = '#6a1b9a';
    
    dobBtn.style.background = '#fff';
    dobBtn.style.color = '#777';
    dobBtn.style.borderColor = '#ccc';

    nameBox.classList.remove('hidden');
    dobBox.classList.add('hidden');
  } else {
    dobBtn.style.background = '#f7f3ff';
    dobBtn.style.color = '#6a1b9a';
    dobBtn.style.borderColor = '#6a1b9a';
    
    nameBtn.style.background = '#fff';
    nameBtn.style.color = '#777';
    nameBtn.style.borderColor = '#ccc';

    dobBox.classList.remove('hidden');
    nameBox.classList.add('hidden');
  }
}

// --- Populate DOB Days on Load ---
document.addEventListener('DOMContentLoaded', () => {
  const daySelect = document.getElementById('dobDay');
  if (daySelect) {
    for (let i = 1; i <= 31; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = i;
      daySelect.appendChild(opt);
    }
  }
});

// --- Find Rashi by Name Placeholder Logic ---
function findRashiByName() {
  const input = document.getElementById('userNameInput').value.trim();
  const msg = document.getElementById('nameResultMsg');
  
  if (!input) {
    msg.style.color = '#d32f2f';
    msg.textContent = 'कृपया नाम दर्ज करें!';
    return;
  }

  msg.style.color = '#2e7d32';
  msg.textContent = `${input} के लिए राशि खोजी जा रही है...`;
  // Add your name-to-rashi calculation logic here
}

// --- Find Rashi by DOB Placeholder Logic ---
function findRashiByDobFriendly() {
  const day = document.getElementById('dobDay').value;
  const month = document.getElementById('dobMonth').value;
  const year = document.getElementById('dobYear').value;
  const msg = document.getElementById('dobResultMsg');

  if (!day || !month || !year) {
    msg.style.color = '#d32f2f';
    msg.textContent = 'कृपया पूरी जन्मतिथि चुनें!';
    return;
  }

  msg.style.color = '#2e7d32';
  msg.textContent = `जन्मतिथि (${day}/${month}/${year}) के अनुसार राशि खोजी जा रही है...`;
  // Add your DOB-to-rashi calculation logic here
}
