import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

const clamp = (v) => Math.max(-1, Math.min(1, v))
const spring = { stiffness: 140, damping: 18, mass: 0.5 }

export default function HeroPhoto({ src, alt, initials }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [failed, setFailed] = useState(!src)
  const [finePointer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )

  // Cursor position relative to the photo, normalised to -1..1
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, spring)
  const sy = useSpring(my, spring)

  const rotateY = useTransform(sx, [-1, 1], [-16, 16])
  const rotateX = useTransform(sy, [-1, 1], [14, -14])
  // the image drifts the opposite way inside the frame, which reads as depth
  const imgX = useTransform(sx, [-1, 1], [12, -12])
  const imgY = useTransform(sy, [-1, 1], [10, -10])
  const glareX = useTransform(sx, [-1, 1], [0, 100])
  const glareY = useTransform(sy, [-1, 1], [0, 100])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.28), transparent 60%)`

  const interactive = finePointer && !reduce

  useEffect(() => {
    if (!interactive) return
    const onMove = (e) => {
      const r = ref.current?.getBoundingClientRect()
      if (!r) return
      mx.set(clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)))
      my.set(clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)))
    }
    const onLeave = () => {
      mx.set(0)
      my.set(0)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [interactive, mx, my])

  return (
    <div ref={ref} className="relative" style={{ perspective: 900 }}>
      <motion.div
        style={interactive ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
        animate={!interactive && !reduce ? { y: [0, -6, 0], rotate: [0, 0.8, 0] } : undefined}
        transition={!interactive ? { duration: 6, repeat: Infinity, ease: 'easeInOut' } : undefined}
        className="relative"
      >
        <div
          aria-hidden
          className="absolute inset-0 rounded-lg border border-string/40"
          style={{ transform: 'translate(12px, 12px)' }}
        />
        <div className="relative aspect-[4/5] rounded-lg border border-line bg-surface overflow-hidden shadow-2xl shadow-black/30">
          {failed ? (
            <div
              role="img"
              aria-label={alt}
              className="h-full w-full flex items-center justify-center bg-canvas text-4xl font-semibold text-string select-none"
            >
              {initials}
            </div>
          ) : (
            <motion.img
              src={src}
              alt={alt}
              draggable={false}
              onError={() => setFailed(true)}
              style={interactive ? { x: imgX, y: imgY, scale: 1.12 } : { scale: 1.04 }}
              className="h-full w-full object-cover object-[50%_25%] grayscale select-none"
            />
          )}
          {interactive && !failed && (
            <motion.div
              aria-hidden
              style={{ backgroundImage: glare }}
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            />
          )}
        </div>
      </motion.div>
    </div>
  )
}
