import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SportCalculator from './SportCalculator'

const mockCalculate = vi.fn()
const defaultProps = {
  title: 'Swim Pace Calculator',
  distanceLabel: 'Distance',
  distanceUnit: 'meters',
  distancePresets: [
    { label: 'Sprint', value: 750 },
    { label: 'Olympic', value: 1500 },
  ] as const,
  resultLabel: 'Swim Pace',
  calculatePace: mockCalculate,
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('SportCalculator', () => {
  it('renders title, inputs, presets, and result area', () => {
    mockCalculate.mockReturnValue(null)
    render(<SportCalculator {...defaultProps} />)
    expect(screen.getByText('Swim Pace Calculator')).toBeInTheDocument()
    expect(screen.getByText('Distance (meters)')).toBeInTheDocument()
    expect(screen.getByText('Tiempo (HH:MM:SS)')).toBeInTheDocument()

    expect(screen.getByText('Sprint')).toBeInTheDocument()
    expect(screen.getByText('Olympic')).toBeInTheDocument()

    expect(screen.getByText('Swim Pace')).toBeInTheDocument()
    expect(screen.getByText('—')).toBeInTheDocument()
  })

  it('calls calculatePace when inputs change', async () => {
    mockCalculate.mockReturnValue('01:30 min/100mts')
    render(<SportCalculator {...defaultProps} />)

    const distInput = screen.getByPlaceholderText('ej. 1500')
    await userEvent.type(distInput, '1000')

    expect(mockCalculate).toHaveBeenCalled()
  })

  it('updates distance when a preset button is clicked', async () => {
    mockCalculate.mockReturnValue(null)
    render(<SportCalculator {...defaultProps} />)

    await userEvent.click(screen.getByText('Olympic'))
    const distInput = screen.getByPlaceholderText('ej. 1500')
    expect(distInput).toHaveValue('1500')
  })

  it('shows the result after entering distance and time', async () => {
    mockCalculate.mockReturnValue('01:30 min/100mts')
    render(<SportCalculator {...defaultProps} />)

    const distInput = screen.getByPlaceholderText('ej. 1500')
    await userEvent.type(distInput, '1000')

    const allInputs = screen.getAllByRole('textbox')
    await userEvent.type(allInputs[2], '15')

    expect(screen.getByText('01:30 min/100mts')).toBeInTheDocument()
  })

  it('clears selected preset when distance is typed manually', async () => {
    mockCalculate.mockReturnValue(null)
    render(<SportCalculator {...defaultProps} />)

    await userEvent.click(screen.getByText('Olympic'))
    const olympicButton = screen.getByText('Olympic').closest('button')
    expect(olympicButton).toHaveClass('bg-blue-600')

    const distInput = screen.getByPlaceholderText('ej. 1500')
    await userEvent.clear(distInput)
    await userEvent.type(distInput, '2000')

    expect(olympicButton).not.toHaveClass('bg-blue-600')
  })
})
