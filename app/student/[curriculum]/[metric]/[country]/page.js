import { metrics } from '../../../../data/metrics'
import { lesson } from '../../../../data/aqa-alevel'
import Header from '../../../../components/Header'
import StudentFramingHeader from '../../../../components/StudentFramingHeader'
import StudentLessonClient from '../../../../components/StudentLessonClient'

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

  const ORANGE = '#F0843C'
  const NAVY   = '#0f1e35'

  const m    = metrics[metric]
  const data = m?.countries?.[country]

  const allCountries = m?.countries || {}
  const lessonData    = lesson[metric] || null
  const correctIcon   = data?.correctIcon   || ''
  const weatherReason = data?.weatherReason || ''

  const metricLabel  = m?.title || metric
  const countryLabel = data?.name || country.toUpperCase()
  const aqaRef       = m?.aqaRef || ''

  return (
    <>
      <Header role="student" homeHref={`/student/${curriculum}`} />

      <StudentFramingHeader subtitle={`${countryLabel} ${metricLabel}${aqaRef ? ` · ${aqaRef}` : ''}`} />

      <div style={{ padding: '20px 16px 64px', maxWidth: 864, margin: '0 auto' }}>

        <StudentLessonClient
          metric={metric}
          country={country}
          data={data}
          aqaRef={aqaRef}
          metricTitle={metricLabel}
          allCountries={allCountries}
          lessonData={lessonData}
          correctIcon={correctIcon}
          weatherReason={weatherReason}
          curriculum={curriculum}
        />
      </div>
    </>
  )
}
