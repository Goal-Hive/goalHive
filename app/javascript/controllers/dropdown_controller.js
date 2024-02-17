import {Controller} from "@hotwired/stimulus"
import {useClickOutside} from 'stimulus-use'

// Connects to data-controller="dropdown"
export default class extends Controller {
    static targets = ["dropdownContent", "selectedText"]
    static values = {contentToggled: Boolean}

    connect() {
        // console.log('dropdown is connected ')
        useClickOutside(this)
    }

    clickOutside(e) {
        if (!this.dropdownContentTarget.hidden) this.toggle()
    }

    toggle() {
        this.dropdownContentTarget.hidden = !this.dropdownContentTarget.hidden
    }

    replaceSelectedText(text) {
        this.selectedTextTarget.textContent = text;
    }

    select(e) {
        this.toggle()
        this.replaceSelectedText(e.target.dataset.optionText)
    }
}
