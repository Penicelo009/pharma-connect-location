import React from 'react'
import { createRoot } from 'react-dom/client'
import PrescriptionUpload from './components/PrescriptionUpload/PrescriptionUpload'
import CartDrawer from './components/CartDrawer/CartDrawer'

// Expose mount functions so integration is simple and non-breaking
export function mountPrescriptionUpload(el, props = {}){
  if (!el) return;
  const root = createRoot(el);
  root.render(<PrescriptionUpload {...props} />);
  return () => root.unmount();
}

export function mountCartDrawer(el, props = {}){
  if (!el) return;
  const root = createRoot(el);
  root.render(<CartDrawer {...props} />);
  return () => root.unmount();
}

// Auto-mount behavior: find elements with data attributes and mount
if (typeof window !== 'undefined'){
  window.PharmaWidgets = window.PharmaWidgets || {};
  window.PharmaWidgets.mountPrescriptionUpload = mountPrescriptionUpload;
  window.PharmaWidgets.mountCartDrawer = mountCartDrawer;

  // Start background sync for pending uploads (non-blocking)
  try { const sync = require('./services/syncPending').default; sync && sync.start && sync.start(); } catch (e) { /* ignore in non-bundled env */ }

  document.querySelectorAll('[data-prescription-upload]').forEach(el => {
    mountPrescriptionUpload(el, { orderId: el.getAttribute('data-order-id') || null });
  });

  document.querySelectorAll('[data-cart-drawer]').forEach(el => {
    mountCartDrawer(el);
  });
}

export default { mountPrescriptionUpload, mountCartDrawer }
