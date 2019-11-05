import {element, by, browser} from "protractor";

export class PolicyCommenceDatePage{

  private get commenceDatComponent(){
    return element(by.css("policy-commence-date"));
  }

  private get datePickerButton(){
    return this.commenceDatComponent.element(by.css(".date-picker"));
  }

  private get datePickerComponent(){
    return element(by.css('ngb-datepicker'));
  }

  private get datePickerMonthsView(){
    return this.datePickerComponent.element(by.css("ngb-datepicker-month-view"));
  }

  private get datePickerDaysView(){
    return this.datePickerMonthsView.all(by.css('.ngb-dp-day'));
  }

  openDatePicker(){
    this.datePickerButton.click();
  }

  pickCommenceDate(){
    this.datePickerDaysView.get(20).click()
  }

  isPageReady(){
    return this.commenceDatComponent.isPresent();
  }

  canPickDate() {
    return this.datePickerDaysView.isPresent() && this.datePickerDaysView.isDisplayed();
  }
}
