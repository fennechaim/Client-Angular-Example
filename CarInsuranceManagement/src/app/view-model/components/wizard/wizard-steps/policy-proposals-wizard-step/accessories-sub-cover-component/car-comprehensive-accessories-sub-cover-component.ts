
import {Component, Inject, OnInit} from "@angular/core";
import {Policy} from "client-infrastructure/src/domain-model/entities/policies/policy";
import {AbstractPolicySubCoverComponent} from "client-infrastructure/src/view-model/components/policies/proposals/abstract-policy-sub-cover.component";
import {ISubCoverToggler} from "client-infrastructure/src/domain-model/services/policies/isub-cover-toggler";
import {ISubCoverPropertyUpdater} from "client-infrastructure/src/domain-model/services/policies/isub-cover-property-updater";
import {SubCoverProperty} from "client-infrastructure/src/domain-model/entities/policies/sub-cover-property";
import {CarInsuranceProcess} from "../../../../../../domain-model/entities/process/car-insurance-process";

@Component({
  selector: "car-comprehensive-accessories-sub-cover",
  templateUrl: "./car-comprehensive-accessories-sub-cover-component.html",
  styleUrls: ["./car-comprehensive-accessories-sub-cover-component.scss"]
})

export class CarComprehensiveAccessoriesSubCoverComponent  extends AbstractPolicySubCoverComponent implements OnInit {

  constructor(@Inject('subCoverToggler')protected  subCoverToggler:ISubCoverToggler,
              @Inject('subCoverPropertyUpdater') private subCoverPropertyUpdater: ISubCoverPropertyUpdater){
    super(subCoverToggler);
  }

  get carProcess():CarInsuranceProcess{
    return this.process as CarInsuranceProcess;
  }

  ngOnInit(): void {

  }

  onMinAccessoryChanged(subCover: Policy,value:string) {
    let accessoryMinValue: number = +value;
    if(accessoryMinValue < 10000 || accessoryMinValue > 1000000)
      return;

    let property = new SubCoverProperty({
      name:'CarAccessoriesSumInsurance',
      value:+value
    });

    console.log('updating property', property);
    this.subCoverPropertyUpdater.updateProperty(this.policy, subCover, property).subscribe((p:Policy) => {
      console.log('updated property', property);
    });
  }
}
