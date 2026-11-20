// CineBuddy's "brain": turns what the user typed/said into a reply + actions.
//
// Rule-based on purpose: predictable, free, and no API key that can die mid-demo.
//
// handleMessage(text, ctx) returns:
//   { reply: string, navigate?: string }
// where ctx = the full useBooking() object (booking state + actions like
// selectMovie, selectShowtime, setTickets, pickSeats...) plus { pathname }.
//
// TODO (CineBuddy owner) — intents to add, roughly in priority order:
//   1. help / greeting            "what can you do?"
//   2. list movies                "what's playing?"               (proposal item 1)
//   3. recommend                  "recommend a comedy"            (item 9)
//   4. showtimes                  "when is Starfall playing?"     (item 2)
//   5. book                       "2 adults for Starfall at 7:15" → selectMovie + selectShowtime + setTickets + navigate
//   6. seat preference            "middle seats please"           (item 4)
//   7. summary / confirm          "what have I picked so far?"    (item 7)
//   8. where am I / what next     based on ctx.pathname

export function handleMessage(text, ctx) {
  const t = text.toLowerCase().trim()

  if (/^(hi|hey|hello|yo)\b/.test(t)) {
    return { reply: "Hey! I'm CineBuddy 🍿 I can help you find a movie and book tickets." }
  }

  // Example of an intent that actually DOES something, so you can see the pattern.
  if (/what.*(playing|showing)|list.*movies/.test(t)) {
    return { reply: "Here's what's playing! Pick one and I'll help with the rest.", navigate: '/' }
  }

  void ctx // remove once intents use it
  return { reply: "I'm still learning that one. Try asking what's playing!" }
}
