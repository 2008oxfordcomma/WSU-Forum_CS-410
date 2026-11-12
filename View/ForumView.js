// Author: Dre Harm
// Date: 10/24/26
// Note: If I'm understanding it right, 
// I think the view should only be touching the DOM tree and shouldn't change the state itself, 
// so it reads stuff from the model and reflects those changes

import ForumViewInterface from './ForumViewInterface.js'

export default class ForumView extends ForumViewInterface {
  constructor() {
    super();
    this.loginModal = document.getElementById('loginModal');
    this.loginBtn = document.getElementById('loginBtn');
    this.loginForm = document.getElementById('loginForm');
    this.loginError = document.getElementById('loginError');
    this.loginSubmit = document.getElementById('loginSubmit');
    this.signupModal = document.getElementById('signupModal');
    this.signupLink = document.getElementById('signupLink');
    this.signupForm = document.getElementById('signupForm');
    this.signupError = document.getElementById('signupError');
    this.signupSubmit = document.getElementById('signupSubmit');
    this.navBtns = document.querySelectorAll('.nav-btn[data-page]');
    this.guestPage = document.getElementById('guestPage');
    this.homePage = document.getElementById('homePage');
    this.greeting = document.getElementById('greeting');
  }
  
  render(model) {
    this.loginModal.classList.toggle('open', model.activeModal === 'login');
    this.signupModal.classList.toggle('open', model.activeModal === 'signup');

    for (let i = 0; i < this.navBtns.length; i++) {
      const btn = this.navBtns[i];
      btn.classList.toggle('active', btn.dataset.page === model.activePage);
    }

    // the wrong page was flashing when refreshing, the only way I know to fix that is for both pages to stay hidden until we know if someone's logged in
    // if anyone knows a better solution, I'm all ears
    const loggedIn = model.isLoggedIn();
    this.guestPage.hidden = !model.sessionChecked || loggedIn;
    this.homePage.hidden = !model.sessionChecked || !loggedIn;
    this.loginBtn.textContent = loggedIn ? 'Log Out' : 'Login / Create Account';
    this.greeting.hidden = !loggedIn;
    this.greeting.textContent = loggedIn ? 'Hello ' + model.currentUser.firstName + '!': '';

    this.showError(this.loginError, model.activeModal === 'login' ? model.authError : null);
    this.showError(this.signupError, model.activeModal === 'signup' ? model.authError : null);

    // when I was testing it out and it was taking a while to load, clicking the submit again would send the form twice, so this stops double-clicking 
    this.loginSubmit.disabled = model.authPending;
    this.signupSubmit.disabled = model.authPending;
  }

  showError(element, message) {
    element.textContent = message || '';
    element.hidden = !message;
  }

  getLoginFormData() {
    return {
      email: document.getElementById('email').value.trim(),
      password: document.getElementById('password').value
    };
  }

  getSignupFormData() {
    const role = this.signupForm.querySelector('input[name="signupRole"]:checked');
    return {
      firstName: document.getElementById('signupFirstName').value.trim(),
      lastName: document.getElementById('signupLastName').value.trim(),
      role: role ? role.value : 'student',
      email: document.getElementById('signupEmail').value.trim(),
      password: document.getElementById('signupPassword').value,
      confirmPassword: document.getElementById('signupConfirmPassword').value
    };
  }

  clearLoginForm() {
    this.loginForm.reset();
  }

  clearSignupForm() {
    this.signupForm.reset();
  }
}