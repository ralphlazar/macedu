const COUNTRY_SLUGS = ['uk', 'us', 'eurozone', 'china', 'japan', 'brazil']
const NAVY = '#0f1e35'

export default function MetricCard({ metricSlug, metricTitle, aqaRef, countries, role, curriculum }) {
  const ukData     = countries.uk || {}
  const { value, blurb } = ukData
  const roleColour = role === 'teacher' ? '#378ADD' : '#F0843C'
  const badgeBg    = role === 'teacher' ? 'rgba(55,138,221,0.1)' : 'rgba(240,132,60,0.1)'
  const blurbTrunc = blurb ? (blurb.length > 90 ? blurb.slice(0, 90) + '...' : blurb) : ''

  return (
    <div style={{
      background: 'white',
      border: '1px solid #e2eaf4',
      borderRadius: 16,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      fontFamily: 'sans-serif',
    }}>

      {/* Title + AQA badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <h3 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 22,
          fontWeight: 400,
          color: NAVY,
          margin: 0,
          lineHeight: 1.2,
        }}>
          {metricTitle}
        </h3>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          color: roleColour,
          background: badgeBg,
          borderRadius: 5,
          padding: '3px 9px',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          AQA {aqaRef}
        </span>
      </div>

      {/* UK value */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 18, lineHeight: 1 }}>🇬🇧</span>
        <span style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 34,
          color: NAVY,
          lineHeight: 1,
        }}>
          {value || '--'}
        </span>
        <span style={{ fontSize: 11, color: '#bbb', fontWeight: 500, letterSpacing: '0.06em' }}>UK</span>
      </div>

      {/* Blurb */}
      {blurbTrunc && (
        <p style={{ fontSize: 13, color: '#5a7a99', lineHeight: 1.55, margin: 0 }}>
          {blurbTrunc}
        </p>
      )}

      {/* Country flag buttons */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
        {COUNTRY_SLUGS.map(slug => {
          const c = countries[slug]
          if (!c) return null
          return (
            <a
              key={slug}
              href={`/${role}/${curriculum}/${metricSlug}/${slug}`}
              style={{
                fontSize: 24,
                textDecoration: 'none',
                lineHeight: 1,
                display: 'inline-block',
              }}
              title={c.name || slug}
            >
              {c.flag}
            </a>
          )
        })}
      </div>
    </div>
  )
}
