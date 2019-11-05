import {Policy} from "client-infrastructure/src/domain-model/entities/policies/policy";
import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";
import {ComprehensiveDrugSubCoverOptions} from "../../entities/policy/comprehensive-drug-sub-covers-options";
import {Injectable} from "@angular/core";

@Injectable()
export class CarPolicySubCoverProviders{

  getProvidersBySubCover(subCover:Policy):Lookable[] {
    return ComprehensiveDrugSubCoverOptions.all;
  }

  getPropertyNameBySubCover(subCover:Policy){
    let subCoverName = subCover.name;
    if(subCoverName == 'CarThirdPartyGlassSubcover' || subCoverName == 'CarComprehensiveGlassSubcover')
      return "DrugServiceProviders";

    if(subCoverName == 'CarThirdPartyDrugSubcover' || subCoverName == 'CarComprehensiveDrugSubcover')
      return "GlassServiceProviders"

    if(subCoverName == 'CarReplacementCarSubcover')
      return "ReplacementCarProviders";

    return null;
  }
}
