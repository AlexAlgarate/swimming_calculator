import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UnifiedCalculator from './UnifiedCalculator'

describe('UnifiedCalculator', () => {
  it('renders all sections', () => {
    render(<UnifiedCalculator />)
    expect(screen.getByText('Distance Presets')).toBeInTheDocument()
    expect(screen.getByText('Time (HH:MM:SS)')).toBeInTheDocument()
    expect(screen.getByText('Swim (meters)')).toBeInTheDocument()
    expect(screen.getByText('Cycling (km)')).toBeInTheDocument()
    expect(screen.getByText('Running (km)')).toBeInTheDocument()
  })

  it('has Olympic selected by default with correct distances', () => {
    render(<UnifiedCalculator />)
    const olympicBtn = screen.getByText('Olympic').closest('button')
    expect(olympicBtn).toHaveClass('bg-blue-600')

    const inputs = screen.getAllByRole('textbox')
    expect(inputs[3]).toHaveValue('1500')
    expect(inputs[4]).toHaveValue('40')
    expect(inputs[5]).toHaveValue('10')
  })

  it('updates all distances when a preset is clicked', async () => {
    render(<UnifiedCalculator />)
    await userEvent.click(screen.getByText('Sprint'))

    const inputs = screen.getAllByRole('textbox')
    expect(inputs[3]).toHaveValue('750')
    expect(inputs[4]).toHaveValue('20')
    expect(inputs[5]).toHaveValue('5')

    const sprintBtn = screen.getByText('Sprint').closest('button')
    expect(sprintBtn).toHaveClass('bg-blue-600')
  })

  it('clears preset selection when a distance is edited manually', async () => {
    render(<UnifiedCalculator />)

    const inputs = screen.getAllByRole('textbox')
    await userEvent.clear(inputs[3])
    await userEvent.type(inputs[3], '2000')

    const olympicBtn = screen.getByText('Olympic').closest('button')
    expect(olympicBtn).not.toHaveClass('bg-blue-600')
  })

  it('shows em dash before calculate is clicked', () => {
    render(<UnifiedCalculator />)
    const emDashess = screen.getAllByText('—')
    expect(emDashess.length).toBe(3)
  })

  it('renders the Calculate button', () => {
    render(<UnifiedCalculator />)
    expect(screen.getByText('Calculate')).toBeInTheDocument()
  })

  it('shows all three results after Calculate is clicked', async () => {
    render(<UnifiedCalculator />)

    const inputs = screen.getAllByRole('textbox')
    await userEvent.type(inputs[0], '1')
    await userEvent.type(inputs[1], '15')

    await userEvent.click(screen.getByText('Calculate'))

    expect(screen.getByText('05:00 min/100mts')).toBeInTheDocument()
    expect(screen.getByText('32.0 km/h')).toBeInTheDocument()
    expect(screen.getByText('07:30 min/km')).toBeInTheDocument()
  })

  it('shows swim pace after Calculate', async () => {
    render(<UnifiedCalculator />)

    const inputs = screen.getAllByRole('textbox')
    await userEvent.type(inputs[1], '20')
    await userEvent.type(inputs[2], '30')

    await userEvent.click(screen.getByText('Calculate'))

    expect(screen.getByText('01:22 min/100mts')).toBeInTheDocument()
  })

  it('shows cycling speed after Calculate', async () => {
    render(<UnifiedCalculator />)

    const inputs = screen.getAllByRole('textbox')
    await userEvent.type(inputs[0], '1')

    await userEvent.click(screen.getByText('Calculate'))

    expect(screen.getByText('40.0 km/h')).toBeInTheDocument()
  })

  it('shows running pace after Calculate', async () => {
    render(<UnifiedCalculator />)

    const inputs = screen.getAllByRole('textbox')
    await userEvent.type(inputs[1], '50')

    await userEvent.click(screen.getByText('Calculate'))

    expect(screen.getByText('05:00 min/km')).toBeInTheDocument()
  })
})
