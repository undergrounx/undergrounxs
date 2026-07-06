// ============================================================
// FIREBASE CONFIG — GANTI dengan config dari project Firebase Anda
// Firebase Console > Project Settings > General > Your apps > SDK setup
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyBZ63Yx1maOO-dkKwTjyOWXS3NLnvjIPjo",
  authDomain: "avenor-30548.firebaseapp.com",
  projectId: "avenor-30548",
  storageBucket: "avenor-30548.firebasestorage.app",
  messagingSenderId: "193865951588",
  appId: "1:193865951588:web:f0176233e7a579547a7271",
  measurementId: "G-V1XRCQY7ZH"
};

// Jangan ubah baris di bawah ini
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
