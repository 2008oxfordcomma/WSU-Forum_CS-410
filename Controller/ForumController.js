// Author: Dre Harm
// Date: 10/24/26
// Turns the user events into model calls

import ForumControllerInterface from './ForumControllerInterface.js'
import ForumModel from '../Model/ForumModel.js'
import ForumView from '../View/ForumView.js'

class ForumController extends ForumControllerInterface{

  // Iyengar's diagram had arrows from model and view going to controller so I'm doing that here
  constructor(model, view) { 
    super();
    this.model = model;
    this.view = view;

    this.bindEvents();
    this.model.subscribe(this.view.render.bind(this.view));
    this.view.render(this.model);
  }

  bindEvents() {
    // if the user clicks on the login button the login popup opens
    this.view.loginBtn.addEventListener('click', () => {
      this.model.openModal('login');
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

    // if the user clicks on the submit button the login popup opens
    this.view.loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.view.clearLoginForm();
      this.model.closeModal();
    });

    this.view.signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.view.clearSignupForm();
      this.model.closeModal();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => new ForumController(new ForumModel(), new ForumView()));