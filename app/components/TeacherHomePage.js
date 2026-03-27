'use client'
import { useState } from 'react'

const BLUE = '#378ADD'
const NAVY = '#0f1e35'

const METRIC_SLUGS  = ['inflation', 'unemployment', 'gdp', 'interest-rates', 'exchange-rates', 'trade']
const COUNTRY_SLUGS = ['uk', 'us', 'eurozone', 'china', 'japan', 'brazil']

const METRIC_LABELS = {
  'inflation':      'Inflation',
  'unemployment':   'Unemployment',
  'gdp':            'GDP',
  'interest-rates': 'Interest rates',
  'exchange-rates': 'Exchange rates',
  'trade':          'Trade & current account',
}

const COUNTRY_LABELS = {
  'uk':       '🇬🇧 United Kingdom',
  'us':       '🇺🇸 United States',
  'eurozone': '🇪🇺 Eurozone',
  'china':    '🇨🇳 China',
  'japan':    '🇯🇵 Japan',
  'brazil':   '🇧🇷 Brazil',
}

const selectStyle = {
  width: '100%',
  appearance: 'none',
  background: '#f8fafd',
  border: '1px solid #dde6f2',
  borderRadius: 8,
  color: NAVY,
  fontSize: 14,
  fontFamily: "sans-serif",
  padding: '11px 38px 11px 14px',
  cursor: 'pointer',
}

const fieldLabelStyle = {
  fontFamily: "sans-serif",
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#8099b8',
  display: 'block',
  marginBottom: 7,
}

const cardStyle = {
  background: 'white',
  borderRadius: 14,
  padding: 24,
  border: '1px solid #e2eaf4',
  boxShadow: '0 2px 16px rgba(15,30,53,0.06)',
  marginBottom: 16,
}

const cardLabelStyle = {
  fontFamily: "sans-serif",
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: '#8099b8',
  margin: '0 0 16px',
}

export default function TeacherHomePage({ metrics, curriculum }) {
  const [selectedMetric,  setSelectedMetric]  = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [error, setError] = useState(false)

  // Build recent releases from metrics data (last 7 days), sorted by recency
  const recentReleases = []
  for (const metricSlug of METRIC_SLUGS) {
    const m = metrics[metricSlug]
    if (!m) continue
    for (const countrySlug of COUNTRY_SLUGS) {
      const c = m.countries?.[countrySlug]
      if (!c || c.releasedDaysAgo == null || c.releasedDaysAgo > 7) continue
      recentReleases.push({
        metricSlug,
        countrySlug,
        metricLabel:  METRIC_LABELS[metricSlug] || metricSlug,
        countryLabel: c.name || countrySlug,
        flag:         c.flag || '',
        daysAgo:      c.releasedDaysAgo,
      })
    }
  }
  recentReleases.sort((a, b) => a.daysAgo - b.daysAgo)

  function badgeStyle(daysAgo) {
    if (daysAgo === 0) return { background: '#eaf3de', color: '#3B6D11' }
    if (daysAgo <= 2)  return { background: '#e6f1fb', color: '#185FA5' }
    return { background: '#f0f2f5', color: '#8099b8' }
  }

  function badgeLabel(daysAgo) {
    if (daysAgo === 0) return 'today'
    if (daysAgo === 1) return '1d ago'
    return `${daysAgo}d ago`
  }

  function handleGo() {
    if (!selectedMetric || !selectedCountry) {
      setError(true)
      return
    }
    window.location.href = `/teacher/${curriculum}/${selectedMetric}/${selectedCountry}`
  }



  return (
    <div style={{
      background: '#f4f7fb',
      minHeight: '100vh',
      padding: '40px 24px 64px',
      fontFamily: 'sans-serif',
    }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>

{/* Selector card */}
        <div style={cardStyle}>
          <label style={fieldLabelStyle}>Topic</label>
          <div style={{ position: 'relative', marginBottom: 14 }}>
            <select
              value={selectedMetric}
              onChange={e => { setSelectedMetric(e.target.value); setError(false) }}
              style={selectStyle}
            >
              <option value="">Select a topic</option>
              {METRIC_SLUGS.map(slug => (
                <option key={slug} value={slug}>{METRIC_LABELS[slug]}</option>
              ))}
            </select>
            <div style={{
              position: 'absolute', right: 13, top: '50%',
              transform: 'translateY(-50%)',
              width: 0, height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '5px solid #8099b8',
              pointerEvents: 'none',
            }} />
          </div>

          <label style={fieldLabelStyle}>Country</label>
          <div style={{ position: 'relative', marginBottom: 0 }}>
            <select
              value={selectedCountry}
              onChange={e => { setSelectedCountry(e.target.value); setError(false) }}
              style={selectStyle}
            >
              <option value="">Select a country</option>
              {COUNTRY_SLUGS.map(slug => (
                <option key={slug} value={slug}>{COUNTRY_LABELS[slug]}</option>
              ))}
            </select>
            <div style={{
              position: 'absolute', right: 13, top: '50%',
              transform: 'translateY(-50%)',
              width: 0, height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '5px solid #8099b8',
              pointerEvents: 'none',
            }} />
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2eaf4', margin: '18px 0' }} />

          <button
            onClick={handleGo}
            style={{
              width: '100%',
              padding: 13,
              background: BLUE,
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontFamily: "sans-serif",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.06em',
              cursor: 'pointer',
            }}
          >
            Go to teaching notes →
          </button>

          {error && (
            <div style={{
              fontFamily: "sans-serif",
              fontSize: 12,
              color: BLUE,
              textAlign: 'center',
              marginTop: 12,
              letterSpacing: '0.04em',
            }}>
              → select a topic and country first
            </div>
          )}
        </div>

        {/* Stats line */}
        <div style={{
          fontSize: 13,
          color: '#8099b8',
          textAlign: 'center',
          marginTop: 4,
        }}>
          36 data points &nbsp;·&nbsp;{' '}
          <span style={{ color: BLUE, fontWeight: 600 }}>
            {recentReleases.filter(r => r.daysAgo === 0).length}
          </span>
          {' '}updated today &nbsp;·&nbsp;{' '}
          <span style={{ color: '#F0843C', fontWeight: 600 }}>
            {recentReleases.length}
          </span>
          {' '}updated this week
        </div>

      </div>
    </div>
  )
}
