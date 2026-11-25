// Author: Dre Harm - made file + empty constructor + added polling
//         Benjamin - added everything else
// Date: 11/8/26

import HomeControllerInterface from './HomeControllerInterface.js'

export default class HomeController extends HomeControllerInterface {
    constructor(model, homeView) {
        super();
        this.model = model;
        this.homeView = homeView;
        this.form = document.getElementById('postForm');
        this.status = document.getElementById('postStatus');
        this.feedStatus = document.getElementById('feedStatus');
        this.owner = null;
        this.generation = 0;
        this.bindEvents();
        model.subscribe(() => this.render());
        this.render();
        this.pollTimer = null;
    }

    bindEvents() {
        this.form.addEventListener('input', () => this.updateComposer());
        this.form.addEventListener('change', () => this.updateComposer());
        this.form.addEventListener('submit', event => this.submit(event));
    }

    async checkForNewPosts() {
        const result = await this.model.findPosts();
        if (!result.ok) return; 

        const newestOnServer = result.data[0]?.post_id;
        const newestOnScreen = this.model.posts[0]?.post_id;

        if (newestOnServer !== newestOnScreen) {
            this.model.posts = result.data;
            this.homeView.render(this.model);
        }
    }

    startPolling() {
        this.pollTimer = setInterval(() => this.checkForNewPosts(), 1000);
    }

    stopPolling() {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
    }

    render() {
        const owner = this.model.currentUser?.id ?? null;
        if (owner !== this.owner) {
            this.owner = owner;
            this.generation++;
            this.model.posts = [];
            this.busy = false;
            this.form.reset();
            this.status.textContent = '';
            this.feedStatus.textContent = '';
            this.updateComposer();
            this.stopPolling();
            if (owner !== null) {
                this.loadFeed(this.generation);
                this.startPolling();
            }
        }
        this.homeView.render(this.model);
    }

    async loadFeed(generation) {
        const result = await this.model.findPosts();
        if (generation !== this.generation) return;
        if (!result.ok) {
            this.feedStatus.textContent = 'Could not load earlier posts.';
            return;
        }
        // Keep posts submitted while the initial feed request was in flight.
        const ids = new Set(this.model.posts.map(post => String(post.post_id)));
        this.model.posts.push(...result.data.filter(post => !ids.has(String(post.post_id))));
        this.homeView.render(this.model);
    }

    updateComposer() {
        const message = this.form.elements.message;
        const file = this.form.elements.attachment.files[0];
        const count = (message.value.match(/\S+/gu) || []).length;
        document.getElementById('wordCount').textContent = count + ' / 500 words';
        const invalidFile = file && (file.size === 0 || file.size > 2097152);
        this.form.elements.attachment.setCustomValidity(invalidFile ? 'Choose a nonempty file up to 2 MB.' : '');
        this.form.querySelector('button').disabled = this.busy || !this.owner || count > 500 || (!count && !file);
        message.disabled = this.form.elements.attachment.disabled = Boolean(this.busy);
    }

    async submit(event) {
        event.preventDefault();
        if (this.form.querySelector('button').disabled || !this.form.reportValidity()) return;
        const generation = this.generation;
        const data = new FormData(this.form);
        this.busy = true;
        this.updateComposer();
        this.status.textContent = 'Posting…';
        const result = await this.model.addPost(data);
        if (generation !== this.generation) return;
        this.busy = false;
        if (result.ok) {
            this.model.posts = [result.data, ...this.model.posts.filter(post =>
                String(post.post_id) !== String(result.data.post_id))];
            this.homeView.render(this.model);
            document.getElementById('postFeed').scrollTop = 0;
            this.form.reset();
        }
        this.status.textContent = result.ok ? 'Posted.' : result.error;
        this.updateComposer();
    }
}
