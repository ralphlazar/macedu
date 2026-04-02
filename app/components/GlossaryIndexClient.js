'use client'
import { useState } from 'react'
import GlossaryTerm from './GlossaryTerm'

const NAVY = '#1B2D4F'
const BLUE = '#378ADD'

const GROUP_ORDER = [
  'National Income & Growth',
  'Aggregate Demand & Supply',
  'Inflation',
  'Unemployment & Labour',
  'Money & Monetary Policy',
  'Fiscal Policy',
  'International Economics',
]

export default function GlossaryIndexClient({ glossary }) {
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()

  const grouped = {}
  for (const entry of glossary) {
    const g = entry.group || 'Other'
    if (!grouped[g]) grouped[g] = []
    grouped[g].push(entry)
  }

  const visibleGroups = GROUP_ORDER.filter(g => {
    const terms = grouped[g] || []
    if (!q) return terms.length > 0
    return terms.some(e =>
      e.term.toLowerCase().includes(q) ||
      e.brief.toLowerCase().includes(q)
    )
  })

  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>

      <div style={{ padding: '2rem 1.5rem 1.5rem', borderBottom: '0.5px solid #e8e8e8' }}>
        <h1 style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: 'italic',
          fontSize: 42,
          fontWeight: 400,
          color: NAVY,
          lineHeight: 1.1,
          margin: '0 0 8px',
        }}>
          Glossary
        </h1>
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12,
          color: '#999',
          margin: 0,
          letterSpacing: '0.04em',
        }}>
          {glossary.length} terms · AQA A-Level and AP Economics
        </p>
      </div>

      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '0.5px solid #e8e8e8' }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search terms..."
          style={{
            width: '100%',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 13,
            padding: '10px 14px',
            border: '0.5px solid #d0d9e6',
            borderRadius: 6,
            background: '#f9fbfd',
            color: NAVY,
            outline: 'none',
            letterSpacing: '0.02em',
          }}
        />
      </div>

      <div style={{ padding: '0 1.5rem 4rem' }}>
        {visibleGroups.length === 0 && (
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 13,
            color: '#aaa',
            padding: '2rem 0',
          }}>
            No terms match.
          </p>
        )}

        {visibleGroups.map(groupName => {
          const terms = (grouped[groupName] || []).filter(e =>
            !q ||
            e.term.toLowerCase().includes(q) ||
            e.brief.toLowerCase().includes(q)
          )
          if (terms.length === 0) return null

          return (
            <div key={groupName} style={{ paddingTop: '2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 10,
                marginBottom: 14,
                paddingBottom: 10,
                borderBottom: '1px solid #eef2f8',
              }}>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: BLUE,
                }}>
                  {groupName}
                </span>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  color: '#bbb',
                  letterSpacing: '0.04em',
                }}>
                  {terms.length}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, lineHeight: 2.2 }}>
                {terms.map(entry => (
                  <span
                    key={entry.slug}
                    style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: 13,
                      color: NAVY,
                      border: '0.5px solid #d0d9e6',
                      borderRadius: 5,
                      padding: '5px 11px',
                      background: 'white',
                    }}
                  >
                    <GlossaryTerm
                      term={entry.term}
                      slug={entry.slug}
                      brief={entry.brief}
                      more={entry.more}
                      detailed={entry.detailed}
                      group={entry.group}
                    />
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
