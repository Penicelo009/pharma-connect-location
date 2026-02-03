const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

(async ()=>{
  try {
    const htmlPath = path.join(process.cwd(), 'PharmaConoct&Location.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const scriptPath = path.join(process.cwd(), 'static', 'widgets.bundle.js');
    const script = fs.readFileSync(scriptPath, 'utf8');

    const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    const { window } = dom;
    // inject fake fetch if needed, but bundle doesn't need network

    // Evaluate the script in the DOM context
    const s = window.document.createElement('script');
    s.textContent = script;
    window.document.body.appendChild(s);

    // allow microtasks to run
    await new Promise(r => setTimeout(r, 100));

    const mounted = window.document.querySelectorAll('.pharma-widget-mounted');
    console.log('Mounted badges count:', mounted.length);
    mounted.forEach((m, i)=> console.log(`${i+1}: ${m.textContent}`));

    if (mounted.length === 0) {
      console.warn('No badges auto-mounted; attempting direct mount calls if available');
      try {
        if (window.PharmaWidgets && window.PharmaWidgets.mountCartDrawer){
          window.PharmaWidgets.mountCartDrawer(window.document.getElementById('pharma-cart'));
        }
        if (window.PharmaWidgets && window.PharmaWidgets.mountPrescriptionUpload){
          const el = window.document.querySelector('[data-prescription-upload]');
          window.PharmaWidgets.mountPrescriptionUpload(el, { orderId: el && el.getAttribute('data-order-id') });
        }
      } catch(e){ console.error('Direct mount attempt error', e); }

      const mounted2 = window.document.querySelectorAll('.pharma-widget-mounted');
      console.log('Mounted badges after direct mount:', mounted2.length);
      mounted2.forEach((m, i)=> console.log(`${i+1}: ${m.textContent}`));

      if (mounted2.length === 0){
        console.error('Smoke test failed: no widgets mounted');
        process.exit(2);
      }
    }

    console.log('Smoke test success: widgets mounted');
    process.exit(0);
  } catch (err) {
    console.error('Smoke test error', err);
    process.exit(1);
  }
})();