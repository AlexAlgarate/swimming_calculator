import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UnifiedCalculator from './UnifiedCalculator'

describe('UnifiedCalculator', () => {
  it('renders all sections', () => {
    render(<UnifiedCalculator />)
    expect(screen.getByText('Distancias predefinidas')).toBeInTheDocument()
    expect(screen.getByText('Tiempo (HH:MM:SS)')).toBeInTheDocument()
    expect(screen.getByText('Natación (metros)')).toBeInTheDocument()
    expect(screen.getByText('Ciclismo (km)')).toBeInTheDocument()
    expect(screen.getByText('Carrera (km)')).toBeInTheDocument()
  })

  it('has no preset selected by default and empty distances', () => {
    render(<UnifiedCalculator />)

    const inputs = screen.getAllByRole('textbox')
    expect(inputs[3]).toHaveValue('')
    expect(inputs[4]).toHaveValue('')
    expect(inputs[5]).toHaveValue('')
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
    await userEvent.click(screen.getByText('Sprint'))

    const inputs = screen.getAllByRole('textbox')
    await userEvent.clear(inputs[3])
    await userEvent.type(inputs[3], '2000')

    const sprintBtn = screen.getByText('Sprint').closest('button')
    expect(sprintBtn).not.toHaveClass('bg-blue-600')
  })

  it('shows em dash before calculate is clicked', () => {
    render(<UnifiedCalculator />)
    const emDashess = screen.getAllByText('—')
    expect(emDashess.length).toBe(3)
  })

  it('renders the Calcular button', () => {
    render(<UnifiedCalculator />)
    expect(screen.getByText('Calcular')).toBeInTheDocument()
  })

  it('shows all three results after Calcular is clicked', async () => {
    render(<UnifiedCalculator />)

    const inputs = screen.getAllByRole('textbox')
    await userEvent.type(inputs[3], '1500')
    await userEvent.type(inputs[4], '40')
    await userEvent.type(inputs[5], '10')
    await userEvent.type(inputs[0], '1')
    await userEvent.type(inputs[1], '15')

    await userEvent.click(screen.getByText('Calcular'))

    expect(screen.getByText('05:00 min/100mts')).toBeInTheDocument()
    expect(screen.getByText('32.0 km/h')).toBeInTheDocument()
    expect(screen.getByText('07:30 min/km')).toBeInTheDocument()
  })

  it('shows swim pace after Calcular', async () => {
    render(<UnifiedCalculator />)

    const inputs = screen.getAllByRole('textbox')
    await userEvent.type(inputs[3], '1500')
    await userEvent.type(inputs[1], '20')
    await userEvent.type(inputs[2], '30')

    await userEvent.click(screen.getByText('Calcular'))

    expect(screen.getByText('01:22 min/100mts')).toBeInTheDocument()
  })

  it('shows cycling speed after Calcular', async () => {
    render(<UnifiedCalculator />)

    const inputs = screen.getAllByRole('textbox')
    await userEvent.type(inputs[4], '40')
    await userEvent.type(inputs[0], '1')

    await userEvent.click(screen.getByText('Calcular'))

    expect(screen.getByText('40.0 km/h')).toBeInTheDocument()
  })

  it('shows running pace after Calcular', async () => {
    render(<UnifiedCalculator />)

    const inputs = screen.getAllByRole('textbox')
    await userEvent.type(inputs[5], '10')
    await userEvent.type(inputs[1], '50')

    await userEvent.click(screen.getByText('Calcular'))

    expect(screen.getByText('05:00 min/km')).toBeInTheDocument()
  })
})
