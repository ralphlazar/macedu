export function glossaryHref(slug, curriculum = 'alevel') {
  return `/glossary/${curriculum}/${slug}`
}

export function glossaryIndexHref(curriculum) {
  return '/glossary'
}
