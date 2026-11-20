// Shared wrapper for every booking step: progress bar, title, Back/Next.
import { Link, useNavigate } from 'react-router-dom'

const STEPS = [
  { path: '/', label: 'Movie' },
  { path: '/showtimes', label: 'Showtime' },
  { path: '/tickets', label: 'Tickets' },
  { path: '/seats', label: 'Seats' },
  { path: '/details', label: 'Details' },
  { path: '/payment', label: 'Payment' },
  { path: '/confirmation', label: 'Done' },
]

export default function StepLayout({ step, title, children, canContinue = true, onNext, nextLabel = 'Next' }) {
  const navigate = useNavigate()
  const prev = STEPS[step - 1]
  const next = STEPS[step + 1]

  const handleNext = () => {
    onNext?.()
    if (next) navigate(next.path)
  }

  return (
    <section className="step">
      <ol className="progress">
        {STEPS.map((s, i) => (
          <li key={s.path} className={i === step ? 'current' : i < step ? 'done' : ''}>
            {s.label}
          </li>
        ))}
      </ol>

      <h2>{title}</h2>
      <div className="step-body">{children}</div>

      {next && (
        <div className="step-nav">
          {prev ? <Link to={prev.path} className="btn secondary">Back</Link> : <span />}
          {next && (
            <button className="btn" disabled={!canContinue} onClick={handleNext}>
              {nextLabel}
            </button>
          )}
        </div>
      )}
    </section>
  )
}

// Shown when someone deep-links into a step without doing the earlier ones.
export function MissingStep({ to, what }) {
  return (
    <p className="missing">
      Pick {what} first. <Link to={to}>Go back</Link>
    </p>
  )
}
