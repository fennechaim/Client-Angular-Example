import {element, by, browser} from "protractor";

export class FinalGreetingPage{


  private get finalGreetingWizardStepComponent(){
    return element(by.css("final-greeting-wizard-step"))
  }

  public isPageReady(){
    return this.finalGreetingWizardStepComponent.isPresent() && this.finalGreetingWizardStepComponent.isDisplayed();
  }

}
