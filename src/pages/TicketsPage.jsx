// Step 3 — proposal item 3: number and type of tickets (adult / child / senior).
// TODO: warn if an 18A movie has child tickets selected.
import { TICKET_PRICES, TICKET_TYPES } from '../data'
import { useBooking } from '../context/BookingContext'
import StepLayout, { MissingStep } from '../components/StepLayout'

const MAX_TICKETS = 10

export default function TicketsPage() {
  const { booking, totalTickets, totalPrice, setTickets } = useBooking()

  if (!booking.time) return <StepLayout step={2} title="Tickets"><MissingStep to="/showtimes" what="a showtime" /></StepLayout>

  return (
    <StepLayout step={2} title="How many tickets?" canContinue={totalTickets > 0}>
      {TICKET_TYPES.map((type) => {
        const n = booking.tickets[type]
        return (
          <div key={type} className="ticket-row">
            <span className="cap">{type}</span>
            <span>${TICKET_PRICES[type].toFixed(2)}</span>
            <button className="btn small" disabled={n === 0} onClick={() => setTickets({ [type]: n - 1 })} aria-label={`Fewer ${type} tickets`}>−</button>
            <span className="count">{n}</span>
            <button className="btn small" disabled={totalTickets >= MAX_TICKETS} onClick={() => setTickets({ [type]: n + 1 })} aria-label={`More ${type} tickets`}>+</button>
          </div>
        )
      })}
      <p className="total">Total: ${totalPrice.toFixed(2)}</p>
    </StepLayout>
  )
}
