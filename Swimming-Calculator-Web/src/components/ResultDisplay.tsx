interface ResultDisplayProps {
  label: string
  value: string | null
}

const ResultDisplay = ({ label, value }: ResultDisplayProps) => (
  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-gray-800 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-center transition-colors">
    <p className="text-sm text-blue-700 dark:text-blue-300 uppercase tracking-wide font-medium mb-1">
      {label}
    </p>
    <p
      className={`text-2xl font-mono font-bold ${value ? 'text-blue-900 dark:text-blue-200' : 'text-gray-400 dark:text-gray-500'}`}
    >
      {value || '—'}
    </p>
  </div>
)

export default ResultDisplay
