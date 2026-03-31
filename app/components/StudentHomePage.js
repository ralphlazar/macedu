'use client'
import { useState } from 'react'
import Link from 'next/link'
import { glossaryIndexHref } from '../utils/glossaryHref'

const ORANGE = '#F0843C'
const NAVY   = '#0f1e35'
const CYAN   = '#00e5ff'

const METRIC_SLUGS = ['inflation', 'unemployment', 'gdp', 'interest-rates', 'exchange-rates', 'trade']
const COUNTRY_SLUGS = ['uk', 'us', 'eurozone', 'china', 'japan', 'brazil']

const METRIC_META = {
  'inflation':       { label: 'Inflation',       desc: 'Causes, consequences and policy responses' },
  'unemployment':    { label: 'Unemployment',     desc: 'Types, causes and the natural rate' },
  'gdp':             { label: 'GDP',              desc: 'Growth, recession and the economic cycle' },
  'interest-rates':  { label: 'Interest Rates',   desc: 'Monetary policy and transmission' },
  'exchange-rates':  { label: 'Exchange Rates',   desc: 'Determination, depreciation and trade effects' },
  'trade':           { label: 'Trade',            desc: 'Balance of payments and current account' },
}


function daysLabel(n) {
  if (n === null || n === undefined) return null
  if (n === 0) return 'Today'
  if (n === 1) return '1d ago'
  return `${n}d ago`
}

function ageStyle(daysAgo) {
  if (daysAgo === null || daysAgo === undefined) return { color: '#8099b8', animation: 'none' }
  if (daysAgo <= 1) return { color: CYAN, animation: 'throb-cyan 1.1s ease-in-out infinite' }
  if (daysAgo <= 5) return { color: '#F0843C', animation: 'none' }
  return { color: '#8099b8', animation: 'none' }
}

export default function StudentHomePage({ metrics, curriculum }) {
  const [openMetric, setOpenMetric] = useState(null)
  const slug = curriculum || 'alevel'

  // ── Build live strip: 3 freshest entries across all metrics × countries ──
  const allEntries = []
  for (const metricSlug of METRIC_SLUGS) {
    const m = metrics[metricSlug]
    if (!m) continue
    for (const countrySlug of COUNTRY_SLUGS) {
      const c = m.countries[countrySlug]
      if (!c || c.releasedDaysAgo === null || c.releasedDaysAgo === undefined) continue
      allEntries.push({
        metricSlug,
        countrySlug,
        metricLabel: METRIC_META[metricSlug]?.label || metricSlug,
        flag: c.flag,
        countryName: c.name,
        value: c.value,
        direction: c.direction,
        releasedDaysAgo: c.releasedDaysAgo,
        href: `/student/${slug}/${metricSlug}/${countrySlug}`,
      })
    }
  }
  allEntries.sort((a, b) => a.releasedDaysAgo - b.releasedDaysAgo)

  // FX rule: one slot max, even calendar days only, best mover must be >= 1% movePercent
  const todayIsEven = new Date().getDate() % 2 === 0
  const fxEntries   = allEntries.filter(e => e.metricSlug === 'exchange-rates')
  const nonFx       = allEntries.filter(e => e.metricSlug !== 'exchange-rates')
  const bestFx      = todayIsEven
    ? fxEntries.sort((a, b) => Math.abs(b.movePercent || 0) - Math.abs(a.movePercent || 0))
        .find(e => Math.abs(e.movePercent || 0) >= 1)
    : null
  const candidates  = bestFx ? [bestFx, ...nonFx] : nonFx
  candidates.sort((a, b) => a.releasedDaysAgo - b.releasedDaysAgo)
  const liveStrip   = candidates.slice(0, 3)

  function directionEl(direction) {
    if (direction === 'up')   return <span style={{ fontSize: 11, color: '#5dcaa5' }}>▲ rising</span>
    if (direction === 'down') return <span style={{ fontSize: 11, color: ORANGE }}>▼ falling</span>
    return <span style={{ fontSize: 11, color: '#8099b8' }}>unchanged</span>
  }

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f4f5f7', minHeight: '100vh' }}>

      {/* ── Live strip ── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '28px 24px 0' }}>
        <style>{`
          @keyframes throb-cyan {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}</style>

        <p style={{
          fontSize: 17, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
          color: ORANGE, margin: '0 0 10px', fontFamily: "'IBM Plex Mono', monospace",
        }}>
          Pick a topic to start
        </p>
        {/* ── Topic tiles ── */}
        <p style={{
          fontSize: 14, color: '#8099b8', margin: '0 0 20px', lineHeight: 1.5,
          fontFamily: "'IBM Plex Sans', sans-serif",
        }}>
          Each topic has live data from 6 countries - the kind your examiner will use in Paper 2.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
          {METRIC_SLUGS.map(metricSlug => {
            const m = metrics[metricSlug]
            if (!m) return null
            const meta  = METRIC_META[metricSlug]
            const isOpen = openMetric === metricSlug

            return (
              <div
                key={metricSlug}
                style={{
                  background: 'white',
                  border: isOpen ? `1.5px solid ${ORANGE}` : '1px solid #e0e8f0',
                  borderRadius: 10,
                  padding: '16px 18px',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s',
                }}
                onClick={() => setOpenMetric(isOpen ? null : metricSlug)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: isOpen ? 14 : 10 }}>
                  <div>
                    <div style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase',
                      color: ORANGE, marginBottom: 4, fontFamily: "'IBM Plex Mono', monospace",
                    }}>
                      {meta.label}
                    </div>
                    <div style={{ fontSize: 12, color: '#8099b8', lineHeight: 1.4 }}>
                      {meta.desc}
                    </div>
                  </div>
                  <span style={{ fontSize: 13, color: '#c0cad8', marginLeft: 8, marginTop: 2 }}>
                    {isOpen ? '▲' : '▼'}
                  </span>
                </div>

                {/* Collapsed: show country flags as hint */}
                {!isOpen && (
                  <div style={{ display: 'flex', gap: 5 }}>
                    {COUNTRY_SLUGS.map(cs => {
                      const c = m.countries[cs]
                      return c ? (
                        <span key={cs} style={{ fontSize: 15 }}>{c.flag}</span>
                      ) : null
                    })}
                  </div>
                )}

                {/* Expanded: flags become links */}
                {isOpen && (
                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8,
                    borderTop: '0.5px solid #e8eef4', paddingTop: 14,
                  }}>
                    {COUNTRY_SLUGS.map(cs => {
                      const c = m.countries[cs]
                      if (!c) return null
                      const freshness = daysLabel(c.releasedDaysAgo)
                      return (
                        <Link
                          key={cs}
                          href={`/student/${slug}/${metricSlug}/${cs}`}
                          onClick={e => e.stopPropagation()}
                          style={{ textDecoration: 'none' }}
                        >
                          <div style={{
                            background: '#f7f9fc',
                            border: '1px solid #e0e8f0',
                            borderRadius: 8,
                            padding: '10px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                          }}>
                            <span style={{ fontSize: 18, lineHeight: 1 }}>{c.flag}</span>
                            <div>
                              <div style={{
                                fontSize: 11, fontWeight: 600, color: NAVY,
                                fontFamily: "'IBM Plex Mono', monospace",
                              }}>
                                {c.name}
                              </div>

                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <p style={{
          fontSize: 17, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
          color: ORANGE, margin: '40px 0 10px', fontFamily: "'IBM Plex Mono', monospace",
        }}>
          ...Or choose one of these black boxes below
        </p>
        <p style={{
          fontSize: 14, color: '#8099b8', margin: '0 0 12px', lineHeight: 1.5,
          fontFamily: "'IBM Plex Sans', sans-serif",
        }}>
          They are showing the most recently updated data across all topics.
        </p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, marginBottom: 32,
        }}>
          {liveStrip.map((entry, i) => {
            const isToday = entry.releasedDaysAgo === 0
            return (
              <Link key={i} href={entry.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: NAVY, borderRadius: 10, padding: '14px 16px', cursor: 'pointer',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 18, lineHeight: 1 }}>{entry.flag}</span>

                  </div>
                  <div style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: '#8099b8', marginBottom: 4, fontFamily: "'IBM Plex Mono', monospace",
                  }}>
                    {entry.countryName} {entry.metricLabel}
                  </div>
                  <div style={{
                    fontSize: 22, fontWeight: 700, color: 'white',
                    fontFamily: "'IBM Plex Mono', monospace", marginBottom: 2,
                  }}>
                    {entry.value}
                  </div>
                  {directionEl(entry.direction)}
                </div>
              </Link>
            )
          })}
        </div>

        {/* ── Glossary footer ── */}
        <div style={{
          borderTop: '0.5px solid #e0e8f0', marginTop: 28, padding: '20px 0 40px', textAlign: 'center',
        }}>
          <Link href={glossaryIndexHref()} style={{ fontSize: 13, color: '#8099b8', textDecoration: 'none' }}>
            Glossary · 136 AQA A-Level terms · What, How, So what? →
          </Link>
        </div>

      </div>
    </div>
  )
}
