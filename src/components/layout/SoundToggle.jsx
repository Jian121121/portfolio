import { AnimatePresence, motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { setMuted, useMuted } from '../../lib/sound'

export default function SoundToggle({ className = '' }) {
  const muted = useMuted()
  const label = muted ? 'Turn click sounds on' : 'Mute click sounds'

  return (
    <button
      type="button"
      onClick={() => setMuted(!muted)}
      aria-label={label}
      aria-pressed={!muted}
      title={label}
      className={`flex items-center justify-center rounded-full border border-line text-muted hover:text-ink hover:border-func transition-colors ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={muted ? 'off' : 'on'}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.15 }}
          className="flex"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
