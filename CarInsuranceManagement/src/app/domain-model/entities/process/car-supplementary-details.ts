import {VehicleDriver} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-driver";
import {PolicyOwner} from "client-infrastructure/src/domain-model/entities/policies/policy-owner";
import {SubordinateEntity} from "client-infrastructure/src/domain-model/entities/subordinates/subordinate-entity";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {DateProvider} from "client-infrastructure/src/domain-model/services/dates/date-provider.service";
import {Car} from "../car/car";
export class CarSupplementaryDetails{
  policyOwner:PolicyOwner;
  car:Car;
  subOrdinateEntity:SubordinateEntity;
  specifiedDrivers:VehicleDriver[] = [];

  constructor(prop:any){

    let firstYoungDriver:VehicleDriver = new VehicleDriver(prop.firstYoungDriver);
    if(firstYoungDriver.idNumber != null){
      let firstYoungDriverBirthDate = firstYoungDriver.birthDate as any;
      let birthday:Date = DateProvider.current.toDate(firstYoungDriverBirthDate as NgbDateStruct);
      firstYoungDriver.birthDate = birthday;
      this.specifiedDrivers.push(firstYoungDriver);
    }
    let secondYoungDriver:VehicleDriver = new VehicleDriver(prop.secondYoungDriver);
    if(secondYoungDriver.idNumber != null){
      let secondYoungDriverBirthDate = secondYoungDriver.birthDate as any;
      let birthday:Date = DateProvider.current.toDate(secondYoungDriverBirthDate as NgbDateStruct);
      secondYoungDriver.birthDate = birthday;
      this.specifiedDrivers.push(secondYoungDriver);
    }

    let policyOwnerBirthDate = prop.policyOwner.birthDate as any;
    let birthday:Date = DateProvider.current.toDate(policyOwnerBirthDate as NgbDateStruct);

    let policyOwnerToUpdate = new PolicyOwner( prop.policyOwner as PolicyOwner);
    policyOwnerToUpdate.birthDate = birthday;
    this.policyOwner = policyOwnerToUpdate;
    this.policyOwner.birthDate = birthday;

    this.car = prop.vehicle as Car;
    this.subOrdinateEntity = (prop.subordinate != null && prop.subordinate.isSubordinated == 'positive') ? prop.subordinate.subordinateEntity : null;
  }
}
