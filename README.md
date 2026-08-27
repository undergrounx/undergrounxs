# Tanya Aja — n8n Workflow (Backend Chat Widget Avenor)

Workflow n8n untuk menjalankan otak chatbot "Tanya Aja" yang dipakai oleh `chat-widget.js` di website Avenor.

## Alur

```
Webhook (POST /tanya-aja)
      │
      ▼
Tanya Aja Agent  ──uses──▶ Google Gemini Chat Model
      │          ──uses──▶ Simple Memory (per sessionId)
      ▼
Respond to Webhook  →  { "reply": "..." }
```

## Import ke n8n

1. Buka n8n → **Workflows** → **Import from File**.
2. Pilih file `tanya-aja-workflow.json` di repo ini.
3. Buka node **Google Gemini Chat Model** → pasang credential Google Gemini (PaLM) API milikmu sendiri (kredensial tidak ikut ter-export demi keamanan).
4. Klik **Publish/Activate** workflow.
5. Salin URL webhook produksi yang muncul di node **Webhook - Tanya Aja**, formatnya:
   ```
   https://<domain-n8n-kamu>/webhook/tanya-aja
   ```
6. Tempel URL itu ke variabel `WEBHOOK_URL_CHAT` di `chat-widget.js`.

## Request / Response

**Kirim (dari widget):**
```json
{
  "sessionId": "abc123",
  "message": "Halo, mau tanya soal produk",
  "name": "Budi",
  "gender": "Laki-laki"
}
```

**Terima:**
```json
{
  "reply": "Halo Budi! Ada yang bisa dibantu soal produk kami?"
}
```

## Catatan Keamanan

- Jangan commit kredensial API (Gemini API key) ke repo ini — kredensial di n8n disimpan terpisah dan tidak diekspor di file JSON.
- Kalau workflow ini publik di GitHub, pastikan repo tidak berisi API key atau domain n8n privat yang sensitif kalau tidak diinginkan terlihat orang lain.
