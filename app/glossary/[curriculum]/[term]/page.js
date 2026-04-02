import { glossary } from '../../../data/glossary'
import { glossaryAp } from '../../../data/glossary-ap'
import Header from '../../../components/Header'
import { notFound } from 'next/navigation'
import GlossaryTermClient from './GlossaryTermClient'

export function generateStaticParams() {
  const alevelParams = glossary.map(entry => ({ curriculum: 'alevel', term: entry.slug }))
  const apParams = glossaryAp.map(entry => ({ curriculum: 'ap-economics', term: entry.slug }))
  return [...alevelParams, ...apParams]
}

export async function generateMetadata({ params }) {
  const { term, curriculum } = await params
  const data = curriculum === 'ap-economics' ? glossaryAp : glossary
  const entry = data.find(e => e.slug === term)
  if (!entry) return {}
  return { title: `${entry.term} · Glossary · macroeconomics.education` }
}

export default async function GlossaryTermPage({ params }) {
  const { term, curriculum } = await params
  const data = curriculum === 'ap-economics' ? glossaryAp : glossary
  const entry = data.find(e => e.slug === term)
  if (!entry) notFound()

  const seeAlsoEntries = (entry.seeAlso || [])
    .map(slug => data.find(e => e.slug === slug))
    .filter(Boolean)

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <Header homeHref="/" showGlossary={true} curriculum={curriculum} />
      <GlossaryTermClient
        entry={entry}
        seeAlsoEntries={seeAlsoEntries}
        curriculum={curriculum}
      />
    </div>
  )
}
