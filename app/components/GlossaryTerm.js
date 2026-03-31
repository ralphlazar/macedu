'use client'
import { useState, useRef } from 'react'

const NAVY = '#0f1e35'

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

export default function GlossaryTerm({ term, slug, brief, more, detailed, group }) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('what')
  const closeTimer = useRef(null)
  const { body: detailedBody, mistake: commonMistake } = parseMistake(detailed)

  function handleEnter() {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }

  function handleLeave() {
    closeTimer.current = setTimeout(() => {
      setOpen(false)
      setTab('what')
    }, 120)
  }

  return (
    <span
      style={{ position: 'relative', display: 'inline' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span
        onClick={() => setOpen(v => !v)}
        style={{
          borderBottom: '1px dotted currentColor',
          cursor: 'help',
          display: 'inline',
        }}
      >
        {term}
      </span>

      {open && (
        <>
        <style>{`
          .glossary-tooltip {
            position: absolute;
            top: calc(100% + 10px);
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            background: white;
            border: 0.5px solid rgba(0,0,0,0.12);
            border-radius: 10px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.15);
            width: 300px;
            display: block;
            pointer-events: auto;
            white-space: normal;
            text-align: left;
            overflow: hidden;
          }
          @media (max-width: 640px) {
            .glossary-tooltip {
              position: fixed !important;
              left: 16px !important;
              right: 16px !important;
              top: 50% !important;
              transform: translateY(-50%) !important;
              width: auto !important;
            }
          }
        `}</style>
        <span
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          className="glossary-tooltip"
        >
          <button
            onClick={() => { setOpen(false); setTab('what') }}
            style={{
              position: 'absolute', top: 10, right: 10,
              background: 'none', border: 'none',
              fontSize: 16, color: '#aaa', cursor: 'pointer',
              lineHeight: 1, padding: '2px 4px',
              fontFamily: 'sans-serif',
            }}
          >
            ×
          </button>
          <span style={{ display: 'block', padding: '14px 16px 0' }}>
            <span style={{
              display: 'block',
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: 18,
              color: NAVY,
              marginBottom: 10,
              lineHeight: 1.2,
              paddingRight: 20,
            }}>
              {term}
            </span>

            <span style={{
              display: 'flex',
              borderBottom: '0.5px solid rgba(0,0,0,0.1)',
              margin: '0 -16px',
              padding: '0 16px',
            }}>
              {TABS.map(t => (
                <button
                  key={t.id}
                  onMouseDown={e => e.stopPropagation()}
                  onClick={e => { e.stopPropagation(); setTab(t.id) }}
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 10,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '5px 10px',
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
            </span>
          </span>

          <span style={{ display: 'block', padding: '12px 16px' }}>
            {tab === 'what' && (
              <span style={{
                display: 'block',
                fontSize: 13,
                color: NAVY,
                lineHeight: 1.65,
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}>
                {brief}
              </span>
            )}

            {tab === 'how' && (
              <span style={{
                display: 'block',
                fontSize: 13,
                color: '#444',
                lineHeight: 1.65,
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}>
                {more || 'No further detail available.'}
              </span>
            )}

            {tab === 'sowhat' && (
              <span style={{ display: 'block' }}>
                <span style={{
                  display: 'block',
                  fontSize: 13,
                  color: '#444',
                  lineHeight: 1.65,
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  marginBottom: commonMistake ? 10 : 0,
                }}>
                  {detailedBody || 'No further detail available.'}
                </span>
                {commonMistake && (
                  <span style={{
                    display: 'block',
                    borderLeft: '2px solid #E24B4A',
                    padding: '6px 10px',
                  }}>
                    <span style={{
                      display: 'block',
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 9,
                      letterSpacing: '0.09em',
                      textTransform: 'uppercase',
                      color: '#E24B4A',
                      marginBottom: 3,
                    }}>
                      Common mistake
                    </span>
                    <span style={{
                      display: 'block',
                      fontSize: 11.5,
                      color: '#666',
                      lineHeight: 1.55,
                      fontFamily: "'IBM Plex Sans', sans-serif",
                    }}>
                      {commonMistake}
                    </span>
                  </span>
                )}
              </span>
            )}
          </span>

        </span>
        </>
      )}
    </span>
  )
}
