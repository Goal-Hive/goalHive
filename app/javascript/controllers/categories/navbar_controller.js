import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="categories--navbar"
export default class extends Controller {
    static values = {
        currId: String,
    }

    static targets = ['default']

    connect() {
        this.initiateSelectedCategory()
    }

    initiateSelectedCategory = () => {
        if (!this.currIdValue) {
            this.styleSelected(this.defaultTarget)
            this.currIdValue = this.defaultTarget.id
        }
    }

    styleSelected = (currCategory) => {
        currCategory.classList.add('selected_category')
        currCategory.classList.remove('navbar_category_hover')
        currCategory.querySelector(`[data-category-element="btn"]`)?.classList.remove('hidden')
    }

    styleUnselected = (category) => {
        category?.classList.remove('selected_category')
        category?.querySelector(`[data-category-element="btn"]`)?.classList.add('hidden')
        category?.querySelector(`[data-category-element="options"]`)?.classList.add('hidden')
    }

    select(e) {
        let selectedCategory, previous
        selectedCategory = e.currentTarget
        // If selectedCategory different than the current => styleUnselected previous
        if (selectedCategory.id != this.currIdValue) {
            previous = document.querySelector(`#${this.currIdValue}`)
            // If the form exist and the user already selected another element
            if (previous?.querySelector('#submit_category')) {
                previous.querySelector('#selected').value = false;
            }
            this.styleUnselected(previous)
        }
        this.currIdValue = selectedCategory.id
        this.styleSelected(selectedCategory)
    }

    deleteCategorySubmitEnd(e){
        if (e.detail.success) {
           this.styleSelected(this.defaultTarget)
            this.currIdValue = this.defaultTarget.id
        }
    }
}
