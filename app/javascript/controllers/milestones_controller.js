import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="milestones"
export default class extends Controller {
    connect() {
        console.log('milestones controller is connected')
    }

    addMilestone(event) {
        // event.preventDefault()
        // Turbo.visit(this.element.action, {turbo: true, target: this.element})
    }

    removeMilestone(event) {
        // event.preventDefault()
        // const milestone = event.target.closest("[data-target='milestones.milestone']")
        // const destroyInput = milestone.querySelector("input[name*='_destroy']")
        // destroyInput.value = 1
        // milestone.classList.add("d-none")
        // Turbo.visit(this.element.action, {turbo: true, target: this.element})
    }
}
