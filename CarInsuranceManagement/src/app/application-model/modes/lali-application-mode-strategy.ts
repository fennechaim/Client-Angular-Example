import {ApplicationModeStrategy} from "./application-mode-strategy";
import {Observable} from "rxjs/Observable";
import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";
import {CAR_USAGES} from "../../domain-model/entities/car/car-usages";
export class LaliApplicationModeStrategy extends ApplicationModeStrategy{

  get grantedDriversFeatureEnabled(): boolean {
    return false;
  }

  getCarUsages():Observable<Lookable[]> {
    return Observable.from([CAR_USAGES]);
  }
}
