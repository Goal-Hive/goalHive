import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="toggle"
export default class extends Controller {
    static targets = ["toggledContent", "toggleBtn"]
    static values = { id: String }

    connect() {
        // console.log('toggle connected')
    }

    toggleContent(e) {
        e.preventDefault()
        this.toggledContentTargets.forEach(part => {
            part.classList.toggle('hidden')
        })
        this.toggleBtnTarget.classList.toggle('hidden')
    }

    toggleById(e) {
        console.log(this.idValue)
        console.log(this.element.closest(`#${this.idValue}`))
        document.querySelector(`#${this.idValue}`).classList.toggle('hidden')
    }
}
