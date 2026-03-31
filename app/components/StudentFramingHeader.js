'use client'
import { useState, useEffect } from 'react'

const NAVY   = '#0f1e35'
const ORANGE = '#F0843C'

export default function StudentFramingHeader({ subtitle }) {
  const full = "This is what's happening right now."
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
      background: '#fff4ee',
      borderBottom: '1px solid #fcd9c0',
      padding: '18px 28px',
      fontFamily: 'sans-serif',
    }}>
      <div style={{ maxWidth: 864, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <span style={{ position: 'relative', width: 9, height: 9, flexShrink: 0, display: 'inline-block' }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#fbbf24', animation: 'ping-ring-orange 1.4s cubic-bezier(0,0,0.2,1) infinite' }} />
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#b45309' }} />
          </span>
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
                background: ORANGE,
                marginLeft: 2,
                verticalAlign: 'middle',
                animation: 'blink-cursor-orange 0.7s step-end infinite',
              }} />
            )}
          </div>
        </div>
        {subtitle && (
          <div style={{
            fontSize: 15, color: '#b07040',
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: '0.04em',
            paddingLeft: 18,
            opacity: done ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}>
            {subtitle}
          </div>
        )}
      </div>
      <style>{`
        @keyframes ping-ring-orange {
          0% { transform: scale(1); opacity: 0.75; }
          70%, 100% { transform: scale(2.8); opacity: 0; }
        }
        @keyframes blink-cursor-orange {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
