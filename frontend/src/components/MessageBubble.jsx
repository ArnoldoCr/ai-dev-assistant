import { useState } from "react";

const formatTime = (date) =>
  date.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });

// Parsea **negrita** dentro de texto plano
const renderInline = (text, key) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span key={key}>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**")
          ? <strong key={i}>{p.slice(2, -2)}</strong>
          : <span key={i}>{p}</span>
      )}
    </span>
  );
};

const renderText = (text) => {
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => {
    // Bloque de código
    if (part.startsWith("```")) {
      const lines = part.split("\n");
      const lang = lines[0].replace("```", "").trim() || "code"; // ← fix
      const code = lines.slice(1, -1).join("\n");
      return (
        <div key={i} className="code-block">
          <div className="code-lang">{lang}</div>
          <pre><code>{code}</code></pre>
        </div>
      );
    }

    // Texto normal — parsea negritas y saltos de línea
    return (
      <span key={i}>
        {part.split("\n").map((line, j) => (
          <span key={j}>
            {renderInline(line, j)}
            {j < part.split("\n").length - 1 && <br />}
          </span>
        ))}
      </span>
    );
  });
};

export default function MessageBubble({ msg }) {
  const [copied, setCopied] = useState(false);
  const isUser = msg.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`message-row ${isUser ? "user" : "ai"}`}>
      {!isUser && <div className="avatar ai-avatar">🤖</div>}
      <div className={`bubble ${isUser ? "bubble-user" : "bubble-ai"}`}>
        <div className="bubble-content">{renderText(msg.text)}</div>
        <div className="bubble-footer">
          <span className="timestamp">{formatTime(msg.time)}</span>
          {!isUser && (
            <button onClick={handleCopy} className="btn-copy">
              {copied ? "✅ Copiado" : "📋 Copiar"}
            </button>
          )}
        </div>
      </div>
      {isUser && <div className="avatar user-avatar">👤</div>}
    </div>
  );
}