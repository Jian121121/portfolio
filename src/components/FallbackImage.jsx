import { useEffect, useState } from 'react'

export default function FallbackImage({ src, alt, className, style, fallback, draggable }) {
  const [failed, setFailed] = useState(!src)

  useEffect(() => setFailed(!src), [src])

  if (failed) return fallback
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      style={style}
      draggable={draggable}
      onError={() => setFailed(true)}
    />
  )
}
