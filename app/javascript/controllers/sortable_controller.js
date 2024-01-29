import {Controller} from "@hotwired/stimulus"
import Sortable from 'sortablejs';
import { put } from '@rails/request.js'


// Connects to data-controller="sortable"
export default class extends Controller {
    connect() {
        // console.log('sortable controller is connected')
        Sortable.create(this.element, {
            onEnd: this.onEnd.bind(this)
        });
    }


    onEnd(e) {
        console.log(e.item.dataset.sortableId)
        put(`/milestones/${e.item.dataset.sortableId}/sort_milestones`,{
            body: JSON.stringify({row_order_position: e.newIndex})
        })
    }
}
