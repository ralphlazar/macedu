const BLUE      = '#378ADD'
const BLUE_TINT = 'rgba(55,138,221,0.18)'

function parseNumeric(val) {
  if (val == null) return null
  const cleaned = String(val).replace(/[^0-9.-]/g, '')
  const n = parseFloat(cleaned)
  return isNaN(n) ? null : n
}

export default function CountryComparison({ concept, currentCountry, snapshots }) {
  const sorted = Object.entries(snapshots)
    .map(([slug, snap]) => ({ slug, snap, numeric: parseNumeric(snap.value) }))
    .sort((a, b) => {
      if (a.numeric == null && b.numeric == null) return 0
      if (a.numeric == null) return 1
      if (b.numeric == null) return -1
      return b.numeric - a.numeric
    })

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      overflowX: 'auto',
      paddingBottom: '4px',
    }}>
      {sorted.map(({ slug, snap }) => {
        const isActive = slug === currentCountry
        return (
          <div
            key={slug}
            style={{
              background: isActive ? BLUE_TINT : 'rgba(255,255,255,0.06)',
              border: `1.5px solid ${isActive ? BLUE : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '8px',
              padding: '10px 14px',
              textAlign: 'center',
              flexShrink: 0,
              minWidth: '90px',
            }}
          >
            <div style={{ fontSize: '20px', lineHeight: 1, marginBottom: '5px' }}>
              {snap.flag || ''}
            </div>
            <div style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: isActive ? BLUE : 'rgba(255,255,255,0.45)',
              marginBottom: '6px',
            }}>
              {snap.name || snap.country || slug.toUpperCase()}
            </div>
            <div style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: '18px',
              color: isActive ? 'white' : 'rgba(255,255,255,0.8)',
              lineHeight: 1,
            }}>
              {snap.value || '--'}
            </div>
          </div>
        )
      })}
    </div>
  )
}
