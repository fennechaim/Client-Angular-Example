
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";
import {Questionnaire} from "client-infrastructure/src/domain-model/entities/questionnaires/questionnaire";
import {PolicyOwner} from "client-infrastructure/src/domain-model/entities/policies/policy-owner";
import {Policy} from "client-infrastructure/src/domain-model/entities/policies/policy";
import {PolicyValidationStatuses} from "client-infrastructure/src/domain-model/entities/policies/policy-validation-statuses";
import { VehicleDriver } from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-driver";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import { DateProvider } from "client-infrastructure/src/domain-model/services/dates/date-provider.service";
import { ISubCoverToggler } from "client-infrastructure/src/domain-model/services/policies/isub-cover-toggler"
import { ISubCoverPropertyUpdater } from "client-infrastructure/src/domain-model/services/policies/isub-cover-property-updater"
import { IProcessProvider } from "client-infrastructure/src/forms/wizard/iprocess-provider";
import {YoungDriversContext} from "../../entities/drivers/youngDrivesContext";
import { KeyedCollection } from "client-infrastructure/src/domain-model/services/collections/keyed-collection";
import {SubCoverProperty} from "client-infrastructure/src/domain-model/entities/policies/sub-cover-property";
import {CarDescription} from "../../entities/car/car-description";
import {CarSupplementaryDetails} from "../../entities/process/car-supplementary-details";
import {CAR_OWNERSHIPS} from "../../entities/car/car-ownerships";
import {ApplicationModeStrategy} from "../../../application-model/modes/application-mode-strategy";
import {PrimaryDriver} from "../../entities/drivers/primary-driver";
import {CarPolicy} from "../../entities/policy/car-policy";
import {CarInsuranceProcess} from "../../entities/process/car-insurance-process";
import {Car} from "../../entities/car/car";
import {CarProcessRepository} from "../../../persistence-model/car-process-repository";
import {DriverExperiences} from "../../entities/drivers/driver-experiences";
import {DriverAges} from "../../entities/drivers/driver-ages";


@Injectable()
export class ProcessManagementService implements IProcessProvider<CarInsuranceProcess>, ISubCoverToggler, ISubCoverPropertyUpdater{



  process:CarInsuranceProcess;



  drivingExperienceRange = new KeyedCollection<Lookable[]>();
  drivingAgeRange = new KeyedCollection<Lookable[]>();

  constructor(private applicationModeStrategy:ApplicationModeStrategy, private dateProvider:DateProvider,private carProcessRepository:CarProcessRepository){
    console.log('process management service - constructor')
  }

  startProcess():Observable<CarInsuranceProcess>{
    let observable:Observable<CarInsuranceProcess>  = this.carProcessRepository.startProcess();
    observable.subscribe((process:CarInsuranceProcess) => {
      this.process = process;
      this.carProcessRepository.saveProcess(this.process);
    });
    return observable;
  }

  createOrUpdatePolicyOwner(policyOwner:PolicyOwner):Observable<PolicyOwner>{
    let observable: Observable<PolicyOwner>  =  this.carProcessRepository.createOrUpdatePolicyOwner(this.process, policyOwner);

    observable.subscribe(x =>{
      this.process.policyOwner.fullName = policyOwner.fullName;
      this.process.policyOwner.gender = policyOwner.gender;
      this.carProcessRepository.saveProcess(this.process);
    });
    return observable;
  }


  updateContactAndCar(policyOwner:PolicyOwner, car:Car):Observable<any> {
    let observable: Observable<any> =   this.carProcessRepository.updateContactAndCar(this.process, policyOwner, car);

    observable.subscribe( (x:any ) => {
      this.process.policyOwner.email = policyOwner.email;
      this.process.policyOwner.phoneNumber = policyOwner.phoneNumber;
      this.process.insuredCar.carUsageType = car.carUsageType;
      this.process.insuredCar.carOwnerType = car.carOwnerType;
      this.carProcessRepository.saveProcess(this.process);
    });
    return observable;
  }

  getProcess():CarInsuranceProcess {
    if(this.process == null){
      this.process = this.carProcessRepository.getCarInsuranceProcess();
    }
    return this.process;
  }

  goBackToPreviousStep():Observable<boolean> {
    let observable: Observable<any> = this.carProcessRepository.goBackToPreviousStep(this.process);
    observable.subscribe( (x:any ) => {
      return true;
    });
    return observable;
  }

  getDefaultDrivingExperience(subCover:Policy){
   let items: Lookable[] = this.getDriverExperienceRange(subCover);
   return items[0];
  }

  getDefaultDrivingAge(subCover:Policy){
    let items: Lookable[] = this.getDriverAgeRange(subCover);
    return items[0];
  }

  getDriverExperienceRange(subCover:Policy):Lookable[]{

    const key = subCover.name;
    if(this.drivingExperienceRange.ContainsKey(key))
      return this.drivingExperienceRange.Item(key);

    let filteredItems =  DriverExperiences.all.filter(x => {
      if(key === 'CarComprehensivePartialDamageSubcover') {
        return x.id == 0 || x.id == 1;

      }
      if(key === 'ThirdPartyInsuranceSubcover'){
        return x.id == 0;
      }
      return false;

    });

    this.drivingExperienceRange[key] = filteredItems;
    return this.drivingExperienceRange[key];
  }

  getComprehensiveDriverAgeRange():Lookable[]{
     return this.process.getComprehensiveDriverAgeRange();
  }

  getThirdPartyDrivingAgeRange():Lookable[]{
    return this.process.getThirdPartyDrivingAgeRange();
  }

  getComprehensiveDrivingExperienceRange():Lookable[]{
    return this.process.getComprehensiveDrivingExperienceRange();
  }
  getThirdPartyDrivingExperienceRange():Lookable[]{
     return this.process.getThirdPartyDrivingExperienceRange();
  }



  getDriverAgeRange(subCover:Policy):Lookable[]  {
    const key = subCover.name;
    if(this.drivingAgeRange.ContainsKey(key))
      return this.drivingAgeRange.Item(key);

    let filteredItems =  DriverAges.all.filter(x => {


      if(key === 'CarComprehensivePartialDamageSubcover') {

        if(this.process.totalNewOrYoungDrivers > 2)
          return x.id == 17;

        return x.id == 24 || x.id == 40;

      }
      if(key === 'ThirdPartyInsuranceSubcover'){
        if(this.process.totalNewOrYoungDrivers > 2)
          return x.id == 17 || x.id == 21;

        return x.id == 24 || x.id == 40;
      }

      return false;



    });

    this.drivingAgeRange[key] = filteredItems;
    return this.drivingAgeRange[key];
  }

  getCarOwnerships():Observable<Lookable[]>  {
    return Observable.from([CAR_OWNERSHIPS]);
  }

  getCarUsages():Observable<Lookable[]>  {
    return this.applicationModeStrategy.getCarUsages();
  }




  createCar(car: Car):Observable<any>{

    let observable: Observable<any> = this.carProcessRepository.createCar(this.process, car);
    observable.subscribe( (x:any ) => {
      this.process.updateCar(car);
      this.carProcessRepository.saveProcess(this.process);

      return car;
    });
    return observable;
  }

  saveProcess(process:CarInsuranceProcess){
    this.process = process;
    this.carProcessRepository.saveProcess(this.process);

  }

  updateCarDrivers(context:YoungDriversContext) :Observable<any>{
    let allDrivers = context.additionalDrivers.concat(context.primaryDriver);
    allDrivers.forEach(d => {
      let birthDayInput = d.birthDate as any;
      let birthDate:Date = this.dateProvider.toDate(birthDayInput as NgbDateStruct);
      d.birthDate = birthDate;
      d.age = null;
      d.drivingExperience = null;
    });

    let  noSpecifiedDrivers:boolean = context.totalYoungOrNewDrivers > 2;

    let specifiedDrivers:VehicleDriver[] = noSpecifiedDrivers ?  [context.primaryDriver] : allDrivers;

    let observable: Observable<any> = this.carProcessRepository.updateCarDrivers(this.process, specifiedDrivers);
    observable.subscribe( (x:any ) => {


      let questionnaire:Questionnaire = x.response.questionnaire as Questionnaire;
      let policyPrimaryDriver:PrimaryDriver = this.process.policyOwner as PrimaryDriver;
      policyPrimaryDriver.questionnaire = questionnaire;
      policyPrimaryDriver.driverLicenseIssuingYear = context.primaryDriver.driverLicenseIssuingYear;
      policyPrimaryDriver.driverLicenseIssuingMonth = context.primaryDriver.driverLicenseIssuingMonth;
      policyPrimaryDriver.birthDate = context.primaryDriver.birthDate;

      this.process.hasAdditionalDrivers = context.hasAdditionalDrivers;
      this.process.totalExtraDrivers = context.totalExtraDrivers;
      this.process.isPolicyOwnerYoungestDriver = context.isPolicyOwnerYoungestDriver;
      this.process.totalNewOrYoungDrivers = context.totalYoungOrNewDrivers;
      if(noSpecifiedDrivers){
        this.process.firstYoungDriver = null;
        this.process.secondYoungDriver = null;

      }else{
        if(context.additionalDrivers.length >= 1){
          let firstYoungDriver = context.additionalDrivers[0];
          this.process.firstYoungDriver.driverLicenseIssuingMonth = firstYoungDriver.driverLicenseIssuingMonth;
          this.process.firstYoungDriver.driverLicenseIssuingYear = firstYoungDriver.driverLicenseIssuingYear;
          this.process.firstYoungDriver.birthDate = firstYoungDriver.birthDate;
          this.process.firstYoungDriver.fullName = firstYoungDriver.fullName;
        }

        if(context.additionalDrivers.length >=2){
          let secondYoungDriver = context.additionalDrivers[1];
          this.process.secondYoungDriver.driverLicenseIssuingMonth = secondYoungDriver.driverLicenseIssuingMonth;
          this.process.secondYoungDriver.driverLicenseIssuingYear = secondYoungDriver.driverLicenseIssuingYear;
          this.process.secondYoungDriver.birthDate = secondYoungDriver.birthDate;
          this.process.secondYoungDriver.fullName = secondYoungDriver.fullName;
        }
      }



      this.carProcessRepository.saveProcess(this.process);

    });
    return observable;
  }

  answerQuestionnaire(questionnaire: Questionnaire):Observable<any> {
    let observable: Observable<any> = this.carProcessRepository.answerQuestionnaire(this.process);
    observable.subscribe( (x:any ) => {
    });
  return observable;

  }

  savePolicyStartDate(insuranceStartDate:NgbDateStruct):Observable<any>  {
    let policyStartDate:Date = this.dateProvider.toDate(insuranceStartDate);
    let observable: Observable<any> = this.carProcessRepository.savePolicyStartDate(policyStartDate,this.process);
    observable.subscribe((x:any) => {
      if(x.response == null || x.response.carInsurancePolicyProposals == null)
        return;

      let proposals: any = x.response.carInsurancePolicyProposals;
      this.saveCarProposals(proposals, true);

    });

    return observable;
  }

  public saveCarProposals(proposals: any,isCompulsoryIncluded?:boolean) {
    this.process.savePolicies(proposals,isCompulsoryIncluded);
    this.carProcessRepository.saveProcess(this.process);
  }

  acceptOffer(policy:Policy) {
    let acceptedPolicies:[Policy] = [policy];
    let carPolicy:CarPolicy = policy as CarPolicy;
    if(carPolicy.isCompulsoryIncluded){
      acceptedPolicies.push(this.process.compulsoryPolicy);
    }
    let observable: Observable<Policy> = this.carProcessRepository.acceptOffer(this.process, acceptedPolicies);
    observable.subscribe((x:any) => {

      this.process.markPoliciesAsAccepted(acceptedPolicies);

      if(x.response && x.response.supplementaryDetailsResult){
        this.process.availableProtectionSystems = x.response.supplementaryDetailsResult.protectionSystems || [];
        this.process.cashPaymentAvailable =  x.response.supplementaryDetailsResult.cashPaymentAvailable;
      }else{
        this.process.availableProtectionSystems = [];
        this.process.cashPaymentAvailable = false;
      }
      this.carProcessRepository.saveProcess(this.process);
      return x;
    });
    return observable;
  }

  toggleSubCover(policy:Policy, subCover: Policy): Observable<Policy> {
    console.log('process management service - toggle sub cover', subCover);
    let validationStatus:Lookable = subCover.validationStatus.id == PolicyValidationStatuses.outPolicy.id ?
      PolicyValidationStatuses.inPolicy : PolicyValidationStatuses.outPolicy;

    let observable: Observable<Policy> = this.carProcessRepository.updateValidationStatus(this.process, policy, subCover ,validationStatus).map( (updatedPolicy:Policy) => {

      this.process.updatePolicy(updatedPolicy);
      this.carProcessRepository.saveProcess(this.process);
      return policy;
    }).share();
    return observable;
  }


  saveSupplementaryDetails(supplementaryDetails:CarSupplementaryDetails, isCredit:boolean) {
    let observable: Observable<boolean> = this.carProcessRepository.saveSupplementaryDetails(this.process, supplementaryDetails, isCredit).map(r => {
      this.process.saveSupplementaryDetails(supplementaryDetails);
      if(r.response!= null && r.response.paymentUrlResponse != null){
        this.process.paymentUrl = r.response.paymentUrlResponse.paymentUrl;
      }
      this.carProcessRepository.saveProcess(this.process);
      return true;
    });
    return observable;
  }

  sendPaymentStatus(process: CarInsuranceProcess):Observable<any> {
    return this.carProcessRepository.sendCreditCardResponse(process);
  }

  updateProperty(policy: Policy, subCover: Policy, property:SubCoverProperty ) :Observable<Policy> {
    let observable: Observable<Policy> = this.carProcessRepository.updateProperty(this.process, policy, subCover, property).map( (x:any) => {
      let proposals: any = x.response.carInsurancePolicyProposals;
      this.saveCarProposals(proposals);


      const policySubCover = policy.getSubCoverByName(subCover.name);
      if(policySubCover != null){
        subCover.finalPremium = policySubCover.finalPremium;
      }


      this.carProcessRepository.saveProcess(this.process);
      return policy;
    });
    return observable;
  }

  getSubstantialDocumentPdf(process: CarInsuranceProcess) :Observable<any>{
    return this.carProcessRepository.getSubstantialDocumentPdf(process);
  }

  getCarDetails(car: Car):Observable<CarDescription> {
    let observable: Observable<CarDescription> = this.carProcessRepository.getCarDetails(this.process, car).map( (x:any) => {
      return new CarDescription(x.response.car);
    });
    return observable;
  }
}
