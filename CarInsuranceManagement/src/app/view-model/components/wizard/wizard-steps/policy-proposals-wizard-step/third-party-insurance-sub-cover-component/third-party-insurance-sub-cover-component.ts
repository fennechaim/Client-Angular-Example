
import {Component, Inject, OnInit} from "@angular/core";
import {Policy} from "client-infrastructure/src/domain-model/entities/policies/policy";
import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";
import {AbstractPolicySubCoverComponent} from "client-infrastructure/src/view-model/components/policies/proposals/abstract-policy-sub-cover.component";
import {ISubCoverToggler} from "client-infrastructure/src/domain-model/services/policies/isub-cover-toggler";
import {SubCoverProperty} from "client-infrastructure/src/domain-model/entities/policies/sub-cover-property";
import {ISubCoverPropertyUpdater} from "client-infrastructure/src/domain-model/services/policies/isub-cover-property-updater";
import {DriverPermissionGroups} from "../../../../../../domain-model/entities/drivers/driver-permission-groups";
import {BehaviorSubject} from "rxjs";
import {ApplicationModeStrategy} from "../../../../../../application-model/modes/application-mode-strategy";
import {CarInsuranceProcess} from "../../../../../../domain-model/entities/process/car-insurance-process";

@Component({
  selector: "third-party-insurance-sub-cover",
  templateUrl: "./third-party-insurance-sub-cover-component.html",
  styleUrls: ["./third-party-insurance-sub-cover-component.scss"]
})

export class CarThirdPartyInsuranceSubCoverComponent extends AbstractPolicySubCoverComponent implements OnInit{

  thirdPartyDrivingAgeItems:Lookable[];
  thirdPartyDrivingExperienceItems:Lookable[];

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

  ngOnInit(): void {
    this.driverPermissionGroup = new BehaviorSubject(DriverPermissionGroups);

    this.thirdPartyDrivingAgeItems = this.carProcess.getThirdPartyDrivingAgeRange();
    this.thirdPartyDrivingExperienceItems = this.carProcess.getThirdPartyDrivingExperienceRange();

    if(this.carProcess.thirdPartyPolicySelectedAge == null){
      this.carProcess.thirdPartyPolicySelectedAge = this.thirdPartyDrivingAgeItems[0];
    }
    if(this.carProcess.thirdPartyPolicySelectedDrivingExperience == null){
      this.carProcess.thirdPartyPolicySelectedDrivingExperience = this.thirdPartyDrivingExperienceItems[0];
    }
  }

  onDriverAgeChanged(subCover: Policy,value:number){
    let property = new SubCoverProperty({
      name:'EachDriverAge',
      value:value
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

  get grantedDriversFeatureEnabled():boolean{
    return this.applicationModeStrategy.grantedDriversFeatureEnabled;
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
