// Floating popcorn bubble (bottom-right, on every page) that opens the chat panel.
// TODO: replace the 🍿 emoji with the real popcorn-bag-with-eyes art (SVG in src/cinebuddy/).
import { useState } from 'react'
import ChatPanel from './ChatPanel'

export default function CineBuddy() {
  const [open, setOpen] = useState(false)

  return (
    <div className="cinebuddy">
      {/* Kept mounted while hidden so the chat history survives closing it. */}
      <div hidden={!open}>
        <ChatPanel onClose={() => setOpen(false)} />
      </div>
      <button
        className="cinebuddy-bubble"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close CineBuddy' : 'Open CineBuddy chat'}
      >
        🍿
      </button>
    </div>
  )
}
