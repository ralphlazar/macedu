const NAVY   = '#0f1e35'
const BLUE   = '#378ADD'

export const metadata = {
  title: 'macroeconomics.education',
}

export default function RootPage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      fontFamily: 'sans-serif',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>

        <h1 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 34,
          fontWeight: 400,
          color: NAVY,
          lineHeight: 1.25,
          margin: '0 0 12px',
        }}>
          Bringing<br/><span style={{ color: '#378ADD' }}>A-level Macroeconomics</span><br/>to life<br/>with <span style={{ color: '#F0843C' }}>current data</span>
        </h1>

        <p style={{
          fontSize: 15,
          color: '#8099b8',
          lineHeight: 1.65,
          margin: '0 0 40px',
        }}>
          Current data, updated on release day.
        </p>

        <a
          href="/teacher/alevel"
          style={{
            display: 'inline-block',
            padding: '14px 40px',
            background: BLUE,
            color: 'white',
            borderRadius: 10,
            textDecoration: 'none',
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: '0.01em',
          }}
        >
          Get started
        </a>

        <p style={{
          fontSize: 11,
          color: '#ccc',
          marginTop: 48,
          lineHeight: 1.5,
        }}>
          Powered by <a href="https://macrosnaps.app" target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', textDecoration: 'underline' }}>MacroSnaps</a>
        </p>
      </div>
    </main>
  )
}
