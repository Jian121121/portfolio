import { useEffect, useRef, useState } from 'react'

// Opens as the section scrolls into view; closes only once it is entirely below the viewport,
// so collapsing never shifts content the reader is looking at. Manual toggles hold until the section changes zone.
export default function useScrollOpen() {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let zone = null
    let frame = 0
    const check = () => {
      frame = 0
      const el = ref.current
      if (!el) return
      const { top, bottom } = el.getBoundingClientRect()
      const next = top > window.innerHeight * 0.85 ? 'below' : bottom > 0 ? 'in' : 'above'
      if (next === zone) return
      zone = next
      if (next === 'below') setOpen(false)
      else if (next === 'in') setOpen(true)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return [ref, open, setOpen]
}
