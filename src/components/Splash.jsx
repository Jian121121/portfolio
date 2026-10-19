import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { animate, useReducedMotion } from 'framer-motion'
import { profile } from '../data/content'

const KEY = 'splash-seen'
const TYPE_MS = 55

/** Once per visit, and not when arriving on a deep link like /#projects. */
export function shouldShowSplash() {
  try {
    return !sessionStorage.getItem(KEY) && !window.location.hash
  } catch {
    return false
  }
}

/**
 * Types the name, then glides it onto the hero heading (#hero-name) as the page fades in.
 * Uses the heading's exact classes and width so the hand-off is pixel-identical. Any input skips it.
 */
export default function Splash({ onDone }) {
  const reduce = useReducedMotion()
  const name = profile.name
  const [typed, setTyped] = useState(reduce ? name.length : 0)
  const [width, setWidth] = useState()
  const [gliding, setGliding] = useState(false)
  const nameRef = useRef(null)
  const bgRef = useRef(null)
  const finished = useRef(false)

  useLayoutEffect(() => {
    sessionStorage.setItem(KEY, '1')
    setWidth(document.getElementById('hero-name')?.getBoundingClientRect().width)
  }, [])

  const finish = (glide) => {
    if (finished.current) return
    finished.current = true
    setGliding(true)
    const el = nameRef.current
    const target = document.getElementById('hero-name')
    if (glide && target && !reduce) {
      const from = el.getBoundingClientRect()
      const to = target.getBoundingClientRect()
      animate(bgRef.current, { opacity: 0 }, { duration: 0.5, delay: 0.1, ease: 'easeOut' })
      animate(el, { x: to.left - from.left, y: to.top - from.top }, { duration: 0.6, ease: [0.65, 0, 0.35, 1] }).then(onDone)
    } else {
      animate(el, { opacity: 0 }, { duration: 0.2 })
      animate(bgRef.current, { opacity: 0 }, { duration: 0.3 }).then(onDone)
    }
  }

  useEffect(() => {
    if (typed >= name.length) {
      const t = setTimeout(() => finish(true), reduce ? 400 : 320)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setTyped((n) => n + 1), TYPE_MS)
    return () => clearTimeout(t)
  }, [typed]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const skip = () => finish(false)
    const events = ['pointerdown', 'keydown', 'wheel', 'touchmove']
    events.forEach((e) => window.addEventListener(e, skip, { passive: true }))
    return () => events.forEach((e) => window.removeEventListener(e, skip))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center px-5 ${gliding ? 'pointer-events-none' : ''}`} aria-hidden>
      <div ref={bgRef} className="absolute inset-0 bg-canvas" />
      <p
        ref={nameRef}
        className="relative text-4xl sm:text-5xl font-bold tracking-tight text-ink leading-[1.05]"
        style={{ width }}
      >
        {name.slice(0, typed)}
        <span className={`relative inline-block w-0 h-[0.9em] align-[-0.1em] ${gliding ? 'opacity-0' : ''}`}>
          <span className="absolute left-1 inset-y-0 w-[3px] rounded-full bg-string animate-pulse" />
        </span>
        <span className="invisible">{name.slice(typed)}</span>
      </p>
    </div>
  )
}
