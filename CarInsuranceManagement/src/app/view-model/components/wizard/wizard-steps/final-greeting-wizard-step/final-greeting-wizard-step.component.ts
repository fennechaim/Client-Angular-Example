import {OnInit, Component, Inject} from "@angular/core";
import {WizardStepComponent} from "client-infrastructure/src/forms/wizard/wizardStep/wizard-step.component";
import {Logger} from "angular2-logger/core";
import {Observable} from "rxjs";
import { ProcessManagementService } from "../../../../../domain-model/services/process/process-management.service";
import {FormGroup, FormBuilder} from "@angular/forms";
import { ActivatedRoute, Router, Params } from "@angular/router";
import {CarInsuranceAbstractWizardStep} from "../car-insurance-abstract-wizard-step.component";

@Component({
  selector: 'final-greeting-wizard-step',
  templateUrl: './final-greeting-wizard-step.component.html',
  styleUrls: ['./final-greeting-wizard-step.component.scss']
})
export class FinalGreetingWizardStepComponent extends  CarInsuranceAbstractWizardStep  {

  public isNotificationChecked: boolean = true;

  buildForm():FormGroup{
    let form:FormGroup = this.formBuilder.group({
    });

    return form;
  }
  stepForm:FormGroup;
  restoreStepCore():Observable<boolean> {
    this.stepForm = this.formBuilder.group({
      userEmail: ['', []]
    })
    return Observable.from([true]);
  }

  saveStep():Observable<boolean> {
    this.logger.debug("saving step for  Car component...");
    return Observable.from([true]);
  }

  get firstName():string{
    return this.process.policyOwner.fullName.firstName;
  }

  goToInsuranceAccount(){
    window.location.href = this.insuranceAccountUrl;
  }

  isNextStepAvailable():boolean{
    return false;
  }

  isPreviousStepAvailable():boolean{
    return false;
  }

  constructor(

              @Inject('insuranceAccountUrl') private insuranceAccountUrl,
              protected logger:Logger,
              protected formBuilder:FormBuilder,
              protected processManagementService: ProcessManagementService){
    super(logger, formBuilder,processManagementService)
  }


}
