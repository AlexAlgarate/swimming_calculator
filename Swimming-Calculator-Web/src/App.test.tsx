import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the landing page', () => {
    render(<App />)
    expect(
      screen.getByText('Calcula tus ritmos de natación, ciclismo y carrera al instante.'),
    ).toBeInTheDocument()
    expect(screen.getByText('Calculadora de Running')).toBeInTheDocument()
    expect(screen.getAllByText('Calculadora de Triatlón')).toHaveLength(2)
  })
})
