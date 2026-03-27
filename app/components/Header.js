const ROLE_COLOUR = {
  teacher: '#378ADD',
  student: '#F0843C',
}

export default function Header({ homeHref = '/', role = null }) {
  const stripe = role ? ROLE_COLOUR[role] : null
  return (
    <header style={{
      borderTop: stripe ? `3px solid ${stripe}` : '3px solid transparent',
      borderBottom: '0.5px solid #e0e0de',
      background: 'white',
      fontFamily: 'sans-serif',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1.5rem',
      }}>
        <a href={homeHref} style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '13px', fontWeight: '500', color: '#444' }}>
            macroeconomics.education
          </span>
        </a>
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {/* Glossary link added when Glossary is built */}
        </nav>
        <a href="/" style={{ fontSize: '12px', color: '#bbb', textDecoration: 'none' }}>
          Switch role
        </a>
      </div>
    </header>
  )
}
