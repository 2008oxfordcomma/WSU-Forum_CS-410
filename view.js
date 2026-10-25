// Author: Dre Harm
// Date: 10/24/26
// Note: If I'm understanding it right, 
// I think the view should only be touching the DOM tree and shouldn't change the state itself, 
// so it reads stuff from the model and reflects those changes

class ForumView {
  constructor() {
    this.loginModal = document.getElementById('loginModal');
    this.loginBtn = document.getElementById('loginBtn');
    this.loginForm = document.getElementById('loginForm');
    this.signupModal = document.getElementById('signupModal');
    this.signupLink = document.getElementById('signupLink');
    this.signupForm = document.getElementById('signupForm');
    this.navBtns = document.querySelectorAll('.nav-btn[data-page]');
  }
  

  render(model) {
    this.loginModal.classList.toggle('open', model.activeModal === 'login');
    this.signupModal.classList.toggle('open', model.activeModal === 'signup');

    for (let i = 0; i < this.navBtns.length; i++) {
      const btn = this.navBtns[i];
      btn.classList.toggle('active', btn.dataset.page === model.activePage);
    }
  }

  clearLoginForm() {
    this.loginForm.reset();
  }

  clearSignupForm() {
    this.signupForm.reset();
  }
  
}