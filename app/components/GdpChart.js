'use client'
import AnnotatedChart from './AnnotatedChart'

export default function GdpChart({ dates, series }) {
  return <AnnotatedChart dates={dates} series={series} height={150} dark chartType='bar' />
}
