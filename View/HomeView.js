// Author: Dre Harm
// Date 11/8/26

import HomeViewInterface from './HomeViewInterface.js'

export default class HomeView extends HomeViewInterface {
    constructor() {
        super();
    }

    render(model) {

    }

    renderProfileSection() {

    }

    // the name is kind of self explanatory but 
    renderSideNavBar(item, activeId) {

    }

    // My Groups panel in the left column
    renderMyGroups(groups) {

    }

    // one of the row in the My Groups list
    groupRow(group) {

    }

    // This is the what's on you mind box from Benjamin's mockup, the controller should listen for the form's submit event
    renderSimpleMessage(user) {

    }

    renderFeedHeader(sortOptions, sortBy) {

    }

    renderPosts(posts) {

    }

    postItem(post) {

    }

    postAction(action, count) {

    }

    renderQuickLinks(links) {

    }

    renderTrendingGroups(groups) {

    }

    // These are some helper methods to make working with html and js easier since I know not all of us are super familiar, 
    // if any of you have worked with Node.js, to replicate the behavior of creating html elements with js, that's what these will be for

    createElement(tag, className, text) {

    }

    field(tag, className, value) {

    }

    avatar(name, sizeClass) {

    }

    panelTitle(text) {

    }

    iconButton(action) {

    }

    moreButton() {

    }

    getInitials(name) {

    }

    capitalize(text) {

    }

    isEmpty(value) {

    }

    // Just to seperate these out, the controller should ask for these and everything else above stays within the view
    getSimpleMessageText() {

    }

    clearSimpleMessage() {

    }
}