'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'

const NAVY = '#0f1e35'
const BLUE = '#378ADD'

export default function GlossaryTerm({ term, slug, brief, more }) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const closeTimer = useRef(null)

  function handleEnter() {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }

  function handleLeave() {
    closeTimer.current = setTimeout(() => {
      setOpen(false)
      setExpanded(false)
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
        <span
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            background: 'white',
            border: '1px solid #e2eaf4',
            borderRadius: 10,
            boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
            padding: '12px 14px',
            minWidth: 220,
            maxWidth: 300,
            display: 'block',
            pointerEvents: 'auto',
            whiteSpace: 'normal',
            textAlign: 'left',
          }}
        >
          <span style={{
            display: 'block',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: BLUE,
            marginBottom: 6,
            fontFamily: "'IBM Plex Sans', sans-serif",
          }}>
            {term}
          </span>

          <span style={{
            display: 'block',
            fontSize: 13,
            color: NAVY,
            lineHeight: 1.55,
            fontFamily: "'IBM Plex Sans', sans-serif",
          }}>
            {brief}
          </span>

          {expanded && more && (
            <span style={{
              display: 'block',
              fontSize: 12,
              color: '#4a6080',
              lineHeight: 1.55,
              marginTop: 8,
              fontFamily: "'IBM Plex Sans', sans-serif",
            }}>
              {more}
            </span>
          )}

          <span style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 10,
            gap: 8,
          }}>
            {more && !expanded && (
              <button
                onMouseDown={e => e.stopPropagation()}
                onClick={e => { e.stopPropagation(); setExpanded(true) }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: 12,
                  color: BLUE,
                  cursor: 'pointer',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  textDecoration: 'underline',
                }}
              >
                More
              </button>
            )}

          </span>
        </span>
      )}
    </span>
  )
}
