'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { wrapGlossaryTerms } from '../utils/wrapGlossaryTerms'

const NAVY   = '#0f1e35'
const BLUE   = '#378ADD'
const ORANGE = '#F0843C'
const PINK   = '#c2185b'

const ICON_FILTERS = {
  sunny:  {},
  cloudy: { filter: 'brightness(1.05) contrast(0.8) saturate(0.05) grayscale(1)' },
  stormy: { filter: 'brightness(.1) contrast(1.2) saturate(0)' },
}

function iconCls(icon) {
  if (icon === '☀️') return 'sunny'
  if (icon === '⛈️') return 'stormy'
  return 'cloudy'
}

function BeatDot({ n, color }) {
  return (
    <div style={{
      width: 26, height: 26, borderRadius: '50%',
      background: color, color: 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 700,
      fontFamily: "'IBM Plex Mono', monospace",
      flexShrink: 0, position: 'relative', zIndex: 1,
    }}>
      {n}
    </div>
  )
}

function BeatLabel({ label, time, color }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <span style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.09em',
        textTransform: 'uppercase', color,
        fontFamily: "'IBM Plex Mono', monospace",
      }}>
        {label}
      </span>
      {time && (
        <span style={{
          fontSize: 10, color: '#8099b8', marginLeft: 8,
          fontFamily: "'IBM Plex Mono', monospace",
        }}>
          {time}
        </span>
      )}
    </div>
  )
}

function TeacherNote({ text }) {
  if (!text) return null
  return (
    <div style={{
      marginTop: 12, background: '#fdf0f5',
      borderLeft: `3px solid ${PINK}`,
      borderRadius: '0 6px 6px 0', padding: '8px 12px',
    }}>
      <div style={{
        fontSize: 9, fontWeight: 700, letterSpacing: '0.09em',
        textTransform: 'uppercase', color: PINK,
        fontFamily: "'IBM Plex Mono', monospace", marginBottom: 4,
      }}>
        Teacher note
      </div>
      <div style={{ fontSize: 11, color: '#7a3050', lineHeight: 1.55 }}>{text}</div>
    </div>
  )
}

function WeatherBeat({ exercisePrompt, exerciseOptions, reveal, studentDirect }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const color = studentDirect ? ORANGE : BLUE

  return (
    <>
      <p style={{ fontSize: 13, color: NAVY, margin: '0 0 14px', lineHeight: 1.55 }}>
        {exercisePrompt}
      </p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
        {(exerciseOptions || []).map((opt, i) => {
          const isSelected = selected === i
          const cls = opt.cls || iconCls(opt.icon)
          return (
            <button
              key={i}
              onClick={() => {
                if (!revealed) {
                  setSelected(i)
                  if (studentDirect) setRevealed(true)
                }
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 18px',
                border: `1.5px solid ${isSelected ? color : '#dde6f2'}`,
                borderRadius: 8,
                background: isSelected ? (studentDirect ? '#fff4ee' : '#e8f2fc') : '#f8fafd',
                cursor: revealed && !studentDirect ? 'default' : 'pointer',
                fontSize: 14, fontWeight: isSelected ? 600 : 400,
                color: NAVY, transition: 'all 0.12s', fontFamily: 'inherit',
              }}
            >
              <span style={{ fontSize: 22, lineHeight: 1, ...ICON_FILTERS[cls] }}>
                {opt.icon}
              </span>
              {opt.label}
            </button>
          )
        })}
      </div>

      {/* Teacher: explicit reveal button */}
      {!studentDirect && !revealed && (
        <button
          onClick={() => { if (selected !== null) setRevealed(true) }}
          disabled={selected === null}
          style={{
            background: selected !== null ? BLUE : '#e2eaf4',
            color: selected !== null ? 'white' : '#a0b0c8',
            border: 'none', borderRadius: 8,
            padding: '10px 22px', fontSize: 13, fontWeight: 600,
            cursor: selected !== null ? 'pointer' : 'default',
            transition: 'background 0.15s', fontFamily: 'inherit',
          }}
        >
          Reveal
        </button>
      )}

      {/* Student direct: reveal button before selection */}
      {studentDirect && !revealed && (
        <button
          onClick={() => { if (selected !== null) setRevealed(true) }}
          disabled={selected === null}
          style={{
            background: selected !== null ? ORANGE : '#e2eaf4',
            color: selected !== null ? 'white' : '#a0b0c8',
            border: 'none', borderRadius: 8,
            padding: '10px 22px', fontSize: 13, fontWeight: 600,
            cursor: selected !== null ? 'pointer' : 'default',
            transition: 'background 0.15s', fontFamily: 'inherit',
          }}
        >
          Reveal editorial judgment
        </button>
      )}

      {revealed && reveal && (
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
      )}
    </>
  )
}

export default function LessonOverlay({
  metric,
  country,
  lessonData,
  reveal,
  curriculum,
  showReveal  = true,
  studentMode = false,
}) {
  const [checkedQs, setCheckedQs] = useState([])
  const [checkedDs, setCheckedDs] = useState([])

  const searchParams = useSearchParams()

  if (!lessonData) return null
  const { exercisePrompt, exerciseOptions, chartDiscussion, sampleQuestions, discussionPrompts } = lessonData

  // ── Mode detection ───────────────────────────────────────────
  const qParam = searchParams.get('q')
  const dParam = searchParams.get('d')
  const isTasked = studentMode && (!!qParam || !!dParam)
  const isDirect = studentMode && !qParam && !dParam

  const studentQIndices = isTasked && qParam
    ? qParam.split(',').map(Number).filter(n => !isNaN(n))
    : null
  const studentDIndices = isTasked && dParam
    ? dParam.split(',').map(Number).filter(n => !isNaN(n))
    : null

  const toggleQ = (i) => setCheckedQs(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  const toggleD = (i) => setCheckedDs(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  const totalSelected = checkedQs.length + checkedDs.length

  const handleShare = async () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const params = ['t=1']
    if (checkedQs.length > 0) params.push(`q=${[...checkedQs].sort((a,b)=>a-b).join(',')}`)
    if (checkedDs.length > 0) params.push(`d=${[...checkedDs].sort((a,b)=>a-b).join(',')}`)
    const qs = `?${params.join('&')}`
    const url = `${origin}/student/${curriculum}/${metric}/${country}${qs}`
    try {
      await navigator.clipboard.writeText(url)
      alert('Student link copied to clipboard.')
    } catch {
      alert('Student link: ' + url)
    }
  }

  const dotColor = studentMode ? ORANGE : BLUE

  // ── Beat definitions per mode ────────────────────────────────
  const teacherBeats = [
    { n: 1, label: 'Chart discussion',  time: '5 min'   },
    { n: 2, label: 'Weather icon',      time: '+5 min'  },
    { n: 3, label: 'Written response',  time: '+10 min' },
    { n: 4, label: 'Discussion',        time: '+10 min' },
  ]

  const directBeats = [
    { n: 1, label: 'What this chart is telling you', time: null },
    { n: 2, label: "What's your read on this?",      time: null },
    { n: 3, label: 'Exam questions on this data',    time: null },
  ]

  const taskedBeats = [
    { n: 1, label: "What's your read on this?",      time: null, show: true },
    { n: 2, label: 'Questions',                       time: null, show: !!(studentQIndices && studentQIndices.length > 0) },
    { n: 3, label: 'Discussion',                      time: null, show: !!(studentDIndices && studentDIndices.length > 0) },
  ].filter(b => b.show)

  const beats = !studentMode ? teacherBeats : isDirect ? directBeats : taskedBeats

  const isLast = (i) => i === beats.length - 1

  return (
    <div style={{
      maxWidth: 800, margin: '28px auto 0',
      fontFamily: 'sans-serif', boxSizing: 'border-box',
    }}>

      {/* Tasked: teacher-selected indicator */}
      {isTasked && (studentQIndices?.length > 0 || studentDIndices?.length > 0) && (
        <div style={{
          fontSize: 11, color: ORANGE,
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: '0.05em', marginBottom: 16,
        }}>
          Your teacher selected these tasks.
        </div>
      )}

      {beats.map((beat, bi) => (
        <div key={beat.n} style={{ display: 'grid', gridTemplateColumns: '56px minmax(0, 1fr)' }}>

          {/* Spine */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <BeatDot n={beat.n} color={dotColor} />
            {!isLast(bi) && (
              <div style={{ flex: 1, width: 2, background: '#e0e8f0', margin: '4px 0' }} />
            )}
          </div>

          {/* Content */}
          <div style={{ paddingLeft: 20, paddingBottom: isLast(bi) ? 40 : 20 }}>
            <div style={{
              background: 'white', border: '1px solid #e0e8f0',
              borderRadius: 10, padding: '16px 20px',
            }}>
              <BeatLabel label={beat.label} time={beat.time} color={dotColor} />

              {/* ── TEACHER BEATS ── */}

              {/* T-Beat 1: Chart discussion */}
              {!studentMode && beat.n === 1 && chartDiscussion && chartDiscussion.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {chartDiscussion.slice(0, 3).map((point, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{
                        flexShrink: 0, width: 20, height: 20, borderRadius: '50%',
                        border: '1.5px solid #c8d8ea',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 10, fontWeight: 500, color: '#8099b8', marginTop: 1,
                      }}>
                        {i + 1}
                      </span>
                      <span style={{ fontSize: 13, color: NAVY, lineHeight: 1.6 }}>
                        {wrapGlossaryTerms(point)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* T-Beat 2: Weather icon (teacher) */}
              {!studentMode && beat.n === 2 && (
                <WeatherBeat
                  exercisePrompt={exercisePrompt}
                  exerciseOptions={exerciseOptions}
                  reveal={reveal}
                  studentDirect={false}
                />
              )}

              {/* T-Beat 3: Written response */}
              {!studentMode && beat.n === 3 && sampleQuestions && (
                <>
                  <p style={{ fontSize: 11, color: '#8099b8', margin: '0 0 14px', fontStyle: 'italic' }}>
                    Tick questions to include on the student link.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {sampleQuestions.map((item, i) => (
                      <label key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={checkedQs.includes(i)}
                          onChange={() => toggleQ(i)}
                          style={{ marginTop: 3, width: 16, height: 16, accentColor: BLUE, cursor: 'pointer', flexShrink: 0 }}
                        />
                        <span style={{ fontSize: 13, color: NAVY, lineHeight: 1.6 }}>
                          <span style={{ color: BLUE, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>
                            {String.fromCharCode(65 + i)}.{' '}
                          </span>
                          {wrapGlossaryTerms(item.q)}
                        </span>
                      </label>
                    ))}
                  </div>
                </>
              )}

              {/* T-Beat 4: Discussion + share */}
              {!studentMode && beat.n === 4 && discussionPrompts && (
                <>
                  <p style={{ fontSize: 11, color: '#8099b8', margin: '0 0 14px', fontStyle: 'italic' }}>
                    Tick prompts to include on the student link.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {discussionPrompts.map((item, i) => {
                      const promptText = typeof item === 'string' ? item : item.p
                      return (
                        <label key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={checkedDs.includes(i)}
                            onChange={() => toggleD(i)}
                            style={{ marginTop: 3, width: 16, height: 16, accentColor: BLUE, cursor: 'pointer', flexShrink: 0 }}
                          />
                          <span style={{ fontSize: 13, color: NAVY, lineHeight: 1.55 }}>
                            <span style={{ color: BLUE, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>
                              {String.fromCharCode(65 + i)}.{' '}
                            </span>
                            {wrapGlossaryTerms(promptText)}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                  <div style={{
                    marginTop: 20, paddingTop: 16,
                    borderTop: '0.5px solid #e8eef4',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}>
                    <button
                      onClick={handleShare}
                      style={{
                        background: 'none', border: '1.5px solid #dde6f2',
                        borderRadius: 8, padding: '10px 20px',
                        fontSize: 13, color: '#5a7a99', cursor: 'pointer',
                        fontWeight: 500, fontFamily: 'inherit',
                      }}
                    >
                      Copy student link
                    </button>
                    {totalSelected > 0 && (
                      <span style={{ fontSize: 12, color: '#8099b8' }}>
                        {totalSelected} item{totalSelected > 1 ? 's' : ''} selected
                      </span>
                    )}
                  </div>
                </>
              )}

              {/* ── DIRECT STUDENT BEATS ── */}

              {/* D-Beat 1: Chart discussion questions */}
              {isDirect && beat.n === 1 && chartDiscussion && chartDiscussion.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {chartDiscussion.slice(0, 3).map((point, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{
                        flexShrink: 0, width: 20, height: 20, borderRadius: '50%',
                        border: '1.5px solid #fcd9c0',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 10, fontWeight: 500, color: ORANGE, marginTop: 1,
                      }}>
                        {i + 1}
                      </span>
                      <span style={{ fontSize: 13, color: NAVY, lineHeight: 1.6 }}>
                        {wrapGlossaryTerms(point)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* D-Beat 2: Weather icon (direct student — auto-reveal on click) */}
              {isDirect && beat.n === 2 && (
                <WeatherBeat
                  exercisePrompt={exercisePrompt}
                  exerciseOptions={exerciseOptions}
                  reveal={reveal}
                  studentDirect={true}
                />
              )}

              {/* D-Beat 3: Exam questions */}
              {isDirect && beat.n === 3 && sampleQuestions && (
                <>
                  <p style={{ fontSize: 11, color: '#8099b8', margin: '0 0 14px', fontStyle: 'italic' }}>
                    These are the types of question you will see in Paper 2.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {sampleQuestions.map((item, i) => (
                      <div key={i} style={{ fontSize: 13, color: NAVY, lineHeight: 1.6 }}>
                        <span style={{ color: ORANGE, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>
                          {String.fromCharCode(65 + i)}.{' '}
                        </span>
                        {wrapGlossaryTerms(item.q)}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* ── TASKED STUDENT BEATS ── */}

              {/* Tasked-Beat 1: Weather icon */}
              {isTasked && beat.n === 1 && (
                <WeatherBeat
                  exercisePrompt={exercisePrompt}
                  exerciseOptions={exerciseOptions}
                  reveal={reveal}
                  studentDirect={true}
                />
              )}

              {/* Tasked-Beat 2: Selected questions */}
              {isTasked && beat.n === 2 && sampleQuestions && studentQIndices && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {studentQIndices.map((qi, i) => {
                    const item = sampleQuestions[qi]
                    if (!item) return null
                    return (
                      <div key={qi} style={{ fontSize: 13, color: NAVY, lineHeight: 1.6 }}>
                        <span style={{ color: ORANGE, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>
                          {String.fromCharCode(65 + i)}.{' '}
                        </span>
                        {wrapGlossaryTerms(item.q)}
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Tasked-Beat 3: Selected discussion prompts */}
              {isTasked && beat.n === 3 && discussionPrompts && studentDIndices && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {studentDIndices.map((di, i) => {
                    const item = discussionPrompts[di]
                    if (!item) return null
                    const promptText = typeof item === 'string' ? item : item.p
                    return (
                      <div key={di} style={{ fontSize: 13, color: NAVY, lineHeight: 1.55 }}>
                        <span style={{ color: ORANGE, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>
                          {String.fromCharCode(65 + i)}.{' '}
                        </span>
                        {wrapGlossaryTerms(promptText)}
                      </div>
                    )
                  })}
                </div>
              )}

            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
