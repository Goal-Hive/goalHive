import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dialog"
export default class extends Controller {
  static targets = ['modal', 'content', 'frame']
  connect() {
  }

  open(e){
    this.hideOldContent(e)
    this.modalTarget.showModal()
    document.body.classList.add('overflow-hidden')
  }

  close(){
    this.modalTarget.close()
    this.clean()
  }

  hideOldContent(e){
    this.contentTargets.map(e=> e.classList.add('hidden'))
    const id = e.currentTarget.dataset.dialogContentId
    document.querySelector(`#${id}`)?.classList?.toggle('hidden')
  }

  clean(){
    this.frameTarget.innerHTML=''
  }

  clickOutside(e){
    if (e.target === this.modalTarget){
      this.close()
    }
  }

  submitEnd (e) {
    if (e.detail.success) {
      this.close()
    }
  }
}
