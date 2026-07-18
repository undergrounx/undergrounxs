// ============================================================
// TANYA AJA — Widget chat mengambang untuk website Avenor
// Tinggal include <script src="chat-widget.js"></script> sebelum </body>
// di setiap halaman yang mau dikasih widget ini (index.html, page.html, dst).
//
// ====== KONFIGURASI — GANTI DUA URL INI ======
// WEBHOOK_URL_CHAT : endpoint n8n yang menerima 1 pesan & membalas jawaban bot.
//   Kirim: { sessionId, message }
//   Terima (salah satu bentuk): { reply } | { output } | { text } | string biasa
//
// WEBHOOK_URL_SAVE : endpoint n8n TERPISAH yang menerima SELURUH histori chat,
//   lalu di sisi n8n yang bertugas generate PDF-nya dan upload ke Google Drive
//   (pakai node Google Drive / Google Docs di workflow n8n kamu).
//   Kirim: { sessionId, savedAt, messages: [{role:"user"|"bot", text, ts}, ...] }
//   Terima (opsional): { ok:true, driveUrl:"https://drive.google.com/..." }
// ================================================
const WEBHOOK_URL_CHAT = "https://your-n8n-domain.com/webhook/tanya-aja";
const WEBHOOK_URL_SAVE = "https://your-n8n-domain.com/webhook/tanya-aja-simpan";
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

    #ac-panel{
      position:fixed;z-index:9999;right:22px;bottom:22px;
      width:380px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100vh - 44px);
      background:var(--bg,#0b0d0c);border:1px solid var(--border,#262b25);border-radius:18px;
      display:flex;flex-direction:column;overflow:hidden;
      box-shadow:0 24px 60px rgba(0,0,0,.55);
      font-family:'Inter',sans-serif;color:var(--text,#f2f3ef);
      transform-origin:bottom right;
      transform:scale(.94) translateY(8px);opacity:0;pointer-events:none;
      transition:transform .18s ease, opacity .18s ease;
    }
    #ac-panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:auto;}

    #ac-panel .ac-header{
      padding:16px 16px 12px;border-bottom:1px solid var(--border,#262b25);
      display:flex;align-items:flex-start;justify-content:space-between;gap:8px;flex-shrink:0;
    }
    #ac-panel .ac-eyebrow{
      font-family:ui-monospace,"SF Mono",Menlo,monospace;font-size:10.5px;letter-spacing:.12em;
      text-transform:uppercase;color:var(--green-bright,#a9d3ad);margin-bottom:2px;
    }
    #ac-panel .ac-title{font-family:'Manrope',sans-serif;font-weight:700;font-size:17px;}
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

    #ac-log{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;}
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

    #ac-form{display:flex;gap:8px;padding:12px;border-top:1px solid var(--border,#262b25);flex-shrink:0;}
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

    #ac-save-status{
      font-size:11.5px;color:var(--muted,#9aa39a);padding:0 16px 12px;text-align:center;flex-shrink:0;
      min-height:14px;
    }
    #ac-save-status.ok{color:var(--green-bright,#a9d3ad);}
    #ac-save-status.err{color:#e0a396;}
    #ac-save-status a{color:var(--green-bright,#a9d3ad);text-decoration:underline;}

    @media (max-width:480px){
      #ac-panel{
        right:16px;left:16px;bottom:84px;width:auto;max-width:none;
        height:min(72vh,560px);
      }
      #ac-toggle{right:16px;bottom:16px;}
    }
  `;
  document.head.appendChild(style);

  // ---------- HTML ----------
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <button id="ac-toggle" aria-label="Buka chat">💬</button>
    <div id="ac-panel" role="dialog" aria-label="Tanya Aja">
      <div class="ac-header">
        <div>
          <div class="ac-eyebrow">Personal Assistant</div>
          <div class="ac-title">Tanya Aja</div>
          <div class="ac-status"><span class="dot"></span><span id="ac-statusText">siap menjawab</span></div>
        </div>
        <div class="ac-header-actions">
          <button class="ac-icon-btn" id="ac-save-btn" title="Simpan percakapan ke Drive (PDF)">💾</button>
          <button class="ac-icon-btn" id="ac-close-btn" aria-label="Tutup chat">✕</button>
        </div>
      </div>
      <div id="ac-log"></div>
      <form id="ac-form">
        <textarea id="ac-input" placeholder="Ketik pesan..." rows="1" required></textarea>
        <button type="submit" id="ac-send">Kirim</button>
      </form>
      <div id="ac-save-status"></div>
    </div>
  `;
  document.body.appendChild(wrap);

  // ---------- Elemen ----------
  const toggleBtn = document.getElementById("ac-toggle");
  const panel = document.getElementById("ac-panel");
  const closeBtn = document.getElementById("ac-close-btn");
  const saveBtn = document.getElementById("ac-save-btn");
  const saveStatus = document.getElementById("ac-save-status");
  const log = document.getElementById("ac-log");
  const form = document.getElementById("ac-form");
  const input = document.getElementById("ac-input");
  const sendBtn = document.getElementById("ac-send");
  const statusText = document.getElementById("ac-statusText");

  // ---------- Sesi & histori (disimpan di localStorage biar gak hilang saat pindah halaman/refresh) ----------
  function getSessionId() {
    let id = localStorage.getItem("tanyaaja_session");
    if (!id) {
      id = "web-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("tanyaaja_session", id);
    }
    return id;
  }
  const sessionId = getSessionId();

  function loadHistory() {
    try {
      return JSON.parse(localStorage.getItem("tanyaaja_history") || "[]");
    } catch (err) {
      return [];
    }
  }
  function saveHistory(history) {
    try {
      localStorage.setItem("tanyaaja_history", JSON.stringify(history));
    } catch (err) { /* abaikan kalau storage penuh/nonaktif */ }
  }
  let history = loadHistory();

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

  // Render ulang histori yang sudah ada (kalau user buka lagi setelah reload)
  if (history.length) {
    history.forEach(m => addBubble(m.text, m.role === "user" ? "user" : "bot"));
  } else {
    addBubble("Halo, ada yang bisa dibantu?", "bot");
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

  // ---------- Buka / tutup panel ----------
  function openPanel() {
    panel.classList.add("open");
    toggleBtn.classList.add("hidden");
    setTimeout(() => input.focus(), 150);
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
    history.push({ role: "user", text: message, ts: new Date().toISOString() });
    saveHistory(history);
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
        body: JSON.stringify({ sessionId, message })
      });
      if (!res.ok) throw new Error("Server merespon dengan status " + res.status);

      const data = await res.json();
      const reply =
        data.reply ?? data.output ?? data.text ?? (typeof data === "string" ? data : null);
      const replyText = reply || "Maaf, aku tidak dapat balasan yang jelas dari server.";

      thinkingBubble.classList.remove("thinking");
      thinkingBubble.textContent = replyText;

      history.push({ role: "bot", text: replyText, ts: new Date().toISOString() });
      saveHistory(history);
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

  // ---------- Simpan seluruh histori ke Drive (PDF) lewat webhook n8n TERPISAH ----------
  saveBtn.addEventListener("click", async () => {
    if (!history.length) {
      saveStatus.textContent = "Belum ada percakapan untuk disimpan.";
      saveStatus.className = "";
      return;
    }
    saveBtn.disabled = true;
    saveStatus.textContent = "Menyimpan ke Drive...";
    saveStatus.className = "";
    try {
      const res = await fetch(WEBHOOK_URL_SAVE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          savedAt: new Date().toISOString(),
          messages: history
        })
      });
      if (!res.ok) throw new Error("Server merespon dengan status " + res.status);
      let data = {};
      try { data = await res.json(); } catch (err) { /* boleh kosong */ }

      saveStatus.className = "ok";
      saveStatus.innerHTML = data.driveUrl
        ? `✓ Tersimpan ke Drive — <a href="${data.driveUrl}" target="_blank" rel="noopener">buka file</a>`
        : "✓ Percakapan tersimpan ke Drive.";
    } catch (err) {
      saveStatus.className = "err";
      saveStatus.textContent = "Gagal menyimpan ke Drive. Coba lagi.";
      console.error(err);
    } finally {
      saveBtn.disabled = false;
    }
  });
})();
