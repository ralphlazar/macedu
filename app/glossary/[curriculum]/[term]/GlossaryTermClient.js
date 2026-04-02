'use client'
import { useState } from 'react'
import Link from 'next/link'
import { glossaryHref } from '../../../utils/glossaryHref'

const NAVY = '#1B2D4F'
const BLUE = '#378ADD'

const TABS = [
  { id: 'what',   label: 'What' },
  { id: 'how',    label: 'How' },
  { id: 'sowhat', label: 'So what?' },
]

function parseMistake(detailed) {
  if (!detailed) return { body: null, mistake: null }
  const idx = detailed.indexOf('Common mistake:')
  if (idx === -1) return { body: detailed, mistake: null }
  return {
    body: detailed.slice(0, idx).trim(),
    mistake: detailed.slice(idx + 'Common mistake:'.length).trim(),
  }
}

export default function GlossaryTermClient({ entry, seeAlsoEntries, curriculum = 'alevel' }) {
  const [tab, setTab] = useState('what')
  const { body: detailedBody, mistake: commonMistake } = parseMistake(entry.detailed)

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 1.5rem 4rem' }}>

      <div style={{ padding: '1.25rem 0 0' }}>
        <Link href="/glossary" style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: BLUE,
          textDecoration: 'none',
        }}>
          ← Glossary
        </Link>
        {entry.group && (
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.06em',
            color: '#aaa',
            marginLeft: 8,
          }}>
            / {entry.group}
          </span>
        )}
      </div>

      <h1 style={{
        fontFamily: "'Instrument Serif', serif",
        fontStyle: 'italic',
        fontSize: 44,
        fontWeight: 400,
        color: NAVY,
        lineHeight: 1.1,
        margin: '20px 0 14px',
      }}>
        {entry.term}
      </h1>

      {entry.group && (
        <div style={{
          display: 'inline-block',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: BLUE,
          background: '#E6F1FB',
          borderRadius: 4,
          padding: '3px 9px',
          marginBottom: 28,
        }}>
          {entry.group}
        </div>
      )}

      <div style={{ borderBottom: '0.5px solid #e8e8e8', marginBottom: 0 }}>
        <div style={{ display: 'flex', gap: 0 }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '7px 16px',
                cursor: 'pointer',
                border: 'none',
                borderRadius: 20,
                background: tab === t.id ? NAVY : 'transparent',
                color: tab === t.id ? 'white' : '#aaa',
                fontWeight: tab === t.id ? 500 : 400,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '28px 0 0' }}>

        {tab === 'what' && (
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 16,
            lineHeight: 1.7,
            color: '#333',
            fontWeight: 400,
            margin: 0,
            maxWidth: 640,
          }}>
            {entry.brief}
          </p>
        )}

        {tab === 'how' && (
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 16,
            lineHeight: 1.7,
            color: '#333',
            margin: 0,
            maxWidth: 640,
          }}>
            {entry.more || 'No further detail available.'}
          </p>
        )}

        {tab === 'sowhat' && (
          <div>
            {detailedBody && (
              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 16,
                lineHeight: 1.7,
                color: '#333',
                margin: '0 0 24px',
                maxWidth: 640,
              }}>
                {detailedBody}
              </p>
            )}
            {commonMistake && (
              <div style={{
                borderLeft: '2px solid #E24B4A',
                padding: '10px 16px',
                maxWidth: 640,
              }}>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#E24B4A',
                  marginBottom: 6,
                }}>
                  Common mistake
                </div>
                <p style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: '#555',
                  margin: 0,
                }}>
                  {commonMistake}
                </p>
              </div>
            )}
            {!detailedBody && !commonMistake && (
              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 16,
                color: '#aaa',
                margin: 0,
              }}>
                No further detail available.
              </p>
            )}
          </div>
        )}

      </div>

      {seeAlsoEntries.length > 0 && (
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '0.5px solid #e8e8e8' }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#bbb',
            marginBottom: 12,
          }}>
            See also
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {seeAlsoEntries.map(e => (
              <Link
                key={e.slug}
                href={glossaryHref(e.slug, curriculum)}
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: 13,
                  padding: '5px 12px',
                  border: '0.5px solid #d0d9e6',
                  borderRadius: 20,
                  color: BLUE,
                  textDecoration: 'none',
                  background: '#f4f8fd',
                }}
              >
                {e.term}
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
