import {Component, Input} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-body">
      <h4 class="modal-title" translate>PROCESS_STOPPED_PROBLEM_TEXT</h4>
      <p translate="">PROCESS_STOPPED_PROBLEM_DESCRIPTION</p>
    </div>
  `
})
export class ProcessStoppedComponent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}
