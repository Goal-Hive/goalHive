import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="new-goal-milestones"
export default class extends Controller {
    static targets = ["milestonesContainer", "firstMilestone", "milestoneNumber", "milestoneInput"]
    static values = {
        'newGoalMilestoneTemplate': String
    }

    connect() {
        this.newGoalMilestoneTemplateValue = this.firstMilestoneTarget.innerHTML
        this.firstMilestoneTarget.innerHTML = this.replaceNewMilestoneWithTime(this.firstMilestoneTarget.innerHTML)
        this.firstMilestoneTarget.querySelector('.removeMilestone').remove()
    }

    addMilestone(e) {
        e.preventDefault()
        const html = this.replaceNewMilestoneWithTime(this.newGoalMilestoneTemplateValue)
        const fragment = document.createRange().createContextualFragment(html);
        // this.milestonesContainerTarget.insertAdjacentHTML("beforeend", html)
        this.milestonesContainerTarget.append(fragment)
        this.milestoneInputTargets[this.milestoneInputTargets.length-1].focus()
        this.updateMilestoneNumber()
    }

    addWithKeyboard(e){
        if (e.key === "Enter") {
           this.addMilestone(e)
        }
    }

    updateMilestoneNumber() {
        this.milestoneNumberTargets[this.milestoneNumberTargets.length - 1].textContent = this.milestoneNumberTargets.length
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
        this.resetMilestoneNumbers()
    }

    resetMilestoneNumbers() {
        this.milestoneNumberTargets.forEach((n, i) => {
            n.textContent = i + 1
        })
    }

    filterEmptyMilestones() {
        console.log(this.milestoneInputTargets[1].value.length)
        this.milestoneInputTargets.forEach(i => {
            if (i.value.length == 0) i.parentNode.remove()
        })
        console.log(this.milestoneInputTargets)
    }
}