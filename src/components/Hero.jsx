import { motion } from 'framer-motion'
import { ArrowRight, FileText, Mail, MapPin, Search } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { about, profile } from '../data/content'
import HeroPhoto from './HeroPhoto'
import { openPalette, shortcut } from './CommandPalette'
import LiveViewers from './layout/LiveViewers'
import { ease, stagger, fadeUp, item, tap } from '../lib/motion'

const initials = profile.name
  .split(' ')
  .filter(Boolean)
  .map((w) => w[0])
  .slice(0, 2)
  .join('')

const links = [
  profile.linkedin && { label: 'LinkedIn', icon: FaLinkedin, href: profile.linkedin },
  profile.github && { label: 'GitHub', icon: FaGithub, href: profile.github },
  profile.email && { label: `Email ${profile.email}`, icon: Mail, href: `mailto:${profile.email}` },
].filter(Boolean)

export default function Hero({ hideName = false }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(var(--line))_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]"
      />

      <div className="relative max-w-content mx-auto px-5 sm:px-10 pt-20 lg:pt-28 pb-10 grid sm:grid-cols-[minmax(0,1fr)_190px] gap-8 sm:gap-10 items-center">
        <motion.div initial="hidden" animate="show" variants={stagger(0.1, 0.1)} className="min-w-0">
          <LiveViewers className="lg:hidden mb-4" />
          <motion.h1
            id="hero-name"
            variants={fadeUp}
            style={hideName ? { visibility: 'hidden' } : undefined}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-ink leading-[1.05]"
          >
            {profile.name}
          </motion.h1>

          <motion.div variants={fadeUp} className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="text-string font-medium">{profile.role}</span>
            <span className="flex items-center gap-1.5 text-muted">
              <MapPin size={14} strokeWidth={1.75} className="text-faint" />
              {profile.location}
            </span>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-5 max-w-md text-muted leading-relaxed">
            {profile.tagline}
          </motion.p>

          {(profile.availability || profile.badges?.length > 0) && (
            <motion.ul variants={stagger(0.05)} className="mt-5 flex flex-wrap gap-2">
              {profile.availability && (
                <motion.li variants={item}>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-string/40 bg-string/10 px-3 py-1 text-xs font-medium text-ink hover:border-string transition-colors"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-string opacity-75 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-string" />
                    </span>
                    {profile.availability}
                  </a>
                </motion.li>
              )}
              {profile.badges?.map((b) => (
                <motion.li
                  key={b}
                  variants={item}
                  className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted"
                >
                  {b}
                </motion.li>
              ))}
            </motion.ul>
          )}

          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-2.5 text-sm">
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={tap}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 font-medium text-canvas hover:opacity-90 transition-opacity"
            >
              Hire me
              <ArrowRight size={15} />
            </motion.a>
            {profile.resume && (
              <motion.a
                href={profile.resume}
                download="Jian-De-Guzman-CV.pdf"
                whileHover={{ y: -2 }}
                whileTap={tap}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-5 font-medium text-ink hover:border-faint transition-colors"
              >
                <FileText size={15} />
                Download CV
              </motion.a>
            )}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-3 flex flex-wrap items-center gap-2.5 text-sm">
            {links.map(({ label, icon: Icon, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={label}
                title={label}
                whileHover={{ y: -3 }}
                whileTap={tap}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted hover:text-func hover:border-func transition-colors"
              >
                <Icon size={17} />
              </motion.a>
            ))}
            <button
              type="button"
              onClick={openPalette}
              className="ml-1 inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-faint hover:text-ink hover:border-faint transition-colors"
            >
              <Search size={13} />
              Ask anything
              <kbd className="hidden sm:inline font-sans text-[11px] text-faint">{shortcut}</kbd>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease }}
          className="relative order-first sm:order-last w-36 sm:w-full"
        >
          <HeroPhoto src={about.image} alt={profile.name} initials={initials} />
        </motion.div>
      </div>

      {profile.stats?.length > 0 && (
        <motion.dl
          initial="hidden"
          animate="show"
          variants={stagger(0.08, 0.5)}
          className="relative max-w-content mx-auto px-5 sm:px-10 pb-6 grid grid-cols-3"
        >
          {profile.stats.map((s) => (
            <motion.div key={s.label} variants={item} className="border-t border-line pt-4 pr-3">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-bold tracking-tight text-ink">{s.value}</dd>
              <dd className="text-xs sm:text-sm text-muted">{s.label}</dd>
            </motion.div>
          ))}
        </motion.dl>
      )}
    </section>
  )
}
