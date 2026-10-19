import { motion } from 'framer-motion'
import { AppWindow, ArrowRight, GraduationCap, LayoutTemplate } from 'lucide-react'
import { services, workflow } from '../data/content'
import SectionHeading from './SectionHeading'
import { reveal, stagger, item } from '../lib/motion'

const ICONS = [LayoutTemplate, AppWindow, GraduationCap]

export default function Services({ n }) {
  return (
    <section id="services" className="section-y">
      <div className="max-w-content mx-auto px-5 sm:px-10">
        <SectionHeading n={n} title="services" />

        <motion.ul {...reveal} variants={stagger(0.08)} className="grid gap-3 sm:grid-cols-3">
          {services.map(({ title, body }, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.li
                key={title}
                variants={item}
                className="rounded-xl border border-line bg-surface p-4 hover:border-func/60 transition-colors"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-canvas text-func">
                  <Icon size={17} strokeWidth={1.75} />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-ink">{title}</h3>
                <p className="mt-1.5 text-sm text-muted leading-relaxed">{body}</p>
              </motion.li>
            )
          })}
        </motion.ul>

        <motion.ol {...reveal} variants={stagger(0.08)} className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5">
          {workflow.map(({ title, body }, i) => (
            <motion.li key={title} variants={item} className="relative">
              <div className="flex items-center gap-2">
                <span className="text-xs tabular-nums text-faint">{String(i + 1).padStart(2, '0')}</span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <p className="mt-2 text-sm font-semibold text-ink">{title}</p>
              <p className="mt-0.5 text-xs text-muted leading-relaxed">{body}</p>
            </motion.li>
          ))}
        </motion.ol>

        <motion.a
          {...reveal}
          variants={item}
          href="#contact"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas hover:opacity-90 transition-opacity"
        >
          Start a project
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </motion.a>
      </div>
    </section>
  )
}
