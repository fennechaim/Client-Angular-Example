import {Injectable, Inject} from "@angular/core";
import {Observable} from "rxjs";
import {Http, Response} from "@angular/http";
import {VehicleModel} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-model";
import {VehicleYear} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-year";
import {VehicleSubDescription} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-sub-description"
import {VehicleManufacturer} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-manufacturer";
import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";
import {DriverAssistanceSystems} from "../entities/car/driver-assistance-systems";

@Injectable()
export class LookupCarsProvider{

  models:{[key:string]:VehicleModel[]} = {};
  years:{[key:string]:VehicleYear[]} = {};
  manufacturers:VehicleManufacturer[] = [];
  subDescriptions: {[key:string]:VehicleSubDescription[]} = {};

  constructor(@Inject('lookupApiBaseUrl') private lookupApiBaseUrl:string, private http: Http){

  }

  getAllManufacturers(): Observable<VehicleManufacturer[]> {
    if(this.manufacturers != null && this.manufacturers.length > 0)
      return Observable.from([this.manufacturers]);

    let url:string = `${this.lookupApiBaseUrl}vehicles/cars/manufacturers`;
    let observable:Observable<VehicleManufacturer[]>  =   this.http.get(url).publishLast().refCount().map(this.extractData)
      .catch(this.handleError);
    observable.subscribe( (manufacturers:VehicleManufacturer[]) => {
      this.manufacturers = manufacturers;
      return this.manufacturers;
    });
    return observable;
  }

  getManufacturerYears(manufacturer: VehicleManufacturer): Observable<VehicleYear[]> {

    console.log(manufacturer.code);
    if(manufacturer == null || manufacturer.code == null)
      return Observable.from([]);

    if(this.years[manufacturer.code] !=null){
      return Observable.from([this.years[manufacturer.code]]);
    }

    let url:string = `${this.lookupApiBaseUrl}vehicles/cars/manufacturers/${manufacturer.code}/years`;

    let observable:Observable<VehicleYear[]>  =  this.http.get(url).publishLast().refCount().map(this.extractData)
      .catch(this.handleError);
    observable.subscribe( (streets:VehicleYear[]) => {
      this.years[manufacturer.code] = streets;
      return this.years[manufacturer.code]
    });
    return observable;
  }

  getManufacturerModel(manufacturer: VehicleManufacturer, year:VehicleYear): Observable<VehicleModel[]> {

    console.log(manufacturer.code);
    if(manufacturer == null || manufacturer.code == null)
      return Observable.from([]);

    if(this.years[manufacturer.code] == null){
      return Observable.from([]);
    }

    let carYears:VehicleYear[] = this.years[manufacturer.code];

    let carYear:VehicleYear = carYears.find(y => y.value == year.value);
    if(carYear == null || carYear.value == null)
      return Observable.from([]);

    let modelKey:string = `${manufacturer.code}${carYear.value}`;

    if(this.models[modelKey] != null)
      return Observable.from([this.models[modelKey]]);

    let url:string = `${this.lookupApiBaseUrl}vehicles/cars/manufacturers/${manufacturer.code}/years/${year.value}/models`;

    let observable:Observable<VehicleModel[]>  =  this.http.get(url).publishLast().refCount().map(this.extractData)
      .catch(this.handleError);
    observable.subscribe( (models:VehicleModel[]) => {
      this.models[modelKey] = models;
      return this.models[modelKey];
    });
    return observable;
  }

  getManufacturerSubDescription(manufacturer: VehicleManufacturer, year:VehicleYear, model:VehicleModel): Observable<VehicleSubDescription[]>{

    console.log(manufacturer.code);
    if(manufacturer == null || manufacturer.code == null)
      return Observable.from([]);

    if(this.years[manufacturer.code] == null){
      return Observable.from([]);
    }

    let carYears:VehicleYear[] = this.years[manufacturer.code];

    let carYear:VehicleYear = carYears.find(y => y.value == year.value);
    if(carYear == null || carYear.value == null)
      return Observable.from([]);


    let modelKey:string = `${manufacturer.code}${carYear.value}`;
    let carModels:VehicleModel[] = this.models[modelKey]

    let carModel:VehicleModel = carModels.find( y => y.description == model.description )
    if(carModel == null || carModel.description == null)
       return Observable.from([]);

   let subDescriptionKey:string = `${manufacturer.code}${carYear.value}${model.code}`;
   if(this.subDescriptions[subDescriptionKey] != null)
      return Observable.from([this.subDescriptions[subDescriptionKey]]);

   let url:string = `${this.lookupApiBaseUrl}vehicles/cars/manufacturers/${manufacturer.code}/years/${year.value}/models`;

    let observable:Observable<VehicleSubDescription[]>  =  this.http.post(url, {description: model.description}).publishLast().refCount().map(this.extractData)
      .catch(this.handleError);
    observable.subscribe( (subDescriptions:VehicleSubDescription[]) => {
      this.subDescriptions[subDescriptionKey] = subDescriptions;
      return this.subDescriptions[subDescriptionKey];
    });
    return observable;

  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getLdwSystems():Observable<Lookable[]> {
    return Observable.from([DriverAssistanceSystems.all]);
  }

  getFcwSystems():Observable<Lookable[]> {
    return Observable.from([DriverAssistanceSystems.all]);
  }
}
