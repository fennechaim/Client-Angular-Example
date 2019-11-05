
import {Component, Inject, OnInit} from "@angular/core";
import {Policy} from "client-infrastructure/src/domain-model/entities/policies/policy";
import {AbstractPolicySubCoverComponent} from "client-infrastructure/src/view-model/components/policies/proposals/abstract-policy-sub-cover.component";
import {ISubCoverToggler} from "client-infrastructure/src/domain-model/services/policies/isub-cover-toggler";
import {SubCoverProperty} from "client-infrastructure/src/domain-model/entities/policies/sub-cover-property";
import {ISubCoverPropertyUpdater} from "client-infrastructure/src/domain-model/services/policies/isub-cover-property-updater";
import {CarInsuranceProcess} from "../../../../../../domain-model/entities/process/car-insurance-process";
import {CarPolicy} from "../../../../../../domain-model/entities/policy/car-policy";

@Component({
  selector: "compulsory-sub-cover",
  templateUrl: "./compulsory-sub-cover-component.html",
  styleUrls: ["./compulsory-sub-cover-component.scss"]
})

export class CompulsorySubCoverComponent extends AbstractPolicySubCoverComponent implements OnInit{

  constructor(@Inject('subCoverToggler')protected  subCoverToggler:ISubCoverToggler,
              @Inject('subCoverPropertyUpdater') private subCoverPropertyUpdater: ISubCoverPropertyUpdater){
    super(subCoverToggler);
  }

  get carProcess():CarInsuranceProcess{
    return this.process as CarInsuranceProcess;
  }

  get carPolicy():CarPolicy{
    return this.policy as CarPolicy;
  }

  ngOnInit(): void {
  }

  isCompulsoryExcluded(){
    return !this.isCompulsoryIncluded();
  }
  isCompulsoryIncluded(){
    return this.carPolicy.isCompulsoryIncluded;
  }

  toggleCompulsory(){
    let value:boolean = !this.carPolicy.isCompulsoryIncluded;
    let property = new SubCoverProperty({
      name:'IsCompulsoryAutomobileInsurance',
      value:value ? 1: 0
    });

    console.log('updating property', property);
    this.subCoverPropertyUpdater.updateProperty(this.policy, this.subCover, property).subscribe((p:Policy) => {
      this.carPolicy.isCompulsoryIncluded = value;
    });
  }
}
