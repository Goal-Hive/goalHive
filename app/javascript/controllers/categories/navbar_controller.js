import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="categories--navbar"
export default class extends Controller {
    static values = {
        currId: String,
    }

    connect() {
        if (!this.currIdValue) {
            const activeCategory = document.querySelector(`[data-category-type="status"]`)
            this.styleSelected(activeCategory)
            this.currIdValue = activeCategory.id
        }
    }

    select(e) {
        let selectedCategory
        if (e.target.dataset.categoryType === 'status') {
            selectedCategory = e.currentTarget.querySelector('button')
        } else {
            selectedCategory = e.currentTarget.firstElementChild
        }

        if (this.hasCurrIdValue && selectedCategory.id != this.currIdValue) {
            const previous = document.querySelector(`#${this.currIdValue}`)
            this.styleUnselected(previous)
        }
        this.currIdValue = selectedCategory.id
        this.styleSelected(selectedCategory)
    }

    styleSelected = (currCategory) => {
        currCategory.classList.add('selected_category')
        currCategory.classList.remove('navbar_category_hover')
        currCategory.querySelector(`[data-category-element="btn"]`)?.classList.remove('hidden')
    }

    styleUnselected = (category) => {
        category.classList.remove('selected_category')
        category.querySelector(`[data-category-element="btn"]`)?.classList.add('hidden')
        category.querySelector(`[data-category-element="options"]`)?.classList.add('hidden')
    }
}
