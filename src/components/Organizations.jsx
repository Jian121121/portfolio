import { useState } from 'react'
import { motion } from 'framer-motion'
import { extracurriculars } from '../data/content'
import SectionHeading, { HeadingAction } from './SectionHeading'
import { Row, OrgLogo } from './Rows'
import { reveal, stagger } from '../lib/motion'

export default function Organizations({ n }) {
  const [open, setOpen] = useState(false)

  return (
    <section id="organizations" className="section-y">
      <div className="max-w-content mx-auto px-5 sm:px-10">
        <SectionHeading
          n={n}
          title="organizations"
          action={
            <HeadingAction onClick={() => setOpen((o) => !o)}>{open ? 'less ↑' : 'details ↓'}</HeadingAction>
          }
        />
        <motion.ul {...reveal} variants={stagger(0.06)}>
          {extracurriculars.map((ex) => (
            <Row
              key={ex.title + ex.org}
              heading={ex.title}
              sub={ex.org}
              period={ex.period}
              showPeriod
              bullets={ex.bullets}
              open={open}
              leading={<OrgLogo src={ex.logo} name={ex.org} />}
            />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
