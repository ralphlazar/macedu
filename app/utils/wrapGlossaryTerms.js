import { glossary } from '../data/glossary'
import GlossaryTerm from '../components/GlossaryTerm'

// Sort longest terms first so 'aggregate demand' is matched before 'demand'
const sorted = [...glossary].sort((a, b) => b.term.length - a.term.length)

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const pattern = new RegExp(
  '(' + sorted.map(t => '\\b' + escapeRegex(t.term) + '\\b').join('|') + ')',
  'gi'
)

const termMap = {}
sorted.forEach(entry => { termMap[entry.term.toLowerCase()] = entry })

export function wrapGlossaryTerms(text) {
  if (!text || typeof text !== 'string') return text

  const parts = text.split(pattern)
  if (parts.length === 1) return text

  const seen = new Set()

  return parts.map((part, i) => {
    if (i % 2 === 0) return part || null
    const key = part.toLowerCase()
    const entry = termMap[key]
    if (!entry) return part
    if (seen.has(key)) return part
    seen.add(key)
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
