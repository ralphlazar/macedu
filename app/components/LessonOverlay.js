'use client'
import { useState } from 'react'

const NAVY = '#0f1e35'
const BLUE = '#378ADD'

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

function SectionHead({ number, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
      <span style={{
        background: '#e8f2fc',
        color: BLUE,
        fontWeight: 700,
        fontSize: 11,
        borderRadius: 5,
        padding: '2px 8px',
        letterSpacing: '0.06em',
      }}>
        {String(number).padStart(2, '0')}
      </span>
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

export default function LessonOverlay({
  metric,
  country,
  lessonData,
  reveal,
  curriculum,
  showReveal  = true,
  studentMode = false,
}) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  if (!lessonData) return null
  const { exercisePrompt, exerciseOptions, classroomTime, sampleQuestions, discussionPrompts } = lessonData

  const handleReveal = () => { if (selected !== null) setRevealed(true) }
  const handleReset  = () => { setSelected(null); setRevealed(false) }

  const handleShare = async () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const url = `${origin}/student/${curriculum}/${metric}/${country}`
    try {
      await navigator.clipboard.writeText(url)
      alert('Student link copied to clipboard.')
    } catch {
      alert('Student link: ' + url)
    }
  }

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
        margin: '0 0 32px',
      }}>
        Lesson Guide
      </h2>

      {/* Section 01 -- How to use this in class (teacher only) */}
      {!studentMode && classroomTime && (
        <div style={{ marginBottom: 32 }}>
          <SectionHead number={1} label="How to use this in class" />
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { time: '5 min',  text: classroomTime.five   },
              { time: '10 min', text: classroomTime.ten    },
              { time: '20 min', text: classroomTime.twenty },
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

      {/* Section 02 -- Weather icon exercise */}
      <div style={{ marginBottom: 32 }}>
        <SectionHead number={2} label="Weather icon exercise" />
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
                onClick={() => { if (!revealed) setSelected(i) }}
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

        {/* Reveal result (teacher only) */}
        {showReveal && revealed && reveal && (
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
            <button
              onClick={handleReset}
              style={{
                marginTop: 12,
                background: 'none',
                border: 'none',
                fontSize: 12,
                color: '#8099b8',
                cursor: 'pointer',
                padding: 0,
                textDecoration: 'underline',
                fontFamily: 'inherit',
              }}
            >
              Try again
            </button>
          </div>
        )}
      </div>

      {/* Section 03 -- Sample questions (teacher only) */}
      {!studentMode && sampleQuestions && (
        <div style={{ marginBottom: 32 }}>
          <SectionHead number={3} label="Sample questions" />
          {sampleQuestions.map((item, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 14, color: NAVY, lineHeight: 1.5, marginBottom: 5 }}>
                {String.fromCharCode(97 + i)}. {item.q}
              </div>
              <div style={{ fontSize: 12, color: '#8099b8', fontStyle: 'italic', lineHeight: 1.55 }}>
                {item.hint}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section 04 -- Discussion prompts (teacher only) */}
      {!studentMode && discussionPrompts && (
        <div style={{ marginBottom: 32 }}>
          <SectionHead number={4} label="Wider discussion prompts" />
          {discussionPrompts.map((p, i) => (
            <div key={i} style={{ fontSize: 14, color: NAVY, lineHeight: 1.55, marginBottom: 12 }}>
              {String.fromCharCode(97 + i)}. {p}
            </div>
          ))}
        </div>
      )}

      {/* Share button (teacher only) */}
      {!studentMode && (
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
      )}
    </div>
  )
}
