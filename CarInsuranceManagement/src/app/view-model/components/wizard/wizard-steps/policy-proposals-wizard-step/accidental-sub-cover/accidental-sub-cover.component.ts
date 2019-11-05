
import {Component, Inject, OnInit} from "@angular/core";
import {Policy} from "client-infrastructure/src/domain-model/entities/policies/policy";
import {AbstractPolicySubCoverComponent} from "client-infrastructure/src/view-model/components/policies/proposals/abstract-policy-sub-cover.component";
import {ISubCoverToggler} from "client-infrastructure/src/domain-model/services/policies/isub-cover-toggler";
import {ISubCoverPropertyUpdater} from "client-infrastructure/src/domain-model/services/policies/isub-cover-property-updater";
import {SubCoverProperty} from "client-infrastructure/src/domain-model/entities/policies/sub-cover-property";
import {CarInsuranceProcess} from "../../../../../../domain-model/entities/process/car-insurance-process";
import {BehaviorSubject} from "rxjs";
import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";
import {CAR_DEDUCTIBLES} from "../../../../../../domain-model/entities/car/car-deductibles";

@Component({
  selector: "car-accidental-sub-cover",
  templateUrl: "./accidental-sub-cover.component.html",
  styleUrls: ["./accidental-sub-cover.component.scss"]
})

export class AccidentalSubCoverComponent  extends AbstractPolicySubCoverComponent implements OnInit {

  constructor(@Inject('subCoverToggler')protected  subCoverToggler:ISubCoverToggler,
              @Inject('subCoverPropertyUpdater') private subCoverPropertyUpdater: ISubCoverPropertyUpdater){
    super(subCoverToggler);
  }

  carDeducstibles:BehaviorSubject<Lookable[]>;

  get carProcess():CarInsuranceProcess{
    return this.process as CarInsuranceProcess;
  }

  ngOnInit(): void {

    this.carDeducstibles = new BehaviorSubject(CAR_DEDUCTIBLES);
  }

  onDeductibleChanged(subCover: Policy,value:number){

    let property = new SubCoverProperty({
      name:'CarDeductible',
      value:value
    });


    console.log('updating property', property);
    this.subCoverPropertyUpdater.updateProperty(this.policy, subCover, property).subscribe((p:Policy) => {
      console.log('updated property', property);
    });

  }
}
