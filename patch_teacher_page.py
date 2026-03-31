#!/usr/bin/env python3

PATH = '/Users/lisaswerling/RALPH/AI/macedu/app/teacher/[curriculum]/[metric]/[country]/page.js'

with open(PATH, encoding='utf-8') as f:
    src = f.read()

old = """  // Editorial judgment reveal text for this country
  const reveal = data?.reveal || ''"""

new = """  // Weather exercise: correct icon and reason
  const correctIcon   = data?.correctIcon   || ''
  const weatherReason = data?.weatherReason || ''"""

assert old in src, "FAILED: reveal block not found"
src = src.replace(old, new)

old = """        <LessonOverlay
          metric={metric}
          country={country}
          lessonData={lessonData}
          reveal={reveal}
          curriculum={curriculum}
          showReveal={true}
          studentMode={false}
        />"""

new = """        <LessonOverlay
          metric={metric}
          country={country}
          lessonData={lessonData}
          correctIcon={correctIcon}
          weatherReason={weatherReason}
          curriculum={curriculum}
          showReveal={true}
          studentMode={false}
        />"""

assert old in src, "FAILED: LessonOverlay block not found"
src = src.replace(old, new)

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(src)

print("teacher page.js patched OK")
