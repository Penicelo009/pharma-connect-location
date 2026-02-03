import React from 'react'

export default function PharmacyCard({ pharmacy = {}, onSelect }){
  return (
    <article className="pc-pharmacy-card" role="region" aria-label={`Farmácia ${pharmacy.name}`}>
      <div className="pc-pharmacy-header">
        <h3 className="pc-pharmacy-name">{pharmacy.name || 'Farmácia'}</h3>
        {pharmacy.verified && <span className="pc-pill">Verificado</span>}
      </div>
      <p className="pc-pharmacy-addr">{pharmacy.address || 'Endereço não disponível'}</p>
      <div className="pc-pharmacy-meta">
        <div className="pc-distance">{pharmacy.distance ? `${pharmacy.distance} km` : ''}</div>
        <button className="btn outline" onClick={()=>onSelect && onSelect(pharmacy)}>Ver produtos</button>
      </div>
    </article>
  )
}
