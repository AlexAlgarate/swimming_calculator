import { describe, it, expect } from 'vitest'
import { totalSeconds, swimPace, cyclingSpeed, runningPace } from './calculations'
import type { TimeInput } from '../types'

const t = (h: string, m: string, s: string): TimeInput => ({
  hours: h,
  minutes: m,
  seconds: s,
})

describe('totalSeconds', () => {
  it('returns 0 for empty input', () => {
    expect(totalSeconds(t('', '', ''))).toBe(0)
  })

  it('computes correctly with all fields', () => {
    expect(totalSeconds(t('1', '30', '15'))).toBe(5415)
  })

  it('handles missing fields as 0', () => {
    expect(totalSeconds(t('', '5', ''))).toBe(300)
  })
})

describe('swimPace', () => {
  it('returns null for zero distance', () => {
    expect(swimPace(0, t('0', '15', '0'))).toBeNull()
  })

  it('returns null for zero time', () => {
    expect(swimPace(1000, t('', '', ''))).toBeNull()
  })

  it('calculates correctly: 1000m in 15:00 = 01:30 min/100mts', () => {
    expect(swimPace(1000, t('0', '15', '0'))).toBe('01:30 min/100mts')
  })

  it('calculates correctly: 750m in 10:00 = 01:20 min/100mts', () => {
    expect(swimPace(750, t('0', '10', '0'))).toBe('01:20 min/100mts')
  })

  it('calculates correctly: 3800m in 1:15:00 = 01:58 min/100mts', () => {
    expect(swimPace(3800, t('1', '15', '0'))).toBe('01:58 min/100mts')
  })
})

describe('cyclingSpeed', () => {
  it('returns null for zero distance', () => {
    expect(cyclingSpeed(0, t('1', '0', '0'))).toBeNull()
  })

  it('returns null for zero time', () => {
    expect(cyclingSpeed(40, t('', '', ''))).toBeNull()
  })

  it('calculates correctly: 40km in 1:00:00 = 40.0 km/h', () => {
    expect(cyclingSpeed(40, t('1', '0', '0'))).toBe('40.0 km/h')
  })

  it('calculates correctly: 180km in 5:00:00 = 36.0 km/h', () => {
    expect(cyclingSpeed(180, t('5', '0', '0'))).toBe('36.0 km/h')
  })
})

describe('runningPace', () => {
  it('returns null for zero distance', () => {
    expect(runningPace(0, t('0', '30', '0'))).toBeNull()
  })

  it('returns null for zero time', () => {
    expect(runningPace(10, t('', '', ''))).toBeNull()
  })

  it('calculates correctly: 10km in 50:00 = 05:00 min/km', () => {
    expect(runningPace(10, t('0', '50', '0'))).toBe('05:00 min/km')
  })

  it('calculates correctly: 42.195km in 3:30:00 = 04:59 min/km', () => {
    expect(runningPace(42.195, t('3', '30', '0'))).toBe('04:59 min/km')
  })
})
