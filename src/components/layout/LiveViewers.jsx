import { useSyncExternalStore } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// One presence connection per page, shared by every <LiveViewers/>, so each visitor counts once.
let viewers = 0
let started = false
const listeners = new Set()

function connect() {
  if (started || !url || !key) return
  started = true
  import('@supabase/supabase-js').then(({ createClient }) => {
    const channel = createClient(url, key).channel('portfolio-viewers', {
      config: { presence: { key: crypto.randomUUID() } },
    })
    channel
      .on('presence', { event: 'sync' }, () => {
        viewers = Object.keys(channel.presenceState()).length
        listeners.forEach((l) => l())
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') channel.track({ at: Date.now() })
      })
  })
}

function subscribe(listener) {
  listeners.add(listener)
  connect()
  return () => listeners.delete(listener)
}

/** Live "N viewing now" via Supabase Realtime Presence. Hidden until someone else is here too. */
export default function LiveViewers({ className = '' }) {
  const count = useSyncExternalStore(subscribe, () => viewers)

  if (count < 2) return null

  return (
    <p className={`flex items-center gap-2 text-xs text-muted ${className}`} aria-live="polite">
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 rounded-full bg-string animate-ping opacity-60" />
        <span className="relative h-2 w-2 rounded-full bg-string" />
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={count}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="tabular-nums font-medium text-ink"
        >
          {count}
        </motion.span>
      </AnimatePresence>
      {' people viewing now'}
    </p>
  )
}
