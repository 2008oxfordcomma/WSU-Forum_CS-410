// Author: Dre Harm
// Date: 11/8/26

import HomeControllerInterface from './HomeControllerInterface.js'

export default class HomeController extends HomeControllerInterface {
    constructor(model, homeView) {
        super();
        this.model = model;
        this.homeView = homeView;
        this.bindEvents();
        this.model.subscribe(this.homeView.render.bind(this.homeView));
        this.homeView.render(this.model);
        this.model.findPosts();
    }

    bindEvents() {
        
    }
}