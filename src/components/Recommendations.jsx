import { motion } from 'framer-motion'
import { recommendations } from '../data/content'
import SectionHeading from './SectionHeading'
import { reveal, stagger, item } from '../lib/motion'

export default function Recommendations({ n }) {
  return (
    <section id="recommendations" className="section-y">
      <div className="max-w-content mx-auto px-5 sm:px-10">
        <SectionHeading n={n} title="recommendations" />
        <motion.div {...reveal} variants={stagger(0.08)} className="grid gap-4 sm:grid-cols-2">
          {recommendations.map((r) => (
            <motion.figure key={r.name} variants={item} className="rounded-xl border border-line bg-surface p-5">
              <blockquote className="text-[15px] leading-relaxed text-ink">“{r.quote}”</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-medium text-ink">{r.name}</span>
                {r.title && <span className="block text-faint">{r.title}</span>}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
