// ============================================================
// SITE CONTENT — skema data, default content, dan helper Firestore
// Dipakai oleh index.html (tampil) dan admin-dashboard.html (edit)
// ============================================================

const FIRESTORE_DOC_PATH = { collection: "avenor_content", doc: "site" };

const DEFAULT_CONTENT = {
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
    quickLinks: ["Home", "About Us", "Our Services", "Process", "Pricing"],
    supportLinks: ["FAQ", "Privacy Policy", "Terms of Service", "Contact Us"],
    copyright: "© 2026 Avenor. All rights reserved"
  }
};

// Ambil konten dari Firestore. Kalau belum ada / gagal, pakai DEFAULT_CONTENT.
function loadContent(callback) {
  try {
    db.collection(FIRESTORE_DOC_PATH.collection).doc(FIRESTORE_DOC_PATH.doc).get()
      .then((docSnap) => {
        if (docSnap.exists) {
          callback(deepMerge(DEFAULT_CONTENT, docSnap.data()));
        } else {
          callback(DEFAULT_CONTENT);
        }
      })
      .catch((err) => {
        console.warn("Gagal ambil data Firestore, pakai default:", err);
        callback(DEFAULT_CONTENT);
      });
  } catch (err) {
    console.warn("Firebase belum dikonfigurasi, pakai default:", err);
    callback(DEFAULT_CONTENT);
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
  const result = Array.isArray(base) ? [] : {};
  for (const key in base) {
    if (override && override[key] !== undefined) {
      if (typeof base[key] === "object" && base[key] !== null && !Array.isArray(base[key])) {
        result[key] = deepMerge(base[key], override[key]);
      } else {
        result[key] = override[key];
      }
    } else {
      result[key] = base[key];
    }
  }
  return result;
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

  // Footer
  setText("footer-tagline", data.footer.tagline);
  setText("footer-email", data.footer.email);
  setHTML("footer-address", data.footer.address);
  setText("footer-copyright", data.footer.copyright);
  const quickLinksEl = document.getElementById("footer-quicklinks");
  if (quickLinksEl) quickLinksEl.innerHTML = data.footer.quickLinks.map(l => `<li><a href="#">${l}</a></li>`).join("");
  const supportLinksEl = document.getElementById("footer-supportlinks");
  if (supportLinksEl) supportLinksEl.innerHTML = data.footer.supportLinks.map(l => `<li><a href="#">${l}</a></li>`).join("");
}
