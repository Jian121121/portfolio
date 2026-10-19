import { useSyncExternalStore } from 'react'

const KEY = 'sound'
const listeners = new Set()
let muted = typeof localStorage !== 'undefined' && localStorage.getItem(KEY) === 'off'
let ctx = null

export function setMuted(next) {
  muted = next
  localStorage.setItem(KEY, next ? 'off' : 'on')
  listeners.forEach((l) => l())
}

export function useMuted() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => muted,
  )
}

/** Short, soft tick synthesised with Web Audio — no audio file. */
export function playTick() {
  if (muted) return
  try {
    ctx ??= new (window.AudioContext || window.webkitAudioContext)()
    if (ctx.state === 'suspended') ctx.resume()
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(1400, t)
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.05)
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.08, t + 0.004)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07)
    osc.connect(gain).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.08)
  } catch {
    /* audio unavailable */
  }
}

const CLICKABLE = 'a, button, [role="tab"], [role="option"], summary'

/** Plays the tick for any click on an interactive element; returns a cleanup fn. */
export function installClickSound() {
  const onClick = (e) => {
    if (e.target.closest?.(CLICKABLE)) playTick()
  }
  document.addEventListener('pointerdown', onClick)
  return () => document.removeEventListener('pointerdown', onClick)
}
