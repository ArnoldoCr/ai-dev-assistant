import { useState } from "react";
import ChatBox from "./components/ChatBox";
import ModeSelector from "./components/ModeSelector";
import "./styles.css";

function App() {
  const [mode, setMode] = useState("debug");

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">🤖</span>
          <span className="logo-text">AI Dev</span>
        </div>
        <ModeSelector mode={mode} setMode={setMode} />
        <div className="sidebar-footer">
          <span className="powered-by">Powered by</span>
          <span className="gemini-badge">✦ Gemini</span>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <div className="header-title">
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
      </div>
    </div>
  );
}

export default App;