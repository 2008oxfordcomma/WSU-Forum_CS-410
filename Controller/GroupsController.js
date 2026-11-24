// Author: Dre Harm
// Date: 11/24/26

import GroupsControllerInterface from './GroupsControllerInterface.js'
import ForumModel from '../Model/ForumModel.js'
import GroupsView from '../View/GroupsView.js'

class GroupsController extends GroupsControllerInterface {
    constructor(model, view) {

    }

    bindEvents() {
        
    }

    render() {
      
    }
}

document.addEventListener('DOMContentLoaded', () => new GroupsController(new ForumModel(), new GroupsView()));