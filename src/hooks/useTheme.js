import { useCallback, useEffect, useState } from 'react'

const systemTheme = () => (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')

// The initial class is set by the inline script in index.html (saved choice, else device setting).
// Returns [theme, setTheme, mode] — mode is 'system' until the visitor picks light or dark.
export default function useTheme() {
  const [theme, setThemeState] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  )
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'system')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (e) => {
      if (!localStorage.getItem('theme')) setThemeState(e.matches ? 'light' : 'dark')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const setTheme = useCallback((next) => {
    if (next === 'system') {
      localStorage.removeItem('theme')
      setThemeState(systemTheme())
    } else {
      localStorage.setItem('theme', next)
      setThemeState(next)
    }
    setMode(next)
  }, [])

  return [theme, setTheme, mode]
}
