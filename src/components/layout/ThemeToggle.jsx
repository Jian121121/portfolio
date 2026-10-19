import { AnimatePresence, motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { ease, tap } from '../../lib/motion'

export default function ThemeToggle({ theme, setTheme, className = '' }) {
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <motion.button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      whileTap={tap}
      className={`flex items-center justify-center rounded-full border border-line text-muted hover:text-ink hover:border-func transition-colors ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2, ease }}
          className="flex"
        >
          {theme === 'dark' ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
