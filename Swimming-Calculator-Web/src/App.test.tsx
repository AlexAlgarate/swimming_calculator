import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the triathlon calculator', () => {
    render(<App />)
    expect(screen.getByText('Triathlon Calculator')).toBeInTheDocument()
    expect(screen.getByText('Swim (meters)')).toBeInTheDocument()
    expect(screen.getByText('Cycling (km)')).toBeInTheDocument()
    expect(screen.getByText('Running (km)')).toBeInTheDocument()
  })

  it('shows distance preset buttons', () => {
    render(<App />)
    expect(screen.getByText('Sprint')).toBeInTheDocument()
    expect(screen.getByText('Olympic')).toBeInTheDocument()
    expect(screen.getByText('Half Ironman')).toBeInTheDocument()
    expect(screen.getByText('Ironman')).toBeInTheDocument()
  })

  it('shows time inputs', () => {
    render(<App />)
    expect(screen.getByText('Time (HH:MM:SS)')).toBeInTheDocument()
    expect(screen.getByText('h')).toBeInTheDocument()
    expect(screen.getByText('min')).toBeInTheDocument()
    expect(screen.getByText('secs')).toBeInTheDocument()
  })

  it('shows all three result labels', () => {
    render(<App />)
    expect(screen.getByText('Swim Pace')).toBeInTheDocument()
    expect(screen.getByText('Speed')).toBeInTheDocument()
    expect(screen.getByText('Running Pace')).toBeInTheDocument()
  })
})
