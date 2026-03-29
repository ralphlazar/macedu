import { glossary } from '../data/glossary'
import Header from '../components/Header'
import Link from 'next/link'

export const metadata = { title: 'Glossary · macroeconomics.education' }

const NAVY = '#1B2D4F'
const BLUE = '#378ADD'
const ALL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function GlossaryIndex() {
  const grouped = {}
  glossary.forEach(entry => {
    const letter = entry.term[0].toUpperCase()
    if (!grouped[letter]) grouped[letter] = []
    grouped[letter].push(entry)
  })
  const activeLetters = new Set(Object.keys(grouped))
  const letters = ALL_LETTERS.filter(l => activeLetters.has(l))

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <Header homeHref="/" />

      <div style={{ maxWidth: 820, margin: '0 auto' }}>

        <div style={{ padding: '2rem 1.5rem 1.25rem', borderBottom: '0.5px solid #e8e8e8' }}>
          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 36,
            fontWeight: 400,
            color: NAVY,
            lineHeight: 1.1,
            marginBottom: 6,
            margin: '0 0 6px',
          }}>
            Glossary
          </h1>
          <p style={{
            fontSize: 13,
            color: '#888',
            fontFamily: "'IBM Plex Mono', monospace",
            margin: 0,
          }}>
            {glossary.length} terms · AQA A-level macroeconomics
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          padding: '0.75rem 1.5rem',
          borderBottom: '0.5px solid #e8e8e8',
          background: '#fafafa',
        }}>
          {ALL_LETTERS.map(l => (
            activeLetters.has(l)
              ? (
                <a
                  key={l}
                  href={`#letter-${l}`}
                  style={{
                    fontSize: 13,
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 700,
                    color: BLUE,
                    textDecoration: 'none',
                    width: 24,
                    textAlign: 'center',
                    padding: '2px 0',
                    borderRadius: 4,
                  }}
                >
                  {l}
                </a>
              )
              : (
                <span
                  key={l}
                  style={{
                    fontSize: 13,
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: '#ccc',
                    width: 24,
                    textAlign: 'center',
                    padding: '2px 0',
                  }}
                >
                  {l}
                </span>
              )
          ))}
        </div>

        <div style={{ padding: '0 1.5rem 3rem' }}>
          {letters.map(letter => (
            <div key={letter} id={`letter-${letter}`} style={{ paddingTop: '1.5rem' }}>
              <div style={{
                fontSize: 13,
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 700,
                color: NAVY,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 10,
                paddingBottom: 6,
                borderBottom: '1px solid #eef2f8',
              }}>
                {letter}
              </div>
              {grouped[letter].map(entry => (
                <div
                  key={entry.slug}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 16,
                    padding: '9px 0',
                    borderBottom: '0.5px solid #f0f0f0',
                  }}
                >
                  <Link
                    href={`/glossary/${entry.slug}`}
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: NAVY,
                      textDecoration: 'none',
                      minWidth: 200,
                      flexShrink: 0,
                      fontFamily: "'IBM Plex Sans', sans-serif",
                    }}
                  >
                    {entry.term}
                  </Link>
                  <span style={{
                    fontSize: 13,
                    color: '#666',
                    lineHeight: 1.5,
                    fontFamily: "'IBM Plex Sans', sans-serif",
                  }}>
                    {entry.brief}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
