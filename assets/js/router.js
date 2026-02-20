const Router = {
  protectRoute(requiredType) {
    if (!Auth.isAuthenticated()) {
      this.redirectToHome();
      return false;
    }

    const userType = Auth.getUserType();
    if (userType !== requiredType) {
      this.redirectToHome();
      return false;
    }

    return true;
  },

  redirectToHome() {
    window.location.href = '/index.html';
  },

  redirectToDashboard(tipo) {
    if (tipo === 'cliente') {
      window.location.href = '/cliente/dashboard.html';
    } else if (tipo === 'farmacia') {
      window.location.href = '/farmacia/dashboard.html';
    } else {
      this.redirectToHome();
    }
  },

  handleLogout() {
    Auth.logout();
    this.redirectToHome();
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Router;
}
