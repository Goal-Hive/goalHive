import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="form"
export default class extends Controller {
  static values = { id: String }
  connect() {}

  remove(event) {
    this.element.closest(`#${this.idValue}`).remove()
  }
}
