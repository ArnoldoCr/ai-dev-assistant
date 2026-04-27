import { useState, useEffect, useRef } from "react";
import { sendToAI } from "../services/api";
import MessageBubble from "./MessageBubble";

const buildPrompt = (mode, input) => {
  const base = `
Eres un desarrollador de software experto.
Responde de forma directa, clara y práctica.
NO seas académico. NO des explicaciones largas innecesarias.
Si el input no es código, responde en una sola línea.
`;
  if (mode === "debug") return `${base}\nInput:\n${input}\n\nSi es código: indica el error y da solución clara.\nSi NO es código: responde "No hay código para depurar."`;
  if (mode === "optimize") return `${base}\nInput:\n${input}\n\nSi es código: mejora el código y explica brevemente.\nSi NO es código: responde "No hay código para optimizar."`;
  return `${base}\nInput:\n${input}\n\nSi es código: explica de forma sencilla.\nSi NO es código: responde "No es código, no hay nada que explicar."`;
};

export default function ChatBox({ mode }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: "user", text: input, time: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    const prompt = buildPrompt(mode, input);
    const res = await sendToAI(prompt);
    setMessages((prev) => [...prev, { role: "ai", text: res, time: new Date() }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <div className="chatbox">
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">🤖</span>
            <p>Pega tu código y selecciona un modo</p>
            <span className="empty-hint">Debug · Optimize · Explain</span>
          </div>
        )}

        {messages.map((msg, index) => (
          <MessageBubble key={index} msg={msg} />
        ))}

        {loading && (
          <div className="typing-indicator">
            <div className="typing-avatar">🤖</div>
            <div className="typing-dots">
              <span /><span /><span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="chat-input-area">
        <textarea
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pega tu código aquí... (Enter para enviar, Shift+Enter para nueva línea)"
          className="chat-input"
        />
        <div className="input-actions">
          <button onClick={clearChat} className="btn-clear">
            🗑️ Limpiar
          </button>
          <button onClick={handleSend} disabled={loading} className="btn-send">
            {loading ? "..." : "Enviar ➤"}
          </button>
        </div>
      </div>
    </div>
  );
}