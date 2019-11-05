import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {LookupCarsProvider} from "./lookup-cars-provider.service";
import {VehicleModel} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-model";
import {VehicleYear} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-year";
import {VehicleManufacturer} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-manufacturer";
import {VehicleSubDescription} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-sub-description";

@Injectable()
export class CarInsuranceLookupService {

  constructor(private lookupCarsProvider: LookupCarsProvider) {


  }

  getManufacturerYears(manufacturer: VehicleManufacturer): Observable<VehicleYear[]> {
    return this.lookupCarsProvider.getManufacturerYears(manufacturer);

  }

  getAllManufacturers(): Observable<VehicleManufacturer[]> {
    return this.lookupCarsProvider.getAllManufacturers();
  }


  getManufacturerModel(manufacturer: VehicleManufacturer, year: VehicleYear): Observable<VehicleModel[]> {
    return this.lookupCarsProvider.getManufacturerModel(manufacturer, year);
  }

  getManufacturerSubDescription(manufacturer: VehicleManufacturer, year: VehicleYear, model: VehicleModel): Observable<VehicleSubDescription[]>{
    return this.lookupCarsProvider.getManufacturerSubDescription(manufacturer, year, model);
  }


}





