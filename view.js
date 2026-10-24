// Author: Dre Harm
// Date: 10/24/26
// Note: If I'm understanging it right, 
// I think the view should only be touching the DOM tree and shouldn't change the state itself, 
// so it reads stuff from the model and reflects those changes

class ForumView {
  constructor() {
    this.modal = document.getElementById('loginModal');
    this.loginBtn = document.getElementById('loginBtn');
    this.navBtns = document.querySelectorAll('.nav-btn[data-page]');
    this.form = document.getElementById('loginForm');
  }
  

  render(model) {
    this.modal.classList.toggle('open', model.modalOpen);

    for (let i = 0; i < this.navBtns.length; i++) {
      const btn = this.navBtns[i];
      btn.classList.toggle('active', btn.dataset.page === model.activePage);
    }
  }
}