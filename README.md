# Avenor — Website + Admin Dashboard

## Isi folder
- `index.html` — halaman utama Avenor (landing page + form booking). Kontennya diambil dari Firestore.
- `admin-login.html` — halaman login admin (Firebase Auth).
- `admin-dashboard.html` — dashboard untuk edit semua teks/konten di `index.html`, plus lihat daftar booking yang masuk.
- `firebase-config.js` — **wajib diisi** dengan config project Firebase Anda.
- `site-content.js` — skema data & fungsi bantu (jangan diedit kecuali tahu betul).

## Cara Setup

### 1. Buat project Firebase
1. Buka https://console.firebase.google.com → **Add project**.
2. Setelah project dibuat, klik ikon **`</>`** untuk mendaftarkan Web App, beri nickname bebas.
3. Firebase akan menampilkan blok `firebaseConfig` — copy semua isinya.
4. Paste ke file `firebase-config.js`, gantikan bagian `GANTI_DENGAN_...`.

### 2. Aktifkan Firestore
1. Sidebar **Build → Firestore Database → Create database**.
2. Pilih lokasi (mis. `asia-southeast2`), mode **test** dulu (lebih mudah untuk mulai).
3. Setelah semuanya berjalan, atur **Security Rules** agar collection `avenor_content` hanya bisa ditulis oleh admin yang login, dan `avenor_leads` bisa ditulis publik (dari form) tapi hanya dibaca admin. Contoh rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /avenor_content/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /avenor_leads/{docId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

### 3. Aktifkan Authentication
1. Sidebar **Build → Authentication → Get started**.
2. Tab **Sign-in method** → aktifkan **Email/Password**.
3. Tab **Users → Add user** → buat 1 akun admin (email + password) untuk login ke dashboard.

### 4. Hosting
File-file ini adalah HTML statis biasa, bisa dihosting di mana saja: Firebase Hosting, Netlify, Vercel, atau server sendiri. Pastikan semua file (index.html, admin-login.html, admin-dashboard.html, firebase-config.js, site-content.js) berada dalam satu folder yang sama.

Contoh pakai Firebase Hosting:
```
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### 5. Akses
- Website publik: buka `index.html`
- Login admin: buka `admin-login.html`, masuk dengan akun yang dibuat di langkah 3
- Setelah login, edit konten di dashboard lalu klik **Simpan Perubahan** — perubahan langsung tampil di `index.html` (refresh halaman untuk melihatnya)

## Catatan
- Selama `firebase-config.js` belum diisi config asli, `index.html` tetap tampil normal (pakai konten default), tapi form booking dan dashboard admin tidak akan berfungsi.
- Booking yang masuk dari form konsultasi tersimpan di collection Firestore `avenor_leads`, bisa dilihat di tab **Booking Masuk** pada dashboard.
