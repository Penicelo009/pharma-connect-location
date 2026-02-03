# Frontend React Widgets (progressive integration)

Goal: provide small, embeddable React widgets that progressively enhance the existing vanilla site without breaking current functionality.

Key points
- No changes to existing HTML/JS required. Load built widget script and add `data-prescription-upload` or `data-cart-drawer` elements where you want them to mount.
- Widgets auto-mount on elements with data attributes and expose `window.PharmaWidgets.mountPrescriptionUpload` and `mountCartDrawer` for manual mounting.
- StorageAdapter uses `/api/storage` backend endpoints and falls back to in-page `StorageService` (preserves backward compatibility).

Mounting examples (HTML snippet – add where desired):

<div data-prescription-upload data-order-id="123"></div>

<div data-cart-drawer></div>

Or manually from inline script (after loading widget bundle):

<script>
  PharmaWidgets.mountPrescriptionUpload(document.getElementById('my-prescription'), { orderId: 123 })
</script>

Development
1. cd frontend
2. npm install
3. npm run dev

Build
- npm run build
- The build output (dist) contains a JS file. Serve it and include it in existing pages with a `<script defer src="/path/to/widget.iife.js"></script>`.

Notes on low-bandwidth & mobile-first
- Components are small, lazy-loadable (we can split further), images are previewed client-side and PDFs are not previewed.
- Uploads use streaming progress and save to local StorageService if offline to allow retry.

Next steps (after your review)
- Add more widgets: PharmacyCard, MedicineCard, OrderStatusTimeline
- Implement automatic sync for pending uploads and queued cart changes
- Add tests and E2E scenarios
