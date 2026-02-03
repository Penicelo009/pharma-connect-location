import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import PharmacyCard from '../PharmacyCard'

describe('PharmacyCard', ()=>{
  test('renders pharmacy details and calls onSelect', ()=>{
    const pharmacy = { name: 'Farmácia A', address: 'Rua Teste, 1', verified: true, distance: 3.2 }
    const onSelect = jest.fn()
    render(<PharmacyCard pharmacy={pharmacy} onSelect={onSelect} />)

    expect(screen.getByText('Farmácia A')).toBeInTheDocument()
    expect(screen.getByText('Rua Teste, 1')).toBeInTheDocument()
    expect(screen.getByText('Verificado')).toBeInTheDocument()
    expect(screen.getByText(/3.2 km/)).toBeInTheDocument()

    const btn = screen.getByRole('button', { name: /Ver produtos/i })
    fireEvent.click(btn)
    expect(onSelect).toHaveBeenCalledWith(pharmacy)
  })
})
