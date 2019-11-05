import {element, by, browser} from "protractor";

export class CreditCardPage{

  private get creditCardWizardStepComponent(){
    return element(by.css("credit-card"))
  }

  private get creditCardForm(){
    return browser.driver.findElement(by.css('form'));
  }

  private get creditCardFirstPartInput(){
    return this.creditCardForm.findElement(by.css('input[name=card1]'));
  }

  private get creditCardSecondPartInput(){
    return this.creditCardForm.findElement(by.css('input[name=card2]'));
  }

  private get creditCardThirdPartInput(){
    return this.creditCardForm.findElement(by.css('input[name=card3]'));
  }

  private get creditCardForthPartInput(){
    return this.creditCardForm.findElement(by.css('input[name=card4]'));
  }

  private get creditCardExpirationYearSelect(){
    return this.creditCardForm.findElement(by.css('select[name=expYear]'));
  }

  private get creditCardExpirationMonthSelect(){
  return this.creditCardForm.findElement(by.css('select[name=expMonth]'));
}

  private get creditCardExpirationMonthOptions(){
    return this.creditCardExpirationMonthSelect.findElements(by.css('option'));
  }

  private get creditCardExpirationYearOptions(){
    return this.creditCardExpirationYearSelect.findElements(by.css('option'));
  }

  private get creditGuardPayItButton(){
    return this.creditCardForm.findElement(by.css('div.payments input[type=submit]'));
  }


  public enterCreditCardNumber(firstPart:string, secondPart:string, thirdPart:string, forthPart:string){
    this.creditCardFirstPartInput.sendKeys(firstPart);
    this.creditCardSecondPartInput.sendKeys(secondPart);
    this.creditCardThirdPartInput.sendKeys(thirdPart);
    this.creditCardForthPartInput.sendKeys(forthPart);
  }

  public isPageReady(){
    return this.creditCardWizardStepComponent.isPresent();
  }

  public pay() {
    this.creditGuardPayItButton.click();
  }

  public canPickExpirationMonth(){
    //return this.creditCardExpirationMonthOptions.isPresent() && this.creditCardExpirationMonthOptions.isDisplayed();
    return true;
  }

  public pickExpirationMonth(index:number) {
    //this.creditCardExpirationMonthOptions.get(index).click();
    this.creditCardExpirationMonthOptions.then(x => {
      x[index].click();
    });
  }

  public tapExpirationMonth() {
    this.creditCardExpirationMonthSelect.click();
  }

  public canPickExpirationYear(){
    //return this.creditCardExpirationYearOptions.() && this.creditCardExpirationYearOptions.isDisplayed();
    return true;
  }

  public pickExpirationYear(index:number) {
    this.creditCardExpirationYearOptions.then(x => {
      x[index].click();
    });
  }

  public tapExpirationYear() {
    this.creditCardExpirationYearSelect.click();
  }

  public  getCreditGuardIFrameWebElement(){
    let creditGuardFrame = element(by.id('creditGuardFrame'));
    return creditGuardFrame;
  }


}
