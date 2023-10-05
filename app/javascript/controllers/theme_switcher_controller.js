import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="theme-switcher"
export default class extends Controller {
    connect() {
        // console.log('theme switcher')
        this.load()
    }

    load() {
        if (localStorage.getItem('dark-mode') === 'true') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    toggle() {
        if (localStorage.getItem('dark-mode') === 'true') {
            localStorage.setItem('dark-mode', 'false')
        } else {
            localStorage.setItem('dark-mode', 'true')
        }

        this.load()
    }
}
