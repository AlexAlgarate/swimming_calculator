import type { TimeInput } from '../types'

export const totalSeconds = (time: TimeInput): number => {
  const h = Number(time.hours) || 0
  const m = Number(time.minutes) || 0
  const s = Number(time.seconds) || 0
  return h * 3600 + m * 60 + s
}

export const swimPace = (distance: number, time: TimeInput): string | null => {
  const dist = Number(distance)
  if (!dist || dist <= 0) return null

  const secs = totalSeconds(time)
  if (!secs || secs <= 0) return null

  const paceSeconds = (secs * 100) / dist
  const minutes = Math.floor(paceSeconds / 60)
  const seconds = Math.round(paceSeconds % 60)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} min/100mts`
}

export const cyclingSpeed = (distance: number, time: TimeInput): string | null => {
  const dist = Number(distance)
  if (!dist || dist <= 0) return null

  const totalHrs = totalSeconds(time) / 3600
  if (!totalHrs || totalHrs <= 0) return null

  return `${(dist / totalHrs).toFixed(1)} km/h`
}

export const runningPace = (distance: number, time: TimeInput): string | null => {
  const dist = Number(distance)
  if (!dist || dist <= 0) return null

  const secs = totalSeconds(time)
  if (!secs || secs <= 0) return null

  const paceSeconds = secs / dist
  const minutes = Math.floor(paceSeconds / 60)
  const seconds = Math.round(paceSeconds % 60)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} min/km`
}

export const SWIM_DISTANCES = [
  { label: 'Sprint', value: 750 },
  { label: 'Olympic', value: 1500 },
  { label: 'Half Ironman', value: 1900 },
  { label: 'Ironman', value: 3800 },
] as const

export const CYCLING_DISTANCES = [
  { label: 'Sprint', value: 20 },
  { label: 'Olympic', value: 40 },
  { label: 'Half Ironman', value: 90 },
  { label: 'Ironman', value: 180 },
] as const

export const RUNNING_DISTANCES = [
  { label: 'Sprint', value: 5 },
  { label: 'Olympic', value: 10 },
  { label: 'Half Ironman', value: 21.097 },
  { label: 'Ironman', value: 42.195 },
] as const
