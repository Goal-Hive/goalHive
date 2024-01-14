import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="form"
export default class extends Controller {
  static values = { element: String }
  connect() {
    // console.log('Form controller is connected')
  }

  // remove(e) {
  //   e.preventDefault()
  //   console.log("hey")
  //   console.log(this.elementValue)
  //   console.log(e.target.closest("[data-Form-type='category']"))
  //   console.log(e.target.closest(eval(this.elementValue)))
  //   e.target.closest("[data-Form-type='category']").querySelector('form').remove()
  // }
}
