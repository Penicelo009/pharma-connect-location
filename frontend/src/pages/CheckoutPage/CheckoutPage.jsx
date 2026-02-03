import React, { useState, useEffect } from 'react'
import storageAdapter from '../../services/storageAdapter'

export default function CheckoutPage({ selectedPharmacy = null }){
  const [cart, setCart] = useState({ items: [], pharmacyId: null, total: 0 });

  useEffect(()=>{
    async function load(){
      const c = await storageAdapter.get('local','cart');
      if (c) setCart(c);
    }
    load();
  },[])

  return (
    <main className="pc-checkout">
      <h2>Finalizar compra</h2>
      {selectedPharmacy && (
        <div className="pc-selected-pharmacy">Selecionando: <strong>{selectedPharmacy.name}</strong></div>
      )}

      <div className="pc-checkout-list">
        {cart.items?.length ? cart.items.map((it, idx)=>(
          <div key={idx} className="pc-checkout-item">
            <div>{it.name}</div>
            <div>x{it.quantity}</div>
            <div>{it.price?.toFixed(2)}</div>
          </div>
        )) : <p>Carrinho vazio</p>}
      </div>
      <div className="pc-checkout-summary">
        <div>Total: MT {Number(cart.total || 0).toFixed(2)}</div>
        <button className="btn primary" onClick={()=>window.location.href='checkout.html'}>Prosseguir</button>
      </div>
    </main>
  )
}
