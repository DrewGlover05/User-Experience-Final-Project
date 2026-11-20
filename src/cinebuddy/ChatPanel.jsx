// The chat window. Based on Drew's original App.jsx chat UI.
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { handleMessage } from './intents'
import { useVoice } from './useVoice'

const GREETING = "Hi! I'm CineBuddy 🍿 Ask me what's playing, or tell me what you want to book."

export default function ChatPanel({ onClose }) {
  const booking = useBooking()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [messages, setMessages] = useState([{ from: 'assistant', text: GREETING }])
  const [input, setInput] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = (text) => {
    if (!text.trim()) return
    const { reply, navigate: to } = handleMessage(text, { ...booking, pathname })
    setMessages((m) => [...m, { from: 'user', text }, { from: 'assistant', text: reply }])
    setInput('')
    if (to) navigate(to)
  }

  const voice = useVoice({ onResult: send })

  return (
    <div className="chat-panel" role="dialog" aria-label="CineBuddy chat">
      <header className="chat-header">
        <div className="avatar-circle">🍿</div>
        <div>
          <strong>CineBuddy</strong>
          <p>Your movie booking buddy</p>
        </div>
        <button className="icon-btn" onClick={onClose} aria-label="Close chat">✕</button>
      </header>

      <div className="chat-window" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.from}-message`}>{m.text}</div>
        ))}
        <div ref={endRef} />
      </div>

      <form className="input-area" onSubmit={(e) => { e.preventDefault(); send(input) }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." aria-label="Message CineBuddy" />
        <button type="submit">Send</button>
        <button
          type="button"
          onClick={voice.listening ? voice.stop : voice.start}
          disabled={!voice.supported}
          title={voice.supported ? 'Speak to CineBuddy' : 'Voice needs Chrome or Edge'}
          aria-label="Voice input"
        >
          {voice.listening ? '⏹' : '🎤'}
        </button>
      </form>
    </div>
  )
}
