// Step 7 — proposal item 7: confirmation with everything listed.
import { Link } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { formatDate, formatTime } from '../data'
import StepLayout, { MissingStep } from '../components/StepLayout'

export default function ConfirmationPage() {
  const { booking, movie, totalPrice, reset } = useBooking()

  if (!booking.confirmationCode) return <StepLayout step={6} title="Confirmation"><MissingStep to="/payment" what="a payment method" /></StepLayout>

  return (
    <StepLayout step={6} title="You're booked! 🍿">
      <p>Confirmation code: <strong>{booking.confirmationCode}</strong></p>
      <p>
        {movie.title}, {formatDate(booking.date)} at {formatTime(booking.time)}. Seats {booking.seats.join(', ')}.
      </p>
      <p>Total paid: ${totalPrice.toFixed(2)}. A copy was "sent" to {booking.customer.email}.</p>
      <Link to="/" className="btn" onClick={reset}>Book another</Link>
    </StepLayout>
  )
}
