import os

BASE = '/Users/lisaswerling/RALPH/AI/macedu/app'

# ── GlossaryTerm.js ───────────────────────────────────────────────────────────

glossary_term = """'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const NAVY = '#0f1e35'
const BLUE = '#378ADD'

export default function GlossaryTerm({ term, slug, brief, more }) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        setExpanded(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open])

  return (
    <span
      ref={ref}
      style={{ position: 'relative', display: 'inline' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => { setOpen(false); setExpanded(false) }}
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
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => { setOpen(false); setExpanded(false) }}
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
            <Link
              href={`/glossary/${slug}`}
              style={{
                fontSize: 12,
                color: '#8099b8',
                textDecoration: 'none',
                marginLeft: 'auto',
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}
            >
              Full entry →
            </Link>
          </span>
        </span>
      )}
    </span>
  )
}
"""

# ── wrapGlossaryTerms.js ──────────────────────────────────────────────────────

wrap_glossary_terms = """import { glossary } from '../data/glossary'
import GlossaryTerm from '../components/GlossaryTerm'

// Sort longest terms first so 'aggregate demand' is matched before 'demand'
const sorted = [...glossary].sort((a, b) => b.term.length - a.term.length)

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')
}

const pattern = new RegExp(
  '(' + sorted.map(t => '\\\\b' + escapeRegex(t.term) + '\\\\b').join('|') + ')',
  'gi'
)

const termMap = {}
sorted.forEach(entry => { termMap[entry.term.toLowerCase()] = entry })

export function wrapGlossaryTerms(text) {
  if (!text || typeof text !== 'string') return text

  const parts = text.split(pattern)
  if (parts.length === 1) return text

  return parts.map((part, i) => {
    if (i % 2 === 0) return part || null
    const entry = termMap[part.toLowerCase()]
    if (!entry) return part
    return (
      <GlossaryTerm
        key={i}
        term={part}
        slug={entry.slug}
        brief={entry.brief}
        more={entry.more}
      />
    )
  })
}
"""

os.makedirs(os.path.join(BASE, 'utils'), exist_ok=True)

with open(os.path.join(BASE, 'components', 'GlossaryTerm.js'), 'w') as f:
    f.write(glossary_term)
print('✓ GlossaryTerm.js written')

with open(os.path.join(BASE, 'utils', 'wrapGlossaryTerms.js'), 'w') as f:
    f.write(wrap_glossary_terms)
print('✓ wrapGlossaryTerms.js written')
