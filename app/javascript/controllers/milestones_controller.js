import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="milestones"
export default class extends Controller {
    connect() {
        // console.log('milestones controller is connected')
    }

    changeStatus(event){
        const milestone_id = event.currentTarget.dataset.milestoneId
        document.querySelector(`#achievedMilestones #milestone_${milestone_id}`).classList.add('hidden')
        document.querySelector(`#inProgressMilestones #milestone_${milestone_id}`).classList.add('hidden')
    }

    markMilestone(event){
        const goal_id = this.data.get("goal_id")
        event.target.closest('button').querySelector('div').classList.toggle('bg-gray-200')
        event.target.closest('button').querySelector('div').classList.toggle('bg-yellow-400')
        const button = document.querySelector(`#goal_${goal_id} .updateBtn`)
        button.disabled = !button.disabled
    }
}