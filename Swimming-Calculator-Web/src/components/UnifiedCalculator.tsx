import { useState } from 'react'
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
  { key: 'swim', label: 'Natación', unit: 'metros', calculate: swimPace },
  { key: 'cycling', label: 'Ciclismo', unit: 'km', calculate: cyclingSpeed },
  { key: 'running', label: 'Carrera', unit: 'km', calculate: runningPace },
]

const UnifiedCalculator = () => {
  const [distances, setDistances] = useState<Record<string, string>>({
    swim: '',
    cycling: '',
    running: '',
  })
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [time, setTime] = useState<TimeInput>({ hours: '', minutes: '', seconds: '' })
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

  const handlePreset = (label: string, values: (typeof presets)[number]['values']) => {
    setSelectedPreset(label)
    setDistances({ ...values })
  }

  const updateDistance = (sport: string, value: string) => {
    setDistances((prev) => ({ ...prev, [sport]: value }))
    setSelectedPreset(null)
  }

  const handleCalculate = () => {
    const next: Record<string, string | null> = {}
    for (const sport of SPORTS) {
      const dist = Number(distances[sport.key])
      if (!dist || dist <= 0) {
        next[sport.key] = null
      } else {
        next[sport.key] = sport.calculate(dist, time)
      }
    }
    setResults(next)
  }

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-8 space-y-8">
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
        <p className="text-sm font-medium text-gray-400 text-center">Tiempo (HH:MM:SS)</p>
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
            label="seg"
            value={time.seconds}
            onChange={(v) => setTime((t) => ({ ...t, seconds: v }))}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleCalculate}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl
                     shadow-md transition-colors text-lg"
        >
          Calcular
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {SPORTS.map((sport) => (
          <div key={sport.key} className="space-y-3">
            <p className="text-sm font-medium text-gray-400 text-center">
              {sport.label} ({sport.unit})
            </p>
            <div className="flex justify-center">
              <InputField
                label={sport.unit}
                value={distances[sport.key]}
                onChange={(v) => updateDistance(sport.key, v)}
                placeholder="ej. 1500"
              />
            </div>
            <ResultDisplay
              label={
                sport.key === 'swim'
                  ? 'Ritmo natación'
                  : sport.key === 'cycling'
                    ? 'Velocidad'
                    : 'Ritmo carrera'
              }
              value={results[sport.key]}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default UnifiedCalculator
