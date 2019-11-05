import {element, by, browser} from "protractor";

export class QuestionnairePage{

  private get primaryDriver(){
    return element(by.css("questionnaire"))
  }

  private get questionnaireAnswers(){
    return element(by.css('questionnaire div[formArrayName=answers]'))
  }

  isPageReady(){
    return this.primaryDriver.isPresent();
  }

  private get answerElements(){
    let elements = element.all(by.css('questionnaire div[formArrayName=answers] .driverCard'));
    console.log('total questions: ' , elements.count());
    return elements;
  }

  private  getBooleanQuestionRadioOptions(questionElement){
    return questionElement.all(by.css("div.true-or-false-question mat-radio-group mat-radio-button"));
  }


  setAsDrivingContinuouslyLastTwoYears(value:boolean){
    let index:number = value ? 1 : 0;
    let continuousDrivingQuestionElement = this.answerElements.get(0);
    let options = this.getBooleanQuestionRadioOptions(continuousDrivingQuestionElement);
    options.get(index).click();
  }

  setActivatingInsurance(value:boolean){
    let index:number = value ? 1 : 0;
    let activatedInsuranceQuestionElement = this.answerElements.get(2);
    let options = this.getBooleanQuestionRadioOptions(activatedInsuranceQuestionElement);
    options.get(index).click();
  }

  setDrivingLicenseRevokedLastThreeYears(value:boolean){
    let index:number = value ? 1 : 0;
    let drivingLicenseRevokedQuestionElement = this.answerElements.get(6);
    let options = this.getBooleanQuestionRadioOptions(drivingLicenseRevokedQuestionElement);
    options.get(index).click();
  }

  answerQuestions(){
    this.setAsDrivingContinuouslyLastTwoYears(true);
    this.setActivatingInsurance(false);
    this.setDrivingLicenseRevokedLastThreeYears(false);
  }
}
