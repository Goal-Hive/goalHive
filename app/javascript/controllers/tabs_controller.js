import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="tabs"
export default class extends Controller {
    static classes = ['active']
    static targets = ["btn", "tab", "defaultTab", "defaultBtn"]

    connect() {
        this.hideAllTabs()
        this.showDefaultTab()
        this.deactivateAllBtns()
        this.activateDefaultBtn()
    }

    select(event) {
        let selectedTab = this.tabTargets.find(element => element.id === event.currentTarget.dataset.tabId)
        if (selectedTab.classList.contains('hidden')) {
            this.hideAllTabs()
            this.deactivateAllBtns()
            selectedTab.classList.remove('hidden')
            event.currentTarget.classList.add(...this.activeClasses)
        }
    }

    hideAllTabs() { this.tabTargets.map(x => x.classList.add('hidden')) }

    showDefaultTab() { this.defaultTabTarget.classList.remove('hidden') }

    deactivateAllBtns() { this.btnTargets.map(x => x.classList.remove(...this.activeClasses)) }

    activateDefaultBtn() { this.defaultBtnTarget.classList.add(...this.activeClasses) }
}
