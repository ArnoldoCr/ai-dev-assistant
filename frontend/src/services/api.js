const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const sendToAI = async (prompt) => {
  const res = await fetch(`${API_URL}/api/ai`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  return data.text;
};