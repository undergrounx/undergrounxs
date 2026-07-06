// ============================================================
// FIREBASE CONFIG — GANTI dengan config dari project Firebase Anda
// Firebase Console > Project Settings > General > Your apps > SDK setup
// ============================================================
const firebaseConfig = {
  apiKey: "GANTI_DENGAN_API_KEY",
  authDomain: "GANTI_DENGAN_AUTH_DOMAIN",
  projectId: "GANTI_DENGAN_PROJECT_ID",
  storageBucket: "GANTI_DENGAN_STORAGE_BUCKET",
  messagingSenderId: "GANTI_DENGAN_SENDER_ID",
  appId: "GANTI_DENGAN_APP_ID"
};

// Jangan ubah baris di bawah ini
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
