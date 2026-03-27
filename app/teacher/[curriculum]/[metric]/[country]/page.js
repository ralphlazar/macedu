import { metrics } from '../../../../data/metrics'
import { lesson } from '../../../../data/aqa-alevel'
import Header from '../../../../components/Header'
import SnapshotCard from '../../../../components/SnapshotCard'
import LessonOverlay from '../../../../components/LessonOverlay'

const METRIC_SLUGS  = ['inflation', 'unemployment', 'gdp', 'interest-rates', 'exchange-rates', 'trade']
const COUNTRY_SLUGS = ['uk', 'us', 'eurozone', 'china', 'japan', 'brazil']

export async function generateStaticParams() {
  const params = []
  for (const metricSlug of METRIC_SLUGS) {
    for (const countrySlug of COUNTRY_SLUGS) {
      params.push({
        curriculum: 'alevel',
        metric:     metricSlug,
        country:    countrySlug,
      })
    }
  }
  return params
}

export async function generateMetadata({ params }) {
  const { metric, country } = await params
  const m = metrics[metric]
  const c = m?.countries?.[country]
  const name = c?.name || country.toUpperCase()
  return {
    title: `${m?.title ?? metric} -- ${name} | macroeconomics.education`,
  }
}

export default async function TeacherLessonPage({ params }) {
  const { curriculum, metric, country } = await params

  const m    = metrics[metric]
  const data = m?.countries?.[country]

  // All country data for the comparison strip
  const allCountries = m?.countries || {}

  // Lesson content (AQA A-level layer)
  const lessonData = lesson[metric] || null

  // Editorial judgment reveal text for this country
  const reveal = data?.reveal || ''

  return (
    <>
      <Header role="teacher" homeHref={`/teacher/${curriculum}`} />
      <div style={{ padding: '24px 16px 64px', maxWidth: 864, margin: '0 auto' }}>
        <SnapshotCard
          metric={metric}
          country={country}
          data={data}
          aqaRef={m?.aqaRef || ''}
          metricTitle={m?.title || metric}
          allCountries={allCountries}
        />
        <LessonOverlay
          metric={metric}
          country={country}
          lessonData={lessonData}
          reveal={reveal}
          curriculum={curriculum}
          showReveal={true}
          studentMode={false}
        />
      </div>
    </>
  )
}
