import {OnInit, Component, ViewChild} from "@angular/core";
import {Logger} from "angular2-logger/core";
import {Observable} from "rxjs";
import {ProcessManagementService} from "../../../../../domain-model/services/process/process-management.service";
import {CarInsuranceAbstractWizardStep} from "../car-insurance-abstract-wizard-step.component";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";
import {PolicyOwner} from "client-infrastructure/src/domain-model/entities/policies/policy-owner";
import {PolicyOwnerContactDetailsComponent} from "client-infrastructure/src/view-model/components/policies/policy-owner-contact-details-component/policy-owner-contact-details.component";
import {Car} from "../../../../../domain-model/entities/car/car";


@Component({
  selector: 'insured-car-wizard-step',
  templateUrl: './insured-car-wizard-step.component.html',
  styleUrls: ['./insured-car-wizard-step.component.scss']
})
export class InsuredCarWizardStepComponent extends CarInsuranceAbstractWizardStep {

  ownerships: Observable<Lookable[]>;
  usages: Observable<Lookable[]>;

  @ViewChild('contactDetails') contactDetailsComponent:PolicyOwnerContactDetailsComponent;

  get carForm(): FormGroup {
    return this.stepForm.controls['car'] as FormGroup;
  }
  ngAfterViewInit() {
    this.stepForm.addControl('contactDetails',this.contactDetailsComponent.contactFormGroup);
  }

  buildForm(): FormGroup {
    let form: FormGroup = this.formBuilder.group({
      car: this.formBuilder.group({
        carOwnerType:  ['', [Validators.required]],
        carUsageType: ['', [Validators.required]],
      })
    });
    return form;
  }

  restoreStepCore(): Observable<boolean> {

    this.ownerships = this.processManagementService.getCarOwnerships();
    this.usages =  this.processManagementService.getCarUsages();

    if(this.process.insuredCar.carUsageType != null){

      this.usages.subscribe(usages => {
        let usage:Lookable = usages.find(x=>x.id==this.process.insuredCar.carUsageType.id);
        this.stepForm.get('car').get('carUsageType').patchValue(usage);
      })

    }
    if(this.process.insuredCar.carOwnerType != null){
     this.ownerships.subscribe(ownerships => {
       let ownership:Lookable = ownerships.find(x=>x.id==this.process.insuredCar.carOwnerType.id);
       this.stepForm.get('car').get('carOwnerType').patchValue(ownership);
     });
    }
    return Observable.from([true]);
  }

  saveStep(): Observable<boolean> {
    this.logger.debug("saving step for  Car component...");

    let car:Car = this.carForm.value as Car;
    let policyOwner: PolicyOwner = this.stepForm.get('contactDetails').value as PolicyOwner;

    return this.processManagementService.updateContactAndCar(policyOwner, car).map(x =>{
      return true;
    });
  }

  constructor(protected logger: Logger,
              protected formBuilder: FormBuilder,
              protected processManagementService: ProcessManagementService) {
    super(logger, formBuilder, processManagementService);
  }
}
