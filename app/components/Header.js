import { glossaryIndexHref } from '../utils/glossaryHref';
const ROLE_COLOUR = {
  teacher: '#378ADD',
  student: '#F0843C',
}

export default function Header({ homeHref = '/', role = null, showGlossary = false }) {
  const stripe = role ? ROLE_COLOUR[role] : null
  const tint = role === 'teacher'
    ? 'rgba(55,138,221,0.07)'
    : role === 'student'
    ? 'rgba(240,132,60,0.07)'
    : 'white'
  const displayGlossary = showGlossary || role !== null
  const nameStyle = {
    fontSize: '15px',
    fontWeight: '700',
    color: '#111',
    fontFamily: "'IBM Plex Mono', monospace",
    letterSpacing: '0.08em',
  }

  return (
    <header style={{
      borderTop: stripe ? `3px solid ${stripe}` : '3px solid transparent',
      borderBottom: '0.5px solid #e0e0de',
      background: tint,
      fontFamily: 'sans-serif',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1.5rem',
      }}>
        {role === 'student'
          ? <span style={nameStyle}>MACRO</span>
          : <a href={homeHref} style={{ textDecoration: 'none' }}><span style={nameStyle}>MACRO</span></a>
        }
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {displayGlossary && (
            <a href={glossaryIndexHref()} style={{
              fontSize: '13px',
              color: '#378ADD',
              textDecoration: 'none',
              fontWeight: '500',
              fontFamily: "'IBM Plex Sans', sans-serif",
            }}>
              Glossary
            </a>
          )}
        </nav>
      </div>
    </header>
  )
}
