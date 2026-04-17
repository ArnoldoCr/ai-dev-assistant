import { useState, useEffect, useRef } from "react";
import { sendToAI } from "../services/api";

const buildPrompt = (mode, input) => {
  const base = `
Eres un desarrollador de software experto.

Responde de forma:
- Directa
- Clara
- Práctica

NO seas académico.
NO des explicaciones largas innecesarias.
NO inventes contexto.

Si el input no es código, responde en una sola línea.
`;

  if (mode === "debug") {
    return `
${base}

Input:
${input}

Si es código:
- Indica el error
- Da solución clara

Si NO es código:
- Responde: "No hay código para depurar."
`;
  }

  if (mode === "optimize") {
    return `
${base}

Input:
${input}

Si es código:
- Mejora el código
- Explica brevemente

Si NO es código:
- Responde: "No hay código para optimizar."
`;
  }

  return `
${base}

Input:
${input}

Si es código:
- Explica de forma sencilla

Si NO es código:
- Responde: "No es código, no hay nada que explicar."
`;
};

export default function ChatBox({ mode }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const prompt = buildPrompt(mode, input);
    const res = await sendToAI(prompt);

    const aiMessage = { role: "ai", text: res };
    setMessages((prev) => [...prev, aiMessage]);

    setLoading(false);
  };

  return (
    <div>

      {/* CHAT */}
      <div style={{
        minHeight: 400,
        maxHeight: 400,
        overflowY: "auto",
        marginBottom: 15
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 10
            }}
          >
            <div style={{
              padding: 10,
              borderRadius: 12,
              background: msg.role === "user" ? "#2563eb" : "#1e293b",
              maxWidth: "70%",
              whiteSpace: "pre-wrap"
            }}>
              {msg.text}

              {msg.role === "ai" && (
                <div style={{ marginTop: 5 }}>
                  <button
                    onClick={() => navigator.clipboard.writeText(msg.text)}
                    style={{
                      fontSize: 12,
                      background: "transparent",
                      border: "none",
                      color: "#60a5fa",
                      cursor: "pointer"
                    }}
                  >
                    Copiar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && <p style={{ color: "#94a3b8" }}>Pensando...</p>}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div style={{ display: "flex", gap: 10 }}>
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe aquí..."
          style={{
            flex: 1,
            background: "#1e293b",
            color: "white",
            border: "none",
            borderRadius: 8,
            padding: 10
          }}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            background: "#3b82f6",
            border: "none",
            color: "white",
            padding: "10px 15px",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          Enviar
        </button>
      </div>

    </div>
  );
}