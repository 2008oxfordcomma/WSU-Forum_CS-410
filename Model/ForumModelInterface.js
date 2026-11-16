// Author: Dre Harm
//Additional Contributor(s): Ethan Larson
// Date Published: 11/8/26
//Date Modified: 11/16/26

export default class ForumModelInterface {
    subscribe(listener) {
        throw new Error('subscribe() is not implemented');
    }

    notify() {
        throw new Error('notify() is not implemented');
    }

    openModal(name) {
        throw new Error('openModal() is not implemented');
    }

    closeModal() {
        throw new Error('closeModal() is not implemented');
    }

    isLoggedIn() {
        throw new Error('isLoggedIn() is not implemented');
    }

    checkSession() {
        throw new Error('checkSession() is not implemented');
    }

    login({ email, password }) {
        throw new Error('login() is not implemented');
    }

    signup({ firstName, lastName, role, email, password, confirmPassword }) {
        throw new Error('signup() is not implemented');
    }

    logout() {
        throw new Error('logout() is not implemented');
    }

    sendAccountRequest(file, body) {
        throw new Error('sendAccountRequest() is not implemented');
    }

    request(file, method, body) {
        throw new Error('request() is not implemented');
    }

    createEmptyHome() {
        throw new Error('createEmptyHome() is not implemented');
    }

    loadHomeData() {
        throw new Error('loadHomeData() is not implemented');
    }

    makePlaceHolders(prefix, count) {
        throw new Error('makePlaceHolders() is not implemented');
    }

    setActiveSelection(selectionId) {
        throw new Error('setActiveSelection() is not implemented');
    }

    setSort(value) {
        throw new Error('setSort() is not implemented');
    }

    addPost(body) {
        throw new Error('addPost() is not implemented');
    }

    getQuickLinks() {
        throw new Error('getQuickLinks() is not implemented');
    }

    getComments() {
        throw new Error('getComments() is not implemented');
    }
}
