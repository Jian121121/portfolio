import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { indicatorSpring } from '../lib/motion'

export default function Tabs({ tabs, active, onChange, layoutId, label }) {
  const refs = useRef([])
  const scroller = useRef(null)
  const [moreRight, setMoreRight] = useState(false)

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const check = () => setMoreRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2)
    check()
    el.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      el.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [tabs.length])

  // Horizontal-only scroll so switching tabs never moves the page vertically
  useEffect(() => {
    const el = scroller.current
    const btn = refs.current[tabs.findIndex((t) => t.id === active)]
    if (!el || !btn) return
    const offset = btn.getBoundingClientRect().left - el.getBoundingClientRect().left
    el.scrollTo({ left: el.scrollLeft + offset - (el.clientWidth - btn.offsetWidth) / 2, behavior: 'smooth' })
  }, [active, tabs])

  const onKeyDown = (e, i) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (i + dir + tabs.length) % tabs.length
    onChange(tabs[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div
      ref={scroller}
      role="tablist"
      aria-label={label}
      className={`no-scrollbar relative -mx-5 px-5 sm:mx-0 sm:px-0 overflow-x-auto ${
        moreRight ? '[mask-image:linear-gradient(to_right,black_85%,transparent)]' : ''
      }`}
    >
      <div className="relative flex gap-1 p-1 rounded-full border border-line bg-surface w-max">
        {tabs.map((tab, i) => {
          const selected = tab.id === active
          return (
            <button
              key={tab.id}
              ref={(el) => (refs.current[i] = el)}
              type="button"
              role="tab"
              id={`${layoutId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${layoutId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`relative whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                selected ? 'text-canvas' : 'text-muted hover:text-ink'
              }`}
            >
              {selected && (
                <motion.span
                  layoutId={layoutId}
                  transition={indicatorSpring}
                  className="absolute inset-0 rounded-full bg-ink"
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
