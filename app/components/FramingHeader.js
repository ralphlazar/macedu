'use client'
import { useState, useEffect } from 'react'

const NAVY = '#0f1e35'

export default function FramingHeader() {
  const full = 'Build your lesson plan.'
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
          <span style={{ position: 'relative', width: 9, height: 9, flexShrink: 0, display: 'inline-block' }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#85B7EB', animation: 'ping-ring 1.4s cubic-bezier(0,0,0.2,1) infinite' }} />
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#0C447C' }} />
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
          30 minutes · latest data · share with one click
        </div>
      </div>
      <style>{`
        @keyframes ping-ring {
          0% { transform: scale(1); opacity: 0.75; }
          70%, 100% { transform: scale(2.8); opacity: 0; }
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
