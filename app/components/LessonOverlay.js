'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { wrapGlossaryTerms } from '../utils/wrapGlossaryTerms'

const NAVY = '#0f1e35'
const BLUE = '#378ADD'
const PINK = '#c2185b'

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

function Divider() {
  return (
    <hr style={{
      border: 'none',
      borderTop: '1px solid #e2eaf4',
      margin: '0 0 28px',
    }} />
  )
}

function SectionHead({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
      <div style={{
        width: 18,
        height: 18,
        borderRadius: '50%',
        background: NAVY,
        flexShrink: 0,
      }} />
      <span style={{
        fontSize: 12,
        fontWeight: 600,
        color: '#5a7a99',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        {label}
      </span>
    </div>
  )
}

function NotesToggle({ expanded, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        background: 'none',
        border: 'none',
        padding: '2px 0',
        cursor: 'pointer',
        fontSize: 11,
        color: PINK,
        fontFamily: 'inherit',
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        marginTop: 5,
      }}
    >
      {expanded ? 'Hide notes ▾' : 'Show notes ▸'}
    </button>
  )
}

function NotesList({ notes }) {
  const capped = notes.slice(0, 3)
  return (
    <ul style={{ margin: '8px 0 0', padding: 0, listStyle: 'none' }}>
      {capped.map((note, j) => (
        <li key={j} style={{
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
          fontSize: 12,
          lineHeight: 1.55,
          marginBottom: j < capped.length - 1 ? 10 : 0,
        }}>
          <span style={{
            flexShrink: 0,
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: `1.5px solid ${PINK}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10,
            fontWeight: 500,
            color: PINK,
            marginTop: 1,
          }}>
            {j + 1}
          </span>
          <span style={{ color: PINK }}>{note}</span>
        </li>
      ))}
    </ul>
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
  const [selected,       setSelected]       = useState(null)
  const [revealed,       setRevealed]       = useState(false)
  const [checkedQs,      setCheckedQs]      = useState([])
  const [checkedDs,      setCheckedDs]      = useState([])
  const [expandedQs,     setExpandedQs]     = useState([])
  const [expandedDs,     setExpandedDs]     = useState([])
  const [chartExpanded,  setChartExpanded]  = useState(false)

  const searchParams = useSearchParams()

  if (!lessonData) return null
  const { exercisePrompt, exerciseOptions, classroomTime, sampleQuestions, discussionPrompts } = lessonData

  const studentQParam   = searchParams.get('q')
  const studentDParam   = searchParams.get('d')
  const studentQIndices = studentMode && studentQParam
    ? studentQParam.split(',').map(Number).filter(n => !isNaN(n))
    : null
  const studentDIndices = studentMode && studentDParam
    ? studentDParam.split(',').map(Number).filter(n => !isNaN(n))
    : null

  const handleReveal = () => { if (selected !== null) setRevealed(true) }
  const handleReset  = () => { setSelected(null); setRevealed(false) }

  const toggleQ      = (i) => setCheckedQs(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  const toggleD      = (i) => setCheckedDs(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  const toggleQNotes = (i) => setExpandedQs(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  const toggleDNotes = (i) => setExpandedDs(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])

  const handleShare = async () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const params = []
    if (checkedQs.length > 0) params.push(`q=${[...checkedQs].sort((a,b)=>a-b).join(',')}`)
    if (checkedDs.length > 0) params.push(`d=${[...checkedDs].sort((a,b)=>a-b).join(',')}`)
    const qs = params.length > 0 ? `?${params.join('&')}` : ''
    const url = `${origin}/student/${curriculum}/${metric}/${country}${qs}`
    try {
      await navigator.clipboard.writeText(url)
      alert('Student link copied to clipboard.')
    } catch {
      alert('Student link: ' + url)
    }
  }

  const totalSelected = checkedQs.length + checkedDs.length

  return (
    <div style={{
      maxWidth: 800,
      margin: '24px auto 0',
      background: 'white',
      borderRadius: 16,
      border: '1px solid #e2eaf4',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      padding: '32px',
      boxSizing: 'border-box',
      fontFamily: 'sans-serif',
    }}>

      <h2 style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: 28,
        fontWeight: 400,
        color: NAVY,
        margin: '0 0 8px',
      }}>
        {studentMode ? 'Your tasks for the lesson' : 'Teaching Notes'}
      </h2>
      {!studentMode && (
        <p style={{ fontSize: 12, color: PINK, margin: '0 0 28px', fontStyle: 'italic' }}>
          All pink text is for your eyes only. Your students will not see it.
        </p>
      )}

      {/* Section -- How to use this in class (teacher only) */}
      {!studentMode && classroomTime && (
        <div style={{ marginBottom: 28 }}>
          <SectionHead label="How to use this in class" />
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { time: '5 min',   text: classroomTime.five   },
              { time: '+5 min',  text: classroomTime.ten    },
              { time: '+10 min', text: classroomTime.twenty },
            ].map(({ time, text }) => (
              <div key={time} style={{
                flex: 1,
                background: '#f8fafd',
                border: '1px solid #e2eaf4',
                borderRadius: 10,
                padding: '14px 16px',
              }}>
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: BLUE,
                  marginBottom: 6,
                  letterSpacing: '0.05em',
                }}>
                  {time}
                </div>
                <div style={{ fontSize: 13, color: NAVY, lineHeight: 1.55 }}>
                  {text}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section -- Chart discussion (teacher only, collapsible) */}
      {!studentMode && lessonData.chartDiscussion && lessonData.chartDiscussion.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <Divider />
          <SectionHead label="Chart discussion" />
          <NotesToggle expanded={chartExpanded} onToggle={() => setChartExpanded(v => !v)} />
          {chartExpanded && (
            <ul style={{ margin: '8px 0 0', padding: 0, listStyle: 'none' }}>
              {lessonData.chartDiscussion.map((point, i) => (
                <li key={i} style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  fontSize: 13,
                  lineHeight: 1.55,
                  marginBottom: i < lessonData.chartDiscussion.length - 1 ? 10 : 0,
                }}>
                  <span style={{
                    flexShrink: 0,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: '1.5px solid #8099b8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 10,
                    fontWeight: 500,
                    color: '#8099b8',
                    marginTop: 1,
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ color: PINK }}>{wrapGlossaryTerms(point)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Section -- Weather icon exercise */}
      <div style={{ marginBottom: 28 }}>
        {!studentMode && <Divider />}
        <SectionHead label="Weather icon exercise" />
        <p style={{ fontSize: 14, color: NAVY, margin: '0 0 16px', lineHeight: 1.55 }}>
          {exercisePrompt}
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
          {(exerciseOptions || []).map((opt, i) => {
            const isSelected = selected === i
            const cls = opt.cls || iconCls(opt.icon)
            return (
              <button
                key={i}
                onClick={() => {
                  if (!revealed) {
                    setSelected(i)
                    if (studentMode) setRevealed(true)
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 18px',
                  border: `1.5px solid ${isSelected ? BLUE : '#dde6f2'}`,
                  borderRadius: 8,
                  background: isSelected ? '#e8f2fc' : '#f8fafd',
                  cursor: revealed ? 'default' : 'pointer',
                  fontSize: 14,
                  fontWeight: isSelected ? 600 : 400,
                  color: NAVY,
                  transition: 'all 0.12s',
                  fontFamily: 'inherit',
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

        {/* Reveal button (teacher only) */}
        {showReveal && !revealed && (
          <button
            onClick={handleReveal}
            disabled={selected === null}
            style={{
              background: selected !== null ? BLUE : '#e2eaf4',
              color: selected !== null ? 'white' : '#a0b0c8',
              border: 'none',
              borderRadius: 8,
              padding: '10px 22px',
              fontSize: 14,
              fontWeight: 600,
              cursor: selected !== null ? 'pointer' : 'default',
              transition: 'background 0.15s',
              fontFamily: 'inherit',
            }}
          >
            Reveal
          </button>
        )}

        {/* Reveal result */}
        {revealed && reveal && (
          <div style={{
            background: '#f4f7fb',
            border: '1px solid #e2eaf4',
            borderRadius: 10,
            padding: '16px 18px',
          }}>
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: BLUE,
              marginBottom: 8,
            }}>
              Editorial judgment
            </div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: NAVY }}>
              {reveal}
            </p>

          </div>
        )}
      </div>

      {/* Section -- Sample questions (teacher, with checkboxes and collapsible key points) */}
      {!studentMode && sampleQuestions && (
        <div style={{ marginBottom: 28 }}>
          <Divider />
          <SectionHead label="Sample questions" />
          <p style={{ fontSize: 12, color: '#8099b8', margin: '0 0 16px', fontStyle: 'italic' }}>
            Tick questions to include on the student link.
          </p>
          {sampleQuestions.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'flex-start' }}>
              <input
                type="checkbox"
                checked={checkedQs.includes(i)}
                onChange={() => toggleQ(i)}
                style={{ marginTop: 3, width: 16, height: 16, accentColor: BLUE, cursor: 'pointer', flexShrink: 0 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: NAVY, lineHeight: 1.5 }}>
                  {String.fromCharCode(65 + i)}. {wrapGlossaryTerms(item.q)}
                </div>
                {item.keyPoints && item.keyPoints.length > 0 && (
                  <>
                    <NotesToggle
                      expanded={expandedQs.includes(i)}
                      onToggle={() => toggleQNotes(i)}
                    />
                    {expandedQs.includes(i) && <NotesList notes={item.keyPoints} />}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section -- Selected questions (student only, no key points) */}
      {studentMode && sampleQuestions && studentQIndices && studentQIndices.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <Divider />
          <SectionHead label="Questions" />
          {studentQIndices.map((qi, i) => {
            const item = sampleQuestions[qi]
            if (!item) return null
            return (
              <div key={qi} style={{ fontSize: 14, color: NAVY, lineHeight: 1.5, marginBottom: 16 }}>
                {String.fromCharCode(65 + i)}. {wrapGlossaryTerms(item.q)}
              </div>
            )
          })}
        </div>
      )}

      {/* Section -- Discussion prompts (teacher, with checkboxes and collapsible notes) */}
      {!studentMode && discussionPrompts && (
        <div style={{ marginBottom: 28 }}>
          <Divider />
          <SectionHead label="Wider discussion prompts" />
          <p style={{ fontSize: 12, color: '#8099b8', margin: '0 0 16px', fontStyle: 'italic' }}>
            Tick prompts to include on the student link.
          </p>
          {discussionPrompts.map((item, i) => {
            const promptText = typeof item === 'string' ? item : item.p
            const notes = typeof item === 'string' ? [] : (item.notes || [])
            return (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'flex-start' }}>
                <input
                  type="checkbox"
                  checked={checkedDs.includes(i)}
                  onChange={() => toggleD(i)}
                  style={{ marginTop: 3, width: 16, height: 16, accentColor: BLUE, cursor: 'pointer', flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: NAVY, lineHeight: 1.55 }}>
                    {String.fromCharCode(65 + i)}. {wrapGlossaryTerms(promptText)}
                  </div>
                  {notes.length > 0 && (
                    <>
                      <NotesToggle
                        expanded={expandedDs.includes(i)}
                        onToggle={() => toggleDNotes(i)}
                      />
                      {expandedDs.includes(i) && <NotesList notes={notes} />}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Section -- Selected discussion prompts (student only) */}
      {studentMode && discussionPrompts && studentDIndices && studentDIndices.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <Divider />
          <SectionHead label="Discussion prompts" />
          {studentDIndices.map((di, i) => {
            const item = discussionPrompts[di]
            if (!item) return null
            const promptText = typeof item === 'string' ? item : item.p
            return (
              <div key={di} style={{ fontSize: 14, color: NAVY, lineHeight: 1.55, marginBottom: 12 }}>
                {String.fromCharCode(65 + i)}. {wrapGlossaryTerms(promptText)}
              </div>
            )
          })}
        </div>
      )}

      {/* Share button (teacher only) */}
      {!studentMode && (
        <>
          <Divider />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={handleShare}
              style={{
                background: 'none',
                border: '1.5px solid #dde6f2',
                borderRadius: 8,
                padding: '10px 20px',
                fontSize: 13,
                color: '#5a7a99',
                cursor: 'pointer',
                fontWeight: 500,
                fontFamily: 'inherit',
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
    </div>
  )
}
