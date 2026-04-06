export default function HoldingPage() {
  return (
    <main style={{
      background: "#0a0a0a",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
      padding: "2rem",
    }}>
      <p style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "11px",
        letterSpacing: "0.2em",
        color: "#444",
        textTransform: "uppercase",
        marginBottom: "3rem",
      }}>
        brainsmoothie.ai
      </p>
      <div style={{
        display: "flex",
        gap: "2rem",
        alignItems: "baseline",
        justifyContent: "center",
        flexWrap: "wrap",
        marginBottom: "2.5rem",
      }}>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: "clamp(22px, 5vw, 36px)", color: "#378ADD" }}>Economics</span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: "clamp(22px, 5vw, 36px)", color: "#F0843C" }}>History</span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: "clamp(22px, 5vw, 36px)", color: "#2d5be3" }}>Politics</span>
      </div>
      <p style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: "12px",
        letterSpacing: "0.1em",
        color: "#444",
      }}>
        Coming soon
      </p>
    </main>
  );
}
