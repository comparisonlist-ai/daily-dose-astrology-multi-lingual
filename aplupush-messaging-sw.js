importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

// Initialize Aplu
const apluPushConfig = {
    apiKey: "AIzaSyAre6jhQ0LCfLokttDGgx1lmX30GCu8f6U",
	authDomain: "aplu-a3.firebaseapp.com",
	projectId: "aplu-a3",
	storageBucket: "aplu-a3.firebasestorage.app",
	messagingSenderId: "265977693248",
	appId: "1:265977693248:web:a51ea26a0dd1cf65120ba5"
};

try {
    importScripts('https://push.aplu.io/import-aplu-messaging.js');
} catch (err) {
    console.warn("Couldn't load aplu-script, falling back: ", err);
}