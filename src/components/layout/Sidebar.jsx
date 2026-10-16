import { motion } from 'framer-motion'
import { profile } from '../../data/content'
import { indicatorSpring } from '../../lib/motion'
import useActiveSection from '../../hooks/useActiveSection'
import { tabs, tabIds } from './navTabs'

export default function Sidebar() {
  const active = useActiveSection(tabIds)

  return (
    /* Desktop: fixed left sidebar, file-explorer style */
    <nav className="hidden lg:flex flex-col fixed top-0 left-0 bottom-0 w-56 border-r border-line bg-surface/90 backdrop-blur z-50">
      <div className="px-5 py-6 border-b border-line">
        <p className="font-mono text-sm text-ink">{profile.name.split(' ')[0].toLowerCase()}.dev</p>
        <p className="font-mono text-xs text-faint mt-1">~/portfolio</p>
      </div>

      <div className="flex flex-col py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = active === tab.id
          return (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className={`relative flex items-center gap-3 px-5 py-2.5 text-sm font-mono transition-colors ${
                isActive ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active"
                  transition={indicatorSpring}
                  className="absolute inset-0 bg-canvas"
                >
                  <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-string" />
                </motion.span>
              )}
              <Icon
                size={15}
                strokeWidth={1.75}
                className={`relative transition-colors ${isActive ? 'text-string' : 'text-faint'}`}
              />
              <span className="relative">{tab.label}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
