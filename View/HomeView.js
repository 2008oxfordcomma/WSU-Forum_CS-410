// Author: Dre Harm
// Date 11/8/26

import HomeViewInterface from './HomeViewInterface.js'

export default class HomeView extends HomeViewInterface {
    constructor() {
        super();
        this.quickLinksPanel = document.getElementById('quickLinksPanel');
    }

    render(model) {
        this.renderQuickLinks(model.getQuickLinks());
        this.renderPosts(model.getPosts());
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

    //@ Ethan All the feed
    renderPosts(posts) {
        const feedPanel = document.getElementById("postFeed");
        feedPanel.replaceChildren();

        for(let i = 0; i < posts.length; i++){
            this.postItem(posts[i]);
        }
    }

    //@ Ethan Each item at the feed
    postItem(post) {

        const feedPanel = document.getElementById("postFeed");

        const messageContainer = document.createElement("div");
        messageContainer.className = "post";

        const userWhoMessaged = document.createElement("p");
        userWhoMessaged.className = "post-user";
        userWhoMessaged.textContent = post.fname + " " + post.lname;
        const messageFromUser = document.createElement("p");
        messageFromUser.className = "post-message";
        messageFromUser.textContent = post.message;
        const timeOfMessage = document.createElement("p");
        timeOfMessage.className = "post-time";
        timeOfMessage.textContent = post.send_time;
        
        messageContainer.appendChild(userWhoMessaged);
        messageContainer.appendChild(messageFromUser);
        messageContainer.appendChild(timeOfMessage);
        feedPanel.appendChild(messageContainer);
    }


    // Future implementation of deleting posts, or other features
    postAction(action, count) {

    }

    renderQuickLinks(links) {
        const panel = this.quickLinksPanel;
        
        // Clear out old contents so re-rendering doesn't cause any weird bugs
        panel.replaceChildren(); 
        panel.appendChild(this.panelTitle('Quick Links'));

        // Case where no links available
        if (!links || links.length === 0) {
            panel.appendChild(this.createElement('p', 'panel-empty', 'No links available.'));
            return
        }

        // Rendering the links as a list
        const list = this.createElement('ul', 'quick-links-list');
        for (let i = 0; i < links.length; i++) {
            const item = this.createElement('li', 'quick-links-item');
            const anchor = this.createElement('a', 'quick-link');

            // Open the link in a new tab 
            anchor.href = links[i].url;
            anchor.target = '_blank';
            anchor.rel = 'noopener noreferrer'; // Safety so new page doesn't get access to our webapp 

            // Assemble the actual list elements
            anchor.appendChild(this.quickLinkIcon(links[i].icon));
            anchor.appendChild(this.createElement('span', 'quick-link-label', links[i].label));
            item.appendChild(anchor);
            list.appendChild(item);
        }
        // Place finished list into panel
        panel.appendChild(list);
    }

    // Helper method to create an icon element
    quickLinkIcon(icon) {
        const title = this.createElement('span', 'quick-link-icon', icon);
        title.setAttribute('aria-hidden', 'true')
        return title;
    }

    renderTrendingGroups(groups) {

    }

    // These are some helper methods to make working with html and js easier since I know not all of us are super familiar, 
    // if any of you have worked with Node.js, to replicate the behavior of creating html elements with js, that's what these will be for

    // Builds and configures a new HTML element in 1 step
    createElement(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined && text !== null) element.textContent = text;
        return element;
    }


    field(tag, className, value) {

    }

    avatar(name, sizeClass) {

    }

    // Returns panel title from createElement helper method
    panelTitle(text) {
        return this.createElement('h2', 'panel-title', text)
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
