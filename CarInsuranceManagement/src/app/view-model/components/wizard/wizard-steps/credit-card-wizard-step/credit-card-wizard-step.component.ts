import {Component, OnDestroy} from "@angular/core";
import { Logger } from "angular2-logger/core";
import { Observable } from "rxjs";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Response } from "@angular/http";
import { Router } from "@angular/router";
import {CarInsuranceAbstractWizardStep} from "../car-insurance-abstract-wizard-step.component";
import {ProcessManagementService} from "../../../../../domain-model/services/process/process-management.service";

@Component({
  selector: 'credit-card',
  templateUrl: './credit-card-wizard-step.component.html',
  styleUrls: ['./credit-card-wizard-step.component.scss']
})
export class CreditCardComponent extends CarInsuranceAbstractWizardStep implements OnDestroy {


  static self:CreditCardComponent;

  buildForm(): FormGroup {
    return this.formBuilder.group({
    });
  }

  restoreStepCore(): Observable<boolean> {
    this.initialize();
    return Observable.from([true]);
  }

  saveStep(): Observable<boolean> {
    this.logger.debug("saving step for  Car component...");
    return Observable.from([true]);
  }

  ngOnDestroy(): void{
    window.removeEventListener('message', this.handleMessage);
  }

  handleMessage ($event) {
    console.log('event', $event);
    let data = $event.data;

    console.log(`data ${data}`);
    if (data == 'success') {
      CreditCardComponent.self.setIsProcessingRequest(true);
      CreditCardComponent.self.processManagementService.sendPaymentStatus(CreditCardComponent.self.process)
        .subscribe(
          (data: Response) => {
            console.log("success2", data);
            CreditCardComponent.self.setIsProcessingRequest(false);
            CreditCardComponent.self.router.navigate(['/policyProposal/9']);
          },
          (err: Response) => {
            console.log("error2", err);
            CreditCardComponent.self.setIsProcessingRequest(false);
          }
        )
    }else{
      CreditCardComponent.self.setIsProcessingRequest(false);
    }
  }


 initialize() {
    this.setIsProcessingRequest(true);
    window.addEventListener('message', this.handleMessage);
  }

  isNextStepAvailable():boolean{
    return false;
  }

  isPreviousStepAvailable():boolean{
    return false;
  }

  constructor(private router: Router,protected logger: Logger, protected formBuilder: FormBuilder, protected processManagementService: ProcessManagementService) {
    super(logger, formBuilder, processManagementService);
    CreditCardComponent.self = this;
  }


}
