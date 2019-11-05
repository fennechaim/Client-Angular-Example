import {element, by} from "protractor";

export class CarDetailsPage{
  private get ownershipSelectInput()  {
    return element(by.css("form mat-select[formControlName=carOwnerType]"));
  }

  private get usageTypeInput()  {
    return element(by.css("form mat-select[formControlName=carUsageType]"));
  }

  private get emailInput()  {
    return element(by.css("form input[formControlName=email]"));
  }

  private get phoneNumberInput(){
    return element(by.css("form input[formControlName=phoneNumber]"));
  }



  private get ownershipOptions(){
    return element.all(by.css('.mat-select-panel .mat-select-content mat-option'));
  }

  isOwnershipSelected(){
    return this.ownershipOptions.count().then(count => {
      return count == 0;
    })
  }

  isCarUsageSelected(){
    return this.usageTypeOptions.count().then(count => {
      return count == 0;
    })
  }

  private get usageTypeOptions(){
    return element.all(by.css('.mat-select-panel .mat-select-content mat-option'));
  }



  focusOnOwnership(){
    this.ownershipSelectInput.click();
  }

  focusOnUsageType(){
    this.usageTypeInput.click();
  }

  enterEmail(email:string){
    this.emailInput.sendKeys(email);
  }

  enterPhoneNumber(phoneNumber:string){
    this.phoneNumberInput.sendKeys(phoneNumber);
  }


  isPageReady() {
    return this.ownershipSelectInput.isPresent();
  }


  selectPrivateOwnership() {
    this.ownershipOptions.get(0).click();
  }

  selectPrivateUsageType(){
    this.usageTypeOptions.get(0).click();
  }
}
