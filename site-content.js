// ============================================================
// SITE CONTENT — skema data, default content, dan helper Firestore
// Dipakai oleh index.html (tampil) dan admin-dashboard.html (edit)
// ============================================================

const FIRESTORE_DOC_PATH = { collection: "avenor_content", doc: "site" };

const DEFAULT_CONTENT = {
  // Warna website. Key di sini dipetakan ke CSS variable yang sama namanya di index.html/page.html
  // (mis. "greenBright" -> --green-bright). Diedit lewat tab "Warna" di dashboard.
  theme: {
    bg: "#0b0d0c",
    panel: "#141713",
    panel2: "#171b16",
    border: "#262b25",
    text: "#f2f3ef",
    muted: "#9aa39a",
    muted2: "#6f766e",
    green: "#7ea583",
    greenBright: "#a9d3ad",
    greenDeep: "#2c3a2d",
    pillBg: "#1b211b"
  },
  hero: {
    titlePre: "A Consulting Partner for Startups Ready to ",
    titleAccent: "Scale.",
    subtitle: "From strategic planning to digital transformation, we help growing companies make better decisions, move faster.",
    trustedLabel: "Trusted by innovative companies",
    logos: ["◐ CloudWatch", "⚡ Boltshift", "▤ Epicurious", "⚡ Sisyphus", "✳ Nietzsche", "Ⓠ Quotient", "◍ Capsule"]
  },
  services: {
    eyebrow: "What We Do",
    titlePre: "We Help Startups Scale With ",
    titleAccent: "Clarity.",
    subtitle: "We combine strategic insight, operational expertise, and modern technology to build scalable systems that drive real growth.",
    cards: [
      {
        icon: "▤",
        title: "Growth Blueprint",
        desc: "For founders who feel stuck between ideas and execution. We help you define your path forward.",
        price: "$2,500",
        priceUnit: "/project",
        features: [
          "Deep business & market breakdown",
          "Clear growth priorities",
          "Strategic roadmap tailored to your stage",
          "2x private strategy sessions"
        ],
        cta: "Get Started"
      },
      {
        icon: "⬡",
        title: "Scale Systems",
        desc: "Growth breaks messy systems. We redesign your operations, workflows, and tools.",
        price: "$5,000",
        priceUnit: "/project",
        features: [
          "Full operations & workflow audit",
          "Process simplification & optimization",
          "Tooling & system recommendations",
          "Implementation guidance with your team"
        ],
        cta: "Get Started"
      }
    ]
  },
  process: {
    eyebrow: "How We Work",
    titlePre: "A Clear Process That Drives ",
    titleAccent: "Result.",
    subtitle: "Every engagement follows a focused path from first conversation to measurable outcomes."
  },
  footer: {
    tagline: "We help startups and growing businesses make better decisions, move faster.",
    email: "hello@avenor.com",
    address: "8502 Preston Rd, Inglewood,<br>Maine 98380",
    // Setiap link: { label, type, target }
    // type "section" -> target = id section di index.html ("top" utk paling atas)
    // type "page"    -> target = slug halaman (isi konten diatur di tab Halaman)
    // type "url"     -> target = alamat link luar
    quickLinks: [
      { label: "Home", type: "section", target: "top" },
      { label: "About Us", type: "page", target: "about-us" },
      { label: "Our Services", type: "section", target: "services" },
      { label: "Process", type: "section", target: "process" },
      { label: "Pricing", type: "section", target: "services" }
    ],
    supportLinks: [
      { label: "FAQ", type: "page", target: "faq" },
      { label: "Privacy Policy", type: "page", target: "privacy-policy" },
      { label: "Terms of Service", type: "page", target: "terms-of-service" },
      { label: "Contact Us", type: "page", target: "contact-us" }
    ],
    copyright: "© 2026 Avenor. All rights reserved"
  },
  // Konten halaman-halaman terpisah (dibuka lewat page.html?slug=...), dikelola di tab "Halaman"
  // Tiap halaman punya "blocks": array blok konten dengan tipe berbeda-beda:
  // { type:"text", content }  |  { type:"faq", items:[{q,a}] }
  // { type:"contact", items:[{label,value}] } (value email/nomor otomatis jadi link mailto/tel)
  pages: {
    "about-us": { title: "About Us", blocks: [
      { type: "text", content: "Tulis konten halaman About Us di sini lewat tab Halaman di dashboard." }
    ]},
    "faq": { title: "FAQ", blocks: [
      { type: "faq", items: [
        { q: "Bagaimana cara memulai konsultasi dengan Avenor?", a: "Klik tombol \"Book Consultation\" di halaman utama, isi form singkatnya, dan tim kami akan menghubungi kamu." },
        { q: "Berapa lama proses konsultasinya?", a: "Tergantung paket yang dipilih, biasanya berkisar 2–6 minggu." }
      ]}
    ]},
    "privacy-policy": { title: "Privacy Policy", blocks: [
      { type: "text", content: "Tulis kebijakan privasi di sini lewat tab Halaman di dashboard." }
    ]},
    "terms-of-service": { title: "Terms of Service", blocks: [
      { type: "text", content: "Tulis syarat & ketentuan layanan di sini lewat tab Halaman di dashboard." }
    ]},
    "contact-us": { title: "Contact Us", blocks: [
      { type: "contact", items: [
        { label: "Email", value: "hello@avenor.com" },
        { label: "Phone", value: "+1 (555) 123-4567" },
        { label: "Address", value: "8502 Preston Rd, Inglewood, Maine 98380" }
      ]}
    ]}
  },
  // Judul & subjudul di halaman booking (step form konsultasi)
  bookingHero: {
    titlePre: "Let's Build Your Growth ",
    titleAccent: "Strategy.",
    subtitle: "Tell us about your business so we can understand your goals and challenges better."
  },
  // Skema field form booking. Setiap field: { id, label, type, placeholder, required, step, options }
  // type: "text" | "email" | "tel" | "textarea" | "select"
  // step: 1 (Your Information) atau 2 (Business Details)
  // options: dipakai kalau type === "select"
  bookingForm: [
    { id: "name", label: "Full Name", type: "text", placeholder: "Your full name", required: true, step: 1, options: [] },
    { id: "email", label: "Work Email", type: "email", placeholder: "youremail@company.com", required: true, step: 1, options: [] },
    { id: "title", label: "Job Title", type: "text", placeholder: "e.g. CEO, Founder, Product Manager", required: false, step: 1, options: [] },
    { id: "company", label: "Company Name", type: "text", placeholder: "Your company name", required: false, step: 1, options: [] },
    { id: "phone", label: "Phone Number", type: "tel", placeholder: "Your phone number", required: false, step: 1, options: [] },
    { id: "stage", label: "Company Stage", type: "select", placeholder: "", required: false, step: 2, options: ["Idea / Pre-seed", "Early Stage / Seed", "Growth Stage / Series A+", "Established Business"] },
    { id: "service", label: "What do you need help with?", type: "select", placeholder: "", required: false, step: 2, options: ["Growth Blueprint", "Scale Systems", "Not sure yet"], linkedTo: "services" },
    { id: "goals", label: "Tell us about your goals", type: "textarea", placeholder: "Share a bit about your business and what you're hoping to achieve...", required: false, step: 2, options: [] }
  ]
};

// Peta key di data.theme -> nama CSS variable di :root (index.html, page.html, admin/dashboard.html)
const THEME_VAR_MAP = {
  bg: "--bg", panel: "--panel", panel2: "--panel-2", border: "--border",
  text: "--text", muted: "--muted", muted2: "--muted-2",
  green: "--green", greenBright: "--green-bright", greenDeep: "--green-deep", pillBg: "--pill-bg"
};

// Terapkan warna dari data.theme ke halaman (menimpa nilai default di <style>:root).
// Dipanggil setelah loadContent() di index.html & page.html.
function applyTheme(theme) {
  const t = Object.assign({}, DEFAULT_CONTENT.theme, theme || {});
  const root = document.documentElement.style;
  Object.keys(THEME_VAR_MAP).forEach((key) => {
    if (t[key]) root.setProperty(THEME_VAR_MAP[key], t[key]);
  });
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
