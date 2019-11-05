import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {CarInsuranceAbstractWizardStep} from '../car-insurance-abstract-wizard-step.component';
import {Logger} from 'angular2-logger/core';
import {Observable} from 'rxjs';
import {ProcessManagementService} from '../../../../../domain-model/services/process/process-management.service';
import {NgbModal, NgbModalOptions, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {CarSelectionComponent} from "./car-selection.component";
import {CarValidators} from "../../../../../domain-model/services/validations/carValidators";
import {Car} from "../../../../../domain-model/entities/car/car";


@Component ({
  selector: 'car-selection-wizard-step',
  templateUrl : './car-selection-wizard-step-component.html',
  styleUrls: ['./car-selection-wizard-step-component.scss']
})

export class CarLicensePlateComponent extends CarInsuranceAbstractWizardStep implements OnInit{
  firstName: string;

  constructor(
    protected logger:Logger,
    protected formBuilder:FormBuilder,
    protected processManagementService:ProcessManagementService,
    private   validators:CarValidators,
    private  modalService: NgbModal){
    super(logger, formBuilder, processManagementService);
  }

  isNextStepAvailable():boolean{
    return false;
  }

  ngOnInit(){
    super.ngOnInit();
  }

  buildForm(): FormGroup {
    let form: FormGroup = this.formBuilder.group({
      car: this.formBuilder.group({
        manufacturer: ['', [Validators.required,this.validators.manufacturer()]],
        model: ['', [Validators.required,this.validators.model()]],
        year: ['', [Validators.required]],
        subDescription: ['',[Validators.required,this.validators.subDescription()]],
        licenseNumber: this.formBuilder.group({
          firstPart: ['', []],
          secondPart: ['', []],
          thirdPart: ['', []]
        }),
        description:['', []],
        fcwSystem:['', []],
        ldwSystem:['', []]
      })
    });
    return form;
  }
  selectCar(){
    const options :NgbModalOptions = {
      size : 'lg',
      windowClass:'car-selection animated bounceInDown',
      backdrop:true,
      keyboard:true
    };
    const modalRef:NgbModalRef = this.modalService.open(CarSelectionComponent, options);
    modalRef.componentInstance.inputCar = this.process.insuredCar;
    modalRef.result.then((result:Car) => {

      this.carSelected(result);
    },(reason:any)=> {

    });
  }

  carSelected(car:Car){
    this.stepForm.patchValue({car:car});
    this.wizard.goToNextStep();
  }

  restoreStepCore() :Observable<boolean> {
    if (this.process.insuredCar != null) {
      this.stepForm.patchValue({car:this.process.insuredCar});
    }
    return Observable.from([true]);
  }

  get carForm():FormGroup{
    return this.stepForm.controls['car'] as FormGroup;
  }

  saveStep() :Observable<boolean> {

    let car:Car = this.carForm.value as Car;
    return this.processManagementService.createCar(car).map(x => {
        return true;
    });
  }
}
