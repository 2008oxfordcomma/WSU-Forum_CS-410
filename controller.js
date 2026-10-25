// Author: Dre Harm
// Date: 10/24/26
// Turns the user events into model calls

class ForumController {

  // Iyengar's diagram had arrows from model and view going to controller so I'm doing that here
  constructor(model, view) { 
    this.model = model;
    this.view = view;

    this.bindEvents();
    this.model.subscribe(this.view.render.bind(this.view));
    this.view.render(this.model);
  }

  bindEvents() {
    // if the user clicks on the login button the login popup opens
    this.view.loginBtn.addEventListener('click', () => {
      this.model.openModal();
    });

    // we essentially check if the user clicks outside of the model and if so, close it
    this.view.modal.addEventListener('click', (e) => {
      if (e.target === this.view.modal) {
        this.model.closeModal();
      }
    });

    // if the user clicks on the submit button the login popup opens
    this.view.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.view.clearForm();
      this.model.closeModal();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => new ForumController(new ForumModel(), new ForumView()));