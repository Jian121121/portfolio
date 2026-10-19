import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skills } from '../data/content'
import Tabs from './Tabs'
import SectionHeading from './SectionHeading'
import { reveal, fadeUp, stagger } from '../lib/motion'

const SHORT_LABELS = {
  'Web & Frameworks': 'Web',
  'Databases & Cloud': 'Data & Cloud',
  'Cybersecurity & Networking': 'Security & Networking',
  'Project Management': 'Management',
  'Dev & Design Tools': 'Tools',
}

const pill = {
  hidden: { opacity: 0, y: 6, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
}

export default function Skills({ n }) {
  const [active, setActive] = useState(skills[0].category)
  const group = skills.find((g) => g.category === active)
  const tabs = skills.map((g) => ({ id: g.category, label: SHORT_LABELS[g.category] || g.category }))

  return (
    <section id="skills" className="section-y">
      <div className="max-w-content mx-auto px-5 sm:px-10">
        <SectionHeading n={n} title="skills" />

        <motion.div {...reveal} variants={fadeUp}>
          <Tabs tabs={tabs} active={active} onChange={setActive} layoutId="skills-tab" label="Skill categories" />

          <div
            id="skills-tab-panel"
            role="tabpanel"
            aria-labelledby={`skills-tab-tab-${active}`}
            className="mt-8 min-h-[9rem]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={active}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                variants={stagger(0.025)}
                className="flex flex-wrap gap-2.5"
              >
                {group.items.map((name) => (
                  <motion.li
                    key={name}
                    variants={pill}
                    className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink hover:border-ink/40 transition-colors"
                  >
                    {name}
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
