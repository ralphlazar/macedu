'use client'
import { useState } from 'react'

const BLUE  = '#378ADD'
const NAVY  = '#0e1f35'

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

const MONO = "'IBM Plex Mono', monospace"

export default function TeacherHomePage({ metrics, curriculum }) {
  const [selectedMetric,  setSelectedMetric]  = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [error, setError] = useState(false)

  // Stats line counts
  const updatedToday = []
  const updatedWeek  = []
  for (const metricSlug of METRIC_SLUGS) {
    const m = metrics[metricSlug]
    if (!m) continue
    for (const countrySlug of COUNTRY_SLUGS) {
      const c = m.countries?.[countrySlug]
      if (!c || c.releasedDaysAgo == null) continue
      if (c.releasedDaysAgo === 0) updatedToday.push(1)
      if (c.releasedDaysAgo <= 7)  updatedWeek.push(1)
    }
  }

  function handleGo() {
    if (!selectedMetric || !selectedCountry) { setError(true); return }
    window.location.href = `/teacher/${curriculum}/${selectedMetric}/${selectedCountry}`
  }

  return (
    <div style={{
      background: '#eef2f7',
      minHeight: '100vh',
      padding: '40px 24px 64px',
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <style>{`
        @keyframes throb {
          0%, 100% { opacity: 1; color: #ff2d6b; }
          50% { opacity: 0.5; color: #ff8fab; }
        }
        .stat-today { animation: throb 0.8s ease-in-out infinite; color: #ff2d6b; }
      `}</style>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>

        {/* Dark navy selector panel */}
        <div style={{
          background: NAVY,
          borderRadius: 12,
          padding: '28px 28px 24px',
          marginBottom: 20,
        }}>

          {/* Eyebrow */}
          <div style={{
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: BLUE,
            marginBottom: 8,
          }}>
            Today's data is live
          </div>

          {/* Headline */}
          <div style={{
            fontFamily: MONO,
            fontSize: 24,
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: 24,
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
          }}>
            Pick a topic and a country.
          </div>

          {/* Dropdowns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'Topic',   value: selectedMetric,  slugs: METRIC_SLUGS,  labels: METRIC_LABELS,  setter: v => { setSelectedMetric(v);  setError(false) } },
              { label: 'Country', value: selectedCountry, slugs: COUNTRY_SLUGS, labels: COUNTRY_LABELS, setter: v => { setSelectedCountry(v); setError(false) } },
            ].map(({ label, value, slugs, labels, setter }) => (
              <div key={label}>
                <div style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#7a9cc0',
                  marginBottom: 5,
                }}>
                  {label}
                </div>
                <div style={{ position: 'relative' }}>
                  <select
                    value={value}
                    onChange={e => setter(e.target.value)}
                    style={{
                      width: '100%',
                      appearance: 'none',
                      background: 'rgba(255,255,255,0.08)',
                      border: '0.5px solid rgba(255,255,255,0.18)',
                      borderRadius: 8,
                      color: value ? '#ffffff' : 'rgba(255,255,255,0.4)',
                      fontFamily: MONO,
                      fontSize: 13,
                      padding: '10px 36px 10px 12px',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="" style={{ background: NAVY, color: 'rgba(255,255,255,0.4)' }}>
                      Select...
                    </option>
                    {slugs.map(slug => (
                      <option key={slug} value={slug} style={{ background: NAVY, color: '#fff' }}>
                        {labels[slug]}
                      </option>
                    ))}
                  </select>
                  <div style={{
                    position: 'absolute', right: 12, top: '50%',
                    transform: 'translateY(-50%)',
                    width: 0, height: 0,
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderTop: '5px solid rgba(255,255,255,0.4)',
                    pointerEvents: 'none',
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Go button */}
          <button
            onClick={handleGo}
            style={{
              width: '100%',
              background: BLUE,
              color: '#ffffff',
              border: 'none',
              borderRadius: 8,
              padding: 12,
              fontFamily: MONO,
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              letterSpacing: '0.02em',
            }}
          >
            Open this card →
          </button>

          {error && (
            <div style={{
              fontFamily: MONO,
              fontSize: 11,
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          fontFamily: MONO,
          fontSize: 11.5,
          color: '#8099b8',
          padding: '0 2px',
        }}>
          <span style={{
            display: 'inline-block',
            width: 6, height: 6,
            background: '#22c55e',
            borderRadius: '50%',
            flexShrink: 0,
          }} />
          <span><span style={{ color: BLUE, fontWeight: 500 }}>36</span> data points</span>
          <span style={{ margin: '0 2px' }}>·</span>
          <span><span className="stat-today" style={{ color: BLUE, fontWeight: 500 }}>{updatedToday.length}</span> updated today</span>
          <span style={{ margin: '0 2px' }}>·</span>
          <span><span style={{ color: BLUE, fontWeight: 500 }}>{updatedWeek.length}</span> updated this week</span>
        </div>

      </div>
        {/* Schedule note */}
        <div style={{
          fontFamily: MONO,
          fontSize: 11,
          color: '#8099b8',
          padding: '8px 2px 0',
          fontStyle: 'italic',
          lineHeight: 1.6,
          textAlign: 'center',
          textAlign: 'center',
        }}>
          <span style={{ fontWeight: 600, fontStyle: 'normal' }}>Data updates on official release schedules:</span><br/>
          Inflation and unemployment: Monthly<br/>
          GDP and trade: Quarterly<br/>
          Interest rates: ~8× per year
        </div>
    </div>
  )
}
