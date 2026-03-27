'use client'
import AnnotatedChart from './AnnotatedChart'

export default function ExchangeRatesChart({ dates, series }) {
  return <AnnotatedChart dates={dates} series={series} height={200} dark />
}
