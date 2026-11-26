// Author: Dre Harm
// Date: 11/8/26

export default class ForumViewInterface {
    render(model) {
        throw new Error('render() is not implemented');
    }

    showError(element, message) {
        throw new Error('showError() is not implemented');
    }

    getLoginFormData() {
        throw new Error('getLoginFormData() is not implemented');
    }

    getSignupFormData() {
        throw new Error('getSignupFormData() is not implemented');
    }

    clearLoginForm() {
        throw new Error('clearLoginForm() is not implemented');
    }

    renderMajorOptions(majors) {
        throw new Error('renderMajorOptions() is not implemented');
    }

    clearSignupForm() {
        throw new Error('clearSignupForm() is not implemented');
    }
}
