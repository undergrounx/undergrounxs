// ============================================================
// TANYA AJA — Widget chat untuk website Avenor
// Tinggal include <script src="chat-widget.js"></script> sebelum </body>,
// SETELAH firebase-config.js (widget ini pakai variabel global `db` dari sana).
//
// ====== KONFIGURASI — GANTI URL INI ======
// WEBHOOK_URL_CHAT : endpoint n8n (workflow chatbot dengan Google Gemini
//   sebagai otaknya) yang menerima 1 pesan & membalas jawaban bot.
//   Kirim   : { sessionId, message, name, gender }
//   Terima  : salah satu bentuk { reply } | { output } | { text } | string biasa
//
// Sebelum chat dimulai, pengunjung diminta isi nama + gender dulu (disimpan di
// localStorage browser mereka, jadi cuma ditanya sekali). Data ini ikut
// dikirim ke webhook & ikut diarsipkan ke Firestore, supaya bot/admin tahu
// lagi ngobrol sama siapa.
//
// Widget ini TIDAK punya tombol simpan/unduh untuk pengunjung biasa — setiap
// pesan (dari user maupun bot) otomatis disimpan diam-diam ke Firestore
// (collection "avenor_chats"). Melihat & mengunduh riwayat semua percakapan
// hanya bisa dilakukan admin yang login, lewat tab "Percakapan" di dashboard.
// ================================================
const WEBHOOK_URL_CHAT = "https://n8n-07udadxgevay.jkt6.sumopod.my.id/webhook/tanya-aja";
// ================================================

(function () {
  // ---------- CSS (pakai variabel warna yang sama dengan tema website) ----------
  const style = document.createElement("style");
  style.textContent = `
    #ac-toggle{
      position:fixed;z-index:9998;right:22px;bottom:22px;
      width:58px;height:58px;border-radius:50%;border:1px solid var(--green-deep,#2c3a2d);
      background:linear-gradient(180deg,var(--green-deep,#2c3a2d),var(--bg,#0b0d0c));
      color:var(--green-bright,#a9d3ad);display:flex;align-items:center;justify-content:center;
      cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.45);font-size:24px;
      transition:transform .18s ease, opacity .18s ease;
    }
    #ac-toggle:hover{transform:scale(1.06);}
    #ac-toggle.hidden{opacity:0;pointer-events:none;transform:scale(.8);}

    /* Panel didok penuh dari atas sampai bawah di tepi kanan — punya "tempat
       sendiri", bukan kartu ngambang yang nutupin konten di belakangnya. */
    #ac-panel{
      position:fixed;z-index:9999;top:0;right:0;bottom:0;
      width:400px;max-width:100vw;height:100vh;
      background:var(--bg,#0b0d0c);border-left:1px solid var(--border,#262b25);
      display:flex;flex-direction:column;overflow:hidden;
      box-shadow:-28px 0 70px rgba(0,0,0,.5);
      font-family:'Inter',sans-serif;color:var(--text,#f2f3ef);
      transform:translateX(100%);pointer-events:none;
      transition:transform .32s cubic-bezier(.2,.8,.3,1);
    }
    #ac-panel.open{transform:translateX(0);pointer-events:auto;}

    #ac-panel .ac-header{
      padding:18px 18px 14px;border-bottom:1px solid var(--border,#262b25);
      display:flex;align-items:flex-start;justify-content:space-between;gap:8px;flex-shrink:0;
    }
    #ac-panel .ac-eyebrow{
      font-family:ui-monospace,"SF Mono",Menlo,monospace;font-size:10.5px;letter-spacing:.12em;
      text-transform:uppercase;color:var(--green-bright,#a9d3ad);margin-bottom:2px;
    }
    #ac-panel .ac-title{font-family:'Manrope',sans-serif;font-weight:700;font-size:18px;}
    #ac-panel .ac-status{
      font-family:ui-monospace,"SF Mono",Menlo,monospace;font-size:10.5px;color:var(--muted,#9aa39a);
      display:flex;align-items:center;gap:6px;margin-top:4px;
    }
    #ac-panel .ac-status .dot{width:6px;height:6px;border-radius:50%;background:var(--green,#7ea583);flex-shrink:0;}
    .ac-header-actions{display:flex;gap:6px;flex-shrink:0;}
    .ac-icon-btn{
      width:30px;height:30px;border-radius:8px;border:1px solid var(--border,#262b25);
      background:var(--panel,#141713);color:var(--muted,#9aa39a);display:flex;align-items:center;
      justify-content:center;cursor:pointer;font-size:14px;transition:all .15s ease;flex-shrink:0;
    }
    .ac-icon-btn:hover{color:var(--text,#f2f3ef);border-color:var(--muted-2,#6f766e);}

    /* ---- Form kenalan (nama + gender) sebelum chat dimulai ---- */
    #ac-intake{
      flex:1;display:flex;flex-direction:column;justify-content:center;
      padding:32px 26px;gap:18px;
    }
    #ac-intake.hidden{display:none;}
    .ac-intake-title{font-family:'Manrope',sans-serif;font-weight:700;font-size:20px;}
    .ac-intake-sub{font-size:13.5px;color:var(--muted,#9aa39a);line-height:1.5;margin-top:-8px;}
    .ac-field{display:flex;flex-direction:column;gap:7px;}
    .ac-field label{font-size:12px;font-weight:600;color:var(--muted,#9aa39a);text-transform:uppercase;letter-spacing:.04em;}
    .ac-field input[type="text"]{
      border:1px solid var(--border,#262b25);border-radius:10px;padding:11px 13px;
      font-family:inherit;font-size:14.5px;background:var(--panel,#141713);color:var(--text,#f2f3ef);
    }
    .ac-field input[type="text"]:focus{outline:2px solid var(--green,#7ea583);outline-offset:1px;}
    .ac-gender-row{display:flex;gap:10px;}
    .ac-gender-btn{
      flex:1;border:1px solid var(--border,#262b25);border-radius:10px;padding:11px 10px;
      background:var(--panel,#141713);color:var(--text,#f2f3ef);font-family:inherit;font-size:14px;
      font-weight:600;cursor:pointer;transition:all .15s ease;
    }
    .ac-gender-btn:hover{border-color:var(--muted-2,#6f766e);}
    .ac-gender-btn.selected{
      background:var(--green-deep,#2c3a2d);border-color:var(--green,#7ea583);color:var(--green-bright,#a9d3ad);
    }
    #ac-intake-submit{
      border:none;background:linear-gradient(180deg,var(--green-deep,#2c3a2d),var(--bg,#0b0d0c));
      color:var(--green-bright,#a9d3ad);border:1px solid var(--green-deep,#2c3a2d);
      padding:12px 16px;border-radius:10px;font-family:inherit;font-size:14px;font-weight:700;cursor:pointer;
      margin-top:6px;
    }
    #ac-intake-submit:disabled{opacity:.4;cursor:not-allowed;}
    #ac-intake-submit:not(:disabled):hover{filter:brightness(1.15);}

    /* ---- Area chat (disembunyikan sampai form kenalan selesai) ---- */
    #ac-chat-area{flex:1;display:flex;flex-direction:column;min-height:0;}
    #ac-chat-area.hidden{display:none;}

    #ac-log{flex:1;overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:12px;}
    #ac-log::-webkit-scrollbar{width:7px;}
    #ac-log::-webkit-scrollbar-thumb{background:var(--border,#262b25);border-radius:8px;}

    .ac-row{display:flex;}
    .ac-row.user{justify-content:flex-end;}
    .ac-row.bot{justify-content:flex-start;}
    .ac-bubble{
      max-width:82%;padding:10px 13px;border-radius:13px;font-size:14px;line-height:1.5;
      white-space:pre-wrap;word-wrap:break-word;
    }
    .ac-row.user .ac-bubble{
      background:var(--green-deep,#2c3a2d);color:var(--green-bright,#a9d3ad);border-bottom-right-radius:4px;
    }
    .ac-row.bot .ac-bubble{
      background:var(--panel,#141713);border:1px solid var(--border,#262b25);
      color:var(--text,#f2f3ef);border-bottom-left-radius:4px;
    }
    .ac-bubble.thinking{color:var(--muted,#9aa39a);font-style:italic;}
    .ac-bubble.error{border-color:#b5533e;color:#e0a396;}

    #ac-form{display:flex;gap:8px;padding:14px;border-top:1px solid var(--border,#262b25);flex-shrink:0;}
    #ac-input{
      flex:1;resize:none;border:1px solid var(--border,#262b25);border-radius:10px;
      padding:10px 12px;font-family:inherit;font-size:14px;line-height:1.4;
      background:var(--panel,#141713);color:var(--text,#f2f3ef);max-height:100px;
    }
    #ac-input:focus{outline:2px solid var(--green,#7ea583);outline-offset:1px;}
    #ac-send{
      border:none;background:linear-gradient(180deg,var(--green-deep,#2c3a2d),var(--bg,#0b0d0c));
      color:var(--green-bright,#a9d3ad);border:1px solid var(--green-deep,#2c3a2d);
      padding:0 16px;border-radius:10px;font-family:inherit;font-size:13.5px;font-weight:600;cursor:pointer;
    }
    #ac-send:hover{filter:brightness(1.15);}
    #ac-send:disabled, #ac-input:disabled{opacity:.5;cursor:not-allowed;}

    @media (max-width:480px){
      #ac-panel{ width:100vw; }
      #ac-toggle{right:16px;bottom:16px;}
    }
  `;
  document.head.appendChild(style);

  // ---------- HTML ----------
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <button id="ac-toggle" aria-label="ngobrol dulu sini">💬</button>
    <div id="ac-panel" role="dialog" aria-label="Tanya Aja">
      <div class="ac-header">
        <div>
          <div class="ac-eyebrow">Personal Assistant</div>
          <div class="ac-title">Cromans</div>
          <div class="ac-status"><span class="dot"></span><span id="ac-statusText">siap menjawab</span></div>
        </div>
        <div class="ac-header-actions">
          <button class="ac-icon-btn" id="ac-close-btn" aria-label="Tutup chat">✕</button>
        </div>
      </div>

      <div id="ac-intake">
        <div class="ac-intake-title">Kenalan dulu yuk 👋</div>
        <p class="ac-intake-sub">Biar obrolannya lebih personal, isi dulu data singkat ini ya.</p>
        <div class="ac-field">
          <label for="ac-intake-name">Nama</label>
          <input type="text" id="ac-intake-name" placeholder="Nama kamu" maxlength="60">
        </div>
        <div class="ac-field">
          <label>Gender</label>
          <div class="ac-gender-row">
            <button type="button" class="ac-gender-btn" data-gender="Laki-laki">Laki-laki</button>
            <button type="button" class="ac-gender-btn" data-gender="Perempuan">Perempuan</button>
          </div>
        </div>
        <button id="ac-intake-submit" disabled>Mulai Chat</button>
      </div>

      <div id="ac-chat-area" class="hidden">
        <div id="ac-log"></div>
        <form id="ac-form">
          <textarea id="ac-input" placeholder="Ketik pesan..." rows="1" required></textarea>
          <button type="submit" id="ac-send">Kirim</button>
        </form>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  // ---------- Elemen ----------
  const toggleBtn = document.getElementById("ac-toggle");
  const panel = document.getElementById("ac-panel");
  const closeBtn = document.getElementById("ac-close-btn");
  const intakeEl = document.getElementById("ac-intake");
  const chatAreaEl = document.getElementById("ac-chat-area");
  const nameInput = document.getElementById("ac-intake-name");
  const genderBtns = Array.from(document.querySelectorAll(".ac-gender-btn"));
  const intakeSubmitBtn = document.getElementById("ac-intake-submit");
  const log = document.getElementById("ac-log");
  const form = document.getElementById("ac-form");
  const input = document.getElementById("ac-input");
  const sendBtn = document.getElementById("ac-send");
  const statusText = document.getElementById("ac-statusText");

  // ---------- Sesi (dipakai buat kelompokkan pesan per pengunjung di Firestore) ----------
  function getSessionId() {
    let id = localStorage.getItem("tanyaaja_session");
    if (!id) {
      id = "web-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("tanyaaja_session", id);
    }
    return id;
  }
  const sessionId = getSessionId();

  // ---------- Profil pengunjung (nama + gender), disimpan biar cuma ditanya sekali ----------
  function loadProfile() {
    try { return JSON.parse(localStorage.getItem("tanyaaja_profile") || "null"); }
    catch (err) { return null; }
  }
  function saveProfile(p) {
    try { localStorage.setItem("tanyaaja_profile", JSON.stringify(p)); }
    catch (err) { /* abaikan kalau storage penuh/nonaktif */ }
  }
  let profile = loadProfile();

  let selectedGender = null;
  genderBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      selectedGender = btn.getAttribute("data-gender");
      genderBtns.forEach(b => b.classList.toggle("selected", b === btn));
      updateIntakeSubmitState();
    });
  });
  function updateIntakeSubmitState() {
    intakeSubmitBtn.disabled = !(nameInput.value.trim() && selectedGender);
  }
  nameInput.addEventListener("input", updateIntakeSubmitState);

  function showIntake() {
    intakeEl.classList.remove("hidden");
    chatAreaEl.classList.add("hidden");
  }
  function showChatArea() {
    intakeEl.classList.add("hidden");
    chatAreaEl.classList.remove("hidden");
  }

  intakeSubmitBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (!name || !selectedGender) return;
    profile = { name, gender: selectedGender };
    saveProfile(profile);
    startChat();
  });

  // ---------- Riwayat lokal (cuma buat nampilin ulang bubble di browser ini) ----------
  function loadLocalHistory() {
    try { return JSON.parse(localStorage.getItem("tanyaaja_history") || "[]"); }
    catch (err) { return []; }
  }
  function saveLocalHistory(h) {
    try { localStorage.setItem("tanyaaja_history", JSON.stringify(h)); }
    catch (err) { /* abaikan kalau storage penuh/nonaktif */ }
  }
  let localHistory = loadLocalHistory();

  // ---------- Simpan tiap pesan ke Firestore, diam-diam, buat arsip admin ----------
  function archiveMessage(role, text) {
    if (typeof db === "undefined") {
      console.warn("Firestore (db) tidak ditemukan — pastikan firebase-config.js dimuat sebelum chat-widget.js.");
      return;
    }
    db.collection("avenor_chats").add({
      sessionId,
      role,
      text,
      name: profile ? profile.name : null,
      gender: profile ? profile.gender : null,
      createdAt: Date.now(),
      page: location.pathname
    }).catch(err => console.warn("Gagal mengarsipkan pesan chat:", err.message));
  }

  function addBubble(text, who, opts) {
    opts = opts || {};
    const row = document.createElement("div");
    row.className = "ac-row " + who;
    const bubble = document.createElement("div");
    bubble.className = "ac-bubble" + (opts.thinking ? " thinking" : "") + (opts.error ? " error" : "");
    bubble.textContent = text;
    row.appendChild(bubble);
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
    return bubble;
  }

  function autoGrow() {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 100) + "px";
  }
  input.addEventListener("input", autoGrow);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  // Mulai/lanjut chat: kalau profil sudah ada, langsung ke area chat + render ulang histori.
  // Kalau belum, tetap di layar kenalan.
  function startChat() {
    showChatArea();
    if (log.childElementCount === 0) {
      if (localHistory.length) {
        localHistory.forEach(m => addBubble(m.text, m.role === "user" ? "user" : "bot"));
      } else {
        const name = profile && profile.name ? profile.name : "";
        addBubble(name ? `Halo ${name}, ada yang bisa dibantu?` : "Halo, ada yang bisa dibantu?", "bot");
      }
    }
    setTimeout(() => input.focus(), 150);
  }

  if (profile) {
    showChatArea();
  } else {
    showIntake();
  }

  // ---------- Buka / tutup panel ----------
  function openPanel() {
    panel.classList.add("open");
    toggleBtn.classList.add("hidden");
    if (profile) startChat();
  }
  function closePanel() {
    panel.classList.remove("open");
    toggleBtn.classList.remove("hidden");
  }
  toggleBtn.addEventListener("click", openPanel);
  closeBtn.addEventListener("click", closePanel);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("open")) closePanel();
  });

  // ---------- Kirim pesan ke n8n (webhook chat) ----------
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    addBubble(message, "user");
    localHistory.push({ role: "user", text: message, ts: new Date().toISOString() });
    saveLocalHistory(localHistory);
    archiveMessage("user", message);

    input.value = "";
    autoGrow();

    input.disabled = true;
    sendBtn.disabled = true;
    statusText.textContent = "mengetik...";

    const thinkingBubble = addBubble("...", "bot", { thinking: true });

    try {
      const res = await fetch(WEBHOOK_URL_CHAT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message,
          name: profile ? profile.name : null,
          gender: profile ? profile.gender : null
        })
      });
      if (!res.ok) throw new Error("Server merespon dengan status " + res.status);

      const data = await res.json();
      const reply =
        data.reply ?? data.output ?? data.text ?? (typeof data === "string" ? data : null);
      const replyText = reply || "Maaf, aku tidak dapat balasan yang jelas dari server.";

      thinkingBubble.classList.remove("thinking");
      thinkingBubble.textContent = replyText;

      localHistory.push({ role: "bot", text: replyText, ts: new Date().toISOString() });
      saveLocalHistory(localHistory);
      archiveMessage("bot", replyText);
    } catch (err) {
      thinkingBubble.classList.remove("thinking");
      thinkingBubble.classList.add("error");
      thinkingBubble.textContent = "Gagal terhubung ke server. Coba lagi sebentar lagi.";
      console.error(err);
    } finally {
      input.disabled = false;
      sendBtn.disabled = false;
      statusText.textContent = "siap menjawab";
      input.focus();
    }
  });
})();
