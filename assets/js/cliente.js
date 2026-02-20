const ClienteDashboard = {
  init() {
    if (!Router.protectRoute('cliente')) {
      return;
    }

    this.loadUserData();
    this.setupEventListeners();
    this.displayGreeting();
  },

  loadUserData() {
    const user = Auth.getUser();
    if (!user) return;

    const nomeEl = document.getElementById('user-name');
    const emailEl = document.getElementById('user-email');
    const telefoneEl = document.getElementById('user-telefone');
    const enderecoEl = document.getElementById('user-endereco');

    if (nomeEl) nomeEl.textContent = user.nome;
    if (emailEl) emailEl.textContent = user.email;
    if (telefoneEl) telefoneEl.textContent = user.telefone || 'Não informado';
    if (enderecoEl) enderecoEl.textContent = user.endereco || 'Não informado';
  },

  setupEventListeners() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Tem certeza que deseja sair?')) {
          Router.handleLogout();
        }
      });
    }

    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
          sidebar.classList.remove('active');
        }
      });
    }
  },

  displayGreeting() {
    const user = Auth.getUser();
    const greetingEl = document.getElementById('greeting');
    if (!greetingEl || !user) return;

    const hour = new Date().getHours();
    let greeting = 'Olá';

    if (hour < 12) {
      greeting = 'Bom dia';
    } else if (hour < 18) {
      greeting = 'Boa tarde';
    } else {
      greeting = 'Boa noite';
    }

    greetingEl.textContent = `${greeting}, ${user.nome.split(' ')[0]}!`;
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ClienteDashboard.init());
} else {
  ClienteDashboard.init();
}
