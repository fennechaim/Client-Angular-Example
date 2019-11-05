import {Component} from "@angular/core";
import {Logger} from "angular2-logger/core";
import {Observable} from "rxjs";
import {ProcessManagementService} from "../../../../../domain-model/services/process/process-management.service";
import {CarInsuranceAbstractWizardStep} from "../car-insurance-abstract-wizard-step.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Person} from "client-infrastructure/src/domain-model/entities/people/person";
import {PolicyOwner} from "client-infrastructure/src/domain-model/entities/policies/policy-owner";

@Component({
  selector: 'policy-owner-wizard-step',
  templateUrl: './policy-owner-wizard-step.html',
  styleUrls: ['./policy-owner-wizard-step.scss']
})
export class InsuringUserComponent extends CarInsuranceAbstractWizardStep {

  policyOwner():Person{
    return this.process.policyOwner;
  }

  get firstName(): string {
    return this.process.policyOwner.fullName.firstName;
  }


  buildForm(): FormGroup {
    let form: FormGroup = this.formBuilder.group({});
    return form;
  }

  restoreStepCore(): Observable<boolean> {
    return Observable.from([true]);
  }

  isNextStepAvailable():boolean{
    return false;
  }

  isPreviousStepAvailable():boolean{
    return false;
  }

  saveStep(): Observable<boolean> {
    this.logger.debug("saving policy owner basic details...");
    let formValue = this.stepForm.value;
    let policyOwner:PolicyOwner = formValue.policyOwner;
    return this.processManagementService.createOrUpdatePolicyOwner(policyOwner).map(u => {
      return true;
    });
  }

  constructor(protected logger: Logger,
              protected formBuilder: FormBuilder,
              protected processManagementService: ProcessManagementService) {
    super(logger, formBuilder, processManagementService);
  }
}
