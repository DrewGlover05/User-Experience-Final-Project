// Voice input via the browser's Web Speech API (free, no key).
// Works in Chrome and Edge. Firefox/Safari support is poor — demo in Chrome.
//
// const { supported, listening, start, stop } = useVoice({ onResult: (text) => send(text) })
//
// TODO (CineBuddy owner): implement start/stop.
//   const SR = window.SpeechRecognition || window.webkitSpeechRecognition
//   const rec = new SR(); rec.lang = 'en-CA'; rec.interimResults = false
//   rec.onresult = (e) => onResult(e.results[0][0].transcript)
//   rec.onend = () => setListening(false)
//   rec.start()
// Optional: text-to-speech for replies with window.speechSynthesis.speak(new SpeechSynthesisUtterance(reply))
import { useState } from 'react'

export function useVoice({ onResult }) {
  const supported =
    typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition)
  const [listening, setListening] = useState(false)

  const start = () => {
    void onResult
    setListening(false)
    alert('Voice input not implemented yet. See src/cinebuddy/useVoice.js')
  }
  const stop = () => setListening(false)

  return { supported, listening, start, stop }
}
