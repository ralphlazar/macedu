'use client'
import AnnotatedChart from './AnnotatedChart'

export default function InflationChart({ dates, series }) {
  return (
    <AnnotatedChart
      dates={dates}
      series={series}
      height={200}
      dark
      target={2}
    />
  )
}
