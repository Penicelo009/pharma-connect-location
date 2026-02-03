import React, { useEffect, useState } from 'react'
import storageAdapter from '../../services/storageAdapter'

export default function CartDrawer(){
  const [cart, setCart] = useState({ items: [], pharmacyId: null });
  useEffect(()=>{
    let mounted = true;
    async function load(){
      try {
        // Try to read from server-side storage first (non-breaking); fallback to local StorageService
        const server = await storageAdapter.get('cart','default');
        if (server && mounted) setCart(server);
      } catch (e) {
        // ignore
      }
      // always read local copy too
      try {
        const local = await storageAdapter.get('local','cart');
        if (local && mounted) setCart(local);
      } catch (e){}
    }
    load();
    const t = setInterval(load, 3000);
    return ()=>{ mounted=false; clearInterval(t) }
  },[])

  return (
    <div className="pc-cart-drawer">
      <div className="pc-cart-head">Carrinho <span className="pc-count">{cart.items?.length||0}</span></div>
      <div className="pc-cart-list">
        {cart.items?.length ? cart.items.map((it, idx) => (
          <div className="pc-cart-item" key={idx}>
            <div className="pc-cart-name">{it.name || 'Medicamento'}</div>
            <div className="pc-cart-q">x{it.quantity}</div>
            <div className="pc-cart-price">{it.price?.toFixed(2) || '0.00'}</div>
          </div>
        )) : <div className="pc-empty">Carrinho vazio</div>}
      </div>
      <div className="pc-cart-footer">
        <button className="btn primary" onClick={()=>window.location.href='checkout.html'}>Finalizar compra</button>
      </div>
    </div>
  )
}
