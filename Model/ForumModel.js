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
    this.currentUser = null;
    this.sessionChecked = false;
    this.authError = null;
    this.authPending = false;
    this.posts = [];
    
    // Quick links panel plain data, the view will decide how they look
    // Will pass a copy of this to the view so nothing outside of the model can change the links
    this.quickLinks = [
      {id: 'groups',        label: 'Find Groups',       icon: '👥', url: 'groups.html' },
      {id: 'wsu-resources', label: 'Campus Resources',  icon: '📖', url: 'https://www.winona.edu/student-life/support/equity/student-resources/'},
      {id: 'wsu-calendar',  label: 'Academic Calendar', icon: '📅', url: 'https://www.winona.edu/about/series/academic-calendar/'},
      {id: 'wsu-web',       label: 'WSU Website',       icon: '🌐', url: 'https://www.winona.edu'}
    ];

    this.profileOptions = [
      {id: 'home', label: 'Home'},
      {id: 'groups', label: 'My Groups'},
      {id: 'messages', label: 'Messages'},
      {id: 'saved-posts', label: 'Saved Posts'},
      {id: 'settings', label: 'Settings'}
    ]

  //   this.myGroups = [
  //     {name: 'My Group'},
  //     {name: 'My Group'},
  //     {name: 'My Group'},
  //     {name: 'My Group'},
  //     {name: 'My Group'}
  //  ]

    // we have to have a way to store the group page states and handle state logic
    this.groups = [];
    this.groupsLoaded = false; // false until groups.php answers, so the groups page can say "Loading..." instead of "no groups"
    this.groupError = null; // message inside the Create Group popup
    // pulled these from Benjamin's mockup, might be a good idea to outsource these to a config file, so, like Iyengar said, it could be easily changed if given to another institution
    this.groupTypes = ['Academic', 'Campus Life', 'Organizations', 'Housing', 'Lifestyle', 'Sports'];

   this.trendingGroups = [
    {name: 'Trending Group', posts: '0'},
    {name: 'Trending Group', posts: '0'},
    {name: 'Trending Group', posts: '0'},
    {name: 'Trending Group', posts: '0'},
    {name: 'Trending Group', posts: '0'},
   ]
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
    this.authError = null;
    this.groupError = null;
    this.notify();
  }

  // sets the modal to not visible then refreshes the screen
  closeModal() {
    this.activeModal = null;
    this.authError = null;
    this.groupError = null;
    this.notify();
  }

  isLoggedIn() {
    return this.currentUser != null;
  }

  async request(file, method, body) {
    // because we have different pages and I couldn't figure out how to pass things properly, 
    // import.meta.url is this file's own address, so now it can find stuff at Model/Database/ no matter which page loads it
    const url = new URL('./Database/' + file, import.meta.url);
    
    try { // the following code was pulled straight from W3schools
      const response = await fetch(url, {
        method: method,
        headers: body && !(body instanceof FormData) ? { 'Content-Type': 'application/json' } : {},
        body: body instanceof FormData ? body : (body ? JSON.stringify(body) : undefined),
        credentials: 'same-origin'
      });

      const data = await response.json();
      if (!response.ok) {
        return { ok: false, error: data.error || 'Something went wrong. Please try again.' };
      }
      return { ok: true, data: data };
    } catch (err) { 
        console.error('request to ' + file + ' failed:', err);
        return { ok: false, error: "couldn't reach the server, please try again" };
    }
  }

  async checkSession() {
    const result = await this.request('session.php', 'GET');
    this.currentUser = result.ok ? result.data.user : null;
    this.sessionChecked = true;
    this.notify();
    if (this.currentUser) this.loadGroups();
  }
  
  async login({email, password}) {
    return this.sendAccountRequest('login.php', {email, password});
  }

  async sendAccountRequest(file, body) {
    this.authPending = true;
    this.authError = null;
    this.notify();

    const result = await this.request(file, 'POST', body);
    this.authPending = false;

    if (!result.ok) {
      this.authError = result.error;
      this.notify();
      return false;
    }

    this.currentUser = result.data.user;
    this.activeModal = null;
    this.notify();
    this.loadGroups();
    return true;
  }

  signup({firstName, lastName, role, email, major, password, confirmPassword}) {
    if (password !== confirmPassword) {
      this.authError = "The passwords don't match";
      this.notify();
      return false;
    }
    return this.sendAccountRequest('signup.php', {firstName, lastName, role, email, major, password, confirmPassword});
  }

  async logout() {
    await this.request('logout.php', 'POST');
    this.currentUser = null;
    this.groups = [];
    this.groupsLoaded = false;
    this.notify();
  }

  async findPosts() {
    const result = await this.request('HomeFeed.php', 'POST');
    return result;
  }

  addPost(body) {
    return this.request('createPost.php', 'POST', body);
  }

  getPosts(){
    return this.posts;
  }

  // Gives the view a copy of the quick links, so nothing outside the model can change the list
  getQuickLinks() {
    return this.quickLinks.slice();
  }

  getProfileOptions(){
    return this.profileOptions.slice();
  }

  getMyGroups = () => this.groups.filter(group => group.joined).map(group => ({ ...group }));

  getTrendingGroups(){
    return this.trendingGroups.slice();
  }

  getGroups = () => this.groups.map(group => ({ ...group }));
  
  getGroupTypes = () => this.groupTypes.slice();

  async getMajors() {
    const response = await fetch(new URL('./majors.json', import.meta.url));
    return response.json();
  }

  async loadGroups() {
    const result = await this.request('groups.php', 'GET');
    if (result.ok) this.groups = result.data.groups;
    this.groupsLoaded = true;
    this.notify();
  }

  async createGroup({ name, type }) {
    const result = await this.request('createGroup.php', 'POST', { name, type });
    if (!result.ok) {
      this.groupError = result.error;
      this.notify();
      return false;
    }
    this.activeModal = null;
    await this.loadGroups();
    return true;
  }

  async joinGroup(groupId) {
    await this.request('joinGroup.php', 'POST', { groupId });
    this.loadGroups();
  }
}