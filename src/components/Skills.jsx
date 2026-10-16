import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Code2,
  Database,
  Terminal,
  Wrench,
  Coffee,
  Network,
  Sparkles,
  ShieldCheck,
  Users,
  Cloud,
} from 'lucide-react'
import { FaAws } from 'react-icons/fa'
import {
  SiJavascript,
  SiReact,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiPhp,
  SiKotlin,
  SiDart,
  SiFlutter,
  SiSwift,
  SiMysql,
  SiPostgresql,
  SiCisco,
  SiSublimetext,
  SiNotion,
  SiFigma,
  SiGithub,
  SiFirebase,
  SiObsidian,
  SiGit,
  SiGithubcopilot,
  SiClaude,
  SiGooglegemini,
  SiAndroidstudio,
  SiVite,
  SiNpm,
  SiVercel,
  SiSupabase,
  SiTrello,
  SiAsana,
  SiClickup,
  SiMiro,
  SiDiscord,
  SiXampp,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { skills } from '../data/content'
import { reveal, fadeUp, stagger, item, tap } from '../lib/motion'

// Only mapped where a recognizable logo exists — everything else keeps a
// quiet generic icon so the row doesn't turn into a logo wall.
const ICONS = {
  JavaScript: SiJavascript,
  React: SiReact,
  'React Native': SiReact,
  HTML5: SiHtml5,
  CSS3: SiCss,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': SiNodedotjs,
  Python: SiPython,
  PHP: SiPhp,
  Java: Coffee,
  Kotlin: SiKotlin,
  Dart: SiDart,
  Flutter: SiFlutter,
  Swift: SiSwift,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  SQL: Database,
  'Networking (Cisco)': SiCisco,
  'Shell Script': Terminal,
  'Sublime Text': SiSublimetext,
  'VS Code': VscVscode,
  Notion: SiNotion,
  Figma: SiFigma,
  GitHub: SiGithub,
  Firebase: SiFirebase,
  'MySQL Workbench': Wrench,
  XAMPP: SiXampp,
  Obsidian: SiObsidian,
  Git: SiGit,
  'GitHub Copilot': SiGithubcopilot,
  Claude: SiClaude,
  Gemini: SiGooglegemini,
  'Android Studio': SiAndroidstudio,
  Vite: SiVite,
  npm: SiNpm,
  Vercel: SiVercel,
  Supabase: SiSupabase,
  Trello: SiTrello,
  Asana: SiAsana,
  ClickUp: SiClickup,
  Miro: SiMiro,
  Discord: SiDiscord,
  Graphify: Network,
  Stitch: Sparkles,
  'Notion AI': SiNotion,
  'Amazon Web Services (AWS)': FaAws,
}

const CATEGORY_ICONS = {
  'Cloud & Data': Cloud,
  'Cybersecurity & Networking': ShieldCheck,
  'Leadership & Management': Users,
}

const VISIBLE_COUNT = 8
// a "+1 more" / "+2 more" button takes about as much room as the chips it hides
const MIN_HIDDEN = 3

function SkillGroup({ group }) {
  const [expanded, setExpanded] = useState(false)
  const overflow = group.items.length - VISIBLE_COUNT
  const hidden = overflow >= MIN_HIDDEN ? overflow : 0
  const shown = expanded || hidden === 0 ? group.items : group.items.slice(0, VISIBLE_COUNT)

  return (
    <motion.div {...reveal} variants={stagger(0.025)}>
      <motion.h3 variants={fadeUp} className="font-mono text-sm text-keyword mb-3">
        {group.category.toLowerCase()}:
      </motion.h3>
      <motion.div layout className="flex flex-wrap gap-2">
        <AnimatePresence initial={false}>
          {shown.map((name, i) => {
            const Icon = ICONS[name] || CATEGORY_ICONS[group.category] || Code2
            // chips revealed by "show more" mount after the one-shot whileInView has fired,
            // so they have to drive their own entrance
            const revealed = hidden > 0 && i >= VISIBLE_COUNT
            return (
              <motion.span
                key={name}
                layout
                variants={item}
                {...(revealed && {
                  initial: 'hidden',
                  animate: 'show',
                  transition: { delay: (i - VISIBLE_COUNT) * 0.025 },
                })}
                exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
                whileHover={{ y: -2 }}
                className="group flex items-center gap-2 font-mono text-sm px-3 py-1.5 rounded-md border border-line text-ink bg-surface hover:border-func transition-colors"
              >
                <Icon size={14} className="text-faint shrink-0 group-hover:text-func transition-colors" />
                {name}
              </motion.span>
            )
          })}
        </AnimatePresence>
        {hidden > 0 && (
          <motion.button
            layout
            type="button"
            variants={item}
            whileTap={tap}
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="font-mono text-sm px-3 py-1.5 rounded-md border border-dashed border-line text-faint hover:text-func hover:border-func transition-colors"
          >
            {expanded ? 'show less' : `+${hidden} more`}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 border-t border-line scroll-mt-16">
      <div className="max-w-content mx-auto px-5 sm:px-10">
        <span className="font-mono text-sm text-faint select-none block mb-10">// skills</span>

        <div className="flex flex-col gap-10">
          {skills.map((group) => (
            <SkillGroup key={group.category} group={group} />
          ))}
        </div>
      </div>
    </section>
  )
}