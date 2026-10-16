import { MotionConfig } from 'framer-motion'
import Sidebar from './components/layout/Sidebar'
import BottomNav from './components/layout/BottomNav'
import Footer from './components/layout/Footer'
import ScrollProgress from './components/layout/ScrollProgress'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import useSmoothScroll from './hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-canvas text-ink selection:bg-keyword">
        <ScrollProgress />
        <Sidebar />
        <BottomNav />
        {/* lg:pl-56 reserves space for the fixed sidebar; pb-16 below lg clears the bottom tab bar */}
        <main className="lg:pl-56 pb-16 lg:pb-0">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </main>
      </div>
    </MotionConfig>
  )
}
