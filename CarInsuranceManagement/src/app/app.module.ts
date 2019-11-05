import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InfrastructureModule} from 'client-infrastructure/src/infrastructure.module';
import {CarRoutingModule} from './application-model/routing/car-routing.module';
import {RouterModule} from "@angular/router";
import {NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MomentModule} from 'angular2-moment';
import {AppComponent} from './view-model/components/shell/app.component';
import {CarInsuranceMainComponent} from './view-model/components/car-insurance-main.component';
import {FormControlService} from 'client-infrastructure/src/forms/dynamic/form-element/form-element.service';
import {ContentComponent} from "./view-model/components/wizard/policy-proposal-wizard.component";
import {environment} from "../environments/environment";
import {LocalStorageModule} from 'angular-2-local-storage';
import {InsuredCarWizardStepComponent} from "./view-model/components/wizard/wizard-steps/insured-car-wizard-step/insured-car-wizard-step.component";
import {CarLicensePlateComponent} from "./view-model/components/wizard/wizard-steps/car-selection-wizard-step/car-selection-wizard-step-component";
import {InsuringUserComponent} from "./view-model/components/wizard/wizard-steps/policy-owner-wizard-step/policy-owner-wizard-step";
import {SpecifiedDriversWizardStepComponent} from "./view-model/components/wizard/wizard-steps/specified-drivers-wizard-step/specified-drivers-wizard-step.component";
import {QuestionnaireWizardStepComponent} from "./view-model/components/wizard/wizard-steps/questionnaire-wizard-step/questionnaire-wizard-step.component";
import {PolicyCommenceDateWizardStepComponent} from "./view-model/components/wizard/wizard-steps/policy-commence-date-wizard-step/policy-commence-date-wizard-step.component";
import {PolicyProposalsComponent} from "./view-model/components/wizard/wizard-steps/policy-proposals-wizard-step/policy-proposals-wizard-step-component";
import {InsuranceTooltipComponent} from "./view-model/components/insurance-tooltip.component/insurance-tooltip.component";
import {LocaleModule, LocalizationModule} from "angular2localization";
import {SupplementaryDetailsWizardStepComponent} from "./view-model/components/wizard/wizard-steps/supplementary-details-wizard-step/supplementary-details-wizard-step.component";
import {CreditCardComponent} from "./view-model/components/wizard/wizard-steps/credit-card-wizard-step/credit-card-wizard-step.component";
import {FinalGreetingWizardStepComponent} from "./view-model/components/wizard/wizard-steps/final-greeting-wizard-step/final-greeting-wizard-step.component";
import {RecoveryComponent} from './view-model/components/recovery.component';
import {ModalModule, TypeaheadModule} from 'ng2-bootstrap/ng2-bootstrap';
import {ProcessManagementService} from "./domain-model/services/process/process-management.service";
import {CarInsuranceLookupService} from "./domain-model/services/car-insurance-lookup.service";
import {AddressProvider} from "client-infrastructure/src/domain-model/services/lookups/address-provider";
import {LookupAddressProvider} from "client-infrastructure/src/domain-model/services/lookups/lookup-address-provider";
import {ProcessStoppedComponent} from "./view-model/components/wizard/wizard-steps/policy-commence-date-wizard-step/process-stopped.component";
import {CarSelectionComponent} from "./view-model/components/wizard/wizard-steps/car-selection-wizard-step/car-selection.component";
import {LookupCarsProvider} from "./domain-model/services/lookup-cars-provider.service";
import {CarValidators} from "./domain-model/services/validations/carValidators";
import {LookupBankProvider} from "./view-model/components/wizard/wizard-steps/supplementary-details-wizard-step/LookupBankProvider";
import {BankProvider} from "client-infrastructure/src/domain-model/services/lookups/bank-provider";
import {AuthSettingsBase} from "client-infrastructure/src/domain-model/services/security/authentication/auth-settings";
import {DefaultDateParserFormatter} from "client-infrastructure/src/localization/default-date-parser-formatter";
import {CarAuthSettings} from "./domain-model/entities/security/authentication/CarAuthSettings";
import {LaliErrorHandler} from "client-infrastructure/src/view-model/services/lali-error-handler.service";
import {DocumentModal} from "./view-model/components/document-modal.component/document-modal.component";
import {CarDriverQueryResolver} from "./view-model/components/wizard/wizard-steps/specified-drivers-wizard-step/car-driver-query-resolver";
import {DateProvider} from "client-infrastructure/src/domain-model/services/dates/date-provider.service";
import {ISubCoverToggler} from "client-infrastructure/src/domain-model/services/policies/isub-cover-toggler"
import {DocumentSectionComponent} from "./view-model/components/wizard/wizard-steps/policy-proposals-wizard-step/policy-final-document/document/documentSection.component";
import {LocalizationServiceDecorator} from "./domain-model/services/localization/LocalizationServiceDecorator";
import {MatTabsModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CarComprehensivePartialDamageCoverComponent} from "./view-model/components/wizard/wizard-steps/policy-proposals-wizard-step/comprehensive-partial-damage-component/car-comprehensive-partial-damage-sub-cover-component";
import {CarComprehensiveAccessoriesSubCoverComponent} from "./view-model/components/wizard/wizard-steps/policy-proposals-wizard-step/accessories-sub-cover-component/car-comprehensive-accessories-sub-cover-component";
import {AbstractPolicySubCoverComponentResolver} from "client-infrastructure/src/view-model/components/policies/proposals/abstract-policy-sub-cover-resolver.component";
import {CarPolicySubCoverComponentResolver} from "./view-model/components/wizard/wizard-steps/policy-proposals-wizard-step/car-policy-sub-cover-component-resolver";
import {CarThirdPartyInsuranceSubCoverComponent} from "./view-model/components/wizard/wizard-steps/policy-proposals-wizard-step/third-party-insurance-sub-cover-component/third-party-insurance-sub-cover-component";
import {ProvidersSubCoverComponent} from "./view-model/components/wizard/wizard-steps/policy-proposals-wizard-step/provider-sub-cover-component/providers-sub-cover-component";
import {PolicySubCoverTogglerEventsDecorator} from "./domain-model/services/policies/policy-sub-cover-toggler-events-decorator";
import {EventAggregator} from "client-infrastructure/src/domain-model/services/events/event-aggregator";
import {CompulsorySubCoverComponent} from "./view-model/components/wizard/wizard-steps/policy-proposals-wizard-step/compulsory-sub-cover-component/compulsory-sub-cover-component";
import {ISubCoverPropertyUpdater} from "client-infrastructure/src/domain-model/services/policies/isub-cover-property-updater";
import {CarPolicySubCoverProviders} from "./domain-model/services/policies/car-policy-sub-cover-providers";
import {YoungDriversHostDirective} from "./view-model/directives/drivers/young-drivers-host.directive";
import {CarManufacturersBootstrappingExtension} from "./application-model/bootstrapping/car-manufacturers-bootstrapping-extension";
import {TriggerInputDirective} from "./view-model/directives/cars/trigger-input.directive";
import {ApplicationModeStrategy} from "./application-model/modes/application-mode-strategy";
import {ClalApplicationModeStrategy} from "./application-model/modes/clal-application-mode-strategy";
import {LaliApplicationModeStrategy} from "./application-model/modes/lali-application-mode-strategy";
import {CarProcessRepository} from "./persistence-model/car-process-repository";
import {AccidentalSubCoverComponent} from "./view-model/components/wizard/wizard-steps/policy-proposals-wizard-step/accidental-sub-cover/accidental-sub-cover.component";
import {CarTheftSubCoverComponent} from "./view-model/components/wizard/wizard-steps/policy-proposals-wizard-step/car-theft-sub-cover/car-theft-sub-cover.component";

export function initSubCoverToggler(processManagementService: ProcessManagementService, eventAggregator: EventAggregator): ISubCoverToggler {
  return new PolicySubCoverTogglerEventsDecorator(processManagementService as ISubCoverToggler, processManagementService as ISubCoverPropertyUpdater, eventAggregator) as ISubCoverToggler;
}


export function initSubCoverPropertyUpdater(processManagementService: ProcessManagementService, eventAggregator: EventAggregator): ISubCoverPropertyUpdater {
  return new PolicySubCoverTogglerEventsDecorator(processManagementService as ISubCoverToggler, processManagementService as ISubCoverPropertyUpdater, eventAggregator) as ISubCoverPropertyUpdater;
}

export function initCarManufacturers(carManufacturersBootstrappingExtension: CarManufacturersBootstrappingExtension): Function {
  return () => carManufacturersBootstrappingExtension.initialize();
}


export function initApplicationModeStrategy(): ApplicationModeStrategy {
  return environment.clalMode ? new ClalApplicationModeStrategy() : new LaliApplicationModeStrategy();
}

@NgModule({
  entryComponents: [
    ProcessStoppedComponent,
    CarSelectionComponent,
    CarComprehensivePartialDamageCoverComponent,
    CarThirdPartyInsuranceSubCoverComponent,
    CarComprehensiveAccessoriesSubCoverComponent,
    AccidentalSubCoverComponent,
    CarTheftSubCoverComponent,
    ProvidersSubCoverComponent,
    CompulsorySubCoverComponent
  ],
  declarations: [
    AppComponent,
    ContentComponent,
    CarInsuranceMainComponent,
    InsuredCarWizardStepComponent,
    CarLicensePlateComponent,
    InsuringUserComponent,
    SpecifiedDriversWizardStepComponent,
    QuestionnaireWizardStepComponent,
    PolicyCommenceDateWizardStepComponent,
    PolicyProposalsComponent,
    SupplementaryDetailsWizardStepComponent,
    CreditCardComponent,
    FinalGreetingWizardStepComponent,
    InsuranceTooltipComponent,
    ProcessStoppedComponent,
    DocumentModal,
    CarSelectionComponent,
    RecoveryComponent,
    DocumentSectionComponent,
    CarComprehensivePartialDamageCoverComponent,
    CarThirdPartyInsuranceSubCoverComponent,
    CarComprehensiveAccessoriesSubCoverComponent,
    AccidentalSubCoverComponent,
    CarTheftSubCoverComponent,
    ProvidersSubCoverComponent,
    CompulsorySubCoverComponent,
    YoungDriversHostDirective,
    TriggerInputDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InfrastructureModule,
    CarRoutingModule,
    RouterModule,
    MomentModule,
    NgbModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    LocaleModule.forRoot(), // New instance of LocaleService.
    LocalizationModule.forRoot(), // New instance of LocalizationService.
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [
    CarInsuranceLookupService,
    FormControlService,
    ProcessManagementService,
    {
      provide: 'subCoverToggler',
      useFactory: initSubCoverToggler,
      deps: [ProcessManagementService, EventAggregator]
    },
    { provide: 'apiBaseUrl', useValue: environment.apiBaseUrl },
    { provide: 'paymentRedirectUrl', useValue: environment.paymentRedirectUrl },
    { provide: 'lookupApiBaseUrl', useValue: environment.lookupApiBaseUrl },
    { provide: 'insuranceAccountUrl', useValue: environment.insuranceAccountUrl },
    {
      provide: AddressProvider,
      useClass: LookupAddressProvider
    },
    LookupCarsProvider,
    CarProcessRepository,
    { provide: BankProvider, useClass: LookupBankProvider },
    CarValidators,
    { provide: AuthSettingsBase, useClass: CarAuthSettings },
    { provide: NgbDateParserFormatter, useClass: DefaultDateParserFormatter },
    { provide: ErrorHandler, useClass: LaliErrorHandler },
    DateProvider,
    CarDriverQueryResolver,
    LocalizationServiceDecorator,
    {
      provide: AbstractPolicySubCoverComponentResolver, useClass: CarPolicySubCoverComponentResolver
    },
    {
      provide: 'subCoverPropertyUpdater',
      useFactory: initSubCoverPropertyUpdater,
      deps: [ProcessManagementService, EventAggregator]
    },
    CarPolicySubCoverProviders,
    CarManufacturersBootstrappingExtension,
    {
      provide: APP_INITIALIZER,
      useFactory: initCarManufacturers,
      deps: [CarManufacturersBootstrappingExtension],
      multi: true
    },
    {
      provide: ApplicationModeStrategy,
      useFactory: initApplicationModeStrategy,
    }

  ],


  bootstrap: [AppComponent]
})
export class AppModule { }

