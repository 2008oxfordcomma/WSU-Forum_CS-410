// Author: Dre Harm
// Date: 11/8/26

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

    login({ email }) {
        throw new Error('login() is not implemented');
    }

    signup({ firstName, lastName, role, email }) {
        throw new Error('signup() is not implemented');
    }

    logout() {
        throw new Error('logout() is not implemented');
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
}