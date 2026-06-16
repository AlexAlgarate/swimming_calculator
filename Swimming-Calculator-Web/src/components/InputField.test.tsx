import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InputField from './InputField'

describe('InputField', () => {
  it('renders label and input', () => {
    render(<InputField label="meters" value="" onChange={() => {}} />)
    expect(screen.getByText('meters')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('displays the provided value', () => {
    render(<InputField label="h" value="42" onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toHaveValue('42')
  })

  it('calls onChange when user types', async () => {
    const onChange = vi.fn()
    render(<InputField label="h" value="" onChange={onChange} />)
    await userEvent.type(screen.getByRole('textbox'), '5')
    expect(onChange).toHaveBeenCalledWith('5')
  })

  it('calls onEnter when Enter is pressed', async () => {
    const onEnter = vi.fn()
    render(<InputField label="h" value="" onChange={() => {}} onEnter={onEnter} />)
    await userEvent.type(screen.getByRole('textbox'), '{Enter}')
    expect(onEnter).toHaveBeenCalledOnce()
  })

  it('shows placeholder text', () => {
    render(<InputField label="dist" value="" onChange={() => {}} placeholder="e.g. 1500" />)
    expect(screen.getByPlaceholderText('e.g. 1500')).toBeInTheDocument()
  })
})
