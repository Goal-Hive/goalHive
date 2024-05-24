import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="form"
export default class extends Controller {
    static values = {element: String}
    static targets = ['scrollableParent', 'textArea']

    connect() {
        // console.log('Form controller is connected')
    }

    scrollToTop() {
        this.scrollableParentTarget.scrollTo({
            top: 0,
            behavior: "smooth" // Optional: Smooth scrolling animation
        });
    }

    autoExpand() {
        this.textAreaTarget.style.height = 'auto';
        this.textAreaTarget.style.height = `${this.textAreaTarget.scrollHeight}px`;
    }

    autoSubmit(e) {
        e.preventDefault()
        e.target.form.requestSubmit();
        // e.target.closest('form').submit()
    }



    // cancel(e) {
    //   e.preventDefault()
    //   this.formTarget.remove()
    // }
}
