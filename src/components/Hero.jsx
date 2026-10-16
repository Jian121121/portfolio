import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/content'
import { ease, tap } from '../lib/motion'

// Lines rendered as a typed-out JS object literal.
function useTypewriter(lines, speed = 18) {
  const [doneLines, setDoneLines] = useState([])
  const [currentText, setCurrentText] = useState('')
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    if (lineIndex >= lines.length) return
    const full = lines[lineIndex].text
    if (currentText.length < full.length) {
      const t = setTimeout(() => setCurrentText(full.slice(0, currentText.length + 1)), speed)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setDoneLines((d) => [...d, lines[lineIndex]])
      setCurrentText('')
      setLineIndex((i) => i + 1)
    }, 150)
    return () => clearTimeout(t)
  }, [currentText, lineIndex, lines, speed])

  return { doneLines, currentText, lineIndex }
}

export default function Hero() {
  const lines = [
    { indent: 1, text: `name: "${profile.name}",`, color: 'text-string' },
    { indent: 1, text: `role: "${profile.role}",`, color: 'text-string' },
    { indent: 1, text: `location: "${profile.location}",`, color: 'text-string' },
    { indent: 1, text: `available: true,`, color: 'text-func' },
  ]
  const { doneLines, currentText, lineIndex } = useTypewriter(lines)
  const typingCurrent = lineIndex < lines.length

  return (
    <section className="min-h-screen flex items-center">
      <div className="max-w-content mx-auto px-5 sm:px-10 w-full">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="font-mono text-sm text-muted mb-4"
        >
          hero.js
        </motion.p>

        <div className="font-mono text-lg sm:text-2xl leading-relaxed">
          <div>
            <span className="text-keyword">const</span>{' '}
            <span className="text-ink">engineer</span> ={' '}
            <span className="text-ink">{'{'}</span>
          </div>

          {doneLines.map((l, i) => (
            <div key={i} className="pl-6">
              <span className={l.color}>{l.text}</span>
            </div>
          ))}

          {typingCurrent && (
            <div className="pl-6">
              <span className={lines[lineIndex].color}>{currentText}</span>
              <span className="inline-block w-[0.55ch] h-[1em] bg-ink align-middle ml-0.5 animate-pulse" />
            </div>
          )}

          <div>
            <span className="text-ink">{'}'}</span>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6, ease }}
          className="mt-8 max-w-md text-muted font-sans text-base sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6, ease }}
          className="mt-8 flex flex-wrap gap-3 font-mono text-sm"
        >
          <motion.a
            href="#projects"
            whileHover={{ y: -2 }}
            whileTap={tap}
            className="px-4 py-2 border border-line rounded-md text-ink hover:border-func hover:text-func transition-colors"
          >
            View projects
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ y: -2 }}
            whileTap={tap}
            className="px-4 py-2 border border-line rounded-md text-ink hover:border-string hover:text-string transition-colors"
          >
            Get in touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}