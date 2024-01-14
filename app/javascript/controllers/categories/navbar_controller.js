import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="categories--navbar"
export default class extends Controller {
    static values = {
        currId: String,
    }

    connect() {
        this.initiateSelectedCategory()
    }

    select(e) {
        let selectedCategory, previous
        // If the user selected category status => Assign it to selected category status [active, paused, achieved]
        if (e.target.dataset.categoryType === 'status') {
            selectedCategory = e.currentTarget.querySelector('button')
        } else { // Else => Assign whatever category they clicked in to selectedCategory
            selectedCategory = e.currentTarget.parentNode
        }

        // If selectedCategory different than the current => styleUnselected previous
        if (selectedCategory.id != this.currIdValue) {
            previous = document.querySelector(`#${this.currIdValue}`)
            this.styleUnselected(previous)
        }

        this.currIdValue = selectedCategory.id
        this.styleSelected(selectedCategory)
    }

    initiateSelectedCategory = () => {
        if (!this.currIdValue) {
            const activeCategory = document.querySelector(`[data-category-type="status"]`)
            this.styleSelected(activeCategory)
            this.currIdValue = activeCategory.id
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
}
