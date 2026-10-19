import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { ease } from '../lib/motion'

export default function Lightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [image, onClose])

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-canvas/90 backdrop-blur-sm p-4 sm:p-10"
        >
          <motion.figure
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full rounded-lg border border-line bg-surface overflow-hidden shadow-2xl shadow-black/40"
          >
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line">
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <figcaption className="ml-3 min-w-0 truncate text-xs text-muted">{image.alt}</figcaption>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                autoFocus
                className="ml-auto p-1 rounded text-muted hover:text-ink hover:bg-surface2 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <img src={image.src} alt={image.alt} className="w-full max-h-[78vh] object-contain bg-canvas" />
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
