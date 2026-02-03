import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import PrescriptionUpload from './components/PrescriptionUpload/PrescriptionUpload'
import PharmacyCard from './components/PharmacyCard/PharmacyCard'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import './styles.css'

const demoPharmacies = [
  { id: 1, name: 'Farmácia Central', address: 'Rua A, 123', verified: true, distance: 2.4 },
  { id: 2, name: 'Drogaria Norte', address: 'Av. B, 456', verified: false, distance: 4.1 }
]

function App(){
  const [view, setView] = useState('prescription')
  const [selected, setSelected] = useState(null)

  return (
    <div style={{padding:16}}>
      <h2>PharmaConnect Widgets (dev)</h2>
      <div style={{marginBottom:12}}>
        <button className="btn" onClick={()=>setView('prescription')}>Prescrição</button>
        <button className="btn" onClick={()=>setView('pharmacies')}>Farmácias</button>
        <button className="btn" onClick={()=>setView('checkout')}>Checkout</button>
      </div>

      {view === 'prescription' && (
        <div style={{maxWidth:520}}>
          <PrescriptionUpload />
        </div>
      )}

      {view === 'pharmacies' && (
        <div className="pc-pharmacy-list">
          {demoPharmacies.map(p => (
            <PharmacyCard key={p.id} pharmacy={p} onSelect={(ph)=>{ setSelected(ph); setView('checkout') }} />
          ))}
        </div>
      )}

      {view === 'checkout' && (
        <div style={{maxWidth:720}}>
          <CheckoutPage selectedPharmacy={selected} />
        </div>
      )}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
