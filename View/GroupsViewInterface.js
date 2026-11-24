// Author: Dre Harm
// Date: 11/24/26

export default class GroupsViewInterface {
    render(model) {
        throw new Error('render() is not implemented');
    }

    renderGroupTypeOptions(types) {
        throw new Error('renderGroupTypeOptions() is not implemented');
    }

    renderFilters(types) {
        throw new Error('renderFilters() is not implemented');
    }

    renderGroups(groups, joiningGroupId) {
        throw new Error('renderGroups() is not implemented');
    }

    groupCard(group, joining) {
        throw new Error('groupCard() is not implemented');
    }

    renderStatus(model) {
        throw new Error('renderStatus() is not implemented');
    }

    showError(element, message) {
        throw new Error('showError() is not implemented');
    }

    getCreateGroupFormData() {
        throw new Error('getCreateGroupFormData() is not implemented');
    }

    clearCreateGroupForm() {
        throw new Error('clearCreateGroupForm() is not implemented');
    }

    goToHomePage() {
        throw new Error('goToHomePage() is not implemented');
    }

    createElement(tag, className, text) {
        throw new Error('createElement() is not implemented');
    }
}