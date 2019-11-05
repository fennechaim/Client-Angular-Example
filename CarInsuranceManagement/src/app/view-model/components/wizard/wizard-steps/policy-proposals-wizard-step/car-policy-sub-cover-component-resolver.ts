
import {AbstractPolicySubCoverComponentResolver} from "client-infrastructure/src/view-model/components/policies/proposals/abstract-policy-sub-cover-resolver.component";
import {IPolicySubCoverComponent} from "client-infrastructure/src/view-model/components/policies/proposals/ipolicy-sub-cover.component";
import {Policy} from "client-infrastructure/src/domain-model/entities/policies/policy";
import {CarComprehensivePartialDamageCoverComponent} from "./comprehensive-partial-damage-component/car-comprehensive-partial-damage-sub-cover-component";
import {Injectable, Type} from "@angular/core";
import { KeyedCollection } from "client-infrastructure/src/domain-model/services/collections/keyed-collection";
import {CarComprehensiveAccessoriesSubCoverComponent} from "./accessories-sub-cover-component/car-comprehensive-accessories-sub-cover-component";
import {CarThirdPartyInsuranceSubCoverComponent} from "./third-party-insurance-sub-cover-component/third-party-insurance-sub-cover-component";
import {ProvidersSubCoverComponent} from "./provider-sub-cover-component/providers-sub-cover-component";
import {CompulsorySubCoverComponent} from "./compulsory-sub-cover-component/compulsory-sub-cover-component";
import {AccidentalSubCoverComponent} from "./accidental-sub-cover/accidental-sub-cover.component";
import {CarTheftSubCoverComponent} from "./car-theft-sub-cover/car-theft-sub-cover.component";

@Injectable()
export class CarPolicySubCoverComponentResolver extends AbstractPolicySubCoverComponentResolver{

  componentTypes = new KeyedCollection<Type<IPolicySubCoverComponent>>();

  constructor(){
    super();
    this.initComponents();
  }

  private initComponents():void{
    this.componentTypes.Add('CarComprehensivePartialDamageSubcover',CarComprehensivePartialDamageCoverComponent);
    this.componentTypes.Add('ThirdPartyInsuranceSubcover',CarThirdPartyInsuranceSubCoverComponent);
    this.componentTypes.Add('CarComprehensiveAccessoriesSubcover',CarComprehensiveAccessoriesSubCoverComponent);
    this.componentTypes.Add('AccidentalSubCover',AccidentalSubCoverComponent);
    this.componentTypes.Add('Theft',CarTheftSubCoverComponent);
    this.componentTypes.Add('CarComprehensiveDrugSubcover',ProvidersSubCoverComponent);
    this.componentTypes.Add('CarComprehensiveGlassSubcover',ProvidersSubCoverComponent);
    this.componentTypes.Add('CarReplacementCarSubcover',ProvidersSubCoverComponent);
    this.componentTypes.Add('CarThirdPartyGlassSubcover',ProvidersSubCoverComponent);
    this.componentTypes.Add('CarThirdPartyDrugSubcover',ProvidersSubCoverComponent);
    this.componentTypes.Add('CustomCompulsorySubCover',CompulsorySubCoverComponent);
  }

  resolveComponentCore(subCover: Policy): Type<IPolicySubCoverComponent> {
     if(this.componentTypes.ContainsKey(subCover.name))
      return this.componentTypes.Item(subCover.name);

    return null;
  }
}
