import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="new-goal-milestones"
export default class extends Controller {
    static targets = ["milestonesContainer", "newGoalMilestone"]
    static values = {
        'newGoalMilestoneTemplate': String
    }

    connect() {
        this.newGoalMilestoneTemplateValue = this.newGoalMilestoneTarget.innerHTML
        this.newGoalMilestoneTarget.innerHTML = this.replaceNewMilestoneWithTime(this.newGoalMilestoneTarget.innerHTML)
    }

    addMilestone(event) {
        event.preventDefault()
        const html = this.replaceNewMilestoneWithTime(this.newGoalMilestoneTemplateValue)
        this.milestonesContainerTarget.insertAdjacentHTML("beforeend", html)
    }

    replaceNewMilestoneWithTime(content = this.newGoalMilestoneTemplateValue) {
        const index = new Date().getTime()
        return content.replace(/new_milestone/g, index)
    }

    removeMilestone(event) {
        event.preventDefault()
        event.target.parentNode.parentNode.remove()
        const milestone = event.target.closest("[data-target='newGoalMilestone']")
        const destroyInput = milestone.querySelector("input[name*='_destroy']")
        destroyInput.value = "true"
        milestone.classList.add("d-none")
    }

}
