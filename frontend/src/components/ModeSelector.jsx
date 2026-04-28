const modes = [
  { id: "debug", icon: "🐛", label: "Debug" },
  { id: "optimize", icon: "⚡", label: "Optimize" },
  { id: "explain", icon: "💡", label: "Explain" },
];

export default function ModeSelector({ mode, setMode }) {
  return (
    <nav className="mode-selector">
      {modes.map((m) => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          className={`mode-btn ${mode === m.id ? "active" : ""}`}
        >
          <span className="mode-icon">{m.icon}</span>
          <span className="mode-btn-label">{m.label}</span>
          {mode === m.id && <span className="active-indicator" />}
        </button>
      ))}
    </nav>
  );
}