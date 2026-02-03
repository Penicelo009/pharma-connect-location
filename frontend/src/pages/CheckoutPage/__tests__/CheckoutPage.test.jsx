import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CheckoutPage from '../CheckoutPage'

jest.mock('../../../services/storageAdapter', ()=>({
  get: jest.fn()
}))

import storageAdapter from '../../../services/storageAdapter'

describe('CheckoutPage', ()=>{
  beforeEach(()=>{
    storageAdapter.get.mockReset()
  })

  test('loads cart from storage and shows items and total', async ()=>{
    const cart = { items: [{ name: 'Med A', quantity: 2, price: 15.5 }], pharmacyId: 1, total: 31 }
    storageAdapter.get.mockResolvedValue(cart)

    render(<CheckoutPage />)

    expect(await screen.findByText('Med A')).toBeInTheDocument()
    expect(screen.getByText('x2')).toBeInTheDocument()
    expect(screen.getByText('31.00')).toBeInTheDocument()
  })

  test('Prosseguir button navigates to checkout.html', async ()=>{
    const cart = { items: [], total: 0 }
    storageAdapter.get.mockResolvedValue(cart)

    // spy on location assign
    delete window.location
    window.location = { href: '' }

    render(<CheckoutPage />)

    const btn = await screen.findByRole('button', { name: /Prosseguir/i })
    fireEvent.click(btn)
    expect(window.location.href).toBe('checkout.html')
  })
})
