import { useState, useMemo } from 'react'
import type { TimeInput } from '../types'
import {
  swimPace,
  cyclingSpeed,
  runningPace,
  SWIM_DISTANCES,
  CYCLING_DISTANCES,
  RUNNING_DISTANCES,
} from '../utils/calculations'
import InputField from './InputField'
import ResultDisplay from './ResultDisplay'

interface SportConfig {
  key: string
  label: string
  unit: string
  calculate: (distance: number, time: TimeInput) => string | null
}

const SPORTS: SportConfig[] = [
  { key: 'swim', label: 'Natación', unit: 'm', calculate: swimPace },
  { key: 'cycling', label: 'Ciclismo', unit: 'km', calculate: cyclingSpeed },
  { key: 'running', label: 'Carrera', unit: 'km', calculate: runningPace },
]

const defaultTime = (): TimeInput => ({ hours: '', minutes: '', seconds: '' })

const UnifiedCalculator = () => {
  const [distances, setDistances] = useState<Record<string, string>>({
    swim: '',
    cycling: '',
    running: '',
  })
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [times, setTimes] = useState<Record<string, TimeInput>>({
    swim: defaultTime(),
    cycling: defaultTime(),
    running: defaultTime(),
  })
  const [results, setResults] = useState<Record<string, string | null>>({
    swim: null,
    cycling: null,
    running: null,
  })

  const presets = [
    {
      label: 'Sprint',
      values: {
        swim: String(SWIM_DISTANCES[0].value),
        cycling: String(CYCLING_DISTANCES[0].value),
        running: String(RUNNING_DISTANCES[0].value),
      },
    },
    {
      label: 'Olímpica',
      values: {
        swim: String(SWIM_DISTANCES[1].value),
        cycling: String(CYCLING_DISTANCES[1].value),
        running: String(RUNNING_DISTANCES[1].value),
      },
    },
    {
      label: 'Medio Ironman',
      values: {
        swim: String(SWIM_DISTANCES[2].value),
        cycling: String(CYCLING_DISTANCES[2].value),
        running: String(RUNNING_DISTANCES[2].value),
      },
    },
    {
      label: 'Ironman',
      values: {
        swim: String(SWIM_DISTANCES[3].value),
        cycling: String(CYCLING_DISTANCES[3].value),
        running: String(RUNNING_DISTANCES[3].value),
      },
    },
  ]

  const totalTime = useMemo(() => {
    let total = 0
    for (const sport of SPORTS) {
      const t = times[sport.key]
      total += (Number(t.hours) || 0) * 3600
      total += (Number(t.minutes) || 0) * 60
      total += Number(t.seconds) || 0
    }
    if (total === 0) return null
    const h = Math.floor(total / 3600)
    const m = Math.floor((total % 3600) / 60)
    const s = total % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }, [times])

  const handlePreset = (label: string, values: (typeof presets)[number]['values']) => {
    setSelectedPreset(label)
    setDistances({ ...values })
  }

  const updateDistance = (sport: string, value: string) => {
    setDistances((prev) => ({ ...prev, [sport]: value }))
    setSelectedPreset(null)
  }

  const updateTime = (sport: string, field: keyof TimeInput, value: string) => {
    setTimes((prev) => ({
      ...prev,
      [sport]: { ...prev[sport], [field]: value },
    }))
  }

  const handleCalculate = () => {
    const next: Record<string, string | null> = {}
    for (const sport of SPORTS) {
      const dist = Number(distances[sport.key])
      if (!dist || dist <= 0) {
        next[sport.key] = null
      } else {
        next[sport.key] = sport.calculate(dist, times[sport.key])
      }
    }
    setResults(next)
  }

  return (
    <div className="max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-8 space-y-8">
      <h2 className="text-xl font-bold text-gray-100 text-center">Calculadora de Triatlón</h2>

      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-400 text-center">Distancias predefinidas</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => handlePreset(p.label, p.values)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  selectedPreset === p.label
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600 hover:border-blue-400'
                }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {SPORTS.map((sport) => {
          const t = times[sport.key]
          return (
            <div
              key={sport.key}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 rounded-xl bg-gray-750 bg-gray-800/50 border border-gray-700/50"
            >
              <span className="text-sm font-semibold text-gray-300 min-w-[72px]">
                {sport.label}
              </span>

              <div className="flex items-center gap-2">
                <InputField
                  label={sport.unit}
                  value={distances[sport.key]}
                  onChange={(v) => updateDistance(sport.key, v)}
                  placeholder="ej. 1500"
                />
              </div>

              <div className="flex items-center gap-2">
                <InputField
                  label="h"
                  value={t.hours}
                  onChange={(v) => updateTime(sport.key, 'hours', v)}
                />
                <InputField
                  label="min"
                  value={t.minutes}
                  onChange={(v) => updateTime(sport.key, 'minutes', v)}
                />
                <InputField
                  label="seg"
                  value={t.seconds}
                  onChange={(v) => updateTime(sport.key, 'seconds', v)}
                />
              </div>

              <div className="sm:ml-auto w-full sm:w-auto">
                <ResultDisplay
                  label={
                    sport.key === 'swim'
                      ? 'Ritmo'
                      : sport.key === 'cycling'
                        ? 'Velocidad'
                        : 'Ritmo'
                  }
                  value={results[sport.key]}
                />
              </div>
            </div>
          )
        })}
      </div>

      {totalTime && (
        <div className="text-center">
          <p className="text-sm font-medium text-gray-400">Tiempo total</p>
          <p className="text-2xl font-mono font-bold text-blue-400">{totalTime}</p>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={handleCalculate}
          className="px-10 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl
                     shadow-md transition-colors text-lg"
        >
          Calcular
        </button>
      </div>
    </div>
  )
}

export default UnifiedCalculator
