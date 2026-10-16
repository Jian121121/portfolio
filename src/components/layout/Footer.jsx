import { AnimatePresence, motion } from 'framer-motion'
import { Sun, Moon, Download } from 'lucide-react'
import { ease, tap } from '../../lib/motion'
import { profile } from '../../data/content'
import useTheme from '../../hooks/useTheme'

export default function Footer() {
  const [theme, setTheme] = useTheme()

  return (
    <footer className="border-t border-line py-8">
      <div className="max-w-content mx-auto px-5 sm:px-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="font-mono text-xs text-faint flex flex-col gap-1">
          <span>{profile.name} — {new Date().getFullYear()}</span>
          <span>built with react, tailwind &amp; framer motion</span>
        </div>

        <div className="flex items-center gap-3 font-mono text-sm">
          <motion.button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle color theme"
            whileTap={tap}
            className="flex items-center gap-2 px-3 py-2 rounded-md border border-line text-ink hover:border-func hover:text-func transition-colors"
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
                {theme === 'dark' ? <Sun size={15} strokeWidth={1.75} /> : <Moon size={15} strokeWidth={1.75} />}
              </motion.span>
            </AnimatePresence>
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </motion.button>

          {profile.resume && (
            <motion.a
              href={profile.resume}
              download
              whileTap={tap}
              className="flex items-center gap-2 px-3 py-2 rounded-md border border-line text-ink hover:border-string hover:text-string transition-colors"
            >
              <Download size={15} strokeWidth={1.75} />
              Download CV
            </motion.a>
          )}
        </div>
      </div>
    </footer>
  )
}
