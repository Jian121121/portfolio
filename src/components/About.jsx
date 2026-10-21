import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Footprints, BookOpen, Volleyball } from 'lucide-react'
import { about } from '../data/content'
import Tabs from './Tabs'
import SectionHeading from './SectionHeading'
import { reveal, fadeUp, stagger, item } from '../lib/motion'

const ITEM_ICONS = { run: Footprints, book: BookOpen, volleyball: Volleyball }

function Panel({ tab }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
      variants={stagger(0.07)}
      className="flex flex-col gap-5"
    >
      {tab.body?.map((p, i) => (
        <motion.p key={i} variants={fadeUp} className="text-base sm:text-lg leading-relaxed text-ink">
          {p}
        </motion.p>
      ))}

      {tab.items && (
        <ul className="flex flex-col gap-4">
          {tab.items.map((it) => {
            const Icon = ITEM_ICONS[it.icon]
            return (
              <motion.li key={it.text} variants={item} className="flex items-start gap-3 text-base text-muted">
                {Icon ? (
                  <Icon size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-string" />
                ) : (
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-string" />
                )}
                {it.text}
              </motion.li>
            )
          })}
        </ul>
      )}

      {tab.updated && (
        <motion.p variants={item} className="flex items-center gap-2 text-xs text-faint">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-string opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-string" />
          </span>
          Updated {tab.updated}
        </motion.p>
      )}
    </motion.div>
  )
}

export default function About({ n }) {
  const [active, setActive] = useState(about.tabs[0].id)
  const tab = about.tabs.find((t) => t.id === active)

  return (
    <section id="about" className="section-y">
      <div className="max-w-content mx-auto px-5 sm:px-10">
        <SectionHeading n={n} title="about" />

        <motion.div {...reveal} variants={fadeUp}>
          <Tabs tabs={about.tabs} active={active} onChange={setActive} layoutId="about-tab" label="About me" />

          <div
            id="about-tab-panel"
            role="tabpanel"
            aria-labelledby={`about-tab-tab-${active}`}
            className="mt-8 min-h-[13rem]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <Panel key={active} tab={tab} />
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
