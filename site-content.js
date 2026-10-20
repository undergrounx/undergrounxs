// ============================================================
// SITE CONTENT — skema data, default content, dan helper Firestore
// Dipakai oleh index.html (tampil) dan admin-dashboard.html (edit)
// ============================================================

const FIRESTORE_DOC_PATH = { collection: "avenor_content", doc: "site" };

const DEFAULT_CONTENT = {
  theme: {
    bg: "#eeeeee",
    panel: "#ffffff",
    panel2: "#ffffff",
    border: "#e0e0e0",
    text: "#222222",
    muted: "#555555",
    muted2: "#777777",
    green: "#222222",
    greenBright: "#222222",
    greenDeep: "#333333",
    pillBg: "#e5e5e5"
  },
  hero: {
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    titlePre: "Elevate Your Brand with High-Impact ",
    titleAccent: "Short-Form Videos.",
    subtitle: "Kami membantu kreator, founder, dan bisnis mengubah ide menjadi konten TikTok, Reels, dan Shorts yang viral, engaging, dan berkonversi tinggi.",
    trustedLabel: "Dipercaya oleh kreator & brand modern",
    logos: ["⚡ TikTok Viral", "◎ Instagram Reels", "▶ YouTube Shorts", "✦ High Retention", "▲ Fast Pacing", "★ Storytelling"]
  },
  services: {
    eyebrow: "Pilihan Paket",
    titlePre: "Solusi Editing Sesuai Kebutuhan & ",
    titleAccent: "Level Bisnis Anda.",
    subtitle: "Dari konten harian yang konsisten hingga produksi visual tingkat tinggi dengan arahan kreatif mendalam.",
    cards: [
      {
        icon: "⚡",
        title: "BARU GAJIAN",
        desc: "Paket Basic / Entry Level — Cocok untuk personal creator, pemula, dan UMKM yang ingin mulai aktif konsisten bikin konten.",
        price: "Mulai dari",
        priceUnit: "Entry Level",
        features: [
          "Editing video pendek TikTok, Reels & Shorts",
          "Subtitle dinamis & penyesuaian audio jernih",
          "Musik, sound effect (SFX) & transisi seperlunya",
          "Mengikuti konsep / referensi dari klien",
          "Revisi minor hingga pas"
        ],
        cta: "Pilih Paket Baru Gajian"
      },
      {
        icon: "★",
        title: "CEO DADAKAN",
        desc: "Paket Middle / Rekomendasi Utama — Didesain khusus untuk personal branding, kreator konten, dan pengusaha yang butuh retensi tinggi.",
        price: "Paling Populer",
        priceUnit: "Recommended",
        features: [
          "Semua keunggulan paket Baru Gajian",
          "Storytelling & pacing dinamis penahan retensi",
          "Visual Hook 3 detik pertama pencegah scroll-away",
          "Kurasi footage B-roll & penekanan poin penting",
          "Gaya visual disesuaikan dengan personal identity klien"
        ],
        cta: "Pilih Paket CEO Dadakan"
      },
      {
        icon: "👑",
        title: "SUDAH IPO",
        desc: "Paket Premium / High-End — Untuk bisnis mapan, high-value creator, dan korporat yang butuh infrastruktur produksi kelas atas.",
        price: "Custom / Scale",
        priceUnit: "Enterprise",
        features: [
          "Creative direction & storyline mendalam",
          "Branding visual premium & motion graphics custom",
          "Sistem produksi terjadwal untuk batch rutin",
          "Integrasi AI & workflow otomatisasi cepat",
          "Dukungan prioritas & konsultasi strategi konten"
        ],
        cta: "Konsultasi Paket IPO"
      }
    ]
  },
  process: {
    eyebrow: "Alur Kerja",
    titlePre: "Proses Pemesanan & Produksi yang ",
    titleAccent: "Cepat & Rapi.",
    subtitle: "4 langkah mudah dari pengiriman raw footage hingga video siap tayang dan mendatangkan audiens."
  },
  gallery: {
    eyebrow: "Portofolio",
    titlePre: "Karya & Format ",
    titleAccent: "Video Kami.",
    subtitle: "Lihat contoh visual hook, pacing dinamis, dan grading estetik untuk berbagai genre konten vertikal.",
    items: [
      { image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80", title: "Visual Hook & High Retention", category: "TikTok & Reels" },
      { image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80", title: "Personal Branding Creator", category: "Shorts" },
      { image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=800&q=80", title: "Dynamic Sound Design & SFX", category: "Audio Sync" },
      { image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80", title: "Podcast & Talking Head Cut", category: "Interview" },
      { image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80", title: "Product Showcase & Ads", category: "Commercial" },
      { image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80", title: "Cinematic B-Roll & Color", category: "Cinematic" }
    ],
    showcaseGap: 40,
    showcase: {
      image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=1600&q=80",
      label: "Featured Project",
      title: "Cromans Cinematic"
    }
  },
  footer: {
    tagline: "Cromans — Partner editing video short-form terpercaya untuk kreator, personal branding, dan bisnis yang ingin melejit di media sosial.",
    email: "halo@cromans.com",
    address: "Jakarta, Indonesia<br>Available Worldwide Remotely",
    quickLinks: [
      { label: "Home", type: "section", target: "top" },
      { label: "Paket & Harga", type: "section", target: "services" },
      { label: "Portofolio", type: "section", target: "gallery" },
      { label: "Alur Kerja", type: "section", target: "process" }
    ],
    supportLinks: [
      { label: "FAQ", type: "page", target: "faq" },
      { label: "Tentang Kami", type: "page", target: "about-us" },
      { label: "Hubungi Kami", type: "page", target: "contact-us" }
    ],
    copyright: "© 2026 Cromans. All rights reserved"
  },
  pages: {
    "about-us": { title: "Tentang Cromans", blocks: [
      { type: "text", content: "Cromans adalah studio pasca-produksi konten vertikal (TikTok, Instagram Reels, dan YouTube Shorts). Kami fokus pada retensi audiens, hook visual yang kuat, dan storytelling yang membantu kreator serta brand meningkatkan engagement dan konversi penjualan." }
    ]},
    "faq": { title: "FAQ (Pertanyaan Umum)", blocks: [
      { type: "faq", items: [
        { q: "Bagaimana alur pemesanan jasa editing di Cromans?", a: "Pilih paket yang sesuai di halaman utama, klik Order/Pesan, isi form kebutuhan video Anda beserta link footage (Google Drive/Dropbox). Setelah submit, Anda bisa langsung konfirmasi ke WhatsApp kami." },
        { q: "Berapa lama proses pengerjaan 1 video?", a: "Rata-rata 24–48 jam untuk paket Baru Gajian & CEO Dadakan. Untuk paket skala besar atau batch rutin didiskusikan sesuai jadwal tayang Anda." },
        { q: "Bagaimana cara kirim bahan/footage video?", a: "Cukup upload video mentah dan aset ke Google Drive / Dropbox / WeTransfer, lalu lampirkan link-nya pada form pemesanan." },
        { q: "Apakah ada garansi revisi?", a: "Ya! Setiap paket sudah mencakup revisi minor (audio, teks/subtitle, dan pacing) hingga Anda puas dengan hasilnya." }
      ]}
    ]},
    "contact-us": { title: "Hubungi Kami", blocks: [
      { type: "contact", items: [
        { label: "Email", value: "halo@cromans.com" },
        { label: "WhatsApp", value: "+62 812-3456-7890" },
        { label: "Instagram", value: "@cromans.media" }
      ]}
    ]}
  },
  bookingHero: {
    titlePre: "Mulai Project Video Anda Bersama ",
    titleAccent: "Cromans.",
    subtitle: "Isi form singkat di bawah ini mengenai kebutuhan konten Anda, kirimkan bahan mentah, dan kami siap eksekusi."
  },
  bookingForm: [
    { id: "name", label: "Nama Lengkap / Brand", type: "text", placeholder: "Nama Anda atau nama brand/channel", required: true, step: 1, options: [] },
    { id: "whatsapp", label: "Nomor WhatsApp (Aktif)", type: "tel", placeholder: "Contoh: 081234567890", required: true, step: 1, options: [] },
    { id: "email", label: "Alamat Email", type: "email", placeholder: "email@anda.com", required: true, step: 1, options: [] },
    { id: "social", label: "Akun Medsos / Channel", type: "text", placeholder: "Username TikTok / IG / YouTube", required: false, step: 1, options: [] },
    { id: "service", label: "Pilihan Paket Editing", type: "select", placeholder: "", required: true, step: 2, options: ["CEO DADAKAN (Paling Populer)", "BARU GAJIAN (Entry Level)", "SUDAH IPO (Premium Custom)", "Konsultasi / Custom Batch"] },
    { id: "footage_url", label: "Link Bahan / Raw Footage", type: "text", placeholder: "Link Google Drive / Dropbox / WeTransfer (Pastikan sudah open access)", required: true, step: 2, options: [] },
    { id: "reference_url", label: "Referensi Video / Gaya yang Disukai", type: "text", placeholder: "Link video TikTok/Reels contoh gaya editing yang dimau", required: false, step: 2, options: [] },
    { id: "goals", label: "Catatan Tambahan & Instruksi Khusus", type: "textarea", placeholder: "Jelaskan pesan utama, target audiens, arahan hook, atau musik yang diinginkan...", required: false, step: 2, options: [] }
  ]
};

// Peta key di data.theme -> nama CSS variable di :root (index.html, page.html, admin/dashboard.html)
const THEME_VAR_MAP = {
  bg: "--bg", panel: "--panel", panel2: "--panel-2", border: "--border",
  text: "--text", muted: "--muted", muted2: "--muted-2",
  green: "--green", greenBright: "--green-bright", greenDeep: "--green-deep", pillBg: "--pill-bg"
};
const THEME_CACHE_KEY = "avenor_theme_cache_v1";

// Set CSS variable warna ke elemen <html> (inline style, jadi selalu menang dibanding :root di <style>).
function applyThemeVars(theme) {
  const t = Object.assign({}, DEFAULT_CONTENT.theme, theme || {});
  const root = document.documentElement.style;
  Object.keys(THEME_VAR_MAP).forEach((key) => {
    if (t[key]) root.setProperty(THEME_VAR_MAP[key], t[key]);
  });
}

// Terapkan warna yang tersimpan di cache browser (localStorage), SEBELUM data asli dari Firestore
// selesai dimuat. Ini mencegah halaman "kedip" balik ke warna default tiap kali di-refresh.
// Dipanggil sesegera mungkin di <head>, sebelum <style> dan sebelum body dirender.
function applyCachedTheme() {
  try {
    const cached = localStorage.getItem(THEME_CACHE_KEY);
    if (cached) applyThemeVars(JSON.parse(cached));
  } catch (err) {
    // localStorage tidak tersedia (mis. mode privat) — abaikan, nanti tetap kepasang lewat Firestore.
  }
}

// Terapkan warna dari data.theme ke halaman (menimpa nilai default di <style>:root), lalu simpan
// ke cache supaya kunjungan/refresh berikutnya langsung tampil warna yang benar tanpa kedip.
// Dipanggil setelah loadContent() di index.html & page.html.
function applyTheme(theme) {
  const t = Object.assign({}, DEFAULT_CONTENT.theme, theme || {});
  applyThemeVars(t);
  try { localStorage.setItem(THEME_CACHE_KEY, JSON.stringify(t)); } catch (err) { /* abaikan */ }
}

function slugify(str) {
  return String(str || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "halaman";
}

// Konversi footer.quickLinks/supportLinks lama (array string polos, sebelum fitur tujuan-link ada)
// jadi format objek { label, type, target }. Kalau nama linknya cocok dengan salah satu default
// bawaan (Home, Our Services, dst), pakai tujuan default itu. Kalau tidak, jadikan halaman baru.
function normalizeFooterLinks(data) {
  if (!data || !data.footer) return data;
  const fix = (arr, defaults) => (arr || []).map(l => {
    if (l && typeof l === "object") return l;
    const label = String(l == null ? "" : l);
    const match = (defaults || []).find(d => d.label.toLowerCase() === label.toLowerCase());
    if (match) return { label, type: match.type, target: match.target };
    return { label, type: "page", target: slugify(label) };
  });
  data.footer.quickLinks = fix(data.footer.quickLinks, DEFAULT_CONTENT.footer.quickLinks);
  data.footer.supportLinks = fix(data.footer.supportLinks, DEFAULT_CONTENT.footer.supportLinks);
  return data;
}

// Migrasi otomatis: kalau ada halaman dari versi lama (format "body" teks polos),
// ubah jadi 1 blok teks supaya tetap kompatibel dengan editor blok yang baru.
function normalizePages(data) {
  if (!data || !data.pages) return data;
  Object.keys(data.pages).forEach((slug) => {
    const p = data.pages[slug];
    if (!p) return;
    if (!Array.isArray(p.blocks)) {
      p.blocks = (typeof p.body === "string" && p.body.trim()) ? [{ type: "text", content: p.body }] : [];
    }
    delete p.body;
  });
  return data;
}

// Ambil konten dari Firestore. Kalau belum ada / gagal, pakai DEFAULT_CONTENT.
function loadContent(callback) {
  try {
    db.collection(FIRESTORE_DOC_PATH.collection).doc(FIRESTORE_DOC_PATH.doc).get()
      .then((docSnap) => {
        if (docSnap.exists) {
          callback(normalizePages(normalizeFooterLinks(deepMerge(DEFAULT_CONTENT, docSnap.data()))));
        } else {
          callback(normalizePages(normalizeFooterLinks(deepMerge(DEFAULT_CONTENT, {}))));
        }
      })
      .catch((err) => {
        console.warn("Gagal ambil data Firestore, pakai default:", err);
        callback(normalizePages(normalizeFooterLinks(deepMerge(DEFAULT_CONTENT, {}))));
      });
  } catch (err) {
    console.warn("Firebase belum dikonfigurasi, pakai default:", err);
    callback(normalizePages(normalizeFooterLinks(deepMerge(DEFAULT_CONTENT, {}))));
  }
}

// Simpan konten ke Firestore.
function saveContent(data, onSuccess, onError) {
  db.collection(FIRESTORE_DOC_PATH.collection).doc(FIRESTORE_DOC_PATH.doc)
    .set(data, { merge: false })
    .then(() => onSuccess && onSuccess())
    .catch((err) => onError && onError(err));
}

// Merge sederhana supaya field yang belum ada di Firestore tetap terisi default.
function deepMerge(base, override) {
  if (Array.isArray(base)) {
    return (override !== undefined && override !== null) ? override : base;
  }
  const result = {};
  const keys = new Set([...Object.keys(base || {}), ...Object.keys(override || {})]);
  keys.forEach((key) => {
    const baseVal = base ? base[key] : undefined;
    const overrideVal = override ? override[key] : undefined;
    if (overrideVal === undefined) {
      result[key] = baseVal;
    } else if (baseVal && typeof baseVal === "object" && !Array.isArray(baseVal) &&
               overrideVal && typeof overrideVal === "object" && !Array.isArray(overrideVal)) {
      result[key] = deepMerge(baseVal, overrideVal);
    } else {
      result[key] = overrideVal;
    }
  });
  return result;
}

function escapeAttr(str) { return String(str == null ? "" : str).replace(/&/g, "&amp;").replace(/"/g, "&quot;"); }
function escapeHTML(str) { return String(str == null ? "" : str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

// Render field-field form booking (dipakai index.html) ke dalam 2 step berdasarkan data.bookingForm
function renderBookingForm(data) {
  const fields = (data && data.bookingForm) || [];
  const renderInto = (containerId, stepNum) => {
    const wrap = document.getElementById(containerId);
    if (!wrap) return;
    const stepFields = fields.filter(f => Number(f.step) === stepNum);
    wrap.innerHTML = stepFields.map(f => bookingFieldHTML(f, data)).join("");
  };
  renderInto("step-1-fields", 1);
  renderInto("step-2-fields", 2);
  return fields;
}

// Ambil daftar pilihan untuk field select. Kalau field.linkedTo === "services",
// pilihan diambil otomatis dari nama-nama kartu di data.services.cards (tab Layanan & Harga).
function resolveFieldOptions(f, data) {
  if (f.linkedTo === "services") {
    const cardTitles = (data && data.services && Array.isArray(data.services.cards))
      ? data.services.cards.map(c => c.title).filter(Boolean)
      : [];
    if (cardTitles.length) return cardTitles;
  }
  return f.options || [];
}

function bookingFieldHTML(f, data) {
  const elId = "f-" + f.id;
  const req = f.required ? "required" : "";
  if (f.type === "textarea") {
    return `<div class="field"><label>${escapeHTML(f.label)}</label><textarea rows="4" placeholder="${escapeAttr(f.placeholder)}" id="${elId}" ${req}></textarea></div>`;
  }
  if (f.type === "select") {
    const optionList = resolveFieldOptions(f, data);
    const opts = optionList.map(o => `<option>${escapeHTML(o)}</option>`).join("");
    return `<div class="field"><label>${escapeHTML(f.label)}</label><select id="${elId}" ${req}><option value="">Select a${/^[aeiou]/i.test(f.label) ? "n" : ""} option</option>${opts}</select></div>`;
  }
  return `<div class="field"><label>${escapeHTML(f.label)}</label><input type="${escapeAttr(f.type)}" placeholder="${escapeAttr(f.placeholder)}" id="${elId}" ${req}></div>`;
}

// Bikin href yang benar dari objek link footer, tergantung tipenya
function resolveLinkHref(link) {
  if (!link) return "#";
  if (typeof link === "string") return "#"; // data lama (format string) tanpa tujuan, aman di-skip
  if (link.type === "url") {
    const t = (link.target || "").trim();
    if (!t) return "#";
    return /^https?:\/\//i.test(t) ? t : ("https://" + t);
  }
  if (link.type === "page") {
    return "page.html?slug=" + encodeURIComponent(link.target || "");
  }
  // type "section" (default)
  return (link.target && link.target !== "top") ? ("index.html#" + link.target) : "index.html";
}

// Bikin href otomatis buat item info kontak (email -> mailto:, telepon -> tel:, url -> apa adanya)
function contactItemHref(item) {
  const v = String((item && item.value) || "").trim();
  if (!v) return null;
  const label = String((item && item.label) || "").toLowerCase();
  if (/^https?:\/\//i.test(v)) return v;
  if (label.includes("email") || label.includes("surel") || /@/.test(v)) return "mailto:" + v;
  if (label.includes("phone") || label.includes("telp") || label.includes("whatsapp") || label.includes("wa") || /^[+0-9 ()-]{6,}$/.test(v)) {
    return "tel:" + v.replace(/[^0-9+]/g, "");
  }
  return null;
}

function textToParagraphs(text) {
  return String(text || "").split(/\n{2,}/).map(
    para => `<p>${escapeHTML(para).replace(/\n/g, "<br>")}</p>`
  ).join("");
}

function renderPageBlocks(blocks) {
  return (blocks || []).map(b => {
    if (b.type === "faq") {
      return `<div class="page-faq">${(b.items || []).map(item => `
        <details class="faq-item">
          <summary>${escapeHTML(item.q || "")}</summary>
          <div class="faq-answer">${textToParagraphs(item.a || "")}</div>
        </details>`).join("")}</div>`;
    }
    if (b.type === "contact") {
      return `<div class="page-contact">${(b.items || []).map(item => {
        const href = contactItemHref(item);
        const valueHtml = href ? `<a href="${escapeAttr(href)}">${escapeHTML(item.value || "")}</a>` : escapeHTML(item.value || "");
        return `<div class="contact-row"><span class="contact-label">${escapeHTML(item.label || "")}</span><span class="contact-value">${valueHtml}</span></div>`;
      }).join("")}</div>`;
    }
    return textToParagraphs(b.content || "");
  }).join("");
}

// Render konten halaman generik (dipakai page.html) berdasarkan ?slug= di URL
function renderPageContent(data) {
  const slug = new URLSearchParams(window.location.search).get("slug") || "";
  const page = (data.pages && data.pages[slug]) || null;
  const titleEl = document.getElementById("page-title");
  const bodyEl = document.getElementById("page-body");
  const notFoundEl = document.getElementById("page-not-found");
  if (!page) {
    if (titleEl) titleEl.style.display = "none";
    if (bodyEl) bodyEl.style.display = "none";
    if (notFoundEl) notFoundEl.style.display = "block";
    document.title = "Halaman Tidak Ditemukan — Avenor";
    return;
  }
  if (titleEl) { titleEl.textContent = page.title || ""; titleEl.style.display = ""; }
  if (bodyEl) { bodyEl.style.display = ""; bodyEl.innerHTML = renderPageBlocks(page.blocks || []); }
  if (notFoundEl) notFoundEl.style.display = "none";
  document.title = (page.title || "Halaman") + " — Avenor";
}

// Render konten ke elemen-elemen di index.html
function renderSite(data) {
  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const setHTML = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };

  // Hero
  const heroImgEl = document.getElementById("hero-image");
  if (heroImgEl && data.hero.image) heroImgEl.src = data.hero.image;
  setText("hero-title-pre", data.hero.titlePre);
  setText("hero-title-accent", data.hero.titleAccent);
  setText("hero-subtitle", data.hero.subtitle);
  setText("hero-trusted-label", data.hero.trustedLabel);
  const logoRow = document.getElementById("hero-logo-row");
  if (logoRow) logoRow.innerHTML = data.hero.logos.map(l => `<span>${l}</span>`).join("");

  // Services
  setText("services-eyebrow", data.services.eyebrow);
  setText("services-title-pre", data.services.titlePre);
  setText("services-title-accent", data.services.titleAccent);
  setText("services-subtitle", data.services.subtitle);
  const cardsWrap = document.getElementById("services-cards");
  if (cardsWrap) {
    cardsWrap.innerHTML = data.services.cards.map(c => `
      <div class="card">
        <div class="card-icon">${c.icon}</div>
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <div class="price">${c.price} <span>${c.priceUnit}</span></div>
        <ul>${c.features.map(f => `<li>${f}</li>`).join("")}</ul>
        <a class="btn btn-primary" onclick="goToBooking()">${c.cta}</a>
      </div>
    `).join("");
  }

  // Process
  setText("process-eyebrow", data.process.eyebrow);
  setText("process-title-pre", data.process.titlePre);
  setText("process-title-accent", data.process.titleAccent);
  setText("process-subtitle", data.process.subtitle);

  // Gallery / Portfolio (grid foto tanpa jarak/pembatas)
  if (data.gallery) {
    setText("gallery-eyebrow", data.gallery.eyebrow);
    setText("gallery-title-pre", data.gallery.titlePre);
    setText("gallery-title-accent", data.gallery.titleAccent);
    setText("gallery-subtitle", data.gallery.subtitle);
    const galleryWrap = document.getElementById("gallery-grid");
    if (galleryWrap) {
      galleryWrap.innerHTML = (data.gallery.items || []).map(it => `
        <div class="gallery-item">
          <img src="${escapeAttr(it.image)}" alt="${escapeAttr(it.title || "")}" loading="lazy">
          <div class="gallery-overlay">
            <span class="gallery-cat">${escapeHTML(it.category || "")}</span>
            <span class="gallery-title">${escapeHTML(it.title || "")}</span>
          </div>
        </div>
      `).join("");
    }
    // Showcase besar + gap yang bisa disesuaikan admin
    const showcaseEl = document.getElementById("gallery-showcase");
    if (showcaseEl) {
      const gap = (data.gallery.showcaseGap !== undefined && data.gallery.showcaseGap !== null) ? data.gallery.showcaseGap : 40;
      showcaseEl.style.marginTop = gap + "px";
      const sc = data.gallery.showcase || {};
      const scImg = document.getElementById("gallery-showcase-img");
      if (scImg) scImg.src = sc.image || "";
      setText("gallery-showcase-label", sc.label || "");
      setText("gallery-showcase-title", sc.title || "");
    }
  }

  // Booking page hero
  if (data.bookingHero) {
    setText("booking-hero-titlePre", data.bookingHero.titlePre);
    setText("booking-hero-titleAccent", data.bookingHero.titleAccent);
    setText("booking-hero-subtitle", data.bookingHero.subtitle);
  }

  // Footer
  setText("footer-tagline", data.footer.tagline);
  setText("footer-email", data.footer.email);
  setHTML("footer-address", data.footer.address);
  setText("footer-copyright", data.footer.copyright);
  const quickLinksEl = document.getElementById("footer-quicklinks");
  if (quickLinksEl) quickLinksEl.innerHTML = (data.footer.quickLinks || []).map(l => {
    const label = typeof l === "string" ? l : l.label;
    return `<li><a href="${escapeAttr(resolveLinkHref(l))}">${escapeHTML(label)}</a></li>`;
  }).join("");
  const supportLinksEl = document.getElementById("footer-supportlinks");
  if (supportLinksEl) supportLinksEl.innerHTML = (data.footer.supportLinks || []).map(l => {
    const label = typeof l === "string" ? l : l.label;
    return `<li><a href="${escapeAttr(resolveLinkHref(l))}">${escapeHTML(label)}</a></li>`;
  }).join("");
}
