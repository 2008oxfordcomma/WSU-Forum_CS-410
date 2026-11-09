// Author: Dre Harm
// Date: 11/8/26

export default class ForumViewInterface {
    render(model) {
        throw new Error('render() is not implemented');
    }

    clearLoginForm() {
        throw new Error('clearLoginForm() is not implemented');
    }

    clearSignupForm() {
        throw new Error('clearSignupForm() is not implemented'); 
    }
}