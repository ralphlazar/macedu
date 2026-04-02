'use client'
import { useState } from 'react'

const NAVY = '#0f1e35'
const BLUE = '#378ADD'

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.target)
    try {
      const res = await fetch('https://formspree.io/f/xaqldbwr', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <p style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 13,
        color: BLUE,
        letterSpacing: '0.04em',
        margin: 0,
      }}>
        Received. We will be in touch.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{
          display: 'block',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#aaa',
          marginBottom: 6,
        }}>
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          style={{
            width: '100%',
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 14,
            padding: '10px 12px',
            border: '0.5px solid #d0d9e6',
            borderRadius: 6,
            background: '#f9fbfd',
            color: NAVY,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{
          display: 'block',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#aaa',
          marginBottom: 6,
        }}>
          Message
        </label>
        <textarea
          name="message"
          required
          rows={5}
          style={{
            width: '100%',
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 14,
            padding: '10px 12px',
            border: '0.5px solid #d0d9e6',
            borderRadius: 6,
            background: '#f9fbfd',
            color: NAVY,
            outline: 'none',
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
        />
      </div>
      {status === 'error' && (
        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 13,
          color: '#E24B4A',
          marginBottom: 12,
        }}>
          Something went wrong. Try again or email us directly.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          background: NAVY,
          color: 'white',
          border: 'none',
          borderRadius: 6,
          padding: '10px 24px',
          cursor: status === 'sending' ? 'wait' : 'pointer',
          opacity: status === 'sending' ? 0.6 : 1,
        }}
      >
        {status === 'sending' ? 'Sending...' : 'Send'}
      </button>
    </form>
  )
}
