import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="goal-card--progress"
export default class extends Controller {
    static values = {
        originalImg: String,
        toggleImg: String
    };

    connect() {
        this.originalSrc = this.element.src; // Save the original image source
        this.toggled = false; // Keep track of the toggle state
    }

    toggleImage() {
        if (this.toggled) {
            this.element.src = this.originalImgValue; // Restore the original image source
        } else {
            this.element.src = this.toggleImgValue; // Change to the toggle image source
        }
        this.toggled = !this.toggled; // Update the toggle state
    }
}
