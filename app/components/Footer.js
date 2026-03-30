export default function Footer() {
  return (
    <footer style={{
      borderTop: '0.5px solid #e0e0de',
      marginTop: '4rem',
      padding: '2rem 1.5rem',
      background: 'white',
      fontFamily: "'IBM Plex Sans', sans-serif",
      textAlign: 'center',
    }}>
      <p style={{ fontSize: '11px', color: '#bbb', margin: '0 0 4px', lineHeight: 1.6 }}>
        Data sourced from public APIs for educational purposes only. Not financial advice.
      </p>
      <p style={{ fontSize: '11px', color: '#bbb', margin: 0, lineHeight: 1.6 }}>
        Powered by{' '}
        <a
          href="https://macrosnaps.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#bbb', textDecoration: 'underline', fontFamily: "'IBM Plex Mono', monospace" }}
        >
          MacroSnaps
        </a>
        . © 2026 MacroSnaps
      </p>
    </footer>
  )
}
