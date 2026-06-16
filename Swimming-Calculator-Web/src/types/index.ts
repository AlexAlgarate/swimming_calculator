export interface DistancePreset {
  readonly label: string
  readonly value: number
}

export interface TimeInput {
  hours: string
  minutes: string
  seconds: string
}

export interface CalculatorProps {
  title: string
  distanceLabel: string
  distanceUnit: string
  distancePresets: readonly DistancePreset[]
  resultLabel: string
  calculatePace: (distance: number, time: TimeInput) => string | null
}
