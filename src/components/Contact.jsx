import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Phone, MapPin, Copy, Check, ArrowRight } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { profile } from '../data/content'
import { reveal, fadeUp, stagger, item, tap } from '../lib/motion'
import SectionHeading from './SectionHeading'

function CopyEmail() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <motion.button
      type="button"
      onClick={copy}
      whileTap={tap}
      aria-live="polite"
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-line text-sm font-medium text-ink hover:border-string hover:text-string transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? 'done' : 'copy'}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="inline-flex items-center gap-2"
        >
          {copied ? <Check size={15} className="text-string" /> : <Copy size={15} />}
          {copied ? 'Copied!' : 'Copy email'}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

export default function Contact({ n }) {
  const socials = [
    profile.linkedin && { icon: FaLinkedin, label: 'LinkedIn', href: profile.linkedin },
    profile.github && { icon: FaGithub, label: 'GitHub', href: profile.github },
    profile.phone && { icon: Phone, label: `Call ${profile.phone}`, href: `tel:${profile.phone.replace(/\s+/g, '')}` },
  ].filter(Boolean)

  return (
    <section id="contact" className="pt-10 pb-20 sm:pt-12 sm:pb-24">
      <div className="max-w-content mx-auto px-5 sm:px-10">
        <SectionHeading n={n} title="contact" />

        <motion.div
          {...reveal}
          variants={stagger(0.08)}
          className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-8"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-string/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-func/10 blur-3xl"
          />

          <div className="relative">
            <motion.p variants={fadeUp} className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Say hello.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-3 max-w-md text-muted">
              Open to IT project commissions, collaborations, or just a quick hello — I usually reply within a day.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <motion.a
                href={`mailto:${profile.email}`}
                whileTap={tap}
                className="group relative inline-flex items-center gap-2 overflow-hidden px-4 py-2.5 rounded-md border border-func text-sm font-medium text-func hover:text-canvas transition-colors duration-300"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 bg-func translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                />
                <Mail size={15} className="relative" />
                <span className="relative">Email me</span>
                <ArrowRight size={14} className="relative transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
              <CopyEmail />
            </motion.div>

            <motion.p variants={fadeUp} className="mt-4 text-sm text-faint break-all">
              {profile.email}
            </motion.p>

            <motion.div
              variants={stagger(0.06)}
              className="mt-8 pt-6 border-t border-line flex flex-wrap items-center gap-3"
            >
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  variants={item}
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
              <motion.span variants={item} className="ml-auto flex items-center gap-1.5 text-sm text-muted">
                <MapPin size={15} strokeWidth={1.75} className="text-faint" />
                {profile.location}
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
