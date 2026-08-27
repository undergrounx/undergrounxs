{
  "name": "Tanya Aja - Personal Assistant (Webhook)",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "tanya-aja",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "e3abcf8a-c787-4cff-8790-a3ccd91de6c4",
      "name": "Webhook - Tanya Aja",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2.1,
      "position": [-80, 128],
      "webhookId": "28f97e07-e564-4ade-800f-b6a605f59aae"
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.body.message }}",
        "options": {
          "systemMessage": "=You are \"Tanya Aja\", a friendly, concise Indonesian-speaking personal assistant embedded in the Avenor website chat widget. You are chatting with {{ $json.body.name || \"a visitor\" }} (gender: {{ $json.body.gender || \"unknown\" }}). Address them naturally and warmly using their name where appropriate. Answer clearly in Bahasa Indonesia unless the visitor writes in another language. If you are unsure or cannot verify something (like real-time info), say so honestly instead of guessing."
        }
      },
      "id": "13511a6a-9c6e-48ab-ae00-350591b9bf4d",
      "name": "Tanya Aja Agent",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 3.1,
      "position": [208, -32]
    },
    {
      "parameters": {
        "sessionIdType": "customKey",
        "sessionKey": "={{ $('Webhook - Tanya Aja').item.json.body.sessionId }}",
        "contextWindowLength": 15
      },
      "id": "7721f9c0-c1f3-46c6-addc-97e979ca423c",
      "name": "Simple Memory",
      "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
      "typeVersion": 1.4,
      "position": [384, 336]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ { \"reply\": $json.output } }}",
        "options": {}
      },
      "id": "7540ffae-8a0f-41cf-841e-815ec54d9338",
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.5,
      "position": [576, 112]
    },
    {
      "parameters": {
        "options": {}
      },
      "id": "a0bf07b0-6b8d-4814-8448-480f043912a9",
      "name": "Google Gemini Chat Model",
      "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
      "typeVersion": 1.1,
      "position": [128, 288],
      "credentials": {
        "googlePalmApi": {
          "name": "REPLACE_WITH_YOUR_GOOGLE_GEMINI_CREDENTIAL_NAME"
        }
      }
    }
  ],
  "connections": {
    "Webhook - Tanya Aja": {
      "main": [
        [
          { "node": "Tanya Aja Agent", "type": "main", "index": 0 }
        ]
      ]
    },
    "Tanya Aja Agent": {
      "main": [
        [
          { "node": "Respond to Webhook", "type": "main", "index": 0 }
        ]
      ]
    },
    "Simple Memory": {
      "ai_memory": [
        [
          { "node": "Tanya Aja Agent", "type": "ai_memory", "index": 0 }
        ]
      ]
    },
    "Google Gemini Chat Model": {
      "ai_languageModel": [
        [
          { "node": "Tanya Aja Agent", "type": "ai_languageModel", "index": 0 }
        ]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1"
  },
  "meta": {
    "templateCredsSetupCompleted": false
  }
}
