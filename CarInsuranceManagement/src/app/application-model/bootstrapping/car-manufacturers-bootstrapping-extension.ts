import {Injectable} from "@angular/core";
import {LookupCarsProvider} from "../../domain-model/services/lookup-cars-provider.service";

@Injectable()
export class CarManufacturersBootstrappingExtension {

  constructor(private lookupCarsProvider:LookupCarsProvider) {
  }

  initialize(): Promise<any> {
    let promise: Promise<any> = new Promise((resolve: any) => {
      this.lookupCarsProvider.getAllManufacturers().subscribe(x => {

      });

      resolve(true);
    });
    return promise;
  }
}
