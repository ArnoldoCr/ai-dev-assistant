import { useState } from "react";

const formatTime = (date) =>
  date.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });

const renderText = (text) => {
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => {
    if (part.startsWith("```")) {
      const lines = part.split("\n");
      const lang = lines.replace("```", "").trim() || "code";
      const code = lines.slice(1, -1).join("\n");
      return (
        <div key={i} className="code-block">
          <div className="code-lang">{lang}</div>
          <pre><code>{code}</code></pre>
        </div>
      );
    }
    return <span key={i}>{part}</span>;
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