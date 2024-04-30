import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="categories"
export default class extends Controller {
  static targets = [
    "newCategoryInput"
  ]

  connect() {
  }

  resetNewCategoryInput() {
    this.newCategoryInputTarget.value = ''
  }
}
