// ============================================================
// FIREBASE CONFIG — GANTI dengan config dari project Firebase Anda
// Firebase Console > Project Settings > General > Your apps > SDK setup
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyCdUpqfoOWb2Kjx-XYJ20mxBdBdzCJy90w",
  authDomain: "admin-24115.firebaseapp.com",
  projectId: "admin-24115",
  storageBucket: "admin-24115.firebasestorage.app",
  messagingSenderId: "514207806683",
  appId: "1:514207806683:web:0ec7b4b4e82329394288fe",
  measurementId: "G-BHKVY42DVR"
};

// Jangan ubah baris di bawah ini
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
