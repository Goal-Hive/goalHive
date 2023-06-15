import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="milestones"
export default class extends Controller {
    connect() {
        console.log('milestones controller is connected')
    }

    static targets = ["milestonesContainer"]
    static template = `
    <div data-target="milestones.milestone">
      <label for="goal_milestones_attributes_new_milestone_description">Description</label>
      <input type="text" name="goal[milestones_attributes][new_milestone][description]" id="goal_milestones_attributes_new_milestone_description">
      <input type="hidden" name="goal[milestones_attributes][new_milestone][_destroy]" id="goal_milestones_attributes_new_milestone__destroy" value="false">
      <a href="#" data-action="click->milestones#removeMilestone">Remove</a>
    </div>
  `

    addMilestone(event) {
        event.preventDefault()
        const content = this.constructor.template
        const index = new Date().getTime()
        const html = content.replace(/new_milestone/g, index)
        this.milestonesContainerTarget.insertAdjacentHTML("beforeend", html)
    }

    removeMilestone(event) {
        event.preventDefault()
        event.target.parentNode.remove()
        const milestone = event.target.closest("[data-target='milestones.milestone']")
        const destroyInput = milestone.querySelector("input[name*='_destroy']")
        destroyInput.value = "true"
        milestone.classList.add("d-none")
    }

    changeStatus(event){
        const milestone_id = event.currentTarget.dataset.milestoneId
        document.querySelector(`#achievedMilestones #milestone_${milestone_id}`).classList.add('hidden')
        document.querySelector(`#inProgressMilestones #milestone_${milestone_id}`).classList.add('hidden')
    }
}