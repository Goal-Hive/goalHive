import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="categories--navbar"
export default class extends Controller {
    static values = {
        currId: String,
    }

    connect() {
    }

    select(e) {
        const currCategory = e.currentTarget.firstElementChild

        if (this.hasCurrIdValue && currCategory.id != this.currIdValue) {
            const category = document.querySelector(`#${this.currIdValue}`)
            category.classList.remove('selected_category')
            category.querySelector(`[data-category-element="btn"]`)?.classList.add('hidden')
            category.querySelector(`[data-category-element="options"]`)?.classList.add('hidden')
        }


        this.currIdValue = currCategory.id

        currCategory.classList.add('selected_category')
        currCategory.classList.remove('navbar_category_hover')
        currCategory.querySelector(`[data-category-element="btn"]`)?.classList.remove('hidden')
    }
}
