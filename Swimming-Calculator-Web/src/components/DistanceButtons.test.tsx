import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DistanceButtons from './DistanceButtons'

const presets = [
  { label: 'Sprint', value: 750 },
  { label: 'Olympic', value: 1500 },
  { label: 'Ironman', value: 3800 },
] as const

describe('DistanceButtons', () => {
  it('renders all preset buttons with labels and values', () => {
    render(<DistanceButtons presets={presets} selected={null} onSelect={() => {}} />)
    expect(screen.getByText('Sprint')).toBeInTheDocument()
    expect(screen.getByText('Olympic')).toBeInTheDocument()
    expect(screen.getByText('Ironman')).toBeInTheDocument()
    expect(screen.getByText('(750)')).toBeInTheDocument()
  })

  it('calls onSelect with the value when clicked', async () => {
    const onSelect = vi.fn()
    render(<DistanceButtons presets={presets} selected={null} onSelect={onSelect} />)
    await userEvent.click(screen.getByText('Olympic'))
    expect(onSelect).toHaveBeenCalledWith(1500)
  })

  it('applies active styling to the selected button', () => {
    render(<DistanceButtons presets={presets} selected={1500} onSelect={() => {}} />)
    const button = screen.getByText('Olympic').closest('button')
    expect(button).toHaveClass('bg-blue-600')
  })

  it('does not apply active styling to non-selected buttons', () => {
    render(<DistanceButtons presets={presets} selected={1500} onSelect={() => {}} />)
    const button = screen.getByText('Sprint').closest('button')
    expect(button).not.toHaveClass('bg-blue-600')
  })
})
