// Author: Dre Harm
// Date: 11/24/26

import GroupsControllerInterface from './GroupsControllerInterface.js'
import ForumModel from '../Model/ForumModel.js'
import GroupsView from '../View/GroupsView.js'

class GroupsController extends GroupsControllerInterface {
    constructor(model, view) {
        super();
        this.model = model;
        this.view = view;

        this.bindEvents();
        this.view.renderGroupTypeOptions(this.model.getGroupTypes());
        this.model.subscribe(() => this.render());
        this.render();
        this.model.checkSession();
    }

    // if I was smarter and had time, I'd make this stuff into a reusable component but I'm just copy and pasting what we've already done
    bindEvents() {
        this.view.logoutBtn.addEventListener('click', () => this.model.logout());

        this.view.createGroupBtn.addEventListener('click', () => this.model.openModal('createGroup'));

        this.view.createGroupModal.addEventListener('click', (e) => {
            if (e.target === this.view.createGroupModal) this.model.closeModal();
        });

        this.view.createGroupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const worked = await this.model.createGroup(this.view.getCreateGroupFormData());
            if (worked) this.view.clearCreateGroupForm();
        });

        this.view.grid.addEventListener('click', (e) => { // since the cards keep getting redrawn we just look at the grid to check which join button was clicked
            const button = e.target.closest('[data-join-group]');
            if (button) this.model.joinGroup(Number(button.dataset.joinGroup));
        });
    }

    render() {
        // Ethan and I talked about it in the car on 11/24 and if a logged out person views groups, they go back to the logged out page - Dre
        if (this.model.sessionChecked && !this.model.isLoggedIn()) {
            this.view.goToHomePage();
            return;
        }
        this.view.render(this.model);
    }
}

document.addEventListener('DOMContentLoaded', () => new GroupsController(new ForumModel(), new GroupsView()));
