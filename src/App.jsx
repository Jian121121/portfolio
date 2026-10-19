import { MotionConfig } from 'framer-motion'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import SoundToggle from './components/layout/SoundToggle'
import { installClickSound } from './lib/sound'
import BottomNav from './components/layout/BottomNav'
import ThemeToggle from './components/layout/ThemeToggle'
import { sections, sectionNumber } from './components/layout/navTabs'
import CommandPalette, { openPalette } from './components/CommandPalette'
import Hero from './components/Hero'
import Splash, { shouldShowSplash } from './components/Splash'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Services from './components/Services'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Organizations from './components/Organizations'
import Recommendations from './components/Recommendations'
import Contact from './components/Contact'
import useSmoothScroll from './hooks/useSmoothScroll'
import useTheme from './hooks/useTheme'
import { recommendations } from './data/content'

const floating = 'h-10 w-10 rounded-full border border-line bg-surface/90 backdrop-blur shadow-md shadow-black/10'

export default function App() {
  useSmoothScroll()
  const [theme, setTheme, themeMode] = useTheme()
  useEffect(installClickSound, [])
  const [splash, setSplash] = useState(shouldShowSplash)

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-canvas text-ink selection:bg-keyword transition-colors duration-300">
        <Sidebar mode={themeMode} setTheme={setTheme} />
        {/* the sidebar holds search, sound and theme on lg+; below that they float top-right */}
        <div className="lg:hidden fixed top-3 right-3 z-50 flex gap-2">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Search and quick answers"
            className={`${floating} flex items-center justify-center text-muted hover:text-ink transition-colors`}
          >
            <Search size={17} />
          </button>
          <SoundToggle className={floating} />
          <ThemeToggle theme={theme} setTheme={setTheme} className={floating} />
        </div>
        {splash && <Splash onDone={() => setSplash(false)} />}
        <BottomNav />
        <CommandPalette sections={sections} theme={theme} setTheme={setTheme} />
        {/* lg:pl-64 reserves space for the fixed sidebar; pb-16 below lg clears the bottom tab bar */}
        <main className="lg:pl-64 pb-16 lg:pb-0">
          <Hero hideName={splash} />
          <About n={sectionNumber('about')} />
          <Skills n={sectionNumber('skills')} />
          <Projects n={sectionNumber('projects')} />
          <Services n={sectionNumber('services')} />
          <Experience n={sectionNumber('experience')} />
          <Certifications n={sectionNumber('certifications')} />
          <Organizations n={sectionNumber('organizations')} />
          {recommendations.length > 0 && <Recommendations n={sectionNumber('recommendations')} />}
          <Contact n={sectionNumber('contact')} />
        </main>
      </div>
    </MotionConfig>
  )
}
