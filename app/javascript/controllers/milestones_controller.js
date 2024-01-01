import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="milestones"
export default class extends Controller {
    connect() {
        // console.log('milestones controller is connected')
    }

    static targets = ["milestonesContainer"]
    static template = `
    <div data-target="newGoalMilestone" class="flex items-center gap-x-3">
      <input type="text" 
            name="goal[milestones_attributes][new_milestone][description]"
            id="goal_milestones_attributes_new_milestone_description" 
            class="w-full border bg-wildSand">
      <input type="hidden" 
            name="goal[milestones_attributes][new_milestone][_destroy]"
            id="goal_milestones_attributes_new_milestone__destroy" 
            value="false">
      <a href="#" data-action="click->milestones#removeMilestone">
         <img src="/assets/x.svg">
      </a>
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
        event.target.parentNode.parentNode.remove()
        const milestone = event.target.closest("[data-target='newGoalMilestone']")
        const destroyInput = milestone.querySelector("input[name*='_destroy']")
        destroyInput.value = "true"
        milestone.classList.add("d-none")
    }

    changeStatus(event){
        const milestone_id = event.currentTarget.dataset.milestoneId
        document.querySelector(`#achievedMilestones #milestone_${milestone_id}`).classList.add('hidden')
        document.querySelector(`#inProgressMilestones #milestone_${milestone_id}`).classList.add('hidden')
    }

    markMilestone(event){
        const goal_id = this.data.get("goal_id")
        event.target.querySelector('div').classList.toggle('bg-gray-200')
        event.target.querySelector('div').classList.toggle('bg-yellow-400')
        const button = document.querySelector(`#goal_${goal_id} .updateBtn`)
        button.disabled = !button.disabled
    }
}