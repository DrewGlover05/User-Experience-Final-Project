// Step 1 — proposal item 1: available movies with genre + age rating.
// TODO: real poster grid, genre filter, search.
import { movies } from '../data'
import { useBooking } from '../context/BookingContext'
import StepLayout from '../components/StepLayout'

export default function MoviesPage() {
  const { booking, selectMovie } = useBooking()

  return (
    <StepLayout step={0} title="Now showing" canContinue={!!booking.movieId}>
      <ul className="movie-list">
        {movies.map((m) => (
          <li key={m.id}>
            <button
              className={`card ${booking.movieId === m.id ? 'selected' : ''}`}
              onClick={() => selectMovie(m.id)}
            >
              <img src={m.poster} alt="" width="90" />
              <div>
                <strong>{m.title}</strong>
                <div className="meta">
                  {m.genre} · {m.rating} · {m.runtime} min
                </div>
                <p>{m.blurb}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </StepLayout>
  )
}
