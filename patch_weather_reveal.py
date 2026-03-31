#!/usr/bin/env python3

BASE = '/Users/lisaswerling/RALPH/AI/macedu'

# ── 1. Student page.js ────────────────────────────────────────────────────────

PATH = f'{BASE}/app/student/[curriculum]/[metric]/[country]/page.js'
with open(PATH, encoding='utf-8') as f:
    src = f.read()

old = """  const lessonData   = lesson[metric] || null
  const reveal       = data?.reveal || ''"""
new = """  const lessonData    = lesson[metric] || null
  const correctIcon   = data?.correctIcon   || ''
  const weatherReason = data?.weatherReason || ''"""
assert old in src, "FAILED: student page reveal block not found"
src = src.replace(old, new)

old = """        <StudentLessonClient
          metric={metric}
          country={country}
          data={data}
          aqaRef={aqaRef}
          metricTitle={metricLabel}
          allCountries={allCountries}
          lessonData={lessonData}
          reveal={reveal}
          curriculum={curriculum}
        />"""
new = """        <StudentLessonClient
          metric={metric}
          country={country}
          data={data}
          aqaRef={aqaRef}
          metricTitle={metricLabel}
          allCountries={allCountries}
          lessonData={lessonData}
          correctIcon={correctIcon}
          weatherReason={weatherReason}
          curriculum={curriculum}
        />"""
assert old in src, "FAILED: student page StudentLessonClient block not found"
src = src.replace(old, new)

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(src)
print("student page.js patched OK")

# ── 2. StudentLessonClient.js ─────────────────────────────────────────────────

PATH = f'{BASE}/app/components/StudentLessonClient.js'
with open(PATH, encoding='utf-8') as f:
    src = f.read()

old = """export default function StudentLessonClient({
  metric, country, data, aqaRef, metricTitle, allCountries,
  lessonData, reveal, curriculum,
}) {"""
new = """export default function StudentLessonClient({
  metric, country, data, aqaRef, metricTitle, allCountries,
  lessonData, correctIcon, weatherReason, curriculum,
}) {"""
assert old in src, "FAILED: StudentLessonClient props not found"
src = src.replace(old, new)

old = """      <LessonOverlay
        metric={metric}
        country={country}
        lessonData={lessonData}
        reveal={reveal}
        curriculum={curriculum}
        showReveal={true}
        studentMode={true}
      />"""
new = """      <LessonOverlay
        metric={metric}
        country={country}
        lessonData={lessonData}
        correctIcon={correctIcon}
        weatherReason={weatherReason}
        curriculum={curriculum}
        showReveal={true}
        studentMode={true}
      />"""
assert old in src, "FAILED: StudentLessonClient LessonOverlay block not found"
src = src.replace(old, new)

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(src)
print("StudentLessonClient.js patched OK")

# ── 3. LessonOverlay.js ───────────────────────────────────────────────────────

PATH = f'{BASE}/app/components/LessonOverlay.js'
with open(PATH, encoding='utf-8') as f:
    src = f.read()

# 3a. WeatherBeat: add correctIcon + weatherReason props, highlight logic
old = """function WeatherBeat({ exercisePrompt, exerciseOptions, reveal, studentDirect }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const color = studentDirect ? ORANGE : BLUE"""
new = """function WeatherBeat({ exercisePrompt, exerciseOptions, correctIcon, weatherReason, studentDirect }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const color = studentDirect ? ORANGE : BLUE"""
assert old in src, "FAILED: WeatherBeat signature not found"
src = src.replace(old, new)

# 3b. Icon button styling: dim wrong, highlight correct after reveal
old = """              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 18px',
                border: `1.5px solid ${isSelected ? color : '#dde6f2'}`,
                borderRadius: 8,
                background: isSelected ? (studentDirect ? '#fff4ee' : '#e8f2fc') : '#f8fafd',
                cursor: revealed && !studentDirect ? 'default' : 'pointer',
                fontSize: 14, fontWeight: isSelected ? 600 : 400,
                color: NAVY, transition: 'all 0.12s', fontFamily: 'inherit',
              }}"""
new = """              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 18px',
                border: revealed
                  ? (cls === correctIcon ? '2px solid #2e9e5b' : '1.5px solid #dde6f2')
                  : `1.5px solid ${isSelected ? color : '#dde6f2'}`,
                borderRadius: 8,
                background: revealed
                  ? (cls === correctIcon ? '#edf7f1' : '#f8fafd')
                  : (isSelected ? (studentDirect ? '#fff4ee' : '#e8f2fc') : '#f8fafd'),
                opacity: revealed && cls !== correctIcon ? 0.4 : 1,
                cursor: revealed && !studentDirect ? 'default' : 'pointer',
                fontSize: 14, fontWeight: isSelected ? 600 : 400,
                color: NAVY, transition: 'all 0.15s', fontFamily: 'inherit',
              }}"""
assert old in src, "FAILED: button style block not found"
src = src.replace(old, new)

# 3c. Reveal box: show weatherReason instead of reveal prop
old = """      {revealed && reveal && (
        <div style={{
          background: '#f4f7fb', border: '1px solid #e2eaf4',
          borderRadius: 10, padding: '14px 16px', marginTop: 4,
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: BLUE, marginBottom: 6,
            fontFamily: "'IBM Plex Mono', monospace",
          }}>
            Editorial judgment
          </div>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: NAVY }}>
            {reveal}
          </p>
        </div>
      )}"""
new = """      {revealed && weatherReason && (
        <div style={{
          background: '#edf7f1', border: '1px solid #b8e6cc',
          borderRadius: 10, padding: '14px 16px', marginTop: 4,
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: '#2e9e5b', marginBottom: 6,
            fontFamily: "'IBM Plex Mono', monospace",
          }}>
            Editorial judgment
          </div>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: NAVY }}>
            {weatherReason}
          </p>
        </div>
      )}"""
assert old in src, "FAILED: reveal box not found"
src = src.replace(old, new)

# 3d. Update WeatherBeat call sites (teacher, direct student, tasked student)
for old, new in [
    (
        """              <WeatherBeat
                  exercisePrompt={exercisePrompt}
                  exerciseOptions={exerciseOptions}
                  reveal={reveal}
                  studentDirect={false}
                />""",
        """              <WeatherBeat
                  exercisePrompt={exercisePrompt}
                  exerciseOptions={exerciseOptions}
                  correctIcon={correctIcon}
                  weatherReason={weatherReason}
                  studentDirect={false}
                />"""
    ),
    (
        """              <WeatherBeat
                  exercisePrompt={exercisePrompt}
                  exerciseOptions={exerciseOptions}
                  reveal={reveal}
                  studentDirect={true}
                />""",
        """              <WeatherBeat
                  exercisePrompt={exercisePrompt}
                  exerciseOptions={exerciseOptions}
                  correctIcon={correctIcon}
                  weatherReason={weatherReason}
                  studentDirect={true}
                />"""
    ),
]:
    assert old in src, f"FAILED: WeatherBeat call site not found"
    src = src.replace(old, new)

# 3e. Update LessonOverlay props signature to accept correctIcon + weatherReason
old = """export default function LessonOverlay({
  metric,
  country,
  lessonData,
  reveal,
  curriculum,
  showReveal  = true,
  studentMode = false,
}) {"""
new = """export default function LessonOverlay({
  metric,
  country,
  lessonData,
  correctIcon   = '',
  weatherReason = '',
  curriculum,
  showReveal  = true,
  studentMode = false,
}) {"""
assert old in src, "FAILED: LessonOverlay props not found"
src = src.replace(old, new)

# 3f. Remove old reveal from destructuring (it's no longer a prop)
old = "  const { exercisePrompt, exerciseOptions, chartDiscussion, sampleQuestions, discussionPrompts } = lessonData"
# unchanged -- fine, reveal was never destructured from lessonData

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(src)
print("LessonOverlay.js patched OK")

print("\nAll patches applied.")
