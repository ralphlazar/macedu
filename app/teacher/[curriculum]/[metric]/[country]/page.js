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

  const BLUE = '#378ADD'
  const NAVY = '#0f1e35'

  const beats = [
    { n: 1, label: 'Chart discussion', time: '5 min'   },
    { n: 2, label: 'Weather icon',     time: '+5 min'  },
    { n: 3, label: 'Written response', time: '+10 min' },
    { n: 4, label: 'Discussion',       time: '+10 min' },
  ]

  return (
    <>
      <Header role="teacher" homeHref={`/teacher/${curriculum}`} />

      {/* Framing line */}
      <div style={{
        background: '#eef5fc',
        borderBottom: '1px solid #d0e4f5',
        padding: '14px 28px',
        fontFamily: 'sans-serif',
      }}>
        <div style={{ maxWidth: 864, margin: '0 auto' }}>
          <div style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 22, fontWeight: 400, color: NAVY, marginBottom: 4,
          }}>
            Your lesson is ready.
          </div>
          <div style={{
            fontSize: 12, color: '#8099b8',
            fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.04em',
          }}>
            30 minutes · built around today's data · share with one click
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 16px 64px', maxWidth: 864, margin: '0 auto' }}>

        {/* Lesson plan box */}
        <div style={{
          background: 'white',
          border: '1px solid #e0e8f0',
          borderRadius: 12,
          padding: '18px 24px',
          marginBottom: 20,
        }}>
          <div style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: BLUE, marginBottom: 14,
            fontFamily: "'IBM Plex Mono', monospace",
          }}>
            Lesson plan · 30 min
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {beats.map((beat, i) => (
              <div key={beat.n} style={{ display: 'flex', alignItems: 'center', flex: i < beats.length - 1 ? '1' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <div style={{
                    background: BLUE, color: 'white', borderRadius: '50%',
                    width: 22, height: 22,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700,
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}>
                    {beat.n}
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: BLUE, fontFamily: "'IBM Plex Mono', monospace" }}>
                      {beat.time}
                    </div>
                    <div style={{ fontSize: 11, color: NAVY, whiteSpace: 'nowrap' }}>
                      {beat.label}
                    </div>
                  </div>
                </div>
                {i < beats.length - 1 && (
                  <div style={{ flex: 1, height: 1, background: '#c8d8ea', margin: '0 12px', minWidth: 16 }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Today's data label */}
        <div style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: '#8099b8', marginBottom: 8,
          fontFamily: "'IBM Plex Mono', monospace",
        }}>
          Today's data
        </div>

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
