import {Component, OnInit} from "@angular/core";
import {Logger} from "angular2-logger/core";
import {Observable} from "rxjs";
import {FormGroup, FormBuilder} from "@angular/forms";
import {Policy} from "client-infrastructure/src/domain-model/entities/policies/policy";
import {CarInsuranceAbstractWizardStep} from "../car-insurance-abstract-wizard-step.component";
import {ProcessManagementService} from "../../../../../domain-model/services/process/process-management.service";

@Component({
  selector: 'policy-proposals-wizard-step',
  templateUrl: './policy-proposals-wizard-step-component.html',
  styleUrls: ['./policy-proposals-wizard-step-component.scss']
})
export class PolicyProposalsComponent extends CarInsuranceAbstractWizardStep implements OnInit {

  policies: Policy[];

  ngOnInit() {
    super.ngOnInit();
    this.policies = [this.process.comprehensivePolicy, this.process.thirdPartyPolicy, this.process.compulsoryPolicy];
  }


  buildForm(): FormGroup {
    let form: FormGroup = this.formBuilder.group({});
    return form;
  }

  get firstName(): string {
    return this.process.policyOwner.fullName.firstName;
  }

  restoreStepCore(): Observable<boolean> {
    return Observable.from([true]);
  }

  saveStep(): Observable<boolean> {
    return Observable.from([true]);
  }

  constructor(protected logger: Logger, protected formBuilder: FormBuilder, protected processManagementService: ProcessManagementService) {
    super(logger, formBuilder, processManagementService);
  }

  isNextStepAvailable(): boolean {
    return false;
  }

  isPreviousStepAvailable(): boolean {
    return false;
  }

  isStepValid(): Observable<boolean> {
    return Observable.from([true]);
  }

  acceptOffer(policy: Policy) {
    this.setIsProcessingRequest(true);
    this.processManagementService.acceptOffer(policy).subscribe(x => {
      this.setIsProcessingRequest(true);
      this.wizard.goToNextStep();
    });
  }
}
