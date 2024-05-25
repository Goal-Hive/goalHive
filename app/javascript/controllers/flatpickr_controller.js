import {Controller} from "@hotwired/stimulus"
import flatpickr from "flatpickr";

// Connects to data-controller="flatpickr"
export default class extends Controller {
    static targets = ["beginDate", "endDate"]
    static values = {picker: Object}

    connect() {
        this.flatPickrBeginDate = flatpickr(this.beginDateTarget, {
            altInput: true,
        });
        this.flatPickrEndDate = flatpickr(this.endDateTarget, {
            altInput: true,
        });
    }

    showDate(e) {
        this.decideFlatPickrType(e).open()
    }

    clearDate(e) {
        this.decideFlatPickrType(e).clear()
    }

    decideFlatPickrType(e) {
        const type = e.target.closest('[data-datetype]').dataset['datetype']
        switch (type) {
            case 'endDate':
                return this.flatPickrEndDate
            case 'beginDate':
                return this.flatPickrBeginDate
        }
    }
}
