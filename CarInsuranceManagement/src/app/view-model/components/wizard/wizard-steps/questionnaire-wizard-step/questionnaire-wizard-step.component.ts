import {  Component } from "@angular/core";
import { Logger } from "angular2-logger/core";
import { Observable } from "rxjs";
import { ProcessManagementService } from "../../../../../domain-model/services/process/process-management.service";
import { CarInsuranceAbstractWizardStep } from "../car-insurance-abstract-wizard-step.component";
import { FormGroup, Validators, FormArray, FormBuilder } from "@angular/forms";
import { Questionnaire } from "client-infrastructure/src/domain-model/entities/questionnaires/questionnaire";
import { QuestionnaireAnswer } from "client-infrastructure/src/domain-model/entities/questionnaires/questionnaire-answer";
@Component({
  selector: 'questionnaire-wizard-step',
  templateUrl: './questionnaire-wizard-step.component.html',
  styleUrls: ['./questionnaire-wizard-step.component.scss']
})
export class QuestionnaireWizardStepComponent extends CarInsuranceAbstractWizardStep {


  get questionnaire():Questionnaire{
    return this.process.policyOwner.questionnaire;
  }

  buildForm(): FormGroup {
    let form: FormGroup = this.formBuilder.group({
    });
    return form;
  }

  restoreStepCore(): Observable<boolean> {
    return Observable.from([true]);
  }

  saveStep(): Observable<boolean> {
    this.logger.debug("saving step for  Car component...");


    let policyOwner = this.process.policyOwner;
    let formQuestionnaire:Questionnaire =  this.stepForm.value.questionnaire;
    policyOwner.questionnaire.answers.forEach((answer, index) => {
      let updatedAnswer:QuestionnaireAnswer = formQuestionnaire.answers[index];
      answer.value = updatedAnswer.value;
    });

    return this.processManagementService.answerQuestionnaire(policyOwner.questionnaire).map(response => {
      return true;
    });

  }
  constructor(protected logger: Logger, protected formBuilder: FormBuilder, protected policyGenerationService: ProcessManagementService) {
    super(logger, formBuilder, policyGenerationService);
  }
}
