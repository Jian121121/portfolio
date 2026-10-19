import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

let instance = null

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (instance) instance.scrollTo(el)
  else el.scrollIntoView({ behavior: 'smooth' })
}

export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 })
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a || a.getAttribute('href').length < 2) return
      e.preventDefault()
      scrollToId(a.getAttribute('href').slice(1))
    }
    document.addEventListener('click', onClick)
    instance = lenis
    return () => {
      document.removeEventListener('click', onClick)
      lenis.destroy()
      instance = null
    }
  }, [])
}
