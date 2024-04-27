import {Controller} from "@hotwired/stimulus"
import Sortable from 'sortablejs';
import {put} from '@rails/request.js'

// Connects to data-controller="sortable"
export default class extends Controller {
    connect() {
        // console.log('sortable controller is connected')
        Sortable.create(this.element, {
            onEnd: this.onEnd.bind(this),
            handle: ".my-handle"
        });
    }


    onEnd(e) {
        e.preventDefault()
        const url = e.target.dataset.sortableUrl
        const position = e.target.dataset.sortablePosition
        put(url, {
            body: JSON.stringify(
                {
                    [position]: e.newIndex,
                    id: e.item.dataset.sortableId
                })
        })
    }
}
