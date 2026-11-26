// Author: Dre Harm
// Date: 10/24/26
// Turns the user events into model calls

import ForumControllerInterface from './ForumControllerInterface.js'
import ForumModel from '../Model/ForumModel.js'
import ForumView from '../View/ForumView.js'
import HomeView from '../View/HomeView.js';
import HomeController from './HomeController.js';

class ForumController extends ForumControllerInterface{

  // Iyengar's diagram had arrows from model and view going to controller so I'm doing that here
  constructor(model, view) { 
    super();
    this.model = model;
    this.view = view;

    this.bindEvents();
    this.homeController = new HomeController(this.model, new HomeView());
    this.model.subscribe(this.view.render.bind(this.view));
    this.view.render(this.model);
    this.model.checkSession(); // asks the server if this browser is already logged in
    this.model.getMajors().then(majors => this.view.renderMajorOptions(majors));
  }

  bindEvents() {
    // if the user clicks on the login button the login popup opens, or it logs them out if they're already in
    this.view.loginBtn.addEventListener('click', () => {
      if (this.model.isLoggedIn()) {
        this.model.logout();
      } else {
        this.model.openModal('login');
      }
    });

    this.view.signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.model.openModal('signup');
    })

    // we essentially check if the user clicks outside of the model and if so, close it
    this.view.loginModal.addEventListener('click', (e) => {
      if (e.target === this.view.loginModal) {
        this.model.closeModal();
      }
    });

    this.view.signupModal.addEventListener('click', (e) => {
      if (e.target === this.view.signupModal) {
        this.model.closeModal();
      }
    });

    // sends what was typed to the model, which checks it with the server.
    // the form only gets cleared if it worked, so a typo doesn't make them retype everything, something I find highly annoying on a real site
    this.view.loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const worked = await this.model.login(this.view.getLoginFormData());
      if (worked) this.view.clearLoginForm();
    });

    this.view.signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const worked = await this.model.signup(this.view.getSignupFormData());
      if (worked) this.view.clearSignupForm();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => new ForumController(new ForumModel(), new ForumView()));