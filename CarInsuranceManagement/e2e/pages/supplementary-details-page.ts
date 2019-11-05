import {element, by, browser} from "protractor";


export class SupplementaryDetailsPage{

  private get supplementaryDetailsWizardStepComponent(){
    return element(by.css("supplementary-details-wizard-step"))
  }

  private get policyOwnerFullDetailsComponent(){
    return this.supplementaryDetailsWizardStepComponent.element(by.css('policy-owner-full-details'));
  }

  private get policyOwnerAddressComponent(){
    return this.policyOwnerFullDetailsComponent.element(by.css('address'));
  }

  private get vehicleComponent(){
    return this.supplementaryDetailsWizardStepComponent.element(by.css('vehicle-v2'));
  }

  private get subordinateEntityComponent(){
    return this.supplementaryDetailsWizardStepComponent.element(by.css('subordinated-entity'));
  }

  private get subordinateOptions(){
    return this.subordinateEntityComponent.all(by.css('mat-radio-group[formControlName=isSubordinated] mat-radio-button'));
  }

  private get technologyAgreementCheckbox(){
    return this.supplementaryDetailsWizardStepComponent.element(by.css('mat-checkbox[formControlName=technologyAgreement]'))
  }

  private get essentialDocumentAgreementCheckbox(){
    return this.supplementaryDetailsWizardStepComponent.element(by.css('mat-checkbox[formControlName=essentialDocumentAgreement] div.mat-checkbox-inner-container'))
  }

  private get licenseNumberFirstPartInput(){
    return this.vehicleComponent.element(by.css('input[formControlName=firstPart'));
  }

  private get licenseNumberSecondPartInput(){
    return this.vehicleComponent.element(by.css('input[formControlName=secondPart'));
  }

  private get licenseNumberThirdPartInput(){
    return this.vehicleComponent.element(by.css('input[formControlName=thirdPart'));
  }

  private get carProtectionSelect(){
    return this.vehicleComponent.element(by.css('mat-select[formControlName=protectionSystem]'))
  }

  private get protectionSystemsSelectionOptions(){
    return element.all(by.css('.cdk-overlay-container .cdk-overlay-pane .mat-select-panel mat-option'))
  }

  private get idNumberInput(){
    return this.policyOwnerFullDetailsComponent.element(by.css('input[formControlName=idNumber]'));
  }

  private get phoneNumberInput(){
    return this.policyOwnerFullDetailsComponent.element(by.css('input[formControlName=phoneNumber]'));
  }

  private get emailInput(){
    return this.policyOwnerFullDetailsComponent.element(by.css('input[formControlName=email]'));
  }

  private get policyOwnerCityInput(){
    return this.policyOwnerAddressComponent.element(by.css('input[formControlName=city'));
  }

  private get policyOwnerStreetInput(){
    return this.policyOwnerAddressComponent.element(by.css('input[formControlName=street'));
  }

  private get policyOwnerStreetOptions(){
    return this.policyOwnerAddressComponent.all(by.css('ngb-typeahead-window button.dropdown-item'));
  }

  private get policyOwnerCitiesOptions(){
    return this.policyOwnerAddressComponent.all(by.css('ngb-typeahead-window button.dropdown-item'));
  }

  private get policyOwnerHouseNumberInput(){
    return this.policyOwnerAddressComponent.element(by.css('input[formControlName=houseNumber'));
  }

  private get policyOwnerApartmentNumberInput(){
    return this.policyOwnerAddressComponent.element(by.css('input[formControlName=apartmentNumber'));
  }

  private get policyOwnerZipCodeInput(){
    return this.policyOwnerAddressComponent.element(by.css('input[formControlName=zipCode'));
  }

  private get creditCardButton(){
    return this.supplementaryDetailsWizardStepComponent.element(by.css('button.credit-card-button'));
  }

  public isPageReady(){
    return this.supplementaryDetailsWizardStepComponent.isPresent();
  }


  public setIsSubordinated(value:boolean){
    let index:number = value ? 1 : 0;
    this.subordinateOptions.get(index).click();
  }

  public acceptTechnologyAgreement(){
    this.technologyAgreementCheckbox.click();
  }

  public acceptEssentialDocumentAgreement(){
    return this.essentialDocumentAgreementCheckbox.click();
  }

  public enterIdentityNumber(identityNumber:string){
    this.idNumberInput.sendKeys(identityNumber);
  }

  public enterPhoneNumber(phoneNumber:string){
    this.phoneNumberInput.clear();
    this.phoneNumberInput.sendKeys(phoneNumber);
  }

  public enterEmail(email:string){
    this.emailInput.clear();
    this.emailInput.sendKeys(email);
  }

  public enterAddressApartmentNumber(apartmentNumber:string){
  this.policyOwnerApartmentNumberInput.sendKeys(apartmentNumber);
}

  public enterAddressHouseNumber(houseNumber:string){
    this.policyOwnerHouseNumberInput.sendKeys(houseNumber);
  }


  public enterAddressZipCode(zipCode:string){
    this.policyOwnerZipCodeInput.sendKeys(zipCode);
  }

  public enterCarLicenseNumber(firstPart:string, secondPart:string, thirdPart:string){
    this.licenseNumberFirstPartInput.sendKeys(firstPart);
    this.licenseNumberSecondPartInput.sendKeys(secondPart);
    this.licenseNumberThirdPartInput.sendKeys(thirdPart);
  }

  public openCarProtectionOptions(){
    this.carProtectionSelect.click();
  }

  public canPickCarProtection(){
    return this.protectionSystemsSelectionOptions.isPresent() && this.protectionSystemsSelectionOptions.isDisplayed();
  }

  public pickCarProtection(index:number){
    this.protectionSystemsSelectionOptions.get(index).click();
  }

  public enterStreetName(name:string){
    this.policyOwnerStreetInput.sendKeys(name);
  }

  public enterCityName(name:string){
    this.policyOwnerCityInput.sendKeys(name);
  }

  public canPickCity(){
    return this.policyOwnerCitiesOptions.isPresent();
  }

  public pickCity(index:number){
    this.policyOwnerCitiesOptions.get(index).click();
  }

  public canPickStreet(){
    return this.policyOwnerStreetOptions.isPresent() && this.policyOwnerStreetOptions.isDisplayed();
  }

  public pickStreet(index:number){
    this.policyOwnerStreetOptions.get(index).click();
  }


  payWithCreditCard() {
    this.creditCardButton.click();
  }
}
