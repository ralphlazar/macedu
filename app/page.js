const NAVY   = '#0f1e35'
const BLUE   = '#378ADD'
const ORANGE = '#F0843C'

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

        <div style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#bbb',
          marginBottom: 24,
        }}>
          macroeconomics.education
        </div>

        <h1 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 34,
          fontWeight: 400,
          color: NAVY,
          lineHeight: 1.25,
          margin: '0 0 12px',
        }}>
          Live macro data for<br/>A-level Economics
        </h1>

        <p style={{
          fontSize: 15,
          color: '#8099b8',
          lineHeight: 1.65,
          margin: '0 0 40px',
        }}>
          Six metrics. Six economies. Updated daily.<br/>
          Choose your role to get started.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="/teacher/alevel"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: BLUE,
              color: 'white',
              borderRadius: 10,
              textDecoration: 'none',
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '0.01em',
            }}
          >
            I am a teacher
          </a>
          <a
            href="/student/alevel"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: ORANGE,
              color: 'white',
              borderRadius: 10,
              textDecoration: 'none',
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '0.01em',
            }}
          >
            I am a student
          </a>
        </div>

        <p style={{
          fontSize: 11,
          color: '#ccc',
          marginTop: 48,
          lineHeight: 1.5,
        }}>
          Powered by MacroSnaps
        </p>
      </div>
    </main>
  )
}
