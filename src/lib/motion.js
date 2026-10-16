export const ease = [0.22, 1, 0.36, 1]

export const viewport = { once: true, amount: 0.15 }

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

export const stagger = (step = 0.06, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
})

export const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
}

export const reveal = {
  initial: 'hidden',
  whileInView: 'show',
  viewport,
}

export const indicatorSpring = { type: 'spring', stiffness: 420, damping: 36 }

export const tap = { scale: 0.97 }
