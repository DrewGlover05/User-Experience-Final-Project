// Step 2 — proposal item 2: dates and showtimes.
// TODO: nicer date picker (horizontal day strip), grey out past times today.
import { useState } from 'react'
import { getDates, getShowtimes, formatDate, formatTime } from '../data'
import { useBooking } from '../context/BookingContext'
import StepLayout, { MissingStep } from '../components/StepLayout'

export default function ShowtimesPage() {
  const { booking, movie, selectShowtime } = useBooking()
  const [date, setDate] = useState(booking.date ?? getDates()[0])

  if (!movie) return <StepLayout step={1} title="Showtimes"><MissingStep to="/" what="a movie" /></StepLayout>

  return (
    <StepLayout step={1} title={`Showtimes for ${movie.title}`} canContinue={!!booking.time}>
      <div className="chip-row">
        {getDates().map((d) => (
          <button key={d} className={`chip ${d === date ? 'selected' : ''}`} onClick={() => setDate(d)}>
            {formatDate(d)}
          </button>
        ))}
      </div>
      <div className="chip-row">
        {getShowtimes(movie.id).map((t) => (
          <button
            key={t}
            className={`chip ${booking.date === date && booking.time === t ? 'selected' : ''}`}
            onClick={() => selectShowtime(date, t)}
          >
            {formatTime(t)}
          </button>
        ))}
      </div>
    </StepLayout>
  )
}
