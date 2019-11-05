import {element, by, browser} from "protractor";
export class PolicyOwnerPage{
  private get firstNameInput()  {
    return element(by.css("form input[formControlName=firstName]"));
  }

  private get lastNameInput(){
    return element(by.css("form input[formControlName=lastName]"));
  }

  private get genderRadioGroup(){
    return element(by.css("form input[formControlName=gender]"));
  }

  private get maleRadioButton(){
    return element(by.id("male"));
  }

  private get femaleRadioButton(){
    return element(by.id("female"));
  }

  getFirstName(){
    return this.firstNameInput.getAttribute('value');
  }

  enterName(firstName:string, lastName:string){
    this.firstNameInput.sendKeys(firstName);
    this.lastNameInput.sendKeys(lastName);
  }

  isGenderPresent() {
    return this.femaleRadioButton.isDisplayed();
  }

  selectMale(){
    this.maleRadioButton.click();
  }

  selectFemale(){
    this.femaleRadioButton.click();
  }

  isMaleSelected() {
    return this.maleRadioButton.getAttribute('class').then(x => x.indexOf('mat-radio-checked')>=0);
  }

  isFemaleSelected() {
    return this.femaleRadioButton.getAttribute('class').then(x => x.indexOf('mat-radio-checked')>=0);
  }

  private get nextStepButton(){
    return element(by.css('form button'));
  }

  goToNextStep() {
    this.nextStepButton.click();
  }
}
