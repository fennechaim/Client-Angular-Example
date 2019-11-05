import {CarDescription} from "./car-description";
import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";
import {Vehicle} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle";


export class Car extends Vehicle{
  carAlarm: string;
  carOwnerType: Lookable;
  carUsageType: Lookable;
  ldwSystem:Lookable;
  fcwSystem:Lookable;
  enslavedCar: boolean;

  description:CarDescription;

  constructor(props){
    super();
    Object.assign(this, props);
  }
}
