import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ResultDisplay from './ResultDisplay'

describe('ResultDisplay', () => {
  it('renders the label', () => {
    render(<ResultDisplay label="Swim Pace" value={null} />)
    expect(screen.getByText('Swim Pace')).toBeInTheDocument()
  })

  it('shows em dash when value is null', () => {
    render(<ResultDisplay label="Swim Pace" value={null} />)
    expect(screen.getByText('—')).toBeInTheDocument()
  })

  it('displays the provided value', () => {
    render(<ResultDisplay label="Swim Pace" value="01:30 min/100mts" />)
    expect(screen.getByText('01:30 min/100mts')).toBeInTheDocument()
  })
})
