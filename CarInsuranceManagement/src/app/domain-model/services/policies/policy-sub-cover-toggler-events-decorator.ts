import {ISubCoverToggler} from "client-infrastructure/src/domain-model/services/policies/isub-cover-toggler";
import {Observable} from "rxjs/Observable";
import {Policy} from "client-infrastructure/src/domain-model/entities/policies/policy";
import {Injectable} from "@angular/core";
import {EventAggregator} from "client-infrastructure/src/domain-model/services/events/event-aggregator";
import {ProcessingRequestMessage} from "client-infrastructure/src/domain-model/entities/messages/process-request-message";
import {ISubCoverPropertyUpdater} from "client-infrastructure/src/domain-model/services/policies/isub-cover-property-updater";
import {SubCoverProperty} from "client-infrastructure/src/domain-model/entities/policies/sub-cover-property";

@Injectable()
export class PolicySubCoverTogglerEventsDecorator implements ISubCoverToggler, ISubCoverPropertyUpdater{


  constructor(private subCoverToggler: ISubCoverToggler, private subCoverPropertyUpdater:ISubCoverPropertyUpdater, private eventAggregator:EventAggregator){

  }

  toggleSubCover(policy: Policy, subCover: Policy): Observable<Policy> {
    this.eventAggregator.publish(new ProcessingRequestMessage(true));
    let result:Observable<Policy>  = this.subCoverToggler.toggleSubCover(policy,subCover);
    result.subscribe(x => {
      this.eventAggregator.publish(new ProcessingRequestMessage(false));
    });

    return result;
  }

  updateProperty(policy: Policy, subCover: Policy, property: SubCoverProperty): Observable<Policy> {
    this.eventAggregator.publish(new ProcessingRequestMessage(true));
    let result:Observable<Policy>  = this.subCoverPropertyUpdater.updateProperty(policy,subCover, property);
    result.subscribe(x => {
      this.eventAggregator.publish(new ProcessingRequestMessage(false));
    });

    return result;
  }
}
