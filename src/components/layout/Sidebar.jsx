import { motion } from 'framer-motion'
import { FileText, Mail, Search } from 'lucide-react'
import { profile } from '../../data/content'
import { indicatorSpring } from '../../lib/motion'
import useActiveSection from '../../hooks/useActiveSection'
import { openPalette, shortcut } from '../CommandPalette'
import { sections, sectionIds } from './navTabs'
import ThemeSwitcher from './ThemeSwitcher'
import SoundToggle from './SoundToggle'
import LiveViewers from './LiveViewers'

export default function Sidebar({ mode, setTheme }) {
  const active = useActiveSection(sectionIds)

  return (
    <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 z-50 overflow-y-auto no-scrollbar border-r border-line bg-surface/90 backdrop-blur">
      <a href="#top" className="block px-5 py-6 border-b border-line">
        <p className="text-sm font-semibold text-ink truncate">{profile.name}</p>
        <p className="text-xs text-faint mt-1">Portfolio</p>
      </a>

      <nav aria-label="Sections" className="flex flex-col py-3">
        {sections.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={isActive ? 'true' : undefined}
              className={`relative flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                isActive ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {isActive && (
                <motion.span layoutId="sidebar-active" transition={indicatorSpring} className="absolute inset-0 bg-canvas">
                  <span className="absolute left-0 inset-y-0 w-0.5 bg-string" />
                </motion.span>
              )}
              <Icon
                size={15}
                strokeWidth={1.75}
                className={`relative transition-colors ${isActive ? 'text-string' : 'text-faint'}`}
              />
              <span className="relative">{label}</span>
            </a>
          )
        })}
      </nav>

      <div className="mt-auto px-5 py-6 border-t border-line flex flex-col gap-5">
        <LiveViewers />
        <button
          type="button"
          onClick={openPalette}
          className="flex items-center gap-2.5 rounded-lg border border-line px-3.5 py-2.5 text-sm text-faint hover:text-ink hover:border-faint transition-colors"
        >
          <Search size={15} />
          <span className="flex-1 text-left">Search</span>
          <kbd className="font-sans text-xs">{shortcut}</kbd>
        </button>
        <div className="flex items-center justify-between">
          <ThemeSwitcher mode={mode} setTheme={setTheme} />
          <SoundToggle className="h-10 w-10" />
        </div>
        <div className="border-t border-line pt-5">
          <p className="text-sm text-muted leading-relaxed">For opportunities, collabs, or just a hello, reach me at</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-3 flex items-center gap-1.5 rounded-lg border border-line bg-canvas/60 px-2 py-2 text-[11.5px] text-ink whitespace-nowrap hover:border-func hover:text-func transition-colors"
          >
            <Mail size={14} className="shrink-0" />
            <span className="truncate">{profile.email}</span>
          </a>
          {profile.resume && (
            <a
              href={profile.resume}
              download="Jian-De-Guzman-CV.pdf"
              className="mt-2 flex items-center gap-1.5 rounded-lg border border-line bg-canvas/60 px-2 py-2 text-[11.5px] text-ink hover:border-func hover:text-func transition-colors"
            >
              <FileText size={14} className="shrink-0" />
              Download CV
            </a>
          )}
        </div>
      </div>
    </aside>
  )
}
