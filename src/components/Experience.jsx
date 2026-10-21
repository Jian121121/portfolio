import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { experience, education, research } from '../data/content'
import SectionHeading, { HeadingAction } from './SectionHeading'
import { Row, GroupLabel, OrgLogo, CertThumb } from './Rows'
import Lightbox from './Lightbox'
import { Verify } from './Certifications'
import { reveal, stagger } from '../lib/motion'

export default function Experience({ n }) {
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState(null)
  const closePreview = useCallback(() => setPreview(null), [])
  const work = experience.filter((e) => e.type !== 'project')

  return (
    <section id="experience" className="section-y">
      <div className="max-w-content mx-auto px-5 sm:px-10">
        <SectionHeading
          n={n}
          title="experience"
          action={
            <HeadingAction onClick={() => setOpen((o) => !o)}>
              {open ? 'collapse ↑' : 'full history ↓'}
            </HeadingAction>
          }
        />

        <GroupLabel>Project experience</GroupLabel>
        <motion.ul {...reveal} variants={stagger(0.06)}>
          {experience
            .filter((e) => e.type === 'project')
            .map((e) => (
              <Row
                key={e.title}
                heading={e.title}
                sub={e.org}
                period={e.period}
                bullets={e.bullets}
                open={open}
                showPeriod
                leading={e.logo && <OrgLogo src={e.logo} name={e.org} bg={e.logoBg} boxed />}
              />
            ))}
          {research.map((r) => (
            <Row
              key={r.title}
              heading={r.title}
              sub={`${r.role} · ${r.venue}`}
              period={r.date}
              bullets={r.bullets}
              open={open}
              showPeriod
              leading={r.image && <CertThumb src={r.image} name={`${r.title} — certificate`} onOpen={setPreview} />}
              trailing={<Verify verify={r.verify} />}
            />
          ))}
        </motion.ul>

        {work.length > 0 && (
          <>
            <GroupLabel>Work</GroupLabel>
            <motion.ul {...reveal} variants={stagger(0.06)}>
              {work.map((e) => (
                <Row key={e.title} heading={e.title} sub={e.org} period={e.period} bullets={e.bullets} open={open} />
              ))}
            </motion.ul>
          </>
        )}

        <GroupLabel>Education</GroupLabel>
        <motion.ul {...reveal} variants={stagger(0.06)}>
          {education.map((ed) => (
            <Row
              key={ed.school}
              heading={ed.school}
              sub={ed.detail}
              period={ed.period}
              showPeriod
              leading={<OrgLogo src={ed.logo} name={ed.school} />}
            />
          ))}
        </motion.ul>
      </div>
      <Lightbox image={preview} onClose={closePreview} />
    </section>
  )
}
