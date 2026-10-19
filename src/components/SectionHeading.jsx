export default function SectionHeading({ n, title, action }) {
  return (
    <div className="flex items-baseline justify-between gap-4 mb-8">
      <h2 className="text-sm text-muted">
        <span className="tabular-nums text-faint">{String(n).padStart(2, '0')}</span>
        <span className="mx-2 text-faint">—</span>
        <span className="font-semibold text-ink">{title}</span>
      </h2>
      {action}
    </div>
  )
}

export function HeadingAction({ onClick, href, children }) {
  const className = 'text-sm text-faint hover:text-ink transition-colors whitespace-nowrap'
  return href ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  )
}
