const modes = ["debug", "optimize", "explain"];

export default function ModeSelector({ mode, setMode }) {
  return (
    <div style={{ marginBottom: 15 }}>
      {modes.map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          style={{
            marginRight: 10,
            padding: "6px 12px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: mode === m ? "#3b82f6" : "#1e293b",
            color: "white"
          }}
        >
          {m}
        </button>
      ))}
    </div>
  );
}