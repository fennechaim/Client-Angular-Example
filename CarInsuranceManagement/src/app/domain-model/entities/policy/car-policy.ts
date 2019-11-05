import {AbstractProcess} from "client-infrastructure/src/domain-model/entities/processes/abstract-process";
import {Policy} from "client-infrastructure/src/domain-model/entities/policies/policy";
import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";
import {PolicyItemGroups} from "client-infrastructure/src/domain-model/entities/policies/policy-item-groups";
import {PolicyValidationStatuses} from "client-infrastructure/src/domain-model/entities/policies/policy-validation-statuses";
import {CarInsuranceProcess} from "../process/car-insurance-process";

export class CarPolicy extends Policy{
  isCompulsoryIncluded?:boolean;

  calculatePremium(process:AbstractProcess):number{
    if(!this.isCompulsoryIncluded){
      return this.finalPremium;
    }

    let carProcess:CarInsuranceProcess = process as CarInsuranceProcess;

    let finalPremium:number  = this.finalPremium + carProcess.compulsoryPolicy.finalPremium;
    return finalPremium;
  }

  constructor(props:any ={}){
    super(props);
    Object.assign(this,props);
  }

  getSubCoversByGroup(group:Lookable):Policy[]{
    let result:Policy[] = super.getSubCoversByGroup(group);
    if(this.name !=  'ThirdPartyInsurancePolicy' && this.name != 'ComprehensiveCarInsurancePolicy')
      return result;

    if(group.id != PolicyItemGroups.removable.id)
      return result;

    let validationStatus:Lookable = this.isCompulsoryIncluded ? PolicyValidationStatuses.inPolicy : PolicyValidationStatuses.outPolicy;
    let customCompulsorySubCover = new Policy({name:'CustomCompulsorySubCover',policyItemId: this.policyItemId,group:PolicyItemGroups.removable,validationStatus:validationStatus,parentId:this.policyItemId});
    result.push(customCompulsorySubCover);
    return result;
  }
}
