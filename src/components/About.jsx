import { motion } from 'framer-motion'
import { about, profile } from '../data/content'
import FallbackImage from './FallbackImage'
import { reveal, fadeUp, stagger } from '../lib/motion'

export default function About() {
  return (
    <section id="about" className="py-28 border-t border-line scroll-mt-16">
      <div className="max-w-content mx-auto px-5 sm:px-10">
        <span className="font-mono text-sm text-faint select-none block mb-10">// about</span>

        <div className="grid md:grid-cols-[240px_minmax(0,1fr)] gap-10 md:gap-14 items-start">
          <motion.div {...reveal} variants={fadeUp} className="relative w-full max-w-[240px]">
            {/* offset frame behind the photo, like a diff-highlighted block */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg border border-string/40" />
            <div className="relative rounded-lg border border-line bg-surface overflow-hidden">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line">
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="ml-auto font-mono text-[10px] text-faint">me.jpg</span>
              </div>
              <FallbackImage
                src={about.image}
                alt={profile.name}
                className="w-full aspect-[4/5] object-cover"
                fallback={
                  <div
                    role="img"
                    aria-label={profile.name}
                    className="w-full aspect-[4/5] flex items-center justify-center bg-canvas font-mono text-5xl text-string select-none"
                  >
                    {profile.name
                      .split(' ')
                      .filter(Boolean)
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                }
              />
            </div>
          </motion.div>

          <motion.div {...reveal} variants={stagger(0.12, 0.1)} className="flex flex-col gap-4">
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-lg sm:text-xl leading-relaxed text-ink font-sans max-w-content"
              >
                {p}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}