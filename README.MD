# 🤖 AI Dev Assistant

Aplicación web que integra IA (Gemini) para asistir a desarrolladores en tareas
comunes como debugging, optimización y explicación de código.

---

## 🚀 Demo

🔗 [ai-dev-assistant.vercel.app](https://ai-dev-assistant.vercel.app)

---

## 🧠 Funcionalidades

- 💬 Interfaz tipo chat con sidebar moderno
- 🐞 **Modo Debug:** detecta errores en código
- ⚡ **Modo Optimize:** mejora código y buenas prácticas
- 📖 **Modo Explain:** explica código de forma clara
- 🎯 Prompt engineering para respuestas más precisas
- 📋 Copiar respuestas fácilmente
- 🌙 Diseño limpio y responsivo

---

## 🛠️ Tecnologías

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **IA:** Google Gemini (AI Studio)
- **Otros:** Fetch API, CSS moderno

---

## 📦 Instalación local

### Requisitos
- Node.js v18+
- API Key de [Google AI Studio](https://aistudio.google.com)

### Backend
```bash
cd backend
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Variables de entorno

Crea un archivo `.env` en `/backend`:
```env
GEMINI_API_KEY=tu_api_key_aqui
PORT=3001
```

---

## 📁 Estructura del proyecto
ai-dev-assistant/
├── backend/
│ ├── server.js
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── App.jsx
│ │ └── App.css
│ ├── vite.config.js
│ └── package.json
└── README.md

---

## 📌 Versiones

| Versión | Cambios |
|---------|---------|
| `v1.1.0` | Nuevo diseño con sidebar, badge de versión y link a GitHub |
| `v1.0.0` | Release inicial — chat funcional con los 3 modos |

---

## 👤 Autor

**Arnoldo Callejas** — [@ArnoldoCr](https://github.com/ArnoldoCr)