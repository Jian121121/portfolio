import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/content'
import FallbackImage from './FallbackImage'
import { reveal, fadeUp, stagger } from '../lib/motion'

export default function Projects() {
  return (
    <section id="projects" className="py-28 border-t border-line scroll-mt-16">
      <div className="max-w-content mx-auto px-5 sm:px-10">
        <span className="font-mono text-sm text-faint select-none block mb-10">// projects</span>

        <motion.div {...reveal} variants={stagger(0.1)} className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <motion.a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              variants={fadeUp}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.99 }}
              className="group flex flex-col rounded-lg border border-line bg-surface overflow-hidden hover:border-func hover:shadow-lg hover:shadow-black/30 transition-[border-color,box-shadow]"
            >
              {/* browser-window framed screenshot */}
              <div className="border-b border-line">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line">
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                </div>
                <FallbackImage
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  className="w-full aspect-video object-cover bg-canvas"
                  fallback={
                    <div
                      role="img"
                      aria-label={`${project.name} preview`}
                      className="w-full aspect-video flex items-center justify-center bg-canvas font-mono text-sm text-faint select-none"
                    >
                      <span>
                        <span className="text-keyword">&lt;</span>
                        {project.name}
                        <span className="text-keyword"> /&gt;</span>
                      </span>
                    </div>
                  }
                />
              </div>

              <div className="flex flex-col gap-3 p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-mono text-lg text-ink group-hover:text-func transition-colors">
                    {project.name}
                  </h3>
                  <span className="font-mono text-xs text-faint shrink-0">{project.year}</span>
                </div>

                <p className="text-muted font-sans">{project.description}</p>

                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-xs text-string">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-1 flex items-center gap-1.5 font-mono text-sm text-faint group-hover:text-func transition-colors">
                  view project
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.75}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}