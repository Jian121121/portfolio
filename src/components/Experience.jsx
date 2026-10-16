import { motion } from 'framer-motion'
import {
  experience,
  education,
  certifications,
  extracurriculars,
  workshops,
  research,
} from '../data/content'
import { reveal, fadeUp, stagger, item } from '../lib/motion'

function Block({ title, children, delay = 0 }) {
  return (
    <motion.div {...reveal} variants={stagger(0.08, delay)}>
      <motion.h3 variants={fadeUp} className="font-mono text-sm text-keyword mb-5">
        {title.toLowerCase()}:
      </motion.h3>
      {children}
    </motion.div>
  )
}

function TimelineRow({ heading, sub, period, bullets }) {
  return (
    <motion.div
      variants={item}
      className="grid md:grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-2 py-5 border-b border-line last:border-b-0"
    >
      <div className="min-w-0 break-words">
        <h4 className="font-mono text-base text-ink">{heading}</h4>
        <p className="text-muted font-sans text-sm mt-0.5">{sub}</p>
        {bullets && (
          <ul className="mt-3 flex flex-col gap-1.5">
            {bullets.map((b, i) => (
              <li key={i} className="text-muted font-sans text-sm flex gap-2">
                <span className="text-string shrink-0">›</span>
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
      <span className="font-mono text-xs text-faint whitespace-nowrap">{period}</span>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-28 border-t border-line scroll-mt-16">
      <div className="max-w-content mx-auto px-5 sm:px-10 flex flex-col gap-16">
        <span className="font-mono text-sm text-faint select-none -mb-6">// experience</span>

        <Block title="Experience">
          <div className="border-t border-line">
            {experience.map((e) => (
              <TimelineRow
                key={e.title}
                heading={e.title}
                sub={e.org}
                period={e.period}
                bullets={e.bullets}
              />
            ))}
          </div>
        </Block>

        <Block title="Education" delay={0.05}>
          <div className="border-t border-line">
            {education.map((ed) => (
              <TimelineRow key={ed.school} heading={ed.school} sub={ed.detail} period={ed.period} />
            ))}
          </div>
        </Block>

        <div className="grid lg:grid-cols-2 gap-16">
          <Block title="Certifications" delay={0.1}>
            <div className="border-t border-line">
              {certifications.map((c) => (
                <TimelineRow key={c.name} heading={c.name} sub={c.org} period={c.date} />
              ))}
              {workshops.map((w) => (
                <TimelineRow key={w.name} heading={w.name} sub={w.org} period={w.date} />
              ))}
            </div>
          </Block>

          <Block title="Extracurriculars" delay={0.1}>
            <div className="border-t border-line">
              {extracurriculars.map((ex) => (
                <TimelineRow
                  key={ex.title}
                  heading={ex.title}
                  sub={ex.org}
                  period={ex.period}
                  bullets={ex.bullets}
                />
              ))}
            </div>
          </Block>
        </div>

        <Block title="Research" delay={0.15}>
          <div className="border-t border-line">
            {research.map((r) => (
              <TimelineRow
                key={r.title}
                heading={r.title}
                sub={`${r.role} — ${r.venue}`}
                period={r.date}
                bullets={[r.description]}
              />
            ))}
          </div>
        </Block>
      </div>
    </section>
  )
}