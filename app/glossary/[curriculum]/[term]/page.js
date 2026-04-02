import { glossary } from '../../../data/glossary'
import Header from '../../../components/Header'
import { notFound } from 'next/navigation'
import GlossaryTermClient from './GlossaryTermClient'

export function generateStaticParams() {
  const curricula = ['alevel', 'ap-economics']
  return glossary.flatMap(entry =>
    curricula.map(curriculum => ({ curriculum, term: entry.slug }))
  )
}

export async function generateMetadata({ params }) {
  const { term } = await params
  const entry = glossary.find(e => e.slug === term)
  if (!entry) return {}
  return { title: `${entry.term} · Glossary · macroeconomics.education` }
}

export default async function GlossaryTermPage({ params }) {
  const { term, curriculum } = await params
  const entry = glossary.find(e => e.slug === term)
  if (!entry) notFound()

  const seeAlsoEntries = (entry.seeAlso || [])
    .map(slug => glossary.find(e => e.slug === slug))
    .filter(Boolean)

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <Header homeHref="/" showGlossary={true} />
      <GlossaryTermClient
        entry={entry}
        seeAlsoEntries={seeAlsoEntries}
        curriculum={curriculum}
      />
    </div>
  )
}
