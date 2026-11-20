// Proposal item 8: "confirmation on page exits".
// Right now this only covers closing/refreshing the tab (browser's native prompt).
//
// TODO (CineBuddy owner): when the user tries to leave the booking flow
// mid-booking (e.g. clicks the logo / home), have CineBuddy pop up and ask
// "You sure? Your seats aren't saved yet." instead of leaving immediately.
// react-router's useBlocker() is the tool for in-app navigation — it needs
// a data router (createBrowserRouter), so swap main.jsx over if you go that way.
import { useEffect } from 'react'

export function useLeaveGuard(active) {
  useEffect(() => {
    if (!active) return
    const handler = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [active])
}
