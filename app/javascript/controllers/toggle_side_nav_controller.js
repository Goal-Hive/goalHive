import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="toggle-side-nav"
export default class extends Controller {
    static targets = ['unfoldBtn', 'foldBtn', 'sideNav']

    connect() {
        console.log('toggle side nav is connected')
        console.log(this.unfoldBtnTarget, this.foldBtnTarget, this.sideNavTarget)
    }

    fold(e) {
        this.toggleClasses()
    }

    unfold(e) {
        this.toggleClasses()
    }

    toggleClasses() {
        const isMobile = window.innerWidth <= 1022;
        if (isMobile) {
            this.unfoldBtnTarget.classList.toggle('hidden')
            this.foldBtnTarget.classList.toggle('hidden')

            this.sideNavTarget.classList.toggle('hidden')
            this.sideNavTarget.classList.toggle('absolute')
            this.sideNavTarget.classList.toggle('left-0')
            this.sideNavTarget.classList.toggle('w-80')
            document.querySelector('#goals_section').classList.toggle('brightness-50');
        } else {
            this.unfoldBtnTarget.classList.toggle('lg:hidden')
            this.foldBtnTarget.classList.toggle('lg:hidden')
            this.sideNavTarget.classList.toggle('lg:hidden')
        }
    }
}
