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
        "newGoalCategoryInput",
        "nextTooltip"
    ]

    static values = {
        categorySelected: {type: Boolean, default: false},
        categoryTyped: {type: Boolean, default: false},
        nextTooltip: {
            type: Object, default: {
                0: 'Your goal needs a clear objective.',
                1: 'Ensure your goal has measurable progress by adding milestones.',
                2: 'Categorize your goal to better track your objectives.',
            }
        }
    }

    initialize() {
        this.index = 0
        this.showCurrentStep()
        this.controlNavigation()
        this.updateNumber()
        this.showStepsNumber()
    }

    connect() {
        // console.log("stepper controller is connected")
        this.reflectToolTip()
        this.enableNext()
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
        console.log(this.index, this.stepTargets.length )
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
                this.nextTarget.disabled = !this.categoryExist()
                this.categorySelectedValue = e?.target.checked
                this.categoryTypedValue = e?.target.value.length > 0
                this.nextTarget.disabled = !this.categoryExist();
                break;
            }
        }
    }

    categoryExist(){return (this.categoryTypedValue || this.categorySelectedValue)}

    next(e) {
        e.preventDefault()
        this.controlNavigation()
        if (this.index < this.stepTargets.length - 1) {
            this.index++
            this.updateNumber()
            this.showCurrentStep()
            this.enableNext()
            this.reflectToolTip()
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
            this.reflectToolTip()
        }
    }

    reflectGoal(e) {
        this.goalReplicaTarget.textContent = this.goal
    }

    reflectToolTip(){
        this.nextTooltipTarget.textContent = this.nextTooltipValue[this.index]
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
