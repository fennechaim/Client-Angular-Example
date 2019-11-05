import {WizardStepComponent} from "client-infrastructure/src/forms/wizard/wizardStep/wizard-step.component";
import {Logger} from "angular2-logger/core";
import {ProcessManagementService} from "../../../../domain-model/services/process/process-management.service";
import {FormBuilder} from "@angular/forms";
import {CarInsuranceProcess} from "../../../../domain-model/entities/process/car-insurance-process";


export abstract class CarInsuranceAbstractWizardStep extends  WizardStepComponent<CarInsuranceProcess>  {


  constructor(protected logger:Logger,
              protected formBuilder:FormBuilder,
              protected processManagementService:ProcessManagementService
              ){
    super(logger,formBuilder,processManagementService);
  }
}
