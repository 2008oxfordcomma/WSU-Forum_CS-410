// Author: Dre Harm
// Date: 11/8/26

export default class HomeViewInterface {
    render(model) {
        throw new Error('render() is not implemented');
    }

    renderProfileSection() {
        throw new Error('renderProfileSection() is not implemented');
    }

    renderSideNavBar(item, activeId) {
        throw new Error('renderSideNavBar() is not implemented');
    }

    renderMyGroups(groups) {
        throw new Error('renderMyGroups() is not implemented');
    }

    groupRow(group) {
        throw new Error('groupRow() is not implemented');
    }

    renderSimpleMessage(user) {
        throw new Error('renderSimpleMessage() is not implemented');
    }

    renderFeedHeader(sortOptions, sortBy) {
        throw new Error('renderFeedHeader() is not implemented');
    }

    renderPosts(posts) {
        throw new Error('renderPosts() is not implemented');
    }

    postItem(post) {
        throw new Error('postItem() is not implemented');
    }

    postAction(action, count) {
        throw new Error('postAction() is not implemented');
    }

    renderQuickLinks(links) {
        throw new Error('renderQuickLinks() is not implemented');
    }

    renderTrendingGroups(groups) {
        throw new Error('renderTrendingGroups() is not implemented');
    }

    getSimpleMessageText() {
        throw new Error('getSimpleMessageText() is not implemented');
    }

    clearSimpleMessage() {
        throw new Error('clearSimpleMessage() is not implemented');
    }

    createElement(tag, className, text) {
        throw new Error('createElement() is not implemented');
    }

    field(tag, className, value) {
        throw new Error('field() is not implemented');
    }

    avatar(name, sizeClass) {
        throw new Error('avatar() is not implemented');
    }

    panelTitle(text) {
        throw new Error('panelTitle() is not implemented');
    }

    iconButton(action) {
        throw new Error('iconButton() is not implemented');
    }

    moreButton() {
        throw new Error('moreButton() is not implemented');
    }

    getInitials(name) {
        throw new Error('getInitials() is not implemented');
    }

    capitalize(text) {
        throw new Error('capitalize() is not implemented');
    }

    isEmpty(value) {
        throw new Error('isEmpty() is not implemented');
    }
}