'use client'
import { useState, useEffect } from 'react'

const NAVY = '#0f1e35'

export default function FramingHeader() {
  const full = 'Your lesson is ready.'
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      i++
      setDisplayed(full.slice(0, i))
      if (i >= full.length) {
        clearInterval(timer)
        setDone(true)
      }
    }, 38)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{
      background: '#eef5fc',
      borderBottom: '1px solid #d0e4f5',
      padding: '18px 28px',
      fontFamily: 'sans-serif',
    }}>
      <div style={{ maxWidth: 864, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <span style={{
            display: 'inline-block',
            width: 8, height: 8,
            borderRadius: '50%',
            background: '#378ADD',
            flexShrink: 0,
            animation: 'pulse-dot 1.4s ease-in-out infinite',
          }} />
          <div style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 30, fontWeight: 400, color: NAVY,
            minHeight: 36,
          }}>
            {displayed}
            {!done && (
              <span style={{
                display: 'inline-block',
                width: 2, height: '0.85em',
                background: '#378ADD',
                marginLeft: 2,
                verticalAlign: 'middle',
                animation: 'blink-cursor 0.7s step-end infinite',
              }} />
            )}
          </div>
        </div>
        <div style={{
          fontSize: 15, color: '#8099b8',
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: '0.04em',
          paddingLeft: 18,
          opacity: done ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}>
          30 minutes · built around the latest data · share with one click
        </div>
      </div>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.75); }
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
