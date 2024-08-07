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
        "goalMotivation",
        "milestoneInput",
        "goalReplica",
        "newGoalCategoryOption",
        'newGoalCategoryBtn',
        "newCategoryInput",
        "nextTooltip",
    ]

    static values = {
        categorySelected: {type: Boolean, default: false},
        categoryTyped: {type: Boolean, default: false},
        nextTooltip: {
            type: Object, default: {
                0: 'Your goal needs a clear objective.',
                1: 'Ensure your goal has measurable progress by adding the first milestone.',
                2: 'Categorize your goal to better track your objectives.',
            }
        },
        targetChain: {
            type: Object, default: {
                'goalInput': 'goalMotivation',
                'goalMotivation': 'next',
                'newGoalCategoryBtn': 'newCategoryInput',
                'newCategoryInput': 'next'
            }
        }
    }

    initialize() {
        this.index = 0
        this.showStepsNumber()
        this.updateNumber()
        this.showCurrentStep()
        this.controlNavigation()
        this.controlFocus()
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
        if (this.index === 0) {
            this.prevTarget.classList.toggle('hidden')
        }
        if (this.index === this.stepTargets.length - 2) {
            this.submitTarget.classList.toggle('hidden')
            this.nextTarget.classList.toggle('hidden')
        }
    }

    controlFocus() {
        const step = this.index
        switch (step) {
            case 0: {
                this.goalInputTarget.focus()
                break;
            }
            case 1: {
                this.milestoneInputTarget.focus()
            }
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
                if (e) this.categorySelectedValue = e.target.checked
                if (e) this.categoryTypedValue = e.target.value.length > 0
                this.nextTarget.disabled = !this.categoryExist();
                break;
            }
        }
    }

    categoryExist() {
        return (this.categoryTypedValue || this.categorySelectedValue)
    }

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
        this.controlFocus()
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

    reflectToolTip() {
        this.nextTooltipTarget.textContent = this.nextTooltipValue[this.index]
    }

    get goal() {
        return this.goalInputTarget.value
    }

    unselectCategoriesOptions(e) {
        this.categorySelectedValue = false
        this.newGoalCategoryOptionTargets.forEach(radio => {
            radio.checked = false;
        });
    }

    enableCategoriesOptions(e) {
        this.newGoalCategoryOptionTargets.forEach(radio => {
            radio.disabled = false
        });
    }

    resetNewCategoryInput() {
        this.categoryTypedValue = false
    }

    disableNext() {
        this.nextTarget.disabled = true
    }

    FocusOnNextTarget(e){
        e.preventDefault()
        const target = e.currentTarget.dataset.stepperTarget
        const nextTarget = this.targetChainValue[target]
        this[`${nextTarget}Target`].focus()
    }
}
