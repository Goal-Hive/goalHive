import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="form"
export default class extends Controller {
  static values = { element: String }
  static targets = ['scrollableParent']
  connect() {
    // console.log('Form controller is connected')
  }

  scrollToTop(){
    console.log('hey', this.scrollableParentTarget)
    this.scrollableParentTarget.scrollTo({
      top: 0,
      behavior: "smooth" // Optional: Smooth scrolling animation
    });
  }
  // cancel(e) {
  //   e.preventDefault()
  //   this.formTarget.remove()
  // }
}
