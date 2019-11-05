import {AfterViewInit, Component, QueryList, ViewChild, ViewChildren} from "@angular/core";
import { Logger } from "angular2-logger/core";
import { Observable } from "rxjs";
import { ProcessManagementService } from "../../../../../domain-model/services/process/process-management.service";
import { CarInsuranceAbstractWizardStep } from "../car-insurance-abstract-wizard-step.component";
import {FormGroup, Validators, FormBuilder, AbstractControl} from "@angular/forms";
import { VehicleDriver } from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-driver";
import {DriverComponent} from "client-infrastructure/src/view-model/components/vehicles/driver-component/driver.component";
import {YoungDriversContext} from "../../../../../domain-model/entities/drivers/youngDrivesContext";

@Component({
  selector: 'insured-car.component',
  templateUrl: './specified-drivers-wizard-step.component.html',
  styleUrls: ['./specified-drivers-wizard-step.component.scss']
})

export class SpecifiedDriversWizardStepComponent extends CarInsuranceAbstractWizardStep implements AfterViewInit  {

  @ViewChild('primaryDriver') primaryDriverComponent:DriverComponent;
  @ViewChild('youngestDriver') youngestDriverComponent:DriverComponent;
  @ViewChild('firstYoungDriver') firstYoungDriverComponent:DriverComponent;
  @ViewChild('secondYoungDriver') secondYoungDriverComponent:DriverComponent;


  @ViewChildren(DriverComponent) drivers: QueryList<DriverComponent>;

  rawDrivers:DriverComponent[] = [];

  readonly totalExtraDriversKey:string = "totalExtraDrivers";
  readonly hasAdditionalDriversKey:string = "hasAdditionalDrivers";
  readonly policyOwnerIsYoungestDriverKey:string = "policyOwnerIsYoungestDriver";

  buildForm(): FormGroup {
    let model = {};
    model[this.totalExtraDriversKey] = ['0', [Validators.required]];
    model[this.hasAdditionalDriversKey] = ['', [Validators.required]];
    model[this.policyOwnerIsYoungestDriverKey] = ['',[]];
    let form: FormGroup = this.formBuilder.group(model);
    return form;
  }

  restoreStepCore(): Observable<boolean> {
    this.stepForm.patchValue(
      {
        hasAdditionalDrivers:this.process.hasAdditionalDrivers
      });

    if(this.process.totalExtraDrivers > 0){
      this.stepForm.patchValue(
        {
          totalExtraDrivers:this.process.totalExtraDrivers
        });
    }
    return Observable.from([true]);
  }
  get shouldShowFirstYoungDriver():boolean{
    if(this.primaryDriverComponent.isYoungOrNewDriver)
      return false;
    let extraDriversCount= this.totalExtraDrivers;
    if(extraDriversCount < 1)
      return false;

    if(extraDriversCount> 2)
      return false;

    return this.totalYoungOrNewDrivers <= 2;
  }
  get shouldShowSecondYoungDriver():boolean{

    if(this.primaryDriverComponent.isYoungOrNewDriver)
      return false;

    return this.totalExtraDrivers == 2 && this.totalYoungOrNewDrivers == 2;
  }


  hasAdditionalDriverChanged(value:boolean){
   if(value){
     this.process.firstYoungDriver = new VehicleDriver();
     this.process.firstYoungDriver.isPrimary = false;
     this.process.secondYoungDriver = new VehicleDriver();
     this.process.secondYoungDriver.isPrimary = false;
   }else{
     this.stepForm.removeControl('firstYoungDriver');
     this.stepForm.removeControl('secondYoungDriver');
   }
  }


  ngAfterViewInit() {

    this.totalExtraDriversFormControl.valueChanges.subscribe(x => {
      this.resetAdditionalDrivers();
    });

  setTimeout(()=> {
    this.resetAdditionalDrivers();
  },2)


    this.drivers.changes.subscribe(x => { this.initializeRawDrivers();    });
    this.policyOwnerIsYoungestDriver = this.youngestDriverComponent.youngDriverIsMe;

    this.primaryDriverComponent.driverFormGroup.valueChanges.distinctUntilChanged().debounceTime(100).subscribe(driver => {
      console.log('primary driver value changed. new value:', driver);
      if(this.policyOwnerIsYoungestDriver){
        this.youngestDriverComponent.updateDriver(this.stepForm.value.primaryDriver);
      }
    })
  }

  initializeRawDrivers(){
    this.rawDrivers.slice(0,this.rawDrivers.length);
    setTimeout(() => {

      this.drivers.forEach(d => {
        this.rawDrivers.push(d);
      })


    },1);
  }

  setIsYoungestDriverIsPolicyOwner(value:boolean){
    this.policyOwnerIsYoungestDriver = value;
    let driver:VehicleDriver = value ? this.stepForm.value.primaryDriver as VehicleDriver :  VehicleDriver.emptyDriver();
    this.youngestDriverComponent.updateDriver(driver);


   if(!value){
      this.hasAdditionalDriverChanged(false);
      this.hasAdditionalDrivers = false;
      this.totalExtraDrivers = 0;
    }

    console.log(value);
  }

  get totalYoungOrNewDrivers():number{
    let total:number = 0;

    if(this.primaryDriverComponent.isYoungOrNewDriver)
      total++;

    if(this.youngestDriverComponent.isActive && !this.youngestDriverComponent.youngDriverIsMe && this.youngestDriverComponent.isYoungOrNewDriver)
      total++;


    return total + (this.totalExtraDrivers);
  }


  addDriver(){
    const currentTotalDrivers:number = +this.totalExtraDrivers;
    this.totalExtraDrivers = currentTotalDrivers + 1;

    if(this.totalExtraDrivers > 0 && !this.shouldShowFirstYoungDriver && !this.shouldShowSecondYoungDriver){
      this.hasAdditionalDriverChanged(false);
    }

  }

  removeDriver(){
    const currentTotalDrivers:number = +this.totalExtraDrivers;
    this.totalExtraDrivers = currentTotalDrivers - 1;
    if(this.totalExtraDrivers < 0)
      this.totalExtraDrivers = 0;
  }

  get totalExtraDriversFormControl():AbstractControl{
    return this.stepForm.get(this.totalExtraDriversKey);
  }

  get totalExtraDrivers():number{
    return Number(this.totalExtraDriversFormControl.value);
  }
  set totalExtraDrivers(value:number){
    this.totalExtraDriversFormControl.setValue(value);
  }

  get hasAdditionalDrivers():boolean{
    return this.stepForm.get(this.hasAdditionalDriversKey).value;
  }
  set hasAdditionalDrivers(value:boolean){
    this.stepForm.get(this.hasAdditionalDriversKey).setValue(value);
  }

  get policyOwnerIsYoungestDriver():boolean{
    return this.stepForm.get(this.policyOwnerIsYoungestDriverKey).value;
  }

  set policyOwnerIsYoungestDriver(value:boolean){
    this.stepForm.get(this.policyOwnerIsYoungestDriverKey).setValue(value);
  }

  get isPolicyOwnerIsYoungestDriverAndNotYoungOrNewDriver():boolean{
   return this.primaryDriverComponent.isYoungDriver  || this.youngestDriverComponent.isYoungDriver;
  }

  private shouldIncludeSpecifiedDriver(driverComponent:DriverComponent){
    if(driverComponent == null)
      return false;

    if(!driverComponent.isActive)
      return false;

   /* if(driverComponent.isNewDriver)
      return true;

    if(driverComponent.isYoungDriver)
      return true;*/

    return true;
  }


  saveStep(): Observable<boolean> {
    let driversForm: any = this.stepForm.value;
    let primaryDriver = new VehicleDriver(driversForm.primaryDriver);
    primaryDriver.isPrimary = true;
    let specifiedDrivers:VehicleDriver[] = [];
    if(driversForm.policyOwnerIsYoungestDriver){

      if(this.shouldIncludeSpecifiedDriver(this.firstYoungDriverComponent))
      {
        let firstYoungDriver = new VehicleDriver(this.firstYoungDriverComponent.rawValue);
        firstYoungDriver.isPrimary = false;
        specifiedDrivers.push(firstYoungDriver);
      }
      if(this.shouldIncludeSpecifiedDriver(this.secondYoungDriverComponent))
      {
        let secondYoungDriver = new VehicleDriver(this.secondYoungDriverComponent.rawValue);
        secondYoungDriver.isPrimary = false;
        specifiedDrivers.push(secondYoungDriver);
      }
    }else{

      if(this.shouldIncludeSpecifiedDriver(this.youngestDriverComponent))
      {
        let firstYoungDriver = new VehicleDriver(this.youngestDriverComponent.rawValue);
        firstYoungDriver.isPrimary = false;
        specifiedDrivers.push(firstYoungDriver);
      }


      if(this.shouldIncludeSpecifiedDriver(this.firstYoungDriverComponent))
      {
        let secondYoungDriver = new VehicleDriver(this.firstYoungDriverComponent.rawValue);
        secondYoungDriver.isPrimary = false;
        specifiedDrivers.push(secondYoungDriver);
      }
    }

    var context = new YoungDriversContext({
      totalYoungOrNewDrivers:this.totalYoungOrNewDrivers,
      isPolicyOwnerYoungestDriver:this.policyOwnerIsYoungestDriver,
      primaryDriver:primaryDriver,
      additionalDrivers:specifiedDrivers,
      hasAdditionalDrivers:this.hasAdditionalDrivers,
      totalExtraDrivers:this.totalExtraDrivers
    });

    return this.processManagementService.updateCarDrivers(context).map(r => {
      return true;
    })
  }

  constructor(protected logger: Logger,
              protected formBuilder: FormBuilder,
              protected policyGenerationService: ProcessManagementService) {
    super(logger, formBuilder, policyGenerationService)
  }

  private resetAdditionalDrivers() {

    if(this.shouldShowFirstYoungDriver)
    {
      this.stepForm.removeControl('firstYoungDriver');
      this.stepForm.addControl('firstYoungDriver',this.firstYoungDriverComponent.driverFormGroup);
      this.firstYoungDriverComponent.isActive = true;
    }
    else{
      this.firstYoungDriverComponent.isActive = false;
      this.stepForm.removeControl('firstYoungDriver');
    }

    if(this.shouldShowSecondYoungDriver)
    {
      this.secondYoungDriverComponent.isActive = true;
      this.stepForm.removeControl('secondYoungDriver');
      this.stepForm.addControl('secondYoungDriver',this.secondYoungDriverComponent.driverFormGroup);
    }
    else{
      this.stepForm.removeControl('secondYoungDriver');
      this.secondYoungDriverComponent.isActive = false;
    }
  }
}
