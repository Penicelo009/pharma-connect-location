import React from 'react'

export default function MedicineCard({ medicine = {}, onAdd }){
  return (
    <article className="pc-medicine-card" aria-label={`Medicamento ${medicine.name}`}>
      <div className="pc-med-info">
        <div className="pc-med-name">{medicine.name}</div>
        <div className="pc-med-brand">{medicine.brand || ''}</div>
      </div>
      <div className="pc-med-actions">
        <div className="pc-med-price">{medicine.price ? `MT ${Number(medicine.price).toFixed(2)}` : '—'}</div>
        <button className="btn primary" onClick={() => onAdd && onAdd(medicine)} aria-label={`Adicionar ${medicine.name} ao carrinho`}>Adicionar</button>
      </div>
    </article>
  )
}
