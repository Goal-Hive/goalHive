import {Controller} from "@hotwired/stimulus"
import {patch, put} from '@rails/request.js'

// Connects to data-controller="edit-content"
export default class extends Controller {

    static targets = ['content', 'editBtn', 'updateBtn']

    connect() {
    }

    editMode(e) {
        e.preventDefault()
        this.addEditClasses()
        this.toggleEditBtn()
        this.toggleUpdateBtn()
        this.toggleEditable(this.contentTarget)
        this.moveCursorToEnd(this.contentTarget)
    }

    saveMode(e) {
        this.toggleEditable(this.contentTarget)
        this.removeEditClasses()
        this.toggleEditBtn()
        this.toggleUpdateBtn()
        this.removeEditClasses()
        this.update(e)
    }

    toggleEditable(element) {
        if (element.contentEditable === 'true') {
            element.contentEditable = 'false'; // Disable content editing
        } else {
            element.contentEditable = 'true'; // Enable content editing
        }
    }

    addEditClasses() {
        this.contentTarget.classList.add('bg-white', 'focus:outline-none', 'border', 'border-blue-100')
    }

    removeEditClasses() {
        this.contentTarget.classList.remove('bg-white', 'border', 'border-blue-100')
    }

    toggleEditBtn() {
        this.editBtnTarget.classList.toggle('hidden');
    }

    toggleUpdateBtn() {
        this.updateBtnTarget.classList.toggle('hidden');
    }

    moveCursorToEnd(element) {
        element.focus()
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(element, element.childNodes.length);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    };

    update(e) {
        e.preventDefault()
        const id = e.currentTarget.dataset.goalId
        const url = e.currentTarget.dataset.updateUrl + '/' + id
        const body = JSON.stringify({
            goal: {
                description: this.contentTarget.innerText
            }
        })
        put(url, {
            body,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/vnd.turbo-stream.html',
            },
        })
    }
}
