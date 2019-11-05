import {element, by, browser} from "protractor";


export class SpecifiedDriversPage{

  private get primaryDriver(){
    return element(by.css("driver.primary-driver"))
  }

  selectHasAdditionDriversAvailable:boolean;

  private get policyOwnerFirstNameInput(){
    return element(by.css("driver.primary-driver input[formControlName=firstName]"));
  }

  private get policyOwnerLastNameInput(){
    return element(by.css("driver.primary-driver input[formControlName=lastName]"));
  }

  private get policyOwnerDatePickerButton(){
    return element(by.css("driver.primary-driver .date-picker"));
  }

  private get policyOwnerDriverLicenseIssuingYearInput(){
    return element(by.css("driver.primary-driver input[formControlName=driverLicenseIssuingYear]"));
  }
  private get policyOwnerDriverLicenseIssuingMonthInput(){
    return element(by.css("driver.primary-driver input[formControlName=driverLicenseIssuingMonth]"));
  }

  private get youngestDriver(){
    return element(by.css('driver.youngest-driver'))
  }

  private get youngestDriverIsPolicyOwnerCheckbox(){
    return element(by.css('driver.youngest-driver  mat-checkbox'));
  }

  public get additionalDriversFalseRadio(){
    return element(by.css('mat-radio-group[formControlName=hasAdditionalDrivers] mat-radio-button.additionalDriversFalse'));
  }

  private get addtionalDriversTrueRadio(){
    return element(by.css('mat-radio-group[formControlName=hasAdditionalDrivers] mat-radio-button.additionalDriversTrue'));
  }

  canSelectHasAdditionalDrivers(){
    return this.additionalDriversFalseRadio.isPresent() && this.additionalDriversFalseRadio.isDisplayed();
  }

  setNoAdditionalDrivers(){
    this.additionalDriversFalseRadio.click();
  }

  canCheckPolicyOwnerAsYoungestDriver(){
    return this.youngestDriver.isPresent() && this.youngestDriver.isDisplayed();
  }

  setPolicyOwnerAsYoungestDriver(){
    this.youngestDriverIsPolicyOwnerCheckbox.click();
  }

  private get openDatePickerInput(){
    return element(by.css("driver.primary-driver ngb-datepicker-month-view"));
  }

  isPageReady(){
    return this.primaryDriver.isPresent() && this.primaryDriver.isDisplayed();
  }

  enterFirstName(firstName:string){
    this.policyOwnerFirstNameInput.sendKeys(firstName);
  }

  enterLastName(lastName:string){
    this.policyOwnerLastNameInput.sendKeys(lastName);
  }

  openDatePicker(){
      this.policyOwnerDatePickerButton.click();
  }

  private get policyOwnerDaysAvailable(){
    return element.all(by.css("driver.primary-driver ngb-datepicker-month-view .ngb-dp-day"));
  }

  canSelectDate(){
    return this.openDatePickerInput.isPresent() && this.openDatePickerInput.isDisplayed();
  }

  pickDate(){
    this.policyOwnerDaysAvailable.get(3).click();
  }

  isPolicyOwnerBirthDatePicked(){
    return !this.canSelectDate();
  }

  enterDriverLicenseIssuingYear(issuingYear:string){
    this.policyOwnerDriverLicenseIssuingYearInput.sendKeys(issuingYear);
  }

  enterDriverLicenseIssuingMonth(issuingMonth:string){
    this.policyOwnerDriverLicenseIssuingMonthInput.sendKeys(issuingMonth);

  }
}
