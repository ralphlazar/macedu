'use client'
import { useSearchParams } from 'next/navigation'
import SnapshotCard from './SnapshotCard'
import LessonOverlay from './LessonOverlay'

export default function StudentLessonClient({
  metric, country, data, aqaRef, metricTitle, allCountries,
  lessonData, correctIcon, weatherReason, curriculum,
}) {
  const searchParams = useSearchParams()
  const isTasked = !!(searchParams.get('t') || searchParams.get('q') || searchParams.get('d'))

  return (
    <>
      <SnapshotCard
        metric={metric}
        country={country}
        data={data}
        aqaRef={aqaRef}
        metricTitle={metricTitle}
        allCountries={allCountries}
        studentMode={true}
        showBlurb={!isTasked}
      />
      <LessonOverlay
        metric={metric}
        country={country}
        lessonData={lessonData}
        correctIcon={correctIcon}
        weatherReason={weatherReason}
        curriculum={curriculum}
        showReveal={true}
        studentMode={true}
      />
    </>
  )
}
