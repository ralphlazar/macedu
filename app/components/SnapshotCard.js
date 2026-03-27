import AnnotatedChart from './AnnotatedChart'
import CountryComparison from './CountryComparison'
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

export default function SnapshotCard({
  metric, country, data, aqaRef, metricTitle, allCountries,
}) {
  if (!data) return null
  const { flag, name, value, direction, releasedDaysAgo, blurb, chartDates, chartSeries } = data

  const ChartComponent = CHARTS[metric] || AnnotatedChart

  return (
    <div style={{
      background: NAVY,
      borderRadius: 16,
      padding: '32px',
      margin: '0 auto',
      maxWidth: 800,
      position: 'relative',
      boxSizing: 'border-box',
    }}>

      {/* Snapshot tab */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        background: BLUE,
        borderRadius: '0 16px 0 8px',
        padding: '6px 14px',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'white',
        lineHeight: 1.4,
        textAlign: 'center',
      }}>
        Snapshot<br/>card
      </div>

      {/* Badges row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <span style={{
          fontSize: 11,
          color: 'rgba(255,255,255,0.5)',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 6,
          padding: '3px 10px',
        }}>
          {releasedDaysAgo === 0 ? 'Released today' : `Released ${releasedDaysAgo}d ago`}
        </span>
        <span style={{
          fontSize: 11,
          color: BLUE,
          background: 'rgba(55,138,221,0.15)',
          borderRadius: 6,
          padding: '3px 10px',
          fontWeight: 600,
        }}>
          AQA {aqaRef}
        </span>
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
        {metricTitle}
      </div>

      {/* Value */}
      <div style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: 64,
        color: 'white',
        lineHeight: 1,
        marginBottom: 20,
      }}>
        {value}
      </div>

      {/* Blurb */}
      {blurb && (
        <p style={{
          fontSize: 15,
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.75)',
          margin: '0 0 24px',
        }}>
          {blurb}
        </p>
      )}

      {/* Chart */}
      <div style={{ marginBottom: 24 }}>
        <ChartComponent
          dates={chartDates || []}
          series={chartSeries || []}
        />
      </div>

      {/* Country comparison */}
      {allCountries && (
        <CountryComparison
          metric={metric}
          currentCountry={country}
          snapshots={allCountries}
        />
      )}
    </div>
  )
}
