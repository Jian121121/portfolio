import { motion } from 'framer-motion'
import useActiveSection from '../../hooks/useActiveSection'
import { indicatorSpring } from '../../lib/motion'
import { tabs, sectionIds } from './navTabs'

export default function BottomNav() {
  const section = useActiveSection(sectionIds)
  const active = tabs.find((t) => t.id === section || t.covers?.includes(section))?.id

  return (
    /* Mobile: fixed bottom tab bar, thumb-reachable */
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur border-t border-line">
      <div className="flex items-stretch justify-between px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = active === tab.id
          return (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className={`relative flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
                isActive ? 'text-ink' : 'text-muted'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="bottomnav-active"
                  transition={indicatorSpring}
                  className="absolute top-0 left-1/4 right-1/4 h-0.5 rounded-full bg-string"
                />
              )}
              <Icon
                size={17}
                strokeWidth={1.75}
                className={`transition-colors ${isActive ? 'text-string' : 'text-faint'}`}
              />
              {tab.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
