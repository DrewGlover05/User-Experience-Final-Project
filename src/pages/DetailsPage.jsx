// Step 5 — proposal item 5: name and email for the confirmation.
// TODO: inline validation messages (not just a disabled button).
import { useBooking } from '../context/BookingContext'
import StepLayout, { MissingStep } from '../components/StepLayout'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function DetailsPage() {
  const { booking, totalTickets, setCustomer } = useBooking()
  const { name, email } = booking.customer

  if (totalTickets === 0 || booking.seats.length !== totalTickets)
    return <StepLayout step={4} title="Your details"><MissingStep to="/seats" what="your seats" /></StepLayout>

  return (
    <StepLayout step={4} title="Your details" canContinue={name.trim() !== '' && EMAIL_RE.test(email)}>
      <label className="field">
        Name
        <input value={name} onChange={(e) => setCustomer({ name: e.target.value })} autoComplete="name" />
      </label>
      <label className="field">
        Email (your tickets get sent here)
        <input type="email" value={email} onChange={(e) => setCustomer({ email: e.target.value })} autoComplete="email" />
      </label>
    </StepLayout>
  )
}
