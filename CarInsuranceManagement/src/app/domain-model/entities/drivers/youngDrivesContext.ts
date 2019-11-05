import { VehicleDriver } from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-driver";


export  class YoungDriversContext{

  constructor(props){
    Object.assign(this,props);
  }

  public primaryDriver:VehicleDriver;
  public additionalDrivers:VehicleDriver[];
  public totalYoungOrNewDrivers:number;
  public isPolicyOwnerYoungestDriver:boolean;
  public hasAdditionalDrivers:boolean;
  public totalExtraDrivers:number;

}
