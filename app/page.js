const NAVY = '#0f1e35'
const BLUE = '#378ADD'

export const metadata = {
  title: 'macroeconomics.education',
}

const rows = [
  {
    label: '🇬🇧\u00a0\u00a0United Kingdom',
    tiles: [
      { flag: '🇬🇧', level: 'Secondary',       name: ['GCSE', 'Economics'],   board: 'AQA',          href: null },
      { flag: '🇬🇧', level: 'Sixth Form',       name: ['A-Level', 'Economics'],board: 'AQA',          href: '/teacher/alevel' },
      { flag: '🇬🇧', level: 'University · Y1',  name: ['Macro', '· Year 1'],   board: 'UK',           href: null },
      { flag: '🇬🇧', level: 'University · Y2',  name: ['Macro', '· Year 2'],   board: 'UK',           href: null },
    ],
  },
  {
    label: '🇺🇸\u00a0\u00a0United States',
    tiles: [
      { flag: '🇺🇸', level: 'High School',      name: ['AP', 'Economics'],     board: 'College Board', href: null },
      { flag: '🇺🇸', level: 'University · Y1',  name: ['Macro', '· Year 1'],   board: 'US',           href: null },
      { flag: '🇺🇸', level: 'University · Y2',  name: ['Macro', '· Year 2'],   board: 'US',           href: null },
    ],
  },
  {
    label: '🌍\u00a0\u00a0International',
    tiles: [
      { flag: '🌐', level: 'High School',       name: ['Cambridge', 'A-Level'], board: 'CIE',          href: null },
      { flag: '🇮🇳', level: 'High School',      name: ['CBSE', 'Economics'],   board: 'Class 11–12',  href: null },
      { flag: '🌐', level: 'High School',       name: ['IB', 'Economics'],      board: 'IBO',          href: null },
      { flag: '🇦🇺', level: 'High School',      name: ['HSC', 'Economics'],    board: 'NSW',          href: null },
    ],
  },
]

const tileBase = {
  borderRadius: 12,
  padding: '16px 14px',
  textAlign: 'left',
  position: 'relative',
  width: 128,
  flexShrink: 0,
  boxSizing: 'border-box',
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
      <div style={{ textAlign: 'center', maxWidth: 680 }}>

        <h1 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 34,
          fontWeight: 400,
          color: NAVY,
          lineHeight: 1.25,
          margin: '0 0 12px',
        }}>
          Bringing <span style={{ color: '#378ADD' }}>macroeconomics</span><br />
          to life with <span style={{ color: '#F0843C' }}>live data</span>
        </h1>

        <p style={{ fontSize: 15, color: '#8099b8', lineHeight: 1.65, margin: '0 0 4px' }}>
          Current data, updated on release day.
        </p>
        <p style={{ fontSize: 15, color: '#8099b8', lineHeight: 1.65, margin: '0 0 36px' }}>
          Pick your curriculum.
        </p>

        {rows.map((row, ri) => (
          <div key={ri} style={{ marginBottom: 24 }}>
            <p style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#c0cad8',
              margin: '0 0 10px',
            }}>
              {row.label}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
              {row.tiles.map((tile, ti) => {
                const active = !!tile.href
                const style = {
                  ...tileBase,
                  border: active ? '1px solid #378ADD' : '1px solid #e0e4ea',
                  background: active ? '#fff' : '#f7f8fa',
                  textDecoration: 'none',
                  display: 'block',
                  cursor: active ? 'pointer' : 'default',
                }
                const inner = (
                  <>
                    {!active && (
                      <span style={{
                        position: 'absolute', top: 10, right: 10,
                        fontSize: 9, fontWeight: 600, letterSpacing: '0.05em',
                        textTransform: 'uppercase', background: '#eef1f5',
                        color: '#a0aab8', padding: '2px 6px', borderRadius: 20,
                      }}>Soon</span>
                    )}
                    <span style={{ fontSize: 20, display: 'block', marginBottom: 8, lineHeight: 1 }}>
                      {tile.flag}
                    </span>
                    <div style={{
                      fontSize: 10, fontWeight: 600, letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      color: active ? '#8099b8' : '#b0bac8',
                      marginBottom: 4,
                    }}>
                      {tile.level}
                    </div>
                    <div style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: 15, fontWeight: 400,
                      color: active ? NAVY : '#b0bac8',
                      lineHeight: 1.25,
                    }}>
                      {tile.name[0]}<br />{tile.name[1]}
                    </div>
                    <div style={{
                      fontSize: 11,
                      color: active ? '#a0b0c4' : '#c8d0da',
                      marginTop: 3,
                    }}>
                      {tile.board}
                    </div>
                    {active && (
                      <span style={{
                        position: 'absolute', bottom: 12, right: 12,
                        fontSize: 15, color: BLUE,
                      }}>→</span>
                    )}
                  </>
                )
                return active
                  ? <a key={ti} href={tile.href} style={style}>{inner}</a>
                  : <div key={ti} style={style}>{inner}</div>
              })}
            </div>
          </div>
        ))}

        <p style={{ fontSize: 11, color: '#ccc', marginTop: 20, lineHeight: 1.5 }}>
          Powered by{' '}
          <a href="https://macrosnaps.app" target="_blank" rel="noopener noreferrer"
            style={{ color: '#ccc', textDecoration: 'underline' }}>
            MacroSnaps
          </a>
        </p>

      </div>
    </main>
  )
}
