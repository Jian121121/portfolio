import { useEffect, useState } from 'react'

/** Returns the id of the section in view, or null while the hero (#top) is in view. */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const sections = ['top', ...ids].map((id) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id === 'top' ? null : entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [ids])

  return active
}
