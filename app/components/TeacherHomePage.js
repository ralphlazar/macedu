'use client'
import { useState } from 'react'
import { upcomingReleases } from '../data/upcomingReleases'
import MetricCard from './MetricCard'

const BLUE  = '#378ADD'
const NAVY  = '#0f1e35'

const METRIC_SLUGS  = ['inflation', 'unemployment', 'gdp', 'interest-rates', 'exchange-rates', 'trade']
const COUNTRY_SLUGS = ['uk', 'us', 'eurozone', 'china', 'japan', 'brazil']
const WINDOWS       = ['24h', '7d', '30d']
const WINDOW_DAYS   = { '24h': 1, '7d': 7, '30d': 30 }
const ARROWS        = { up: '↑', down: '↓', flat: '→' }

const ICON_FILTERS = {
  sunny:  {},
  cloudy: { filter: 'brightness(1.05) contrast(0.8) saturate(0.05) grayscale(1)' },
  stormy: { filter: 'brightness(.1) contrast(1.2) saturate(0)' },
}

function iconCls(icon) {
  if (icon === '☀️') return 'sunny'
  if (icon === '⛈️') return 'stormy'
  return 'cloudy'
}

export default function TeacherHomePage({ metrics, curriculum }) {
  const [timeWindow, setTimeWindow] = useState('7d')

  // Flatten all 36 cards
  const allCards = []
  for (const metricSlug of METRIC_SLUGS) {
    const m = metrics[metricSlug]
    if (!m) continue
    for (const countrySlug of COUNTRY_SLUGS) {
      const c = m.countries[countrySlug]
      if (!c) continue
      allCards.push({
        metricSlug,
        countrySlug,
        metricTitle:     m.title,
        value:           c.value,
        direction:       c.direction,
        flag:            c.flag,
        name:            c.name,
        releasedDaysAgo: c.releasedDaysAgo,
        icon:            c.icon,
      })
    }
  }

  // Sort by recency (most recent first)
  allCards.sort((a, b) => a.releasedDaysAgo - b.releasedDaysAgo)

  const maxDays  = WINDOW_DAYS[timeWindow]
  const filtered = allCards.filter(c => c.releasedDaysAgo <= maxDays)

  const releases = Array.isArray(upcomingReleases) ? upcomingReleases : []

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px', fontFamily: 'sans-serif' }}>

      {/* Title bar */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#bbb',
          marginBottom: 8,
        }}>
          A-level Economics
        </div>
        <h1 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 28,
          fontWeight: 400,
          color: NAVY,
          margin: 0,
        }}>
          Teacher dashboard
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 32, alignItems: 'start' }}>

        {/* Feed */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: NAVY, margin: 0 }}>
              Latest releases
            </h2>
            <div style={{ display: 'flex', gap: 4 }}>
              {WINDOWS.map(w => (
                <button
                  key={w}
                  onClick={() => setTimeWindow(w)}
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    padding: '4px 12px',
                    border: '1px solid',
                    borderColor: timeWindow === w ? BLUE : '#dde6f2',
                    borderRadius: 6,
                    background: timeWindow === w ? BLUE : 'white',
                    color: timeWindow === w ? 'white' : '#8099b8',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p style={{ fontSize: 14, color: '#bbb', margin: 0 }}>No releases in this window.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filtered.map(({ metricSlug, countrySlug, metricTitle, value, direction, flag, name, releasedDaysAgo, icon }, idx) => {
                const cls = iconCls(icon)
                const arrowColour = direction === 'up' ? '#22863a' : direction === 'down' ? '#cb2431' : '#8099b8'
                return (
                  <a
                    key={`${metricSlug}-${countrySlug}`}
                    href={`/teacher/${curriculum}/${metricSlug}/${countrySlug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 16px',
                      background: idx % 2 === 0 ? '#f9f9f7' : 'white',
                      borderRadius: 8,
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <span style={{ fontSize: 22, lineHeight: 1 }}>{flag}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: 14, fontWeight: 500, color: NAVY }}>{name}</span>
                      <span style={{ fontSize: 13, color: '#8099b8', marginLeft: 8 }}>{metricTitle}</span>
                    </div>
                    <span style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: NAVY,
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}>
                      {value}
                    </span>
                    <span style={{ fontSize: 15, color: arrowColour, fontWeight: 600, minWidth: 14 }}>
                      {ARROWS[direction] || '→'}
                    </span>
                    <span style={{ fontSize: 20, lineHeight: 1, ...ICON_FILTERS[cls] }}>{icon}</span>
                    <span style={{ fontSize: 11, color: '#bbb', minWidth: 52, textAlign: 'right' }}>
                      {releasedDaysAgo === 0 ? 'today' : `${releasedDaysAgo}d ago`}
                    </span>
                  </a>
                )
              })}
            </div>
          )}
        </div>

        {/* Coming up sidebar */}
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: NAVY, margin: '0 0 16px' }}>
            Coming up
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {releases.slice(0, 14).map((r, i) => (
              <div key={i} style={{
                padding: '10px 14px',
                background: '#f9f9f7',
                border: '1px solid #e2eaf4',
                borderRadius: 8,
                fontSize: 13,
              }}>
                <div style={{ fontWeight: 500, color: NAVY }}>
                  {r.metric}{r.country ? ` -- ${r.country}` : r.label ? ` -- ${r.label}` : ''}
                </div>
                <div style={{ color: '#8099b8', fontSize: 12, marginTop: 2 }}>
                  {r.date || r.releaseDate || ''}
                  {r.daysUntil != null ? <span style={{ marginLeft: 6 }}>({r.daysUntil}d)</span> : null}
                </div>
              </div>
            ))}
            {releases.length === 0 && (
              <p style={{ fontSize: 13, color: '#bbb', margin: 0 }}>No upcoming releases.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
