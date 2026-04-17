import { useState } from "react";
import ChatBox from "./components/ChatBox";
import ModeSelector from "./components/ModeSelector";

function App() {
  const [mode, setMode] = useState("debug");

  return (
    <div style={{
      height: "100vh",
      background: "#0f172a",
      color: "white",
      display: "flex",
      flexDirection: "column"
    }}>
      
      {/* HEADER */}
      <div style={{
        padding: 15,
        borderBottom: "1px solid #1e293b",
        fontWeight: "bold"
      }}>
        🤖 AI Dev Assistant
      </div>

      {/* CONTENT */}
      <div style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        padding: 20
      }}>
        <div style={{ width: "100%", maxWidth: 800 }}>
          <ModeSelector mode={mode} setMode={setMode} />
          <ChatBox mode={mode} />
        </div>
      </div>

    </div>
  );
}

export default App;