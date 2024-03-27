import {Controller} from "@hotwired/stimulus"
import {post} from '@rails/request.js'

// Connects to data-controller="update-motivation"
export default class extends Controller {

    static targets = ['updateBtn', 'text']

    connect() {
        // console.log('update motivation is connected')
    }

    enableUpdateBtm() {
        this.updateBtnTarget.disabled = false
    }

    updateMotivation(e) {
        const goal_id = e.currentTarget.dataset.goal_id
        console.log(this.textTarget.value)
        post(`/goals/${goal_id}/update_motivation`, {
            body: JSON.stringify(
                {
                    motivation: this.textTarget.value
                }
            ),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/vnd.turbo-stream.html',
            },
        })
        this.disableUpdateBtn()
    }

    disableUpdateBtn() {
        this.updateBtnTarget.disabled = true
    }
}
