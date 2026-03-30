import { glossary } from '../data/glossary'
import Header from '../components/Header'
import GlossaryIndexClient from '../components/GlossaryIndexClient'

export const metadata = { title: 'Glossary · macroeconomics.education' }

export default function GlossaryIndex() {
  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <Header homeHref="/" />
      <GlossaryIndexClient glossary={glossary} />
    </div>
  )
}
