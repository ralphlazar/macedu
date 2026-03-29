import { glossary } from '../../data/glossary'
import Header from '../../components/Header'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const NAVY = '#1B2D4F'
const BLUE = '#378ADD'

export function generateStaticParams() {
  return glossary.map(entry => ({ term: entry.slug }))
}

export async function generateMetadata({ params }) {
  const { term } = await params
  const entry = glossary.find(e => e.slug === term)
  if (!entry) return {}
  return { title: `${entry.term} · Glossary · macroeconomics.education` }
}

const LABEL = {
  fontSize: 11,
  fontFamily: "'IBM Plex Mono', monospace",
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#aaa',
  marginBottom: 8,
  display: 'block',
}

const SECTION = {
  maxWidth: 820,
  margin: '0 auto',
  padding: '1.25rem 1.5rem',
  borderBottom: '0.5px solid #e8e8e8',
}

export default async function GlossaryTermPage({ params }) {
  const { term } = await params
  const entry = glossary.find(e => e.slug === term)
  if (!entry) notFound()

  const seeAlsoEntries = (entry.seeAlso || [])
    .map(slug => glossary.find(e => e.slug === slug))
    .filter(Boolean)

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <Header homeHref="/" showGlossary={true} />

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '1rem 1.5rem 0' }}>
        <Link href="/glossary" style={{
          fontSize: 13,
          color: BLUE,
          textDecoration: 'none',
          fontFamily: "'IBM Plex Sans', sans-serif",
        }}>
          ← Glossary
        </Link>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '1.25rem 1.5rem 1.25rem', borderBottom: '0.5px solid #e8e8e8' }}>
        <h1 style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 34,
          fontWeight: 400,
          color: NAVY,
          lineHeight: 1.15,
          margin: 0,
        }}>
          {entry.term}
        </h1>
      </div>

      <div style={SECTION}>
        <span style={LABEL}>In short</span>
        <p style={{
          fontSize: 16,
          color: NAVY,
          lineHeight: 1.6,
          fontWeight: 500,
          fontFamily: "'IBM Plex Sans', sans-serif",
          margin: 0,
        }}>
          {entry.brief}
        </p>
      </div>

      {entry.more && (
        <div style={SECTION}>
          <span style={LABEL}>More</span>
          <p style={{
            fontSize: 14,
            color: '#444',
            lineHeight: 1.65,
            fontFamily: "'IBM Plex Sans', sans-serif",
            margin: 0,
          }}>
            {entry.more}
          </p>
        </div>
      )}

      {entry.detailed && (
        <div style={{
          ...SECTION,
          borderBottom: seeAlsoEntries.length > 0 ? '0.5px solid #e8e8e8' : 'none',
        }}>
          <span style={LABEL}>Full definition</span>
          <p style={{
            fontSize: 14,
            color: '#555',
            lineHeight: 1.7,
            fontFamily: "'IBM Plex Sans', sans-serif",
            margin: 0,
          }}>
            {entry.detailed}
          </p>
        </div>
      )}

      {seeAlsoEntries.length > 0 && (
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '1.25rem 1.5rem 3rem' }}>
          <span style={LABEL}>See also</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {seeAlsoEntries.map(e => (
              <Link
                key={e.slug}
                href={`/glossary/${e.slug}`}
                style={{
                  fontSize: 13,
                  padding: '5px 12px',
                  border: '0.5px solid #c8d8ea',
                  borderRadius: 20,
                  color: BLUE,
                  textDecoration: 'none',
                  fontFamily: "'IBM Plex Sans', sans-serif",
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
