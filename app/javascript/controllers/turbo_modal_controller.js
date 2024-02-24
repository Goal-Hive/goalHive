import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="turbo-modal"
export default class extends Controller {
  connect() {
    // console.log("turbo_modal, connected!" )
  }
  submitEnd (e) {
    if (e.detail.success) {
      this.hideModal()
    }
  }

  hideModal () {
    this.element.remove()
  }
}
