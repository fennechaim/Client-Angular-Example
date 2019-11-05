
import {ChangeDetectorRef, Component, Inject, OnInit} from "@angular/core";
import {Policy} from "client-infrastructure/src/domain-model/entities/policies/policy";
import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";
import {AbstractPolicySubCoverComponent} from "client-infrastructure/src/view-model/components/policies/proposals/abstract-policy-sub-cover.component";
import {ISubCoverToggler} from "client-infrastructure/src/domain-model/services/policies/isub-cover-toggler";
import {SubCoverProperty} from "client-infrastructure/src/domain-model/entities/policies/sub-cover-property";
import {ISubCoverPropertyUpdater} from "client-infrastructure/src/domain-model/services/policies/isub-cover-property-updater";
import {MatSelectChange} from "@angular/material";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {DriverPermissionGroups} from "../../../../../../domain-model/entities/drivers/driver-permission-groups";
import {ApplicationModeStrategy} from "../../../../../../application-model/modes/application-mode-strategy";
import {CarInsuranceProcess} from "../../../../../../domain-model/entities/process/car-insurance-process";

@Component({
  selector: "car-comprehensive-partial-damage-sub-cover",
  templateUrl: "./car-comprehensive-partial-damage-sub-cover-component.html",
  styleUrls: ["./car-comprehensive-partial-damage-sub-cover-component.scss"]
})

export class CarComprehensivePartialDamageCoverComponent extends AbstractPolicySubCoverComponent implements OnInit{

  comprehensiveDrivingAgeItems:Lookable[];
  comprehensiveDrivingExperienceItems:Lookable[];


  driverPermissionGroup:BehaviorSubject<Lookable[]>;

  constructor(@Inject('subCoverToggler')protected  subCoverToggler:ISubCoverToggler,
              @Inject('subCoverPropertyUpdater') private subCoverPropertyUpdater: ISubCoverPropertyUpdater,
              private applicationModeStrategy:ApplicationModeStrategy
              ){

    super(subCoverToggler);
  }

  get carProcess():CarInsuranceProcess{
    return this.process as CarInsuranceProcess;
  }

  get grantedDriversFeatureEnabled():boolean{
    return this.applicationModeStrategy.grantedDriversFeatureEnabled;
  }



  ngOnInit(): void {

    this.driverPermissionGroup = new BehaviorSubject(DriverPermissionGroups);

    this.comprehensiveDrivingAgeItems = this.carProcess.getComprehensiveDriverAgeRange();
    this.comprehensiveDrivingExperienceItems = this.carProcess.getComprehensiveDrivingExperienceRange();

    if(this.carProcess.comprehensivePolicySelectedAge == null){
      this.carProcess.comprehensivePolicySelectedAge = this.comprehensiveDrivingAgeItems[0];
    }

    if(this.carProcess.comprehensivePolicySelectedDrivingExperience == null){
      this.carProcess.comprehensivePolicySelectedDrivingExperience = this.comprehensiveDrivingExperienceItems[0];
    }
  }


  onDriverAgeChanged(subCover: Policy,change:MatSelectChange){
    let property = new SubCoverProperty({
      name:'EachDriverAge',
      value:change.value
    });

    console.log('updating property', property);
    this.subCoverPropertyUpdater.updateProperty(this.policy, subCover, property).subscribe((p:Policy) => {
      console.log('updated property', property);
    });
  }

  onDriverLicenseIssuingYearChanged(subCover: Policy, value:number){
    let property = new SubCoverProperty({
      name:'EachDriverExperienceYears',
      value:value
    });



    console.log('updating property', property);
    this.subCoverPropertyUpdater.updateProperty(this.policy, subCover, property).subscribe((p:Policy) => {
      console.log('updated property', property);
    });

  }

  onDriverPermissionGroupChanged(subCover:Policy,value:number){
    let property = new SubCoverProperty({
      name:'PermissionGroup',
      value:value
    });

    console.log('updating property', property);
    this.subCoverPropertyUpdater.updateProperty(this.policy, subCover, property).subscribe((p:Policy) => {
      console.log('updated property', property);
    });
  }

  onDrivingInShabatChanged(subCover:Policy,value:boolean){
    let property = new SubCoverProperty({
      name:'IsShabatDriving',
      value:value ? 1 : 0
    });

    console.log('updating property', property);
    this.subCoverPropertyUpdater.updateProperty(this.policy, subCover, property).subscribe((p:Policy) => {
      console.log('updated property', property);
    });
  }

}
