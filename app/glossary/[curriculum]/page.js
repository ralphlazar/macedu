import { glossary } from '../../data/glossary'
import { glossaryAp } from '../../data/glossary-ap'
import Header from '../../components/Header'
import GlossaryIndexClient from '../../components/GlossaryIndexClient'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return [{ curriculum: 'alevel' }, { curriculum: 'ap-economics' }]
}

export async function generateMetadata({ params }) {
  const { curriculum } = await params
  const label = curriculum === 'ap-economics' ? 'AP Economics' : 'A-Level'
  return { title: `${label} Glossary · macroeconomics.education` }
}

export default async function GlossaryIndex({ params }) {
  const { curriculum } = await params
  if (curriculum !== 'alevel' && curriculum !== 'ap-economics') notFound()
  const data = curriculum === 'ap-economics' ? glossaryAp : glossary

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <Header homeHref="/" curriculum={curriculum} />
      <GlossaryIndexClient glossary={data} curriculum={curriculum} />
    </div>
  )
}
