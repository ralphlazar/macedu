'use client'
import { useState } from 'react'

const NAVY  = '#0f1e35'
const BLUE  = '#378ADD'
const ORANGE = '#F0843C'

const rows = [
  {
    label: '🇬🇧\u00a0\u00a0United Kingdom',
    tiles: [
      { flag: '🇬🇧', level: 'Sixth Form',      name: ['A-Level', 'Economics'], board: 'AQA',           studentHref: '/student/alevel', teacherHref: '/teacher/alevel' },
      { flag: '🇬🇧', level: 'Secondary',        name: ['GCSE', 'Economics'],   board: 'AQA',           studentHref: null, teacherHref: null },
      { flag: '🇬🇧', level: 'University · Y1',  name: ['Macro', '· Year 1'],   board: 'UK',            studentHref: null, teacherHref: null },
      { flag: '🇬🇧', level: 'University · Y2',  name: ['Macro', '· Year 2'],   board: 'UK',            studentHref: null, teacherHref: null },
    ],
  },
  {
    label: '🇺🇸\u00a0\u00a0United States',
    tiles: [
      { flag: '🇺🇸', level: 'High School',      name: ['AP', 'Economics'],     board: 'College Board', studentHref: null, teacherHref: null },
      { flag: '🇺🇸', level: 'University · Y1',  name: ['Macro', '· Year 1'],   board: 'US',            studentHref: null, teacherHref: null },
      { flag: '🇺🇸', level: 'University · Y2',  name: ['Macro', '· Year 2'],   board: 'US',            studentHref: null, teacherHref: null },
    ],
  },
  {
    label: '🌍\u00a0\u00a0International',
    tiles: [
      { flag: '🌐', level: 'High School',        name: ['Cambridge', 'A-Level'], board: 'CIE',          studentHref: null, teacherHref: null },
      { flag: '🇮🇳', level: 'High School',       name: ['CBSE', 'Economics'],   board: 'Class 11-12',  studentHref: null, teacherHref: null },
      { flag: '🌐', level: 'High School',        name: ['IB', 'Economics'],      board: 'IBO',          studentHref: null, teacherHref: null },
      { flag: '🇦🇺', level: 'High School',       name: ['HSC', 'Economics'],    board: 'NSW',          studentHref: null, teacherHref: null },
    ],
  },
]

export default function LandingPage() {
  const [role, setRole] = useState(null)

  const accent = role === 'student' ? ORANGE : BLUE

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      fontFamily: 'sans-serif',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 680 }}>

        <p style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#b0bac8',
          margin: '0 0 18px',
          fontFamily: "'IBM Plex Mono', monospace",
        }}>
          macroeconomics.education
        </p>

        <h1 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 34,
          fontWeight: 400,
          color: NAVY,
          lineHeight: 1.25,
          margin: '0 0 12px',
        }}>
          Live global data.<br />
          Wired to your syllabus.
        </h1>

        <p style={{ fontSize: 15, color: '#8099b8', lineHeight: 1.65, margin: '0 0 36px' }}>
          Current data, updated on release day.
        </p>

        {/* ── Role picker ── */}
        {!role && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              maxWidth: 380,
              margin: '0 auto 14px',
            }}>
              {[
                { key: 'student', label: 'Student', cta: "I'm revising",  sub: 'Exam questions, live data, glossary', color: ORANGE },
                { key: 'teacher', label: 'Teacher',  cta: "I'm teaching", sub: 'Lesson tools, notes, share with class', color: BLUE },
              ].map(({ key, label, cta, sub, color }) => (
                <button
                  key={key}
                  onClick={() => setRole(key)}
                  style={{
                    background: 'white',
                    border: `2px solid ${color}`,
                    borderRadius: 12,
                    padding: '20px 16px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.09em',
                    textTransform: 'uppercase',
                    color,
                    marginBottom: 8,
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 500, color: NAVY, marginBottom: 6 }}>
                    {cta}
                  </div>
                  <div style={{ fontSize: 12, color: '#8099b8', lineHeight: 1.5 }}>
                    {sub}
                  </div>
                  <span style={{ position: 'absolute', bottom: 14, right: 14, fontSize: 15, color }}>
                    →
                  </span>
                </button>
              ))}
            </div>
            {/* Password hint */}
            <p style={{ fontSize: 11, color: '#b0bac8', margin: 0 }}>
              Teachers: you will need a password on the next screen.
            </p>
          </div>
        )}

        {/* ── Curriculum picker ── */}
        {role && (
          <div>
            <button
              onClick={() => setRole(null)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 13,
                color: '#8099b8',
                cursor: 'pointer',
                marginBottom: 28,
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              ← {role === 'student' ? "I'm revising" : "I'm teaching"}
            </button>

            {rows.map((row, ri) => {
              const href = role === 'student' ? 'studentHref' : 'teacherHref'
              return (
                <div key={ri} style={{ marginBottom: 24 }}>
                  <p style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#c0cad8',
                    margin: '0 0 10px',
                  }}>
                    {row.label}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                    {row.tiles.map((tile, ti) => {
                      const active = !!tile[href]
                      const style = {
                        borderRadius: 12,
                        padding: '16px 14px',
                        textAlign: 'left',
                        position: 'relative',
                        width: 128,
                        flexShrink: 0,
                        boxSizing: 'border-box',
                        border: active ? `1.5px solid ${accent}` : '1px solid #e0e4ea',
                        background: active ? '#fff' : '#f7f8fa',
                        textDecoration: 'none',
                        display: 'block',
                        cursor: active ? 'pointer' : 'default',
                      }
                      const inner = (
                        <>
                          {!active && (
                            <span style={{
                              position: 'absolute', top: 10, right: 10,
                              fontSize: 9, fontWeight: 600, letterSpacing: '0.05em',
                              textTransform: 'uppercase', background: '#eef1f5',
                              color: '#a0aab8', padding: '2px 6px', borderRadius: 20,
                            }}>Soon</span>
                          )}
                          <span style={{ fontSize: 20, display: 'block', marginBottom: 8, lineHeight: 1 }}>
                            {tile.flag}
                          </span>
                          <div style={{
                            fontSize: 10, fontWeight: 600, letterSpacing: '0.07em',
                            textTransform: 'uppercase',
                            color: active ? '#8099b8' : '#b0bac8',
                            marginBottom: 4,
                          }}>
                            {tile.level}
                          </div>
                          <div style={{
                            fontFamily: "'Instrument Serif', Georgia, serif",
                            fontSize: 15, fontWeight: 400,
                            color: active ? NAVY : '#b0bac8',
                            lineHeight: 1.25,
                          }}>
                            {tile.name[0]}<br />{tile.name[1]}
                          </div>
                          <div style={{
                            fontSize: 11,
                            color: active ? '#a0b0c4' : '#c8d0da',
                            marginTop: 3,
                          }}>
                            {tile.board}
                          </div>
                          {active && (
                            <span style={{
                              position: 'absolute', bottom: 12, right: 12,
                              fontSize: 15, color: accent,
                            }}>→</span>
                          )}
                        </>
                      )
                      return active
                        ? <a key={ti} href={tile[href]} style={style}>{inner}</a>
                        : <div key={ti} style={style}>{inner}</div>
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <p style={{ fontSize: 11, color: '#ccc', marginTop: 24, lineHeight: 1.5 }}>
          Powered by{' '}
          <a href="https://macrosnaps.app" target="_blank" rel="noopener noreferrer"
            style={{ color: '#ccc', textDecoration: 'underline' }}>
            MacroSnaps
          </a>
        </p>

      </div>
    </main>
  )
}
