import { useEffect, useState } from 'react'

// True on devices with no hover (touch). Used to swap hover-only affordances
// for something a finger can actually trigger.
//
// Starts false and syncs in an effect so server-less first paint and hydration
// agree; `change` keeps it honest when a tablet is docked to a mouse.
export function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: none)')
    const sync = () => setCoarse(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return coarse
}

export default useCoarsePointer
