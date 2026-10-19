import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Copy, CornerDownLeft, Hash, Mail, MessageCircle, Moon, Search, Sun } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { about, profile } from '../data/content'
import { scrollToId } from '../hooks/useSmoothScroll'
import { ease } from '../lib/motion'

const EVENT = 'palette:open'
export const openPalette = () => window.dispatchEvent(new Event(EVENT))
export const shortcut =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl K'

const nowItems = about.tabs.find((t) => t.id === 'now')?.items.map((i) => i.text) ?? []

function buildItems({ sections, theme, setTheme }) {
  const open = (href) => () => window.open(href, '_blank', 'noopener')
  return [
    ...[
      { q: `Who is ${profile.name.split(' ')[0]}?`, a: [about.tabs[0].body[0]] },
      { q: 'What is he doing right now?', a: nowItems },
      { q: 'Where is he based?', a: [`${profile.location}.`] },
      ...(profile.availability ? [{ q: 'Does he take project commissions?', a: [profile.commissions] }] : []),
      {
        q: 'How can I reach him?',
        a: [`Email ${profile.email}${profile.phone ? ` or call ${profile.phone}` : ''}. LinkedIn works too.`],
      },
    ].map(({ q, a }) => ({ group: 'Ask', label: q, icon: MessageCircle, answer: a })),
    ...sections.map((s) => ({
      group: 'Go to',
      label: s.label,
      icon: Hash,
      run: () => scrollToId(s.id),
    })),
    { group: 'Actions', label: 'Copy email', icon: Copy, run: () => navigator.clipboard?.writeText(profile.email), toast: 'Email copied' },
    { group: 'Actions', label: 'Send an email', icon: Mail, run: () => (window.location.href = `mailto:${profile.email}`) },
    profile.linkedin && { group: 'Actions', label: 'Open LinkedIn', icon: FaLinkedin, run: open(profile.linkedin) },
    profile.github && { group: 'Actions', label: 'Open GitHub', icon: FaGithub, run: open(profile.github) },
    {
      group: 'Actions',
      label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`,
      icon: theme === 'dark' ? Sun : Moon,
      run: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    },
  ].filter(Boolean)
}

export default function CommandPalette(props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState(null)
  const [toast, setToast] = useState(null)
  const listRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(EVENT, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(EVENT, onOpen)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setIndex(0)
    setAnswer(null)
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 1800)
    return () => clearTimeout(t)
  }, [toast])

  const items = useMemo(() => buildItems(props), [props.sections, props.theme, props.setTheme])
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? items.filter((i) => `${i.group} ${i.label}`.toLowerCase().includes(q)) : items
  }, [items, query])

  useEffect(() => setIndex(0), [query])
  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [index])

  const select = (it) => {
    if (!it) return
    if (it.answer) return setAnswer(it)
    setOpen(false)
    requestAnimationFrame(() => it.run())
    if (it.toast) setToast(it.toast)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      answer ? setAnswer(null) : setOpen(false)
    } else if (answer) {
      if (e.key === 'Backspace' || e.key === 'ArrowLeft') setAnswer(null)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => (i + 1) % Math.max(results.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => (i - 1 + results.length) % Math.max(results.length, 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      select(results[index])
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="palette"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[80] flex items-start justify-center bg-canvas/70 backdrop-blur-sm px-4 pt-[12vh]"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Search and quick answers"
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.2, ease }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={onKeyDown}
              className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/30"
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                {answer ? (
                  <button
                    type="button"
                    onClick={() => setAnswer(null)}
                    aria-label="Back"
                    className="text-faint hover:text-ink"
                  >
                    <ArrowLeft size={16} />
                  </button>
                ) : (
                  <Search size={16} className="text-faint shrink-0" />
                )}
                <input
                  autoFocus
                  value={answer ? answer.label : query}
                  readOnly={!!answer}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything or jump to…"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="palette-list"
                  aria-activedescendant={answer ? undefined : `palette-item-${index}`}
                  className="h-12 w-full bg-transparent text-[15px] text-ink placeholder:text-faint outline-none"
                />
                <kbd className="shrink-0 rounded border border-line px-1.5 py-0.5 font-sans text-[11px] text-faint">
                  Esc
                </kbd>
              </div>

              {answer ? (
                <div className="px-5 py-5 flex flex-col gap-2 text-[15px] leading-relaxed text-ink">
                  {answer.answer.map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
              ) : (
                <ul id="palette-list" ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto py-2">
                  {results.length === 0 && (
                    <li className="px-5 py-6 text-center text-sm text-faint">No results for “{query}”</li>
                  )}
                  {results.map((it, i) => {
                    const Icon = it.icon
                    const selected = i === index
                    const newGroup = i === 0 || results[i - 1].group !== it.group
                    return (
                      <li key={it.group + it.label} role="presentation">
                        {newGroup && (
                          <p className="px-5 pt-3 pb-1 text-[11px] font-medium uppercase tracking-wider text-faint">
                            {it.group}
                          </p>
                        )}
                        <div
                          id={`palette-item-${i}`}
                          role="option"
                          aria-selected={selected}
                          onMouseMove={() => setIndex(i)}
                          onClick={() => select(it)}
                          className={`mx-2 flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                            selected ? 'bg-surface2 text-ink' : 'text-muted'
                          }`}
                        >
                          <Icon size={15} className={selected ? 'text-string' : 'text-faint'} />
                          <span className="flex-1 truncate">{it.label}</span>
                          {selected &&
                            (it.answer ? (
                              <ArrowRight size={14} className="text-faint" />
                            ) : (
                              <CornerDownLeft size={14} className="text-faint" />
                            ))}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}

              <div className="flex items-center gap-4 border-t border-line px-4 py-2 text-[11px] text-faint">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span className="ml-auto">{shortcut} to toggle</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div role="status" className="pointer-events-none fixed inset-x-0 bottom-20 lg:bottom-6 z-[80] flex justify-center">
        <AnimatePresence>
          {toast && (
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink shadow-lg"
            >
              {toast}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
