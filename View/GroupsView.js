// Author: Dre Harm
// Date: 11/24/26

import GroupsViewInterface from './GroupsViewInterface.js'

export default class GroupsView extends GroupsViewInterface {
    constructor() {
        super();
        this.page = document.getElementById('groupsPage');
        this.greeting = document.getElementById('greeting');
        this.majorLabel = document.getElementById('majorLabel');
        this.logoutBtn = document.getElementById('logoutBtn');
        this.createGroupBtn = document.getElementById('createGroupBtn');
        this.filters = document.getElementById('groupFilters');
        this.status = document.getElementById('groupsStatus');
        this.grid = document.getElementById('groupGrid');
        this.createGroupModal = document.getElementById('createGroupModal');
        this.createGroupForm = document.getElementById('createGroupForm');
        this.groupName = document.getElementById('groupName');
        this.groupType = document.getElementById('groupType');
        this.createGroupError = document.getElementById('createGroupError');
        this.search = document.getElementById('groupsSearch');
    }

    render(model) { // largely repurposed from the forum view
        const loggedIn = model.isLoggedIn();
        this.page.hidden = !loggedIn;
        this.greeting.hidden = !loggedIn;
        this.greeting.textContent = loggedIn ? 'Hello ' + model.currentUser.firstName + '!' : '';
        this.majorLabel.textContent = loggedIn ? model.currentUser.major : '';
        this.majorLabel.hidden = !this.majorLabel.textContent;

        this.createGroupModal.classList.toggle('open', model.activeModal === 'createGroup');
        this.showError(this.createGroupError, model.activeModal === 'createGroup' ? model.groupError : null);

        this.renderFilters(model.getGroupTypes(), model.groupFilter);
        this.renderStatus(model);
        this.renderGroups(model.getFilteredGroups());
    }

    renderGroupTypeOptions(types) {
        const options = [this.createElement('option', null, 'Choose a group type')];
        options[0].value = '';
        options[0].disabled = true;
        options[0].selected = true;
        for (let i = 0; i < types.length; i++) {
            const option = this.createElement('option', null, types[i]);
            option.value = types[i];
            options.push(option);
        }
        this.groupType.replaceChildren(...options);
    }

    renderFilters(types, activeFilter) {
        const names = ['All', ...types];
        const buttons = [];
        for (let i = 0; i < names.length; i++) {
            const button = this.createElement('button', 'filter-button', names[i]);
            if (names[i] === activeFilter) button.classList.add('active');
            buttons.push(button);
        }
        this.filters.replaceChildren(...buttons);
    }
    
    renderGroups(groups) {
        const cards = [];
        for (let i = 0; i < groups.length; i++) {
            cards.push(this.groupCard(groups[i]));
        }
        this.grid.replaceChildren(...cards);
    }

    groupCard(group) {
        const card = this.createElement('article', 'group-tile');

        // Benjamin's mockup had pictures and an icon, but I don't know how we are going to assign or set these
        card.appendChild(this.createElement('div', 'group-tile-banner')); // for the picture
        card.appendChild(this.createElement('div', 'group-tile-icon')); // for the group's icon

        const body = this.createElement('div', 'group-tile-body');
        body.appendChild(this.createElement('h3', 'group-tile-name', group.name));
        body.appendChild(this.createElement('p', 'group-tile-members', group.memberCount + (group.memberCount === 1 ? ' member' : ' members')));

        const footer = this.createElement('div', 'group-tile-footer');
        footer.appendChild(this.createElement('span', 'group-tile-type', group.type));

        const button = this.createElement('button', 'join-group-btn', 'Join Group');
        if (group.joined) {
            button.textContent = 'Joined';
            button.disabled = true;
            button.classList.add('joined');
        } else {
            button.dataset.joinGroup = group.id; // only buttons you can still click get this, the controller looks for it
        }
        footer.appendChild(button);

        body.appendChild(footer);
        card.appendChild(body);
        return card;
    }

    renderStatus(model) {
        // my server was taking a long time to load to I added some messages to see what was happening
        let message = null;
        if (!model.groupsLoaded) message = 'Loading groups';
        else if (model.getGroups().length === 0) message = 'No groups yet, please create one';
        else if (model.getFilteredGroups().length === 0) message = 'No groups match the search';
        this.showError(this.status, message);
    }

    showError(element, message) {
        element.textContent = message || '';
        element.hidden = !message;
    }

    getCreateGroupFormData() {
        return {
            name: this.groupName.value.trim(),
            type: this.groupType.value
        };
    }

    clearCreateGroupForm = () => this.createGroupForm.reset();
    
    goToHomePage = () => window.location.href = 'index.html';
    
    createElement(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined && text !== null) element.textContent = text;
        return element;
    }
}