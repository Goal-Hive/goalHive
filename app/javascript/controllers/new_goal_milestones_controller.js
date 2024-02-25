import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="new-goal-milestones"
export default class extends Controller {
    static targets = ["milestonesContainer", "firstMilestone"]
    static values = {
        'newGoalMilestoneTemplate': String
    }

    connect() {
        this.newGoalMilestoneTemplateValue = this.firstMilestoneTarget.innerHTML
        this.firstMilestoneTarget.innerHTML = this.replaceNewMilestoneWithTime(this.firstMilestoneTarget.innerHTML)
        this.firstMilestoneTarget.querySelector('.removeMilestone').remove()
    }

    addMilestone(event) {
        event.preventDefault()
        const html = this.replaceNewMilestoneWithTime(this.newGoalMilestoneTemplateValue)
        this.milestonesContainerTarget.insertAdjacentHTML("beforeend", html)
    }

    replaceNewMilestoneWithTime(content = this.firstMilestoneTarget) {
        const index = new Date().getTime()
        return content.replace(/new_milestone/g, index)
    }

    removeMilestone(event) {
        event.preventDefault()
        event.target.parentNode.remove()
        // const milestone = event.target.closest("[data-target='newGoalMilestone']")
        // const destroyInput = milestone.querySelector("input[name*='_destroy']")
        // destroyInput.value = "true"
        // milestone.classList.add("d-none")
    }

}
