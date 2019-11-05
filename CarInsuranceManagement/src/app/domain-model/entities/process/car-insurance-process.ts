import {DriverAges} from "../drivers/driver-ages";
import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";
import {PrimaryDriver} from "../drivers/primary-driver";
import {DriverExperiences} from "../drivers/driver-experiences";
import {CarPolicy} from "../policy/car-policy";
import {Car} from "../car/car";
import {SubordinateEntity} from "client-infrastructure/src/domain-model/entities/subordinates/subordinate-entity";
import {VehicleDriver} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-driver";
import {ComprehensiveDrugSubCoverOptions} from "../policy/comprehensive-drug-sub-covers-options";
import {AbstractProcess} from "client-infrastructure/src/domain-model/entities/processes/abstract-process";
import {CarSupplementaryDetails} from "./car-supplementary-details";
import {Policy} from "client-infrastructure/src/domain-model/entities/policies/policy";
import {PolicyOwner} from "client-infrastructure/src/domain-model/entities/policies/policy-owner";

export class CarInsuranceProcess extends AbstractProcess{
  hasAdditionalDrivers:boolean;
  totalExtraDrivers:number;
  isTechnologyDisclaimerAccepted:boolean;
  isEssentialDocumentDisclaimerAccepted:boolean;
  minAccessoryInsuranceSum:number = 10000;
  firstYoungDriver:VehicleDriver;
  secondYoungDriver:VehicleDriver;
  totalNewOrYoungDrivers:number;
  isPolicyOwnerYoungestDriver:boolean;
  insuredCar:Car;
  carDeductible:Lookable = new Lookable({id:3,name:''});
  carPriceType:Lookable = new Lookable({id:1,name:''});
  subordinatedCar:SubordinateEntity;
  cashPaymentAvailable:boolean;
  compulsoryPolicy: CarPolicy;
  comprehensivePolicy: CarPolicy;
  thirdPartyPolicy: CarPolicy;
  thirdPartyPolicySelectedAge:Lookable ;
  thirdPartyPolicySelectedDrivingExperience:Lookable;
  comprehensivePolicySelectedAge:Lookable;
  comprehensivePolicySelectedDrivingExperience:Lookable;
  isDrivingInShabat:boolean = true ;
  driverPermissionGroup:Lookable = new Lookable({id:1,name:''});
  selectedComprehensiveDrugsSubCoverProvider:Lookable = ComprehensiveDrugSubCoverOptions.item1;
  availableProtectionSystems:Lookable[] = [];
  paymentUrl:string;

  get comprehensiveDrugSubCoverOptions():Lookable[]{
    return ComprehensiveDrugSubCoverOptions.all;
  }

  setSelectedComprehensiveDrugsSubCoverProvider(id:number){
    let provider:Lookable = this.comprehensiveDrugSubCoverOptions.find(provider => provider.id == id);
    this.selectedComprehensiveDrugsSubCoverProvider = provider;
  }

  get name(): string {
    return "Car Insurance Process";
  }
  constructor(props:any={}){
    super(props);
    Object.assign(this,props);

    this.insuredCar = props.insuredCar ? new Car(props.insuredCar) : new Car({});
    this.policyOwner = props.policyOwner ? new PrimaryDriver(props.policyOwner) : new PrimaryDriver({});

    if(props.compulsoryPolicy){
      this.compulsoryPolicy = new CarPolicy(props.compulsoryPolicy);
    }
    if(props.comprehensivePolicy){
      this.comprehensivePolicy = new CarPolicy(props.comprehensivePolicy);
    }

    if(props.thirdPartyPolicy){
      this.thirdPartyPolicy = new CarPolicy(props.thirdPartyPolicy);
    }

    this.firstYoungDriver = new VehicleDriver(props.firstYoungDriver != null ? props.firstYoungDriver : {});
    this.firstYoungDriver.isPrimary = false;
    this.secondYoungDriver = new VehicleDriver(props.secondYoungDriver != null ? props.secondYoungDriver : {});
    this.secondYoungDriver.isPrimary = false;
  }

  getComprehensiveDriverAgeRange():Lookable[]{


    let policyOwner:PrimaryDriver = this.policyOwner as PrimaryDriver;
    if(!policyOwner.isYoungOrNewDriver && this.totalNewOrYoungDrivers == 0){
      return [DriverAges.twentyFour,DriverAges.forty];
    }
    if(!policyOwner.isYoungOrNewDriver
      && !this.isPolicyOwnerYoungestDriver
      && this.totalNewOrYoungDrivers > 2){
      return [DriverAges.seventeen];
    }

    if(!policyOwner.isYoungOrNewDriver && !this.isPolicyOwnerYoungestDriver && this.totalNewOrYoungDrivers > 0 &&  this.totalNewOrYoungDrivers  <= 2){
      return [DriverAges.twentyFour,DriverAges.forty];
    }

    if(!policyOwner.isYoungOrNewDriver && this.totalNewOrYoungDrivers > 2){
      return [DriverAges.twentyFour,DriverAges.forty];
    }

    if(policyOwner.isYoungOrNewDriver ){
      return [DriverAges.seventeen];
    }

    return [DriverAges.twentyFour,DriverAges.forty];
  }

  getThirdPartyDrivingAgeRange():Lookable[]{
    let policyOwner:PrimaryDriver = this.policyOwner as PrimaryDriver;

    if(this.totalNewOrYoungDrivers == 0 && !policyOwner.isYoungOrNewDriver){
      return [DriverAges.twentyFour,DriverAges.forty];
    }

    if(!policyOwner.isYoungOrNewDriver && !this.isPolicyOwnerYoungestDriver && this.totalNewOrYoungDrivers > 0 &&  this.totalNewOrYoungDrivers  <= 2){
      return [DriverAges.seventeen, DriverAges.twentyOne, DriverAges.twentyFour,DriverAges.forty];
    }


    if(!policyOwner.isYoungOrNewDriver
      && !this.isPolicyOwnerYoungestDriver
      && this.totalNewOrYoungDrivers > 2){
      return [DriverAges.seventeen,DriverAges.twentyOne];
    }


    if(!policyOwner.isYoungOrNewDriver && this.totalNewOrYoungDrivers > 2){
      return [DriverAges.twentyFour,DriverAges.forty];
    }

    if(!policyOwner.isYoungOrNewDriver
      && !this.isPolicyOwnerYoungestDriver
      && this.totalNewOrYoungDrivers == 1){
      return [DriverAges.twentyFour,DriverAges.forty];
    }

    if(policyOwner.isYoungOrNewDriver){
      return [DriverAges.seventeen,DriverAges.twentyOne];
    }
    return [DriverAges.twentyFour,DriverAges.forty];
  }


  getComprehensiveDrivingExperienceRange():Lookable[]{

    let policyOwner:PrimaryDriver = this.policyOwner as PrimaryDriver;

    if(this.totalNewOrYoungDrivers == 0 && !policyOwner.isYoungOrNewDriver){
      return [DriverExperiences.moreThanTwoYears];
    }

    if(!policyOwner.isYoungOrNewDriver && !this.isPolicyOwnerYoungestDriver && this.totalNewOrYoungDrivers > 0 &&  this.totalNewOrYoungDrivers  <= 2){
      return [DriverExperiences.moreThanTwoYears];
    }

    if(!policyOwner.isYoungOrNewDriver
      && !this.isPolicyOwnerYoungestDriver
      && this.totalNewOrYoungDrivers > 2){
      return [DriverExperiences.lessThanTwoYears, DriverExperiences.moreThanTwoYears];
    }

    if(!policyOwner.isYoungOrNewDriver && this.totalNewOrYoungDrivers > 2){
      return [DriverExperiences.lessThanTwoYears];
    }

    if(!policyOwner.isYoungOrNewDriver
      && !this.isPolicyOwnerYoungestDriver
      && this.totalNewOrYoungDrivers == 1){
      return [DriverExperiences.moreThanTwoYears];
    }

    if(policyOwner.isYoungOrNewDriver){
      return [DriverExperiences.lessThanTwoYears];
    }
    return [DriverExperiences.lessThanTwoYears,DriverExperiences.moreThanTwoYears];
  }
  getThirdPartyDrivingExperienceRange():Lookable[]{
    let policyOwner:PrimaryDriver = this.policyOwner as PrimaryDriver;

    if(this.totalNewOrYoungDrivers == 0 && !policyOwner.isYoungOrNewDriver){
      return [DriverExperiences.moreThanTwoYears];
    }

    if(!policyOwner.isYoungOrNewDriver && !this.isPolicyOwnerYoungestDriver && this.totalNewOrYoungDrivers > 0 &&  this.totalNewOrYoungDrivers  <= 2){
      return [DriverExperiences.lessThanTwoYears, DriverExperiences.moreThanTwoYears];    }


    if(!policyOwner.isYoungOrNewDriver
      && !this.isPolicyOwnerYoungestDriver
      && this.totalNewOrYoungDrivers > 2){
      return [DriverExperiences.lessThanTwoYears, DriverExperiences.moreThanTwoYears];
    }

    if(!policyOwner.isYoungOrNewDriver && this.totalNewOrYoungDrivers > 2){
      return [DriverExperiences.lessThanTwoYears];
    }

    if(!policyOwner.isYoungOrNewDriver
      && !this.isPolicyOwnerYoungestDriver
      && this.totalNewOrYoungDrivers == 1){
      return [DriverExperiences.moreThanTwoYears];
    }


    if(policyOwner.isYoungOrNewDriver){
      return [DriverExperiences.lessThanTwoYears];
    }
    return [DriverExperiences.lessThanTwoYears,DriverExperiences.moreThanTwoYears];
  }

  get policies():Policy[]{
    return [this.compulsoryPolicy, this.comprehensivePolicy, this.thirdPartyPolicy];
  }


  public updatePolicy(policy:CarPolicy):void {
    if (this.comprehensivePolicy.policyItemId == policy.policyItemId) {
      Object.assign(this.comprehensivePolicy, policy);
    }
    else if (this.compulsoryPolicy.policyItemId == policy.policyItemId) {
      Object.assign(this.compulsoryPolicy, policy);
    }
    else if (this.thirdPartyPolicy.policyItemId == policy.policyItemId) {
      Object.assign(this.thirdPartyPolicy, policy);
    }
  }

  savePolicies(proposals: any, isCompulsoryIncluded: boolean) {
    let comprehensiveInsurancePolicyProposal: CarPolicy = proposals.comprehensiveInsurancePolicyProposal;
    let compulsoryInsurancePolicyProposal: CarPolicy = proposals.compulsoryInsurancePolicyProposal;
    let thirdPartyInsurancePolicyProposal: CarPolicy = proposals.thirdPartyInsurancePolicyProposal;
    this.policyStartDate = compulsoryInsurancePolicyProposal.startDate;
    this.policyEndDate = compulsoryInsurancePolicyProposal.endDate;

    if(isCompulsoryIncluded){
      this.comprehensivePolicy = new CarPolicy(comprehensiveInsurancePolicyProposal);
      this.compulsoryPolicy = new CarPolicy(compulsoryInsurancePolicyProposal); ;
      this.thirdPartyPolicy = new CarPolicy(thirdPartyInsurancePolicyProposal);;
      this.comprehensivePolicy.isCompulsoryIncluded = true;
      this.compulsoryPolicy.isCompulsoryIncluded = false;
      this.thirdPartyPolicy.isCompulsoryIncluded = true;
    }else{
      Object.assign(this.comprehensivePolicy, comprehensiveInsurancePolicyProposal);
      Object.assign(this.compulsoryPolicy, compulsoryInsurancePolicyProposal);
      Object.assign(this.thirdPartyPolicy, thirdPartyInsurancePolicyProposal);
    }
  }

  markPoliciesAsAccepted(acceptedPolicies: Policy[]) {
    this.policies.forEach(p => p.isAccepted = false);
    acceptedPolicies.forEach(accepted => {
      let policy:Policy = this.policies.find(p => p.policyItemId == accepted.policyItemId);
      policy.isAccepted = true;
    });
  }

  savePolicyOwner(policyOwner: PolicyOwner) {
    Object.assign(this.policyOwner,policyOwner);
  }

  saveSupplementaryDetails(supplementaryDetails: CarSupplementaryDetails) {
    this.savePolicyOwner(supplementaryDetails.policyOwner);
    this.subordinatedCar = supplementaryDetails.subOrdinateEntity;
    this.insuredCar.enslavedCar = supplementaryDetails.car.enslavedCar;
    this.insuredCar.licenseNumber = supplementaryDetails.car.licenseNumber;
    this.insuredCar.protectionSystem = supplementaryDetails.car.protectionSystem;
    if(supplementaryDetails.specifiedDrivers.length > 0){
      this.firstYoungDriver.idNumber = supplementaryDetails.specifiedDrivers[0].idNumber;
      this.firstYoungDriver.fullName = supplementaryDetails.specifiedDrivers[0].fullName;
    }

    if(supplementaryDetails.specifiedDrivers.length > 1){
      this.secondYoungDriver.idNumber = supplementaryDetails.specifiedDrivers[1].idNumber;
      this.secondYoungDriver.fullName = supplementaryDetails.specifiedDrivers[1].fullName;
    }

  }

  updateCar(car: Car) {
    Object.assign(this.insuredCar,car);
  }
}
