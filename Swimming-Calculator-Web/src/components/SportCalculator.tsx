import { useState, useCallback, useEffect } from 'react'
import type { CalculatorProps, TimeInput } from '../types'
import InputField from './InputField'
import DistanceButtons from './DistanceButtons'
import ResultDisplay from './ResultDisplay'

const SportCalculator = ({
  title,
  distanceLabel,
  distanceUnit,
  distancePresets,
  resultLabel,
  calculatePace,
}: CalculatorProps) => {
  const [distance, setDistance] = useState('')
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null)
  const [time, setTime] = useState<TimeInput>({ hours: '', minutes: '', seconds: '' })
  const [result, setResult] = useState<string | null>(null)

  const compute = useCallback(() => {
    const dist = Number(distance)
    if (!dist || dist <= 0) {
      setResult(null)
      return
    }
    const r = calculatePace(dist, time)
    setResult(r)
  }, [distance, time, calculatePace])

  useEffect(() => {
    compute()
  }, [compute])

  useEffect(() => {
    const interval = setInterval(compute, 5000)
    return () => clearInterval(interval)
  }, [compute])

  const handlePreset = (value: number) => {
    setSelectedPreset(value)
    setDistance(String(value))
  }

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-8 transition-colors">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 text-center">{title}</h2>

      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center">
            {distanceLabel} ({distanceUnit})
          </p>
          <div className="flex justify-center">
            <InputField
              label={distanceUnit}
              value={distance}
              onChange={(v) => {
                setDistance(v)
                setSelectedPreset(null)
              }}
              placeholder="ej. 1500"
            />
          </div>
          <DistanceButtons
            presets={distancePresets}
            selected={selectedPreset}
            onSelect={handlePreset}
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center">
            Tiempo (HH:MM:SS)
          </p>
          <div className="flex justify-center gap-4">
            <InputField
              label="h"
              value={time.hours}
              onChange={(v) => setTime((t) => ({ ...t, hours: v }))}
            />
            <InputField
              label="min"
              value={time.minutes}
              onChange={(v) => setTime((t) => ({ ...t, minutes: v }))}
            />
            <InputField
              label="secs"
              value={time.seconds}
              onChange={(v) => setTime((t) => ({ ...t, seconds: v }))}
            />
          </div>
        </div>
      </div>

      <ResultDisplay label={resultLabel} value={result} />
    </div>
  )
}

export default SportCalculator
