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
        "milestoneInput",
        "goalReplica",
        "newGoalCategoryOption",
        "newGoalCategoryInput"]

    static values = {
        categorySelected: {type: Boolean, default: false},
        categoryTyped: {type: Boolean, default: false},
    }

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
            this.prevTarget.classList.toggle('hidden')
        }
        if (this.index === this.stepTargets.length - 2) {
            this.submitTarget.classList.toggle('hidden')
            this.nextTarget.classList.toggle('hidden')
        }
    }

    enableNext(e) {
        const step = this.index
        console.log(step)
        switch (step) {
            case 0: {
                this.nextTarget.disabled = this.goalInputTarget.value.length <= 0;
                break;
            }
            case 1: {
                this.nextTarget.disabled = this.milestoneInputTarget.value.length <= 0;
                break;
            }
            case 2: {
                let categoryExist = !(this.categoryTypedValue || this.categorySelectedValue);
                this.nextTarget.disabled = categoryExist
                this.categorySelectedValue = e?.target.checked
                this.categoryTypedValue = e?.target.value.length > 0
                this.nextTarget.disabled = categoryExist.
                break;
            }
        }


    }

    next(e) {
        e.preventDefault()
        this.controlNavigation()
        if (this.index < this.stepTargets.length - 1) {
            this.index++
            this.updateNumber()
            this.showCurrentStep()
            this.enableNext()
        }
    }

    previous(e) {
        e.preventDefault()
        if (this.index > 0) {
            this.index--
            this.updateNumber()
            this.showCurrentStep()
            this.controlNavigation()
            this.enableNext()
        }
    }

    reflectGoal(e) {
        this.goalReplicaTarget.textContent = this.goal
    }

    get goal() {
        return this.goalInputTarget.value
    }

    unselectCategoriesOptions(e) {
        this.categorySelectedValue = false
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
        this.categoryTypedValue = false
        this.newGoalCategoryInputTarget.value = ''
    }

    disableNext() {
        this.nextTarget.disabled = true
    }
}
