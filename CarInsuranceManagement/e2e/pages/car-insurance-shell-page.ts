import { browser, element, by } from 'protractor';

export class CarShellPage {

/*
  navigateTo() {
    browser.baseUrl = "http://intgr.lali.co.il"
    return browser.get('/cars');
  }
*/

  navigateTo() {
    return browser.get('/')
  }

  getTitle() {
    return element(by.css('app-root h1')).getText();
  }

  private get nextStepButton(){
    return element(by.css('button.next-step-button'));
  }


  private get previousStepButton(){
    return element(by.css('button.previous-step-button'));
  }


  goToNextStep(){
    this.nextStepButton.click();
  }

  goToPreviousStep(){
    this.previousStepButton.click();
  }


}
