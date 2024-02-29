import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dialog"
export default class extends Controller {
  static targets = ['modal']
  connect() {
  }

  open(){
    this.modalTarget.showModal()
    document.body.classList.add('overflow-hidden')
  }

  clickOutside(e){
    if (e.target === this.modalTarget){
      this.modalTarget.close()
    }
  }

  submitEnd (e) {
    if (e.detail.success) {
      this.modalTarget.close()
    }
  }
}
