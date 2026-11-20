// The shared booking state.
// Pages AND CineBuddy both call these same actions — that's how the avatar
// can fill in the form for the user ("2 adults for Starfall at 7:15").
import { createContext, useContext, useMemo, useState } from 'react'
import { getMovie, TICKET_PRICES } from '../data'

const BookingContext = createContext(null)

const EMPTY = {
  movieId: null,
  date: null, // 'YYYY-MM-DD'
  time: null, // 'HH:MM'
  tickets: { adult: 0, child: 0, senior: 0 },
  seats: [], // ['C7', 'C8']
  customer: { name: '', email: '' },
  payment: { method: null }, // 'card' | 'paypal' | ... — never store real card numbers
  confirmationCode: null,
}

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(EMPTY)

  const actions = useMemo(
    () => ({
      // Changing the movie clears everything downstream of it.
      selectMovie: (movieId) =>
        setBooking((b) => (b.movieId === movieId ? b : { ...EMPTY, movieId })),
      selectShowtime: (date, time) => setBooking((b) => ({ ...b, date, time, seats: [] })),
      setTickets: (tickets) =>
        setBooking((b) => ({ ...b, tickets: { ...b.tickets, ...tickets }, seats: [] })),
      pickSeats: (seats) => setBooking((b) => ({ ...b, seats })),
      setCustomer: (customer) =>
        setBooking((b) => ({ ...b, customer: { ...b.customer, ...customer } })),
      setPayment: (payment) => setBooking((b) => ({ ...b, payment: { ...b.payment, ...payment } })),
      confirm: () =>
        setBooking((b) => ({
          ...b,
          confirmationCode: 'CB-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
        })),
      reset: () => setBooking(EMPTY),
    }),
    [],
  )

  const derived = useMemo(() => {
    const totalTickets = Object.values(booking.tickets).reduce((a, n) => a + n, 0)
    const totalPrice = Object.entries(booking.tickets).reduce(
      (sum, [type, n]) => sum + n * TICKET_PRICES[type],
      0,
    )
    return {
      movie: booking.movieId ? getMovie(booking.movieId) : null,
      totalTickets,
      totalPrice,
      // True once the user has started picking things but hasn't confirmed.
      inProgress: booking.movieId !== null && booking.confirmationCode === null,
    }
  }, [booking])

  const value = useMemo(() => ({ booking, ...derived, ...actions }), [booking, derived, actions])
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>')
  return ctx
}
