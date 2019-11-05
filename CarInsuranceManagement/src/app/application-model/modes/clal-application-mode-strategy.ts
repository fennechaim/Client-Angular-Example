
import {ApplicationModeStrategy} from "./application-mode-strategy";
import {Observable} from "rxjs/Observable";
import {CLAL_CAR_USAGES} from "../../domain-model/entities/car/clal-car-usages";
import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";

export class ClalApplicationModeStrategy extends ApplicationModeStrategy{
  get grantedDriversFeatureEnabled(): boolean {
    return true;
  }
  getCarUsages():Observable<Lookable[]> {
    return Observable.from([CLAL_CAR_USAGES]);
  }

}
