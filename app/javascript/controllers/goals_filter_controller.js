import {Controller} from "@hotwired/stimulus"
import {post} from '@rails/request.js'

// Connects to data-controller="goals-filter"
export default class extends Controller {
    static values = {
        currentCategory: String,
        currentStatus: String, default: 'active'
    }

    connect() {
        // console.log('goalsFilter is connected')
    }

    filterByStatus(e) {
        if (this.currentStatusValue !== e.currentTarget.dataset.optionValue){
            this.currentStatusValue = e.currentTarget.dataset.optionValue
            this.filterGoals()
        }
    }

    filterByCategory(e) {
        if (this.currentCategoryValue !== e.currentTarget.dataset.categoryId){
            this.currentCategoryValue = e.currentTarget.dataset.categoryId
            this.filterGoals()
        }
    }

    filterGoals() {
        post('/goals/filter', {
            body: JSON.stringify(
                {
                    by_category_and_status: {
                        'category': this.currentCategoryValue,
                        'status': this.currentStatusValue
                    }
                }
            ),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/vnd.turbo-stream.html',
            },
        })
    }
}
