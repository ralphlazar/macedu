"use client";
import { useState, useEffect } from "react";

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("edu_access") === "granted") {
      setUnlocked(true);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (input.toLowerCase() === "croc") {
      localStorage.setItem("edu_access", "granted");
      setUnlocked(true);
    } else {
      setError(true);
      setInput("");
    }
  }

  if (unlocked) return children;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f9fafb",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ marginBottom: "1.5rem", color: "#6b7280", fontSize: "0.95rem" }}>
          This site is not yet public.
        </p>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            style={{
              padding: "0.5rem 0.75rem",
              border: error ? "1px solid #ef4444" : "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "1rem",
              outline: "none",
            }}
          />
          <button type="submit" style={{
            padding: "0.5rem 1rem",
            background: "#111827",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            cursor: "pointer",
          }}>
            Enter
          </button>
        </form>
        {error && (
          <p style={{ marginTop: "0.75rem", color: "#ef4444", fontSize: "0.875rem" }}>
            Incorrect password.
          </p>
        )}
      </div>
    </div>
  );
}
