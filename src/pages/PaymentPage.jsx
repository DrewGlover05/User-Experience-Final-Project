// Step 6 — proposal items 6 + 7: payment method and final summary.
// FAKE payment — nothing is charged and card numbers are never stored.
// TODO: card form fields with format validation (16 digits, MM/YY, CVC)
//       shown when method === 'card'.
import { useBooking } from '../context/BookingContext'
import { formatDate, formatTime } from '../data'
import StepLayout, { MissingStep } from '../components/StepLayout'

const METHODS = [
  { id: 'card', label: 'Credit / debit card' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'giftcard', label: 'Gift card' },
]

export default function PaymentPage() {
  const { booking, movie, totalPrice, setPayment, confirm } = useBooking()

  if (!booking.customer.email) return <StepLayout step={5} title="Payment"><MissingStep to="/details" what="your details" /></StepLayout>

  const ticketSummary = Object.entries(booking.tickets)
    .filter(([, n]) => n > 0)
    .map(([type, n]) => `${n} ${type}`)
    .join(', ')

  return (
    <StepLayout step={5} title="Review and pay" canContinue={!!booking.payment.method} onNext={confirm} nextLabel={`Pay $${totalPrice.toFixed(2)}`}>
      <dl className="summary">
        <dt>Movie</dt><dd>{movie.title}</dd>
        <dt>When</dt><dd>{formatDate(booking.date)} at {formatTime(booking.time)}</dd>
        <dt>Tickets</dt><dd>{ticketSummary}</dd>
        <dt>Seats</dt><dd>{booking.seats.join(', ')}</dd>
        <dt>Name</dt><dd>{booking.customer.name}</dd>
        <dt>Email</dt><dd>{booking.customer.email}</dd>
      </dl>

      <fieldset className="field">
        <legend>Payment method</legend>
        {METHODS.map((m) => (
          <label key={m.id} className="radio">
            <input type="radio" name="method" checked={booking.payment.method === m.id} onChange={() => setPayment({ method: m.id })} />
            {m.label}
          </label>
        ))}
      </fieldset>
    </StepLayout>
  )
}
