// Author: Dre Harm
// Date: 10/24/26
// Pretty sure the model doesn't know anything about the DOM so it holds data and for all of those in the listeners, it tells them when data changes 

import ForumModelInterface from './ForumModelInterface.js'

export default class ForumModel extends ForumModelInterface {
  constructor() {
    super()
    this.activeModal = null; // we don't want anything shown on startup to null works, 'login' and 'signup' show their respective popups
    this.activePage = 'home'; // home is the default nav button
    this.listeners = []; // holds our callbacks
  }

  // if I'm understanding Iyengar correctly, the model shouldn't need to know who is watching, 
  // so we're just adding whoever it looking at the screen. This may eventually need to be added to the database when we make it.
  subscribe(listener) {
    this.listeners.push(listener);
  }

  // takes the model instance and calls it with this
  // essentially it's how the view learns the state has changed and gets the new data to render.
  notify() {
    for (let i = 0; i < this.listeners.length; i++) this.listeners[i](this);
  }

  // sets the modal to visible then refreshes the screen
  openModal(name) {
    this.activeModal = name;
    this.notify();
  }

  // sets the modal to not visible then refreshes the screen
  closeModal() {
    this.activeModal = null;
    this.notify();
  }

  // I wanted to add some stuff for a mock login if I had time

  isLoggedIn() {

  }

  login({email}) {

  }

  signup({firstName, lastName, role, email}) {

  }

  logout() {

  }

  // Stuff for the homepage

  createEmptyHome() {
  
  }

  loadHomeData() {
  }

  makePlaceHolders(prefix, count) {

  }

  setActiveSelection(selectionId) {

  }

  setSort(value) {

  }

  addPost(body) {

  }
}