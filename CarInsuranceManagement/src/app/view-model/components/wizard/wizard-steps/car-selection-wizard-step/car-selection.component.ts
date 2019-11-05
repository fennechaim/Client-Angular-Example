import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {NgbActiveModal, NgbTypeaheadSelectItemEvent} from "@ng-bootstrap/ng-bootstrap";
import {LookupCarsProvider} from "../../../../../domain-model/services/lookup-cars-provider.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CarValidators} from "../../../../../domain-model/services/validations/carValidators";
import {VehicleModel} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-model";
import {VehicleYear} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-year";
import {VehicleSubDescription} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-sub-description";
import {VehicleManufacturer} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-manufacturer";
import {LocalizationServiceDecorator} from "../../../../../domain-model/services/localization/LocalizationServiceDecorator";
import {ProcessManagementService} from "../../../../../domain-model/services/process/process-management.service";
import {CarDescription} from "../../../../../domain-model/entities/car/car-description";
import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";
import {Car} from "../../../../../domain-model/entities/car/car";

@Component ({
  selector: 'car-selection',
  templateUrl : './car-selection.component.html',
  styleUrls: ['./car-selection.component.scss']
})

export class CarSelectionComponent implements OnInit{
  carSelectionForm:FormGroup;
  manufacturers:VehicleManufacturer[] = [];
  years:VehicleYear[] = [];
  models:VehicleModel[] = [];
  subDescriptions:VehicleSubDescription[] = [];
  currentCarDescription:CarDescription;
  ldwSystems:Lookable[];
  fcwSystems:Lookable[];
  inputCar:Car;

  constructor(public activeModal: NgbActiveModal,
              private lookupCarsProvider:LookupCarsProvider,
              private processManagementService:ProcessManagementService,
              private validators:CarValidators,
              protected formBuilder:FormBuilder,
              private localizationServiceDecorator:LocalizationServiceDecorator
  ){

  }

  ngOnInit(): void {
    this.initializeForm();
    this.lookupCarsProvider.getAllManufacturers().subscribe(manufacturers => {
      this.manufacturers = manufacturers;
    });

    this.lookupCarsProvider.getLdwSystems().subscribe(ldwSystems => {
      this.ldwSystems = ldwSystems;
    });

    this.lookupCarsProvider.getFcwSystems().subscribe(fcwSystems => {
      this.fcwSystems = fcwSystems;
    });


    this.initializeFormData();
  }

  isDriverAssistanceSystemMissing():boolean{
    return this.isMissingFcwSystem() || this.isMissingLdwSystem();
  }

  isMissingFcwSystem():boolean{
    if(this.currentCarDescription == null)
      return false;

    return !this.currentCarDescription.isFcw;
  }

  isMissingLdwSystem():boolean{
    if(this.currentCarDescription == null)
      return false;

    return !this.currentCarDescription.isLdw;
  }


  manufacturerFormatter = (result: VehicleManufacturer) => result.name;
  yearFormatter = (result: VehicleYear) => result.value;
  modelFormatter = (result: VehicleModel) => result.name;
  subDescriptionFormatter = (result: VehicleSubDescription) => result.subDescription;

  manufacturersSearch = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => {
        let items =  this.manufacturers.filter(v => new RegExp(term, 'gi').test(v.name));
        if(items == null || items.length == 0)
          return this.manufacturers;

        return items;
      });

  yearsSearch = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => {
        let items = this.years.filter(v => new RegExp(term, 'gi').test(v.value));

        if(items == null || items.length == 0)
          return this.years;

        return items;
      });


  modelsSearch = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => {
        let items = this.models.filter(v => new RegExp(term, 'gi').test(v.name));
        if(items == null || items.length == 0)
          return this.models;

        return items;
      });

 subDescriptionSearch = (text$: Observable<string>) =>
   text$
     .debounceTime(200)
     .distinctUntilChanged()
     .map(term => {
       let items = this.subDescriptions.filter( v => new RegExp(term, 'gi').test(v.subDescription));

       if(items == null || items.length == 0)
         return this.subDescriptions;

       return items;
     })

  onManufacturerSelected(e: NgbTypeaheadSelectItemEvent){
    let manufacturer:VehicleManufacturer = e.item as VehicleManufacturer;

    let resetForm = {
      model: '',
      year: '',
      subDescription: '',
      hasFcwSystem: '',
      hasLdwSystem: '',
      fcwSystem: '',
      ldwSystem: ''
    };

    this.carSelectionForm.patchValue(resetForm);
    this.currentCarDescription = null;
    let vehicleYears:Observable<VehicleYear[]> =  this.lookupCarsProvider.getManufacturerYears(manufacturer);
    vehicleYears.subscribe(years => {
      this.years = years;
    });
  }

  onYearSelected(e: NgbTypeaheadSelectItemEvent){
    let year:VehicleYear = e.item as VehicleYear;
    let resetForm = {
      model: '',
      subDescription: '',
      hasFcwSystem: '',
      hasLdwSystem: '',
      fcwSystem: '',
      ldwSystem: ''
    };

    this.carSelectionForm.patchValue(resetForm);
    this.currentCarDescription = null;
    let manufacturer:VehicleManufacturer = this.carSelectionForm.get('manufacturer').value as VehicleManufacturer;
    let carModels:Observable<VehicleModel[]> =  this.lookupCarsProvider.getManufacturerModel(manufacturer, year);
    carModels.subscribe(models => {
      this.models = models;
    });
  }

  onModelSelected(e: NgbTypeaheadSelectItemEvent){

    let model:VehicleModel = e.item as VehicleModel;
    let resetForm = {
      subDescription: '',
      hasFcwSystem: '',
      hasLdwSystem: '',
      fcwSystem: '',
      ldwSystem: ''
    };
    this.carSelectionForm.patchValue(resetForm);
    this.currentCarDescription = null;
    let manufacturer:VehicleManufacturer = this.carSelectionForm.get('manufacturer').value as VehicleManufacturer;
    let year:VehicleYear = this.carSelectionForm.get('year').value as VehicleYear;
    let carSubDescriptions:Observable<VehicleSubDescription[]> =  this.lookupCarsProvider.getManufacturerSubDescription(manufacturer, year, model);
    carSubDescriptions.subscribe(subDescriptions => {
      this.subDescriptions = subDescriptions;
    });

  }

  initializeForm() {
    this.carSelectionForm = this.formBuilder.group({
      manufacturer: ['', [Validators.required,this.validators.manufacturer()]],
      model: ['', [Validators.required,this.validators.model()]],
      year: ['', [Validators.required,this.validators.year()]],
      subDescription: ['', [Validators.required,this.validators.subDescription()]],
      hasFcwSystem: ['', []],
      hasLdwSystem: ['', []],
      fcwSystem: ['', []],
      ldwSystem: ['', []]
    });
  }

  selectCar(carForm:FormGroup){

    const car:Car = new Car({});
    car.model = carForm.value.model;
    car.manufacturer = carForm.value.manufacturer;
    car.year = carForm.value.year.value;
    car.subDescription = carForm.value.subDescription.subDescription;

    if(carForm.value.hasLdwSystem){
      car.ldwSystem = carForm.value.ldwSystem;
    }else{
      car.ldwSystem = null;

    }
    if(carForm.value.hasFcwSystem){
      car.fcwSystem = carForm.value.fcwSystem;
    }else{
      car.fcwSystem = null;
    }
    car.description = this.currentCarDescription;
    this.activeModal.close(car)
  }



  onSubDescriptionSelected(event:NgbTypeaheadSelectItemEvent){

    const car:Car = new Car({});
    car.subDescription = event.item.subDescription;
    car.model = this.carSelectionForm.value.model;
    car.manufacturer = this.carSelectionForm.value.manufacturer;
    car.year = this.carSelectionForm.value.year.value;

    this.processManagementService.getCarDetails(car).subscribe((carDescription:CarDescription) => {
      console.log("carDescription:", carDescription);
      this.currentCarDescription = carDescription;
    });

  }

  get direction():string{
    return this.localizationServiceDecorator.direction;
  }



  private initializeFormData() {

    if(this.inputCar == null)
      return;

    if(this.inputCar.manufacturer != null)
    {
      let vehicleYears:Observable<VehicleYear[]> =  this.lookupCarsProvider.getManufacturerYears(this.inputCar.manufacturer);
      vehicleYears.subscribe(years => {
        this.years = years;
      });
    }

    if(this.inputCar.manufacturer != null && this.inputCar.year != null){
      let vehicleYear = new VehicleYear();
      vehicleYear.value = this.inputCar.year;
      let carModels:Observable<VehicleModel[]> =  this.lookupCarsProvider.getManufacturerModel(this.inputCar.manufacturer, vehicleYear );
      carModels.subscribe(models => {
        this.models = models;
      });
    }

    if(this.inputCar.manufacturer != null && this.inputCar.year != null && this.inputCar.model != null){
      let vehicleYear = new VehicleYear();
      vehicleYear.value = this.inputCar.year;
      let carModelSubDescriptions:Observable<VehicleSubDescription[]> =
                 this.lookupCarsProvider.getManufacturerSubDescription(this.inputCar.manufacturer, vehicleYear, this.inputCar.model);
      carModelSubDescriptions.subscribe(subDescriptions => {
        this.subDescriptions = subDescriptions;
      });
    }


    this.carSelectionForm.patchValue(this.inputCar);

    if(this.inputCar.year){
      let vehicleYear = new VehicleYear();
      vehicleYear.value = this.inputCar.year;
      this.currentCarDescription = this.inputCar.description;
      this.carSelectionForm.patchValue({year:vehicleYear});
    }

    if(this.inputCar.subDescription)
    {

      let vehicleSubDescription = new VehicleSubDescription();
      vehicleSubDescription.subDescription = this.inputCar.subDescription;
      //this.currentCarDescription = this.inputCar.description;
      this.carSelectionForm.patchValue({subDescription:vehicleSubDescription});
    }

    if(this.inputCar.fcwSystem != null){
      let fcwSystem = this.fcwSystems.find(x => x.id == this.inputCar.fcwSystem.id);
      this.carSelectionForm.patchValue({fcwSystem:fcwSystem});
      this.carSelectionForm.patchValue({hasFcwSystem:true});
    }

    if(this.inputCar.ldwSystem != null){
      let ldwSystem = this.ldwSystems.find(x => x.id == this.inputCar.ldwSystem.id);
      this.carSelectionForm.patchValue({ldwSystem:ldwSystem});
      this.carSelectionForm.patchValue({hasLdwSystem:true});
    }
  }
}
