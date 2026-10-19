import { motion } from 'framer-motion'
import { Monitor, Sun, Moon } from 'lucide-react'
import { indicatorSpring } from '../../lib/motion'

const OPTIONS = [
  { id: 'system', label: 'Match device', icon: Monitor },
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
]

/** Segmented system / light / dark control. */
export default function ThemeSwitcher({ mode, setTheme }) {
  return (
    <div role="radiogroup" aria-label="Theme" className="flex items-center gap-0.5 rounded-full border border-line p-0.5">
      {OPTIONS.map(({ id, label, icon: Icon }) => {
        const selected = mode === id
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={label}
            title={label}
            onClick={() => setTheme(id)}
            className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              selected ? 'text-ink' : 'text-faint hover:text-ink'
            }`}
          >
            {selected && (
              <motion.span
                layoutId="theme-switcher"
                transition={indicatorSpring}
                className="absolute inset-0 rounded-full bg-surface2 border border-line"
              />
            )}
            <Icon size={15} strokeWidth={1.75} className="relative" />
          </button>
        )
      })}
    </div>
  )
}
