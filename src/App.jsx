import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { useBooking } from './context/BookingContext'
import { useLeaveGuard } from './hooks/useLeaveGuard'
import CineBuddy from './cinebuddy/CineBuddy'
import MoviesPage from './pages/MoviesPage'
import ShowtimesPage from './pages/ShowtimesPage'
import TicketsPage from './pages/TicketsPage'
import SeatsPage from './pages/SeatsPage'
import DetailsPage from './pages/DetailsPage'
import PaymentPage from './pages/PaymentPage'
import ConfirmationPage from './pages/ConfirmationPage'

function App() {
  const { inProgress } = useBooking()
  useLeaveGuard(inProgress)

  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="brand">🍿 CineBuddy Cinemas</Link>
        <p>Book your movie in a few clicks, or just ask CineBuddy</p>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<MoviesPage />} />
          <Route path="/showtimes" element={<ShowtimesPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/seats" element={<SeatsPage />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="*" element={<p>Page not found. <Link to="/">Home</Link></p>} />
        </Routes>
      </main>

      <CineBuddy />
    </div>
  )
}

export default App
