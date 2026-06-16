import { useId } from 'react'

interface InputFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  onEnter?: () => void
  placeholder?: string
}

const InputField = ({ label, value, onChange, onEnter, placeholder }: InputFieldProps) => {
  const id = useId()

  return (
    <div className="flex flex-col items-center gap-1">
      <label
        htmlFor={id}
        className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onEnter?.()
        }}
        placeholder={placeholder}
        className="w-24 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                   transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
      />
    </div>
  )
}

export default InputField
