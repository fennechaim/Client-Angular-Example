import { Component } from "@angular/core";
import { Logger } from "angular2-logger/core";
import { Observable } from "rxjs";
import { ProcessManagementService } from "../../../../../domain-model/services/process/process-management.service";
import { CarInsuranceAbstractWizardStep } from "../car-insurance-abstract-wizard-step.component";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {LaliValidators} from "client-infrastructure/src/domain-model/entities/validations/lali-validators";
import {CarSupplementaryDetails} from "../../../../../domain-model/entities/process/car-supplementary-details";


@Component({
  selector: 'supplementary-details-wizard-step',
  templateUrl: './supplementary-details-wizard-step.component.html',
  styleUrls: ['./supplementary-details-wizard-step.component.scss']
})
export class SupplementaryDetailsWizardStepComponent extends CarInsuranceAbstractWizardStep {

  fileBytes: string = '';
  showModal: string = '';
  errorDisplayingDocument : boolean = false;

  constructor(protected logger: Logger,
              protected formBuilder: FormBuilder,
              protected laliValidators:LaliValidators,
              protected policyGenerationService: ProcessManagementService) {
    super(logger, formBuilder, policyGenerationService)
  }

  get isComprehensiveAccepted():boolean {
    return  this.process.comprehensivePolicy.isAccepted;
  }

  get firstName():string{
    return this.process.policyOwner.fullName.firstName;
  }

  buildForm(): FormGroup {
    let form: FormGroup = this.formBuilder.group({
      technologyAgreement: ['', [Validators.required, this.laliValidators.equals(true)]],
      essentialDocumentAgreement: ['', [Validators.required, this.laliValidators.equals(true)]]
    });
    return form;
  }
  restoreStepCore(): Observable<boolean> {
    this.stepForm.patchValue(
      {
        technologyAgreement:this.process.isTechnologyDisclaimerAccepted ? true : null,
        essentialDocumentAgreement:this.process.isEssentialDocumentDisclaimerAccepted ? true : null
      });
    return Observable.from([true]);
  }

  creditPayment() {

    this.isStepValid().subscribe(isValid => {
      if(!isValid)
        return;

      this.wizard.setIsProcessingRequest(true);
      return this.saveSupplementaryDetails(true).subscribe(result => {
        this.wizard.goToNextStep();
      });

    });


  }


  cashPayment(){
    this.isStepValid().subscribe(isValid => {

      if(!isValid)
        return;
      this.wizard.setIsProcessingRequest(true);
      return this.saveSupplementaryDetails(false).subscribe(result => {
        this.wizard.goToNextStep(1);
      });

    });


  }

  showPolicySubstantialDocument(){
    this.errorDisplayingDocument = false;
    this.showModal += "-";
    this.processManagementService.getSubstantialDocumentPdf(this.process).subscribe(res=>{
      if(res.response.documentResult.isOK){
        this.fileBytes = res.response.documentResult.bytes;
      }
      else{
        this.closeModalAndShowError();
      }
    },
    (err)=>{
      this.closeModalAndShowError();
    },
    ()=>{

    })
  }

  closeModalAndShowError(){
    this.showModal = "";
    this.errorDisplayingDocument = true;
  }

  toggleTechnologyAgreement(){
    this.process.isTechnologyDisclaimerAccepted = !this.process.isTechnologyDisclaimerAccepted;
    this.stepForm.patchValue({technologyAgreement:this.process.isTechnologyDisclaimerAccepted ? true : null});
  }

  toggleEssentialDocumentAgreement(){
    this.process.isEssentialDocumentDisclaimerAccepted = !this.process.isEssentialDocumentDisclaimerAccepted;
    this.stepForm.patchValue({essentialDocumentAgreement:this.process.isEssentialDocumentDisclaimerAccepted ? true : null});
  }


  saveStep(): Observable<boolean> {
    this.logger.debug("saving step for  Car component...");
    return Observable.from([true]);

  }

  isNextStepAvailable():boolean{
    return false;
  }

  isPreviousStepAvailable():boolean{
    return false;
  }

  saveSupplementaryDetails(isCredit:boolean){
    let confirmationDetails:any = this.stepForm.value;
    let supplementaryDetails:CarSupplementaryDetails = new CarSupplementaryDetails(confirmationDetails);
    return this.processManagementService.saveSupplementaryDetails(supplementaryDetails,isCredit);
  }
}
