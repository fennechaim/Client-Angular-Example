import {Component} from "@angular/core";
import {Logger} from "angular2-logger/core";
import {Observable} from "rxjs";
import {ProcessManagementService} from "../../../../../domain-model/services/process/process-management.service";
import {CarInsuranceAbstractWizardStep} from "../car-insurance-abstract-wizard-step.component";
import {FormGroup, FormBuilder} from "@angular/forms";
import {NgbModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ProcessStoppedComponent} from "./process-stopped.component";

@Component({
  selector: 'policy-commence-date-wizard-step',
  templateUrl: './policy-commence-date-wizard-step.component.html',
  styleUrls: ['./policy-commence-date-wizard-step.component.scss']
})
export class PolicyCommenceDateWizardStepComponent extends  CarInsuranceAbstractWizardStep  {


  buildForm():FormGroup {
    let form: FormGroup = this.formBuilder.group({});
    return form;
  }

  restoreStepCore():Observable<boolean> {
    return Observable.from([true]);
  }

  saveStep():Observable<boolean> {
    let policy = this.stepForm.get('policy');
    let insuranceStartDate:NgbDateStruct = policy.get('insuranceStartDate').value;
    return this.processManagementService.savePolicyStartDate(insuranceStartDate).map(value => {
      let response = value.response;
      if(response.processStatus != null && response.processStatus.value == 'Red'){
        this.open()
        return false;
      }
      return true;
    });
  }

  open() {
    const modalRef = this.modalService.open(ProcessStoppedComponent);
    modalRef.componentInstance.name = 'World';
  }



  constructor(protected logger:Logger,
              protected formBuilder:FormBuilder,
              protected processManagementService:ProcessManagementService,
              private  modalService: NgbModal){
    super(logger, formBuilder, processManagementService)
  }
}
