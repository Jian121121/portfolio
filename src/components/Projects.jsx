import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Maximize2 } from 'lucide-react'
import { projects } from '../data/content'
import FallbackImage from './FallbackImage'
import SectionHeading from './SectionHeading'
import ProjectDetails, { Meta, slugOf } from './ProjectDetails'
import { reveal, fadeUp, stagger, ease } from '../lib/motion'

const HASH_PREFIX = '#project-'
const indexFromHash = () => {
  const i = projects.findIndex((p) => HASH_PREFIX + slugOf(p) === window.location.hash)
  return i === -1 ? null : i
}

function Screenshot({ project, hidden }) {
  const slug = slugOf(project)
  return (
    <div className="relative h-full flex flex-col rounded-lg border border-line bg-canvas overflow-hidden shadow-xl shadow-black/10">
      <motion.div
        layoutId={`shot-${slug}`}
        transition={{ duration: 0.45, ease }}
        style={{ visibility: hidden ? 'hidden' : undefined }}
        className="relative flex flex-col sm:flex-1 sm:min-h-0 overflow-hidden"
      >
        <FallbackImage
          src={project.image}
          alt={`${project.name} screenshot`}
          style={project.imageBg ? { backgroundColor: project.imageBg } : undefined}
          className={`w-full aspect-video sm:aspect-auto sm:flex-1 sm:min-h-0 ${
            project.imageFit === 'contain' ? 'object-contain' : 'object-cover object-left-top'
          } transition-transform duration-500 group-hover:scale-[1.03]`}
          fallback={
            <div
              role="img"
              aria-label={`${project.name} preview`}
              className="w-full aspect-video sm:aspect-auto sm:flex-1 flex items-center justify-center text-sm text-faint select-none"
            >
              {project.name}
            </div>
          }
        />
      </motion.div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 top-[29px] flex items-center justify-center bg-canvas/0 group-hover:bg-canvas/30 transition-colors duration-300"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/95 px-3 py-1.5 text-xs font-medium text-ink opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Maximize2 size={13} />
          View details
        </span>
      </span>
    </div>
  )
}

function LogoTile({ project, hidden }) {
  return (
    <div className="relative h-full rounded-lg border border-line overflow-hidden shadow-xl shadow-black/10">
      <motion.div
        layoutId={`shot-${slugOf(project)}`}
        transition={{ duration: 0.45, ease }}
        style={{ backgroundColor: project.logoBg, visibility: hidden ? 'hidden' : undefined }}
        className="h-full aspect-video sm:aspect-auto sm:min-h-[12rem] flex items-center justify-center"
      >
        <img
          src={project.logo}
          alt={`${project.name} logo`}
          loading="lazy"
          decoding="async"
          className="max-h-[70%] max-w-[72%] object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </motion.div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/95 px-3 py-1.5 text-xs font-medium text-ink">
          <Maximize2 size={13} />
          View details
        </span>
      </span>
    </div>
  )
}

export default function Projects({ n }) {
  const [openIndex, setOpenIndex] = useState(indexFromHash)
  const [sharedFrom, setSharedFrom] = useState(() => {
    const i = indexFromHash()
    return i == null ? null : slugOf(projects[i])
  })

  const open = (i) => {
    setSharedFrom(slugOf(projects[i]))
    setOpenIndex(i)
  }

  useEffect(() => {
    const { pathname, search, hash } = window.location
    if (openIndex != null) history.replaceState(null, '', HASH_PREFIX + slugOf(projects[openIndex]))
    else if (hash.startsWith(HASH_PREFIX)) history.replaceState(null, '', pathname + search)
  }, [openIndex])

  return (
    <section id="projects" className="section-y">
      <div className="max-w-content mx-auto px-5 sm:px-10">
        <SectionHeading n={n} title="projects" />

        <div className="flex flex-col gap-5">
          {projects.map((project, i) => (
            <motion.article
              key={project.name}
              id={`project-${slugOf(project)}`}
              {...reveal}
              variants={stagger(0.08)}
              onClick={(e) => !e.target.closest('a, button') && open(i)}
              className="group cursor-pointer grid sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-5 sm:gap-6 rounded-xl border border-line bg-surface p-4 sm:p-5 hover:border-func/60 transition-colors"
            >
              <motion.div variants={fadeUp}>
                {project.logo ? (
                  <LogoTile project={project} hidden={openIndex === i && sharedFrom === slugOf(project)} />
                ) : (
                  <Screenshot project={project} hidden={openIndex === i && sharedFrom === slugOf(project)} />
                )}
              </motion.div>

              <div className="flex flex-col gap-3 min-w-0">
                <motion.div variants={fadeUp} className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-bold tracking-tight text-ink">{project.name}</h3>
                  <span className="text-xs text-faint shrink-0">{project.year}</span>
                </motion.div>

                <motion.p variants={fadeUp} className="text-sm text-muted leading-relaxed line-clamp-3">
                  {project.description}
                </motion.p>

                <motion.dl variants={fadeUp} className="grid grid-cols-2 gap-x-4 gap-y-3 py-3 border-y border-line">
                  <Meta label="Role" value={project.role} />
                  <Meta label="Status" value={project.status} />
                  <Meta label="Platform" value={project.platform} />
                  <Meta label="Client" value={project.client?.name} href={project.client?.link} />
                </motion.dl>

                <motion.div variants={fadeUp} className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => open(i)}
                    aria-haspopup="dialog"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-func transition-colors"
                  >
                    View details
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-func hover:underline underline-offset-4"
                    >
                      Visit live site
                      <ArrowUpRight size={15} strokeWidth={1.75} />
                    </a>
                  )}
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ProjectDetails
        projects={projects}
        index={openIndex}
        sharedFrom={sharedFrom}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  )
}
