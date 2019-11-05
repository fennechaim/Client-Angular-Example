import { VehicleDriver } from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-driver";
import { NewDriverSpecification } from "client-infrastructure/src/domain-model/entities/vehicles/specifications/new-driver-specification";
import { YoungDriverSpecification } from "client-infrastructure/src/domain-model/entities/vehicles/specifications/young-driver-specification";
import { OrSpecification } from "client-infrastructure/src/domain-model/specifications/or-specification";

import {Injectable} from "@angular/core";

@Injectable()
export class CarDriverQueryResolver{

  isYoungDriver(driver:VehicleDriver):boolean{
    return this.youngDriverSpecification.isSatisfiedBy(driver);
  }

  isNewDriver(driver:VehicleDriver):boolean{
    return this.newDriverSpecification.isSatisfiedBy(driver);
  }

  isNewOrYoungDriver(driver:VehicleDriver):boolean{
    return new OrSpecification(this.newDriverSpecification,this.youngDriverSpecification).isSatisfiedBy(driver)
  }

  youngestDriver(drivers:VehicleDriver[]):VehicleDriver{
   // return this.newDriverSpecification.isSatisfiedBy(driver);
    return null;
  }

  constructor(private youngDriverSpecification:YoungDriverSpecification,
              private newDriverSpecification: NewDriverSpecification){
  }

}
