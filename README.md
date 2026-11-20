# CineBuddy Cinemas: SOFE 4850U Final Project (Group 22)

A movie ticket booking site with **CineBuddy**, a popcorn-bag avatar that helps you book through text or voice chat.

## Run it

Requires Node 20+.

```bash
npm install
npm run dev
```

Open the localhost link it prints. **Use Chrome or Edge:** voice input (Web Speech API) doesn't work properly in Firefox or Safari.

## How it's put together

```
src/
  data/                 Fake data, no backend
    movies.json           movies (title, genre, rating, runtime, blurb, poster)
    showtimes.json        times per movie (same every day)
    index.js              helpers: getMovie, getDates, getShowtimes, getSeatMap, prices, formatting
  context/
    BookingContext.jsx  Shared booking state + actions (selectMovie, selectShowtime,
                        setTickets, pickSeats, setCustomer, setPayment, confirm, reset)
  pages/                One page per booking step
  components/
    StepLayout.jsx      Progress bar + Back/Next used by every page
  cinebuddy/
    CineBuddy.jsx       Floating bubble, on every page
    ChatPanel.jsx       Chat window
    intents.js          CineBuddy's brain (rule-based), turns a message into a reply + actions
    useVoice.js         Speech-to-text (stub, TODO)
  hooks/
    useLeaveGuard.js    "Are you sure you want to leave?" (proposal item 8)
```

**The key idea:** pages and CineBuddy both read and write the *same* `useBooking()` state.
So when CineBuddy calls `selectMovie('starfall')`, the Movies page updates on its own. That's how the avatar books for you.

```jsx
const { booking, movie, totalTickets, totalPrice, selectMovie, setTickets } = useBooking()
```

### Booking flow

`/` Movie → `/showtimes` → `/tickets` → `/seats` → `/details` → `/payment` → `/confirmation`

If you open a step without doing the earlier ones, it shows a "go back" link instead of crashing.

## Proposal checklist

| # | Feature | Where | Status |
|---|---|---|---|
| 1 | Movies with genre + age rating | `MoviesPage` | basic |
| 2 | Dates and showtimes | `ShowtimesPage` | basic |
| 3 | Ticket types (adult/child/senior) | `TicketsPage` | basic |
| 4 | Seat preference (middle / left / right) | `SeatsPage`, `getSeatMap` | basic, needs auto-pick by section |
| 5 | Name + email | `DetailsPage` | basic |
| 6 | Payment methods (fake) | `PaymentPage` | basic, needs card form |
| 7 | Summary + confirmation | `PaymentPage`, `ConfirmationPage` | basic |
| 8 | Voice anytime + confirm on exit | `useVoice`, `useLeaveGuard` | **TODO** |
| 9 | Recommendations | `intents.js` | **TODO** |
| – | CineBuddy understands booking commands | `intents.js` | **TODO** |
| – | Popcorn avatar art | `cinebuddy/` | **TODO** (emoji placeholder) |

Search the code for `TODO` to find what's left.

## Who owns what

So we don't overwrite each other's work. Fill in names:

| Area | Files | Owner |
|---|---|---|
| Booking pages + styling | `src/pages/`, `App.css` | ? |
| CineBuddy (chat, voice, intents, avatar art) | `src/cinebuddy/`, `useLeaveGuard.js` | ? |
| Data, state, polish, demo script | `src/data/`, `src/context/`, README | ? |

## Git workflow

- Never push straight to `main`. Make a branch: `git checkout -b yourname/feature`
- Push it, then open a pull request on GitHub
- `git pull` on `main` before starting anything new
- **Feature freeze Fri Nov 27.** Only bug fixes after that. Demo due Mon Nov 30, presentation Wed Dec 2.
