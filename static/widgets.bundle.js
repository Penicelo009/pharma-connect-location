(function(){
  // Staging widget bundle — non-breaking, minimal: attaches global mount functions
  // and auto-mounts when data attributes are present. It is safe for production
  // but intended for staging verification.

  function createBadge(el, text){
    try {
      var badge = document.createElement('div');
      badge.className = 'pharma-widget-mounted';
      badge.style.fontSize = '12px';
      badge.style.color = '#0b1720';
      badge.style.background = '#eafff1';
      badge.style.border = '1px solid #c7f0d5';
      badge.style.padding = '4px 6px';
      badge.style.borderRadius = '6px';
      badge.style.display = 'inline-block';
      badge.style.marginLeft = '6px';
      badge.textContent = text || 'Widget loaded';
      el.appendChild(badge);
    } catch(e){/* no-op */}
  }

  function mountPrescriptionUpload(el, props){
    if (!el) return;
    el.setAttribute('data-pharmawidget','prescription');
    createBadge(el, 'Prescription widget');
    return function(){ el.removeAttribute('data-pharmawidget'); };
  }

  function mountCartDrawer(el, props){
    if (!el) return;
    el.setAttribute('data-pharmawidget','cart');
    createBadge(el, 'Cart widget');
    return function(){ el.removeAttribute('data-pharmawidget'); };
  }

  // Expose global API
  window.PharmaWidgets = window.PharmaWidgets || {};
  window.PharmaWidgets.mountPrescriptionUpload = mountPrescriptionUpload;
  window.PharmaWidgets.mountCartDrawer = mountCartDrawer;

  // Auto-mount on DOMContentLoaded
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', autoMount);
  } else { autoMount(); }

  function autoMount(){
    try {
      document.querySelectorAll('[data-prescription-upload]').forEach(el => {
        mountPrescriptionUpload(el, { orderId: el.getAttribute('data-order-id') || null });
      });
      document.querySelectorAll('[data-cart-drawer]').forEach(el => {
        mountCartDrawer(el);
      });
    } catch(e) { /* non-fatal */ }
  }

})();