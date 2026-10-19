import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, X } from 'lucide-react'
import FallbackImage from './FallbackImage'
import { ease } from '../lib/motion'

export const slugOf = (project) => project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export function Meta({ label, value, href }) {
  if (!value) return null
  return (
    <div className="min-w-0">
      <dt className="text-[11px] uppercase tracking-wider text-faint">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-ink truncate" title={value}>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="hover:text-func underline decoration-line underline-offset-4 hover:decoration-func transition-colors"
          >
            {value} ↗
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  )
}

const AUTOPLAY_MS = 4000

function Gallery({ project, layoutId }) {
  const images = [project.image, ...(project.gallery ?? [])].filter(Boolean)
  const [i, setI] = useState(0)
  const go = (d) => setI((v) => (v + d + images.length) % images.length)
  const many = images.length > 1
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)
  // Reduced-motion CSS shrinks animations to ~0ms, which would make animationend autoplay spin.
  const autoplay = many && !useReducedMotion()

  return (
    <div
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(false)}
    >
      <motion.div
        layoutId={layoutId}
        transition={{ duration: 0.45, ease }}
        className="relative overflow-hidden bg-canvas"
        style={project.imageBg ? { backgroundColor: project.imageBg } : undefined}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            drag={many ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setDragging(true)}
            onDragEnd={(_, { offset }) => {
              setDragging(false)
              if (Math.abs(offset.x) > 60) go(offset.x < 0 ? 1 : -1)
            }}
            className={many ? 'cursor-grab active:cursor-grabbing' : undefined}
          >
            <FallbackImage
              src={images[i]}
              alt={`${project.name} screenshot ${i + 1} of ${images.length}`}
              draggable={false}
              className={`w-full aspect-video select-none ${
                project.imageFit === 'contain' ? 'object-contain' : 'object-cover object-top'
              }`}
              fallback={
                <div className="w-full aspect-video flex items-center justify-center text-faint">{project.name}</div>
              }
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {many && (
        <div className="flex gap-2 px-5 sm:px-8 pt-3 overflow-x-auto no-scrollbar">
          {images.map((src, k) => (
            <button
              key={src}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Show screenshot ${k + 1}`}
              aria-current={k === i}
              className={`relative shrink-0 h-12 w-20 rounded-md border overflow-hidden transition-all ${
                k === i ? 'border-func' : 'border-line opacity-60 hover:opacity-100'
              }`}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              {autoplay && k === i && (
                <span
                  key={i}
                  aria-hidden
                  onAnimationEnd={() => go(1)}
                  className="absolute inset-x-0 bottom-0 h-1 origin-left invisible"
                  style={{
                    animation: `gallery-progress ${AUTOPLAY_MS}ms linear forwards`,
                    animationPlayState: hovered || dragging ? 'paused' : 'running',
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const STORY = [
  ['problem', 'Problem'],
  ['built', 'Built'],
  ['result', 'Result'],
]

function Story({ story }) {
  const steps = STORY.filter(([key]) => story?.[key])
  const [active, setActive] = useState(0)
  if (!steps.length) return null
  const [key] = steps[active]

  return (
    <div>
      <h3 className="mb-3 text-[11px] uppercase tracking-wider text-faint">The story</h3>
      <div role="tablist" aria-label="Project story" className="grid grid-cols-3 gap-2">
        {steps.map(([k, label], idx) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={idx === active}
            onClick={() => setActive(idx)}
            className={`relative rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
              idx === active ? 'border-func text-ink' : 'border-line text-muted hover:text-ink'
            }`}
          >
            <span className="block text-[11px] text-faint">0{idx + 1}</span>
            {label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={key}
          role="tabpanel"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="mt-3 text-ink leading-relaxed"
        >
          {story[key]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

const NavButton = ({ onClick, label, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    title={label}
    className="p-1.5 rounded-md text-muted hover:text-ink hover:bg-surface2 transition-colors"
  >
    {children}
  </button>
)

/** Modal case study. ←/→ switch projects, Esc closes; `sharedFrom` is the slug whose card tile morphs into the gallery. */
export default function ProjectDetails({ projects, index, sharedFrom, onClose, onNavigate }) {
  const project = index == null ? null : projects[index]
  const [dir, setDir] = useState(1)
  const returnFocus = useRef(null)
  const open = project != null

  const nav = (d) => {
    setDir(d)
    onNavigate((index + d + projects.length) % projects.length)
  }

  useEffect(() => {
    if (!open) return
    returnFocus.current = document.activeElement
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = prevOverflow
      returnFocus.current?.focus?.({ preventScroll: true })
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') nav(1)
      else if (e.key === 'ArrowLeft') nav(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const slug = project && slugOf(project)
  const next = open && projects[(index + 1) % projects.length]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="project-details"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-canvas/85 backdrop-blur-sm sm:p-8"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-details-title"
            initial={{ y: 24 }}
            animate={{ y: 0 }}
            exit={{ y: 24 }}
            transition={{ duration: 0.35, ease }}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto w-full max-w-4xl min-h-full sm:min-h-0 sm:rounded-2xl border-line sm:border bg-surface shadow-2xl shadow-black/40 overflow-hidden"
          >
            <div className="sticky top-0 z-10 flex items-center gap-1.5 px-4 py-2 border-b border-line bg-surface/95 backdrop-blur">
              <span className="min-w-0 truncate text-xs text-muted">{project.name}</span>
              <div className="ml-auto flex items-center gap-0.5">
                <span className="mr-1 text-xs text-faint tabular-nums">
                  {index + 1} / {projects.length}
                </span>
                <NavButton onClick={() => nav(-1)} label="Previous project">
                  <ChevronLeft size={17} />
                </NavButton>
                <NavButton onClick={() => nav(1)} label="Next project">
                  <ChevronRight size={17} />
                </NavButton>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  autoFocus
                  className="ml-1 p-1.5 rounded-md text-muted hover:text-ink hover:bg-surface2 transition-colors"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div
                key={slug}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.25, ease }}
              >
                <Gallery project={project} layoutId={slug === sharedFrom ? `shot-${slug}` : undefined} />

                <div className="p-5 sm:p-8 flex flex-col gap-8">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h2 id="project-details-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                        {project.name}
                      </h2>
                      <span className="text-sm text-faint">{project.year}</span>
                    </div>
                    <p className="mt-3 text-muted leading-relaxed">{project.description}</p>
                  </div>

                  <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 py-4 border-y border-line">
                    <Meta label="Role" value={project.role} />
                    <Meta label="Status" value={project.status} />
                    <Meta label="Platform" value={project.platform} />
                    <Meta label="Client" value={project.client?.name} href={project.client?.link} />
                  </dl>

                  {project.features?.length > 0 && (
                    <div>
                      <h3 className="mb-3 text-[11px] uppercase tracking-wider text-faint">Key features</h3>
                      <motion.ul
                        initial="hidden"
                        animate="show"
                        variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
                        className="grid sm:grid-cols-2 gap-2.5"
                      >
                        {project.features.map((f) => (
                          <motion.li
                            key={f}
                            variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                            className="flex gap-2.5 rounded-lg border border-line bg-canvas/50 p-3 text-sm text-ink"
                          >
                            <Check size={16} className="mt-0.5 shrink-0 text-string" />
                            {f}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  )}

                  <Story story={project.story} />

                  {project.tech?.length > 0 && (
                    <div>
                      <h3 className="mb-3 text-[11px] uppercase tracking-wider text-faint">Built with</h3>
                      <ul className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-line">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-canvas hover:opacity-90 transition-opacity"
                      >
                        Visit live site
                        <ArrowUpRight size={15} />
                      </a>
                    )}
                    {projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => nav(1)}
                        className="ml-auto text-sm text-muted hover:text-ink transition-colors"
                      >
                        Next: <span className="font-medium text-ink">{next.name}</span> →
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
