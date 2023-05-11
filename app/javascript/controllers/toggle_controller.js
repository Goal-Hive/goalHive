import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="toggle"
export default class extends Controller {
  static targets = ["toggledContent"]
  connect() {
    console.log('toggle connected')
  }

  toggleContent() {
    this.toggledContentTarget.classList.toggle('hidden')
  }
}
