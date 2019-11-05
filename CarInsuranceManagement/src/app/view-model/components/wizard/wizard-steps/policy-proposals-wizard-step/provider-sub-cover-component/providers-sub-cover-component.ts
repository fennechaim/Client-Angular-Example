
import { Component, Inject} from "@angular/core";
import {Policy} from "client-infrastructure/src/domain-model/entities/policies/policy";
import {AbstractPolicySubCoverComponent} from "client-infrastructure/src/view-model/components/policies/proposals/abstract-policy-sub-cover.component";
import {ISubCoverToggler} from "client-infrastructure/src/domain-model/services/policies/isub-cover-toggler";
import {SubCoverProperty} from "client-infrastructure/src/domain-model/entities/policies/sub-cover-property";
import {ISubCoverPropertyUpdater} from "client-infrastructure/src/domain-model/services/policies/isub-cover-property-updater";
import {ComprehensiveDrugSubCoverOptions} from "../../../../../../domain-model/entities/policy/comprehensive-drug-sub-covers-options";
import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";
import {PolicySubCoverInitializationContext} from "client-infrastructure/src/domain-model/entities/policies/policy-sub-cover-initialization-context";
import {CarPolicySubCoverProviders} from "../../../../../../domain-model/services/policies/car-policy-sub-cover-providers";
import {CarInsuranceProcess} from "../../../../../../domain-model/entities/process/car-insurance-process";

@Component({
  selector: "providers-sub-cover",
  templateUrl: "./providers-sub-cover-component.html",
  styleUrls: ["./providers-sub-cover-component.scss"]
})

export class ProvidersSubCoverComponent extends AbstractPolicySubCoverComponent{


  providers :Lookable[];
  propertyName:string;
  constructor(@Inject('subCoverToggler')protected  subCoverToggler:ISubCoverToggler,
              @Inject('subCoverPropertyUpdater') private subCoverPropertyUpdater: ISubCoverPropertyUpdater,
              private subCoverProviders:CarPolicySubCoverProviders){
    super(subCoverToggler);
  }

  get carProcess():CarInsuranceProcess{
    return this.process as CarInsuranceProcess;
  }

  initialize(initializationContext: PolicySubCoverInitializationContext) {
    super.initialize(initializationContext);
    setTimeout(()=> {
      this.initializeProviders(this.subCover);
    },0);

  }

  get comprehensiveDrugSubCoverOptions():Lookable[]{
    return ComprehensiveDrugSubCoverOptions.all;
  }



  updateProperty(subCover: Policy, propertyValue:number){
    let property = new SubCoverProperty({
      name:this.propertyName,
      value:propertyValue
    });

    console.log('updating provider', property);
    this.subCoverPropertyUpdater.updateProperty(this.policy, this.subCover, property).subscribe((p:Policy) => {
      console.log('updated provider', property);
    });
  }

  private initializeProviders(subCover: Policy):void {
    this.providers = this.subCoverProviders.getProvidersBySubCover(subCover);
    this.propertyName = this.subCoverProviders.getPropertyNameBySubCover(subCover);
  }
}
