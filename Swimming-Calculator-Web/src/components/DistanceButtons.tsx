import type { DistancePreset } from '../types'

interface DistanceButtonsProps {
  presets: readonly DistancePreset[]
  selected: number | null
  onSelect: (value: number) => void
}

const DistanceButtons = ({ presets, selected, onSelect }: DistanceButtonsProps) => (
  <div className="flex flex-wrap gap-2 justify-center">
    {presets.map((d) => (
      <button
        key={d.value}
        onClick={() => onSelect(d.value)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
          ${
            selected === d.value
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-blue-300'
          }`}
      >
        {d.label}
        <span className="ml-1.5 text-xs opacity-75 dark:opacity-50">({d.value})</span>
      </button>
    ))}
  </div>
)

export default DistanceButtons
