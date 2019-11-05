import { Component, OnInit, Type } from '@angular/core';
import { StepChangeContext } from 'client-infrastructure/src/forms/wizard/wizard.model';
import { InsuredCarWizardStepComponent } from './wizard-steps/insured-car-wizard-step/insured-car-wizard-step.component';
import {CarLicensePlateComponent} from './wizard-steps/car-selection-wizard-step/car-selection-wizard-step-component';
import { InsuringUserComponent } from './wizard-steps/policy-owner-wizard-step/policy-owner-wizard-step';
import { WizardStep } from 'client-infrastructure/src/forms/wizard/wizardStep/wizard.step.model';
import { WizardStepComponent } from 'client-infrastructure/src/forms/wizard/wizardStep/wizard-step.component';
import { SpecifiedDriversWizardStepComponent } from './wizard-steps/specified-drivers-wizard-step/specified-drivers-wizard-step.component';
import { QuestionnaireWizardStepComponent } from './wizard-steps/questionnaire-wizard-step/questionnaire-wizard-step.component';
import { PolicyCommenceDateWizardStepComponent } from './wizard-steps/policy-commence-date-wizard-step/policy-commence-date-wizard-step.component';
import { PolicyProposalsComponent } from './wizard-steps/policy-proposals-wizard-step/policy-proposals-wizard-step-component';
import { SupplementaryDetailsWizardStepComponent } from './wizard-steps/supplementary-details-wizard-step/supplementary-details-wizard-step.component';
import { CreditCardComponent } from './wizard-steps/credit-card-wizard-step/credit-card-wizard-step.component';
import { FinalGreetingWizardStepComponent } from './wizard-steps/final-greeting-wizard-step/final-greeting-wizard-step.component';
import {CarInsuranceProcess} from "../../../domain-model/entities/process/car-insurance-process";


@Component({
  selector: 'app-root',
  templateUrl: './policy-proposal-wizard.component.html',
  styleUrls: ['./policy-proposal-wizard.component.scss'],
  entryComponents:[
    InsuredCarWizardStepComponent,
    CarLicensePlateComponent,
    InsuringUserComponent,
    SpecifiedDriversWizardStepComponent,
    QuestionnaireWizardStepComponent,
    PolicyCommenceDateWizardStepComponent,
    PolicyProposalsComponent,
    SupplementaryDetailsWizardStepComponent,
    CreditCardComponent,
    FinalGreetingWizardStepComponent
    ]
})
export class ContentComponent implements OnInit{
  carInsuranceWizardSteps:WizardStep<WizardStepComponent<CarInsuranceProcess>>[] = [];


  public onStepChanged(stepChangedContext:StepChangeContext):void{
    console.log(`step changed from ${ stepChangedContext.oldStep.title} to step: ${stepChangedContext.newStep.title}`);
  }


  public ngOnInit(){
    let firstStep = new WizardStep<InsuringUserComponent>({componentType:InsuringUserComponent});
    let secondStep = new WizardStep<CarLicensePlateComponent>({componentType:CarLicensePlateComponent});
    let thirdStep = new WizardStep<InsuredCarWizardStepComponent>({componentType:InsuredCarWizardStepComponent});
    let forthStep = new WizardStep<SpecifiedDriversWizardStepComponent>({componentType:SpecifiedDriversWizardStepComponent});
    let fifthStep = new WizardStep<QuestionnaireWizardStepComponent>({componentType:QuestionnaireWizardStepComponent});
    let sixthStep = new WizardStep<PolicyCommenceDateWizardStepComponent>({ componentType:PolicyCommenceDateWizardStepComponent});
    let seventhStep = new WizardStep<PolicyProposalsComponent>({ componentType:PolicyProposalsComponent});
    let eighthStep = new WizardStep<SupplementaryDetailsWizardStepComponent>({componentType:SupplementaryDetailsWizardStepComponent});
    let ninthStep = new WizardStep<CreditCardComponent>({componentType:CreditCardComponent});
    let tenthStep = new WizardStep<FinalGreetingWizardStepComponent>({ componentType:FinalGreetingWizardStepComponent});
    this.carInsuranceWizardSteps = [
                                    firstStep,
                                    secondStep,
                                    thirdStep,
                                    forthStep,
                                    fifthStep,
                                    sixthStep,
                                    seventhStep,
                                    eighthStep,
                                    ninthStep,
                                    tenthStep
                                   ];

   // this.canGoToPreviousStep = this.canGoToPreviousStep.bind(this);
   // this.canGoToNextStep = this.canGoToNextStep.bind(this);
    //this.getUser = this.getUser.bind(this);
  }


}
