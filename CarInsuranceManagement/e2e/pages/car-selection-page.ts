import {element, by} from "protractor";
export class CarSelectionPage{
  private get dontRememberButton()  {
    return element(by.css(".cantRememberButtonContainer button"));
  }


  private get manufacturerInput()  {
    return element(by.css("car-selection input[formControlName=manufacturer]"));
  }

  private get yearInput()  {
    return element(by.css("car-selection input[formControlName=year]"));
  }

  private get modelInput()  {
    return element(by.css("car-selection input[formControlName=model]"));
  }

  private get subDescriptionInput()  {
    return element(by.css("car-selection input[formControlName=subDescription]"));
  }

  private get dropDownMenu(){
    return element(by.css('ngb-typeahead-window.dropdown-menu'));
  }

  private get dropDownMenuOptions(){
    return element.all(by.css('ngb-typeahead-window.dropdown-menu button.dropdown-item'));
  }

  private get fixedButton(){
    return element(by.css('car-selection button.btn-fix'));
  }

  clickCantRemember(){
    return this.dontRememberButton.click();
  }

  enterYearDummyText(text:string){
    this.yearInput.sendKeys(text);
  }

  clickFixed(){
    this.fixedButton.click();
  }

  canClickFixed(){
    return this.fixedButton.isPresent() && this.fixedButton.isEnabled();
  }

  enterManufacturerDummyText(text:string){
   this.manufacturerInput.sendKeys(text);
  }

  enterModelDummyText(text:string){
    this.modelInput.sendKeys(text);
  }

  enterSubDescriptionDummyText(text:string){
    this.subDescriptionInput.sendKeys(text);
  }

  selectManufacturer(index:number){
    this.dropDownMenuOptions.get(index).click();
  }


  selectYear(index:number){
    this.dropDownMenuOptions.get(index).click();
  }

  selectModel(){
    this.dropDownMenuOptions.get(0).click();
  }

  selectSubDescription(){
    this.dropDownMenuOptions.get(0).click();
  }

  canSelectCar(){
    return this.manufacturerInput.isPresent();
  }

  canSelectManufacturer(){
    return this.dropDownMenuOptions.isPresent();
  }

  canSelectYear(){
    return this.dropDownMenuOptions.isPresent();
  }

  canSelectModel(){
    return this.dropDownMenuOptions.isPresent();
  }

  canSelectSubDescription(){
    return this.dropDownMenuOptions.isPresent();
  }

  isPageReady() {
    return this.dontRememberButton.isPresent();
  }

  focusOnModel() {
    this.modelInput.click();
  }

  focusOnSubDescription() {
    this.subDescriptionInput.sendKeys(" ");
  }
}
