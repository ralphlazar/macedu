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
  const lessonData   = lesson[metric] || null
  const reveal       = data?.reveal || ''

  const metricLabel  = m?.title || metric
  const countryLabel = data?.name || country.toUpperCase()
  const aqaRef       = m?.aqaRef || ''

  return (
    <>
      <Header role="student" homeHref={`/student/${curriculum}`} />

      <StudentFramingHeader subtitle={`${countryLabel} ${metricLabel}${aqaRef ? ` · ${aqaRef}` : ''}`} />

      <div style={{ padding: '20px 16px 64px', maxWidth: 864, margin: '0 auto' }}>

        {/* Today's data label */}
        <div style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: '#8099b8', marginBottom: 8,
          fontFamily: "'IBM Plex Mono', monospace",
        }}>
          Today's data
        </div>

        <StudentLessonClient
          metric={metric}
          country={country}
          data={data}
          aqaRef={aqaRef}
          metricTitle={metricLabel}
          allCountries={allCountries}
          lessonData={lessonData}
          reveal={reveal}
          curriculum={curriculum}
        />
      </div>
    </>
  )
}
