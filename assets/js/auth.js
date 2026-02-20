const Auth = {
  STORAGE_KEY: 'pharmaconnect_user',

  saveUser(userData) {
    const user = {
      id: this.generateId(),
      nome: userData.nome,
      email: userData.email,
      telefone: userData.telefone,
      endereco: userData.endereco,
      tipo: userData.tipo,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  getUser() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  isAuthenticated() {
    return this.getUser() !== null;
  },

  getUserType() {
    const user = this.getUser();
    return user ? user.tipo : null;
  },

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
  },

  generateId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  checkAccess(requiredType) {
    const user = this.getUser();
    if (!user) {
      window.location.href = '/index.html';
      return false;
    }
    if (user.tipo !== requiredType) {
      window.location.href = '/index.html';
      return false;
    }
    return true;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Auth;
}
