import { useState } from "react";
import ChatBox from "./components/ChatBox";
import ModeSelector from "./components/ModeSelector";
import "./styles.css";

function App() {
  const [mode, setMode] = useState("debug");

  return (
    <div className="app-container">

      {/* ===== SIDEBAR (desktop) ===== */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">🤖</span>
          <span className="logo-text">AI Dev</span>
        </div>
        <ModeSelector mode={mode} setMode={setMode} />
        <div className="sidebar-footer">
          <span className="powered-by">Powered by</span>
          <span className="gemini-badge">✦ Gemini</span>
          <div className="sidebar-divider" />
          <span className="app-version">v{__APP_VERSION__}</span>
          <span className="app-author">by Arnoldo Callejas</span>
          <a
            href="https://github.com/ArnoldoCr"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-github"
          >
            ⌥ GitHub
          </a>
        </div>
      </div>

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <div className="main-content">

        <div className="header">
          <div className="header-title">
            {/* Logo visible solo en móvil */}
            <span className="mobile-logo">🤖 AI Dev</span>
            <span className="mode-label">Modo: </span>
            <span className="mode-value">{mode}</span>
          </div>
          <a
            href="https://github.com/ArnoldoCr"
            target="_blank"
            rel="noopener noreferrer"
            className="header-badge"
          >
            by @ArnoldoCr
          </a>
        </div>

        <ChatBox mode={mode} />

        {/* ===== TABS MÓVIL (bottom bar) ===== */}
        <div className="mobile-tabs">
          <button
            className={`mobile-tab-btn ${mode === "debug" ? "active" : ""}`}
            onClick={() => setMode("debug")}
          >
            <span>🐛</span>
            <span>Debug</span>
          </button>
          <button
            className={`mobile-tab-btn ${mode === "optimize" ? "active" : ""}`}
            onClick={() => setMode("optimize")}
          >
            <span>⚡</span>
            <span>Optimize</span>
          </button>
          <button
            className={`mobile-tab-btn ${mode === "explain" ? "active" : ""}`}
            onClick={() => setMode("explain")}
          >
            <span>💡</span>
            <span>Explain</span>
          </button>
        </div>

        {/* ===== FOOTER MÓVIL ===== */}
        <div className="mobile-footer">
          <span>✦ Gemini</span>
          <span className="mobile-footer-dot">·</span>
          <span>v{__APP_VERSION__}</span>
          <span className="mobile-footer-dot">·</span>
          <a
            href="https://github.com/ArnoldoCr"
            target="_blank"
            rel="noopener noreferrer"
          >
            by Arnoldo Callejas
          </a>
        </div>

      </div>
    </div>
  );
}

export default App;