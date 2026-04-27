import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// 🔧 Config
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || "gemini-3-flash-preview";

// 🛡️ Validación básica
if (!API_KEY) {
  throw new Error("Falta GEMINI_API_KEY en el archivo .env");
}

// 🔌 Middlewares
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ai-dev-assistant.vercel.app" // ← la reemplazamos después con la URL real
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// 🚀 Endpoint IA
app.post("/api/ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "El prompt es requerido" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    // 🧠 Manejo seguro de respuesta
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sin respuesta";

    res.json({ text });

  } catch (error) {
    console.error("Error en /api/ai:", error);
    res.status(500).json({ error: "Error con Gemini" });
  }
});

// 🟢 Health check (muy útil para deploy)
app.get("/", (req, res) => {
  res.send("API AI Dev Assistant corriendo 🚀");
});

// 🎧 Server
app.listen(PORT, () => {
  console.log(`Backend corriendo con Gemini 🚀 en puerto ${PORT}`);
});