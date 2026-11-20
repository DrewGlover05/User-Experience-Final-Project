// Step 4 — proposal item 4: seat preference (middle / far left / far right).
// TODO: "Auto-pick best seats in <section>" button (CineBuddy can reuse it),
//       legend, screen indicator styling.
import { useMemo } from 'react'
import { getSeatMap, ROWS } from '../data'
import { useBooking } from '../context/BookingContext'
import StepLayout, { MissingStep } from '../components/StepLayout'

export default function SeatsPage() {
  const { booking, totalTickets, pickSeats } = useBooking()
  const seatMap = useMemo(
    () => (booking.time ? getSeatMap(booking.movieId, booking.date, booking.time) : []),
    [booking.movieId, booking.date, booking.time],
  )

  if (totalTickets === 0) return <StepLayout step={3} title="Seats"><MissingStep to="/tickets" what="your tickets" /></StepLayout>

  const toggle = (seat) => {
    if (seat.taken) return
    const has = booking.seats.includes(seat.id)
    if (has) pickSeats(booking.seats.filter((s) => s !== seat.id))
    else if (booking.seats.length < totalTickets) pickSeats([...booking.seats, seat.id])
  }

  return (
    <StepLayout
      step={3}
      title={`Pick ${totalTickets} seat${totalTickets > 1 ? 's' : ''}`}
      canContinue={booking.seats.length === totalTickets}
    >
      <div className="screen">SCREEN</div>
      <div className="seat-grid">
        {ROWS.map((row) => (
          <div key={row} className="seat-row">
            <span className="row-label">{row}</span>
            {seatMap
              .filter((s) => s.row === row)
              .map((s) => (
                <button
                  key={s.id}
                  className={`seat ${s.section} ${s.taken ? 'taken' : ''} ${booking.seats.includes(s.id) ? 'selected' : ''}`}
                  disabled={s.taken}
                  onClick={() => toggle(s)}
                  aria-label={`Seat ${s.id}, ${s.section}${s.taken ? ', taken' : ''}`}
                >
                  {s.num}
                </button>
              ))}
          </div>
        ))}
      </div>
      <p>Selected: {booking.seats.join(', ') || 'none'}</p>
    </StepLayout>
  )
}
