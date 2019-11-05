import { Component, OnInit, Injectable, Input, Output, EventEmitter } from '@angular/core';

import { ActivatedRoute, Router, Params } from '@angular/router';
import {ProcessManagementService} from "../../domain-model/services/process/process-management.service";
import {NgbDatepickerConfig, NgbDatepickerI18n} from "@ng-bootstrap/ng-bootstrap";
import { LocalizedDatePicker } from 'client-infrastructure/src/localization/localized-date-picker';

@Component({
  template:
  `
    <div></div>
  `,
  providers: [NgbDatepickerConfig, {provide: NgbDatepickerI18n, useClass: LocalizedDatePicker}] // add NgbDatepickerConfig to the component providers

})



export class CarInsuranceMainComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private policyGenerationService:ProcessManagementService) {

  }

  ngOnInit() {
    this.policyGenerationService.startProcess().subscribe(x => {
      this.router.navigate(['policyProposal', 0]);
    });
  }
}
