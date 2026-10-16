import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { profile } from '../data/content'
import { reveal, fadeUp, stagger, item } from '../lib/motion'

export default function Contact() {
  const links = [
    {
      icon: Mail,
      label: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Phone,
      label: profile.phone,
      href: `tel:${profile.phone.replace(/\s+/g, '')}`,
    },
    {
      icon: FaGithub,
      label: `github.com/${profile.github.split('/').pop()}`,
      href: profile.github,
    },
    {
      icon: FaLinkedin,
      label: profile.linkedin ? `linkedin.com/in/${profile.linkedin.split('/').pop()}` : 'linkedin — coming soon',
      href: profile.linkedin,
      disabled: !profile.linkedin,
    },
    {
      icon: MapPin,
      label: profile.location,
    },
  ]

  return (
    <section id="contact" className="py-28 border-t border-line scroll-mt-16">
      <div className="max-w-content mx-auto px-5 sm:px-10">
        <motion.div {...reveal} variants={stagger(0.07)}>
          <motion.p variants={fadeUp} className="font-mono text-sm text-faint mb-4">
            // contact
          </motion.p>
          <motion.p variants={fadeUp} className="font-mono text-xl sm:text-2xl text-ink mb-10">
            <span className="text-string">$</span> contact --with {profile.name.split(' ')[0].toLowerCase()}
          </motion.p>

          <div className="flex flex-col gap-1 font-mono text-base max-w-md">
            {links.map(({ icon: Icon, label, href, disabled }) => {
              const content = (
                <span className="flex items-center gap-3">
                  <Icon size={17} strokeWidth={1.75} className="text-faint shrink-0" />
                  {label}
                </span>
              )
              return href && !disabled ? (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  variants={item}
                  whileHover={{ x: 4 }}
                  className="w-fit py-2 text-muted hover:text-func transition-colors"
                >
                  {content}
                </motion.a>
              ) : (
                <motion.span
                  key={label}
                  variants={item}
                  className={`w-fit py-2 ${disabled ? 'text-faint' : 'text-muted'}`}
                >
                  {content}
                </motion.span>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}