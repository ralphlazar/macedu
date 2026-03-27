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

export default async function StudentLessonPage({ params }) {
  const { curriculum, metric, country } = await params

  const m    = metrics[metric]
  const data = m?.countries?.[country]

  const allCountries = m?.countries || {}

  // Student sees the exercise only -- no classroom time, questions, or discussion prompts.
  // The reveal button is also hidden on the student page.
  const lessonData = lesson[metric] || null

  return (
    <>
      <Header role="student" homeHref={`/student/${curriculum}`} />
      <div style={{ padding: '24px 16px 64px', maxWidth: 864, margin: '0 auto' }}>
        <SnapshotCard
          metric={metric}
          country={country}
          data={data}
          aqaRef={m?.aqaRef || ''}
          metricTitle={m?.title || metric}
          allCountries={allCountries}
          studentMode={true}
        />
        <LessonOverlay
          metric={metric}
          country={country}
          lessonData={lessonData}
          reveal={null}
          curriculum={curriculum}
          showReveal={false}
          studentMode={true}
        />
      </div>
    </>
  )
}
