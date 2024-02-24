import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="stepper"
export default class extends Controller {

    static targets = [
        "stepNumber",
        "numberOfSteps",
        "step",
        "next",
        "prev",
        "submit",
        "goalInput",
        "goalReplica",
        "newGoalCategoryOption",
        "newGoalCategoryInput"]

    connect() {
        // console.log("stepper controller is connected")
    }

    initialize() {
        this.index = 0
        this.showCurrentStep()
        this.controlNavigation()
        this.updateNumber()
        this.showStepsNumber()
    }

    showStepsNumber() {
        this.numberOfStepsTarget.innerHTML = this.stepTargets.length
    }

    updateNumber() {
        this.stepNumberTarget.innerHTML = this.index + 1
    }

    showCurrentStep() {
        this.stepTargets.forEach((step, index) => {
            if (index !== this.index) {
                step.classList.add('hidden')
            } else {
                step.classList.remove('hidden')
            }
        })
    }

    controlNavigation() {
        if (this.index === 0) {
            this.nextTarget.classList.toggle('hidden')
        }
        if (this.index === this.stepTargets.length - 2) {
            this.submitTarget.classList.toggle('hidden')
            this.prevTarget.classList.toggle('hidden')
        }
    }

    next(e) {
        e.preventDefault()
        this.controlNavigation()
        if (this.index < this.stepTargets.length - 1) {
            this.index++
            this.updateNumber()
            this.showCurrentStep()
        }
    }

    previous(e) {
        e.preventDefault()
        if (this.index > 0) {
            this.index--
            this.updateNumber()
            this.showCurrentStep()
            this.controlNavigation()
        }
    }

    reflectGoal(e) {
        this.goalReplicaTarget.textContent = this.goal
    }

    get goal() {
        return this.goalInputTarget.value
    }

    unselectCategoriesOptions(e) {
        this.newGoalCategoryOptionTargets.forEach(radio => {
            radio.checked = false;
            radio.disabled = true
        });
    }

    enableCategoriesOptions(e) {
        this.newGoalCategoryOptionTargets.forEach(radio => {
            radio.disabled = false
        });
    }

    resetNewGoalCategoryInput() {
        this.newGoalCategoryInputTarget.value=''
    }
}
