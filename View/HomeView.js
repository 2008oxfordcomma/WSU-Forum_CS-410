// Author: Dre Harm
// Contributors: Rachal, Alyssa, Ethan
// Date 11/8/26

import HomeViewInterface from './HomeViewInterface.js'

export default class HomeView extends HomeViewInterface {
    constructor() {
        super();
        this.quickLinksPanel = document.getElementById('quickLinksPanel');
        this.profilePanel = document.getElementById('profile-panel');
        this.trendingGroupsPanel = document.getElementById('trendingGroupsPanel');
        this.myGroupsPanel = document.getElementById('myGroupsPanel');
    }

    render(model) {
        this.renderQuickLinks(model.getQuickLinks());
        this.renderPosts(model.getPosts());
        this.renderProfileSection(model.getProfileOptions());
        this.renderTrendingGroups(model.getTrendingGroups());
        this.renderMyGroups(model.getMyGroups());
    }

    renderProfileSection(profileOptions) {
        const panel = this.profilePanel;
        
        // Clear out old contents so re-rendering doesn't cause any weird bugs
        panel.replaceChildren(); 
        panel.appendChild(this.panelTitle('Profile'));

        // Case where no options available
        if (!profileOptions || profileOptions.length === 0) {
            panel.appendChild(this.createElement('p', 'panel-empty', 'No profile options available.'));
            return
        }

        // Rendering the list
        const list = this.createElement('div', 'profile-options');
        for (let i = 0; i < profileOptions.length; i++) {
            const item = this.createElement('h4', 'profile-option-'+profileOptions[i].id);

            // Assemble the actual list elements
            item.appendChild(this.createElement('span', 'profile-options-label', profileOptions[i].label));
            list.appendChild(item);
        }
        // Place finished list into panel
        panel.appendChild(list);
    }

    // the name is kind of self explanatory but 
    renderSideNavBar(item, activeId) {

    }

    // My Groups panel in the left column
    renderMyGroups(groups) {
        const panel = this.myGroupsPanel;
        
        // Clear out old contents so re-rendering doesn't cause any weird bugs
        panel.replaceChildren(); 
        panel.appendChild(this.panelTitle('My Groups'));

        // Case where no options available
        if (!groups || groups.length === 0) {
            panel.appendChild(this.createElement('p', 'panel-empty', 'No groups available.'));
            return
        }

         // Rendering the list
        const list = this.createElement('div', 'my-groups-list');
        for (let i = 0; i < groups.length; i++) {
            const item = this.createElement('div', 'my-group-row');

            // Assemble the actual list elements
            item.appendChild(this.createElement('span', 'my-groups-label', groups[i].name));
            list.appendChild(item);
        }
        list.appendChild(this.createElement('h5', 'view-all', 'View All →'));
        // Place finished list into panel
        panel.appendChild(list);
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
        const posterName = document.createElement("span");
        posterName.className = "post-user-name";
        posterName.textContent = post.fname + " " + post.lname;
        userWhoMessaged.appendChild(posterName);
        if (post.major) {
            const majorLabel = document.createElement("span");
            majorLabel.className = "major-label";
            majorLabel.textContent = post.major;
            userWhoMessaged.append(majorLabel);
        }
        const messageFromUser = document.createElement("p");
        messageFromUser.className = "post-message";
        messageFromUser.textContent = post.message;
        const timeOfMessage = document.createElement("p");
        timeOfMessage.className = "post-time";
        const sentAt = new Date(post.send_time.replace(' ', 'T') + 'Z');
        timeOfMessage.textContent = sentAt.toLocaleString('en-US', {
            timeZone: 'America/Chicago', month: 'short', day: 'numeric', year: 'numeric',
            hour: 'numeric', minute: '2-digit',
        });
        
        messageContainer.appendChild(userWhoMessaged);
        messageContainer.appendChild(messageFromUser);
        if (post.filename) {
            const url = new URL('../Model/Database/attachment.php', import.meta.url);
            url.searchParams.set('post', post.post_id);
            const link = document.createElement('a');
            link.href = url;
            link.textContent = post.filename;
            if (post.mime.startsWith('image/')) {
                const image = document.createElement('img');
                image.src = url;
                image.alt = post.filename;
                image.loading = 'lazy';
                link.prepend(image);
            }
            messageContainer.appendChild(link);
        }
        messageContainer.appendChild(timeOfMessage);
        feedPanel.appendChild(messageContainer);
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
        const panel = this.trendingGroupsPanel;
        
        // Clear out old contents so re-rendering doesn't cause any weird bugs
        panel.replaceChildren(); 
        panel.appendChild(this.panelTitle('Trending Groups'));

        // Case where no options available
        if (!groups || groups.length === 0) {
            panel.appendChild(this.createElement('p', 'panel-empty', 'No trending groups available.'));
            return
        }

         // Rendering the list
        const list = this.createElement('div', 'trending-groups-list');
        for (let i = 0; i < groups.length; i++) {
            const item = this.createElement('div', 'trending-group');

            // Assemble the actual list elements
            item.appendChild(this.createElement('span', 'trending-group-label', groups[i].name));
            list.appendChild(item);
            list.appendChild(this.createElement('h6', 'post-count', groups[i].posts + ' posts'));
        }
        // Place finished list into panel
        panel.appendChild(list);
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

    // Returns panel title from createElement helper method
    panelTitle(text) {
        return this.createElement('h2', 'panel-title', text)
    }
}
