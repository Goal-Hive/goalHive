import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="categories--navbar"
export default class extends Controller {
    static targets = ["category", "options"]

    connect() {
    }

    select(e) {
        const selectedCategory = e.currentTarget
        this.categoryTargets.forEach(category => {
            category.classList.remove('selected_category')
            category.querySelector(`[data-js="options"]`)?.classList.add('hidden')
        })
        selectedCategory.classList.add('selected_category')
        selectedCategory.querySelector(`[data-js="options"]`)?.classList.remove('hidden')
        selectedCategory.classList.remove('navbar_category_hover')
    }
}
