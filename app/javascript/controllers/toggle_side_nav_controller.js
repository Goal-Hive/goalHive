import {Controller} from "@hotwired/stimulus"
import { useClickOutside } from 'stimulus-use'

// Connects to data-controller="toggle-side-nav"
export default class extends Controller {
    static targets = ['unfoldBtn', 'foldBtn', 'sideNav', 'hidden']
    static values = {
        mobileFolded: {type: Boolean, default: true},
        // desktopFolded: {type: Boolean, default: false}
    }

    connect() {
        // console.log('toggle side nav is connected')
        useClickOutside(this, { element: this.sideNavTarget })
    }

    toggle(e) {
        this.toggleClasses()
    }

    handleBigScreen() {
        // If it is small screen and the side nav is toggled if it contains hidden that target small screens
        if (!isSmallScreen() && !this.sideNavTarget.classList.contains('hidden')) {
            this.toggleMobileClasses()
        }
    }

    closeWithKeyboard(e) {
        if (e.key === "Escape" &&
            isSmallScreen() &&
            !this.mobileFoldedValue) {
            this.toggleMobileClasses()
        }
    }

    clickOutside(event) {
        const button = event.target.closest('button')
        if (button !== this.foldBtnTarget &&
            isSmallScreen() &&
            !this.mobileFoldedValue
            ) {
            this.toggleMobileClasses()
        }
    }

    toggleClasses() {
        if (isSmallScreen()) {
            this.toggleMobileClasses()
            this.mobileFoldedValue = this.sideNavTarget.classList.contains('hidden')
        } else {
            this.toggleLargeScreenClasses()
        }
    }

    toggleMobileClasses() {
        this.hiddenTarget.classList.toggle('brightness-50');
        this.hiddenTarget.classList.toggle('h-fit');
        this.hiddenTarget.classList.toggle('overflow-hidden');

        this.unfoldBtnTarget.classList.toggle('hidden')
        this.foldBtnTarget.classList.toggle('hidden')

        this.sideNavTarget.classList.toggle('hidden')
        this.sideNavTarget.classList.toggle('absolute')
        this.sideNavTarget.classList.toggle('left-0')
        this.sideNavTarget.classList.toggle('w-80')
    }

    toggleLargeScreenClasses() {
        this.unfoldBtnTarget.classList.toggle('lg:hidden')
        this.foldBtnTarget.classList.toggle('lg:hidden')
        this.sideNavTarget.classList.toggle('lg:hidden')
    }
}

const isSmallScreen = () => {
    return window.innerWidth <= 1022;
}