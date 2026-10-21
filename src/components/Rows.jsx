import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Award, Maximize2 } from 'lucide-react'
import { item, ease } from '../lib/motion'

export function initialsOf(text) {
  return text
    .split(/[\s—(),]+/)
    .filter((w) => /^[A-Z]/.test(w))
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
}

export const isCurrent = (period = '') => /present/i.test(period)
const startYear = (period = '') => period.match(/\d{4}/)?.[0] ?? ''

export function OrgLogo({ src, name, boxed, bg }) {
  const [failed, setFailed] = useState(!src)
  const box = `shrink-0 border border-line overflow-hidden ${boxed ? 'h-12 w-16 rounded-md' : 'h-10 w-10 rounded-full'}`
  if (failed) {
    return (
      <span aria-hidden className={`${box} flex items-center justify-center bg-surface text-xs font-semibold text-string select-none`}>
        {initialsOf(name)}
      </span>
    )
  }
  return (
    <img
      src={src}
      alt={`${name} logo`}
      loading="lazy"
      decoding="async"
      className={`${box} ${boxed ? 'object-contain p-1.5' : 'object-cover'} bg-ink`}
      style={bg ? { backgroundColor: bg } : undefined}
      onError={() => setFailed(true)}
    />
  )
}

export function CertThumb({ src, name, onOpen }) {
  const [failed, setFailed] = useState(!src)
  const box = 'h-12 w-16 shrink-0 rounded-md border border-line overflow-hidden'
  if (failed) {
    return (
      <span aria-hidden className={`${box} flex items-center justify-center bg-surface text-faint`}>
        <Award size={18} />
      </span>
    )
  }
  return (
    <button
      type="button"
      onClick={() => onOpen({ src, alt: name })}
      aria-label={`View certificate: ${name}`}
      className={`${box} group relative hover:border-func focus-visible:border-func transition-colors`}
    >
      <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" onError={() => setFailed(true)} />
      <span className="absolute inset-0 flex items-center justify-center bg-canvas/60 text-func opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
        <Maximize2 size={14} />
      </span>
    </button>
  )
}

export function GroupLabel({ children }) {
  return <h3 className="mt-10 [div+&]:mt-0 mb-1 text-xs font-medium uppercase tracking-wider text-faint">{children}</h3>
}

function Bullets({ bullets, open, order = 0 }) {
  return (
    <AnimatePresence initial={false}>
      {open && bullets?.length > 0 && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1, transition: { duration: 0.3, ease, delay: order * 0.15 } }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease }}
          className="overflow-hidden"
        >
          <ul className="pt-3 flex flex-col gap-1.5">
            {bullets.map((b, i) => (
              <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
                <span className="text-string shrink-0">›</span>
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Compact "year · role · org" row; `leading` replaces the year column (e.g. a logo). */
export function Row({ heading, sub, period, bullets, open, order, leading, trailing, showPeriod }) {
  const current = isCurrent(period)
  return (
    <motion.li variants={item} className="flex gap-4 py-4 border-b border-line last:border-b-0">
      {leading ?? (
        <span className="w-12 shrink-0 pt-px text-sm tabular-nums text-faint">{startYear(period)}</span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h4 className="text-[15px] font-medium text-ink leading-snug">
              {heading}
              {current && (
                <span
                  aria-label="current"
                  className="ml-2 inline-block h-2 w-2 rounded-full bg-string ring-4 ring-string/15 align-middle"
                />
              )}
            </h4>
            <p className="mt-0.5 text-sm text-muted">{sub}</p>
            {showPeriod && <p className="mt-0.5 text-xs text-faint">{period}</p>}
          </div>
          {trailing}
        </div>
        <Bullets bullets={bullets} open={open} order={order} />
      </div>
    </motion.li>
  )
}
