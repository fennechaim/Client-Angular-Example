import { Injectable } from '@angular/core';
import {ValidatorFn, AbstractControl} from "@angular/forms";
import {VehicleModel} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-model";
import {VehicleYear} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-year";
import {VehicleManufacturer} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-manufacturer";
import {VehicleSubDescription} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-sub-description";
@Injectable()
export class CarValidators {
  constructor() {

  }

  year(): ValidatorFn {
    
    return (control: AbstractControl): {[key: string]: any} => {

      const year:VehicleYear = control.value;
      if (year == null || year.value == null){
        return {'invalidYear': {year}};
      }
      return null;
    }
  }

  manufacturer(): ValidatorFn {
    
    return (control: AbstractControl): {[key: string]: any} => {

      const manufacturer:VehicleManufacturer = control.value;
      if (manufacturer == null || manufacturer.name == null || manufacturer.code == null){
        return {'invalidManufacturer': {manufacturer}};
      }
      return null;
    }
  }

  model(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {

      const model:VehicleModel = control.value;
      if (model == null || model.name == null || model.code == null){
        return {'invalidModel': {model}};
      }
      return null;
    }
  }

  subDescription(): ValidatorFn {
    
    return (control: AbstractControl): {[key: string]: any} => {

      const vehicleSubDescription:VehicleSubDescription = control.value;
      if (vehicleSubDescription == null ){
        return {'invalidSubDescription': {vehicleSubDescription}};
      }
      return null;
    }
  }
}
