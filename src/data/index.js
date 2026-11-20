// Single place every page AND CineBuddy reads data from.
// No backend — everything is fake and lives in this folder.
import movies from './movies.json'
import showtimes from './showtimes.json'

export { movies }

export const TICKET_PRICES = { adult: 14.99, child: 9.99, senior: 10.99 }
export const TICKET_TYPES = ['adult', 'child', 'senior']

export function getMovie(id) {
  return movies.find((m) => m.id === id)
}

// Next 7 days as YYYY-MM-DD strings, starting today.
// Generated (not hard-coded) so the dates never go stale before the demo.
export function getDates(days = 7) {
  const out = []
  const d = new Date()
  for (let i = 0; i < days; i++) {
    const day = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i)
    const mm = String(day.getMonth() + 1).padStart(2, '0')
    const dd = String(day.getDate()).padStart(2, '0')
    out.push(`${day.getFullYear()}-${mm}-${dd}`)
  }
  return out
}

// Same times every day for simplicity.
export function getShowtimes(movieId) {
  return showtimes[movieId] ?? []
}

export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-CA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export function formatTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${suffix}`
}

// ---------- Seats ----------
// Rows A–H, 12 seats per row.
// Seats 1–3 = left, 4–9 = middle, 10–12 = right (proposal: "preference seating").
export const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
export const SEATS_PER_ROW = 12

export function seatSection(num) {
  if (num <= 3) return 'left'
  if (num >= 10) return 'right'
  return 'middle'
}

// Deterministic "random" so the same showtime always has the same taken seats.
function seededRandom(seedStr) {
  let h = 2166136261
  for (const c of seedStr) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return ((h ^= h >>> 16) >>> 0) / 4294967296
  }
}

// Returns [{ id: 'C7', row: 'C', num: 7, section: 'middle', taken: false }, ...]
export function getSeatMap(movieId, date, time) {
  const rand = seededRandom(`${movieId}|${date}|${time}`)
  const seats = []
  for (const row of ROWS) {
    for (let num = 1; num <= SEATS_PER_ROW; num++) {
      seats.push({ id: `${row}${num}`, row, num, section: seatSection(num), taken: rand() < 0.3 })
    }
  }
  return seats
}
