import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { certifications, workshops } from '../data/content'
import SectionHeading from './SectionHeading'
import Lightbox from './Lightbox'
import { Row, GroupLabel, CertThumb } from './Rows'
import { reveal, stagger } from '../lib/motion'

/** Certiport's form takes the code in two boxes split at the dash, so each half copies on its own. */
export function Verify({ verify }) {
  const [copied, setCopied] = useState(null)
  const [hint, setHint] = useState(false)
  if (!verify) return null
  const { url, code } = typeof verify === 'string' ? { url: verify } : verify
  const parts = code?.split('-') ?? []

  const copy = (i) => {
    navigator.clipboard?.writeText(parts[i])
    setCopied(i)
    setTimeout(() => setCopied((c) => (c === i ? null : c)), 2000)
  }

  return (
    <div className="shrink-0 flex flex-col items-end gap-1.5">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        onClick={code ? () => (copy(0), setHint(true)) : undefined}
        title={code ? 'Copies the first part of the code, then opens Certiport' : undefined}
        className="text-sm text-func hover:underline underline-offset-4"
      >
        verify ↗
      </a>
      {code && (
        <div
          title="Enter each part in its own box — Student ID and Birthdate can stay empty"
          className="inline-flex items-center rounded-md border border-line font-mono text-[11px] text-muted"
        >
          {parts.map((part, i) => (
            <span key={i} className="flex items-center">
              {i > 0 && <span className="text-faint">–</span>}
              <button
                type="button"
                onClick={() => copy(i)}
                aria-label={`Copy ${i === 0 ? 'first' : 'second'} part of the code: ${part}`}
                className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-surface2 hover:text-ink transition-colors"
              >
                {part}
                {copied === i && <Check size={11} className="text-string" />}
              </button>
            </span>
          ))}
        </div>
      )}
      {hint && (
        <p className="max-w-[11rem] text-right text-[11px] leading-snug text-faint" aria-live="polite">
          First part copied — paste it, then copy the second.
        </p>
      )}
    </div>
  )
}

function List({ items, onOpen }) {
  return (
    <motion.ul {...reveal} variants={stagger(0.06)}>
      {items.map((c) => (
        <Row
          key={c.name}
          heading={c.name}
          sub={`${c.org} · ${c.date}`}
          leading={<CertThumb src={c.image} name={c.name} onOpen={onOpen} />}
          trailing={<Verify verify={c.verify} />}
        />
      ))}
    </motion.ul>
  )
}

export default function Certifications({ n }) {
  const [preview, setPreview] = useState(null)
  const closePreview = useCallback(() => setPreview(null), [])

  return (
    <section id="certifications" className="section-y">
      <div className="max-w-content mx-auto px-5 sm:px-10">
        <SectionHeading n={n} title="certifications" />
        <GroupLabel>Certifications</GroupLabel>
        <List items={certifications} onOpen={setPreview} />
        {workshops.length > 0 && (
          <>
            <GroupLabel>Workshops & events</GroupLabel>
            <List items={workshops} onOpen={setPreview} />
          </>
        )}
      </div>
      <Lightbox image={preview} onClose={closePreview} />
    </section>
  )
}
