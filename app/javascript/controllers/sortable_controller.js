import {Controller} from "@hotwired/stimulus"
import Sortable from 'sortablejs';
import {put} from '@rails/request.js'


// Connects to data-controller="sortable"
export default class extends Controller {
    connect() {
        // console.log('sortable controller is connected')
        Sortable.create(this.element, {
            onEnd: this.onEnd.bind(this)
        });
    }


    onEnd(e) {
        var url = e.target.dataset.sortableUrl
        var position = e.target.dataset.sortablePosition
        put(url, {
            body: JSON.stringify({[position]: e.newIndex, id: e.item.dataset.sortableId})
        })
    }
}
