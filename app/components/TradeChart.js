'use client'
import AnnotatedChart from './AnnotatedChart'

export default function TradeChart({ dates, series }) {
  return <AnnotatedChart dates={dates} series={series} height={180} dark chartType='bar' colorBySign />
}
