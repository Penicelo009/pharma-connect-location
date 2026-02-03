 // Menu mobile
const btn = document.querySelector('.menu-toggle');
const nav = document.querySelector('#menu');
if (btn && nav){
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true': 'false') ;
  });
}

// Demonstração de geolocalização
const geoBtn = document.getElementById('btn-geo');
const geoStatus = document.getElementById('geo-status');

if (geoBtn && geoStatus) {
  geoBtn.addEventListener('click', () => {
    if (!navigator.geolocation){
      geoStatus.textContent = 'Este dispositivo não suporta geolocalização.';
      return;
    }
    geoStatus.textContent = 'A localizar…';
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        geoStatus.textContent =`Localização obtida: ${latitude.toFixed(4)}, ${longitude.toFixed(4)} (exemplo)`;
      },
      () => {
        geoStatus.textContent = 'Não foi possível obter a localização. Permita o acesso ao GPS.';
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  });
}
