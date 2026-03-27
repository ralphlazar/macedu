import AnnotatedChart from './AnnotatedChart'
import InflationChart from './InflationChart'
import UnemploymentChart from './UnemploymentChart'
import GdpChart from './GdpChart'
import InterestRatesChart from './InterestRatesChart'
import ExchangeRatesChart from './ExchangeRatesChart'
import TradeChart from './TradeChart'

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

export default function SnapshotCard({
  metric, country, data, aqaRef, metricTitle, allCountries, studentMode = false,
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
      <div style={{
        position: 'absolute',
        top: 24,
        right: 28,
        textAlign: 'right',
      }}>
        <div style={{
          fontSize: 15,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.85)',
          fontFamily: "'IBM Plex Mono', monospace",
          marginBottom: 4,
        }}>
          {releasedDaysAgo === 0
            ? 'Released today'
            : <>Released <span style={{ color: '#5dd8f5' }}>{releasedDaysAgo}d</span> ago</>}
        </div>
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
        <span style={{ fontSize: 36, lineHeight: 1 }}>{flag}</span>
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

      {/* Blurb (teacher) or prompt (student) */}
      {studentMode ? (
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
      ) : blurb ? (
        <p style={{
          fontSize: 13,
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.75)',
          margin: '0 0 16px',
        }}>
          {blurb}
        </p>
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
