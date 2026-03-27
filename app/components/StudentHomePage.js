import MetricCard from './MetricCard'

const ORANGE        = '#F0843C'
const NAVY          = '#0f1e35'
const METRIC_SLUGS  = ['inflation', 'unemployment', 'gdp', 'interest-rates', 'exchange-rates', 'trade']

export default function StudentHomePage({ metrics, curriculum }) {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>

      {/* Orange title bar */}
      <div style={{
        borderBottom: `3px solid ${ORANGE}`,
        background: 'white',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
      }}>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: ORANGE,
          background: 'rgba(240,132,60,0.1)',
          borderRadius: 5,
          padding: '3px 10px',
        }}>
          A-level Economics
        </span>
        <span style={{ fontSize: 15, fontWeight: 400, color: NAVY }}>
          Where is macro happening right now?
        </span>
      </div>

      {/* 2x3 metric card grid */}
      <div style={{
        maxWidth: 900,
        margin: '32px auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 16,
      }}>
        {METRIC_SLUGS.map(slug => {
          const m = metrics[slug]
          if (!m) return null
          return (
            <MetricCard
              key={slug}
              metricSlug={slug}
              metricTitle={m.title}
              aqaRef={m.aqaRef}
              countries={m.countries}
              role="student"
              curriculum={curriculum || 'alevel'}
            />
          )
        })}
      </div>
    </div>
  )
}
