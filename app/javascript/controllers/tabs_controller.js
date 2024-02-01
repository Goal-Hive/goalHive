import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="tabs"
export default class extends Controller {
  static classes = ['active']
  static targets = ["btn", "tab", "defaultTab", "defaultBtn"]

  connect() {
    // first, hide all tabs
    this.tabTargets.map(x => x.hidden = true)

    // then, show the default tab
    this.defaultTabTarget.classList.remove('hidden')

    // and activate the default selected button
    this.defaultBtnTarget.classList.add(...this.activeClasses)
  }

  // switch between tabs
  // add to your buttons: data-action="click->tabs#select"
  select(event) {
    // find tab matching (with same id as) the clicked btn
    let selectedTab = this.tabTargets.find(element => element.id === event.currentTarget.id)

    if (selectedTab.hidden) {
      // hide everything
      this.tabTargets.map(x => x.classList.add('hidden')) // hide all tabs
      this.btnTargets.map(x => x.classList.remove(...this.activeClasses)) // deactive all btns

      // then show selected
      selectedTab.classList.remove('hidden') // show current tab
      event.currentTarget.classList.add(...this.activeClasses) // activate current button
    }
  }
}
