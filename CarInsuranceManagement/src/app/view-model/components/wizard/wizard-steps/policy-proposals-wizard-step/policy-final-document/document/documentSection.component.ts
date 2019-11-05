import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChange} from '@angular/core';
import {Policy} from "client-infrastructure/src/domain-model/entities/policies/policy";
import {PolicyValidationStatuses} from "client-infrastructure/src/domain-model/entities/policies/policy-validation-statuses";
import {CarPolicy} from "../../../../../../../domain-model/entities/policy/car-policy";
import {CarInsuranceProcess} from "../../../../../../../domain-model/entities/process/car-insurance-process";

@Component({
  selector: "document-section",
  templateUrl: "./documentSection.component.html",
  styleUrls: ["./documentSection.component.scss"]
})

export class DocumentSectionComponent implements OnInit {

  @Input() subCovers: Array<CarPolicy> = [];

  @Input() process:CarInsuranceProcess;

  @Input() title:string;

  @Input() toggleEnabled:boolean;

  @Output() subCoverToggled:EventEmitter<CarPolicy> = new EventEmitter<CarPolicy>();

  isVisible:boolean=false;

  toggleVisibility():void{
    this.isVisible = !this.isVisible;
  }

  ngOnInit(): void {
  }

  toggleSubCover(subCover:CarPolicy){
    if(this.subCoverToggled != null)
      this.subCoverToggled.next(subCover);
  }

  isIncludedInPolicy(subCover: Policy): boolean {
    return subCover.validationStatus != null && subCover.validationStatus.id == PolicyValidationStatuses.inPolicy.id;
  }

  isExcludedFromPolicy(subCover: Policy): boolean {
    return subCover.validationStatus != null && subCover.validationStatus.id == PolicyValidationStatuses.outPolicy.id;

  }
}
