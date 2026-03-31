import AnnotatedChart from './AnnotatedChart'
import InflationChart from './InflationChart'
import UnemploymentChart from './UnemploymentChart'
import GdpChart from './GdpChart'
import InterestRatesChart from './InterestRatesChart'
import ExchangeRatesChart from './ExchangeRatesChart'
import TradeChart from './TradeChart'
import { wrapGlossaryTerms } from '../utils/wrapGlossaryTerms'

const NAVY = '#0f1e35'
const BLUE = '#378ADD'

const CHARTS = {
  inflation:        InflationChart,
  unemployment:     UnemploymentChart,
  gdp:              GdpChart,
  'interest-rates': InterestRatesChart,
  'exchange-rates': ExchangeRatesChart,
  trade:            TradeChart,
}

const METRIC_DESCRIPTORS = {
  'inflation':      'Inflation (year-on-year, %)',
  'unemployment':   'Unemployment (% of labour force)',
  'gdp':            'GDP growth (year-on-year, %)',
  'interest-rates': 'Policy rate (%)',
  'exchange-rates': null, // handled per country below
  'trade':          'Current account (% of GDP)',
}

const FX_LABELS = {
  'uk':       'GBP / USD',
  'us':       'DXY (Dollar Index)',
  'eurozone': 'EUR / USD',
  'china':    'USD / CNY',
  'japan':    'USD / JPY',
  'brazil':   'USD / BRL',
}


const CADENCE_DAYS = {
  'inflation':      30,
  'unemployment':   30,
  'gdp':            90,
  'interest-rates': 45,
  'exchange-rates': 0,
  'trade':          90,
}

function nextReleaseLabel(metric, releasedDaysAgo) {
  if (metric === 'exchange-rates') return { prefix: 'Updated daily', days: null }
  const cadence = CADENCE_DAYS[metric] || 30
  const days = cadence - (releasedDaysAgo || 0)
  if (days <= 0) return { prefix: 'Due any day', days: null }
  return { prefix: 'Next release: ', days: `~${days}d` }
}

export default function SnapshotCard({
  metric, country, data, aqaRef, metricTitle, allCountries, studentMode = false, showBlurb = true,
}) {
  if (!data) return null
  const { flag, name, value, releasedDaysAgo, blurb, chartDates, chartSeries } = data

  const ChartComponent = CHARTS[metric] || AnnotatedChart

  return (
    <div style={{
      background: NAVY,
      borderRadius: 16,
      padding: '32px',
      margin: '0 auto',
      maxWidth: 800,
      boxSizing: 'border-box',
      position: 'relative',
    }}>

      {/* Badges — top right */}
      <style>{`
        @keyframes throb-cyan {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .days-throb {
          color: #00e5ff;
          font-size: 14px;
          animation: throb-cyan 1.1s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>
      <div style={{
        position: 'absolute',
        top: 24,
        right: 28,
        textAlign: 'right',
      }}>
        {!studentMode && (() => {
          const rel = nextReleaseLabel(metric, releasedDaysAgo)
          return (
            <div style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.55)',
              fontFamily: "'IBM Plex Mono', monospace",
              marginBottom: 4,
              letterSpacing: '0.04em',
            }}>
              {rel.prefix}
              {rel.days && <span className="days-throb">{rel.days}</span>}
            </div>
          )
        })()}
        <div style={{
          fontSize: 11,
          fontWeight: 600,
          color: BLUE,
          letterSpacing: '0.08em',
          fontFamily: "'IBM Plex Mono', monospace",
        }}>
          AQA {aqaRef}
        </div>
      </div>

      {/* Flag + country name */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
        <span style={{ fontSize: 24, lineHeight: "13px" }}>{flag}</span>
        <span style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 30,
          color: 'white',
          fontWeight: 400,
          lineHeight: 1.1,
        }}>
          {name}
        </span>
      </div>

      {/* Metric label */}
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: BLUE,
        marginBottom: 12,
      }}>
        {metric === 'exchange-rates'
          ? FX_LABELS[country] || metricTitle
          : METRIC_DESCRIPTORS[metric] || metricTitle}
      </div>

      {/* Value */}
      <div style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: 30,
        color: 'white',
        lineHeight: 1,
        marginBottom: 12,
      }}>
        {value}
      </div>

      {/* DXY callout — US exchange rates only */}
      {metric === 'exchange-rates' && country === 'us' && (
        <div style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.55)',
          fontFamily: "'IBM Plex Sans', sans-serif",
          lineHeight: 1.55,
          marginBottom: 12,
          borderLeft: '2px solid rgba(55,138,221,0.4)',
          paddingLeft: 10,
        }}>
          <span style={{ color: '#85B7EB', fontWeight: 600 }}>DXY — Dollar Index.</span> Measures the dollar against a basket of 6 currencies. Rises when the dollar strengthens.
        </div>
      )}

      {/* Blurb or student prompt */}
      {studentMode && !showBlurb && (
        <p style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 22,
          lineHeight: 1.3,
          color: 'white',
          margin: '0 0 16px',
          fontWeight: 400,
        }}>
          What is this chart telling you?
        </p>
      )}
      {showBlurb && (Array.isArray(blurb) && blurb.length > 0) ? (
        <ul style={{ margin: '0 0 16px', padding: 0, listStyle: 'none' }}>
          {blurb.slice(0, 3).map((point, i) => (
            <li key={i} style={{
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
              fontSize: 13,
              lineHeight: 1.55,
              color: 'rgba(255,255,255,0.75)',
              marginBottom: i < blurb.length - 1 ? 10 : 0,
            }}>
              <span style={{
                flexShrink: 0,
                width: 20,
                height: 20,
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.7)',
                marginTop: 1,
              }}>
                {i + 1}
              </span>
              <span>{wrapGlossaryTerms(point)}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {/* Chart */}
      <ChartComponent
        dates={chartDates || []}
        series={chartSeries || []}
        height={150}
      />

    </div>
  )
}
