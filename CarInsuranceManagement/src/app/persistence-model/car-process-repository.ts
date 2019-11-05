import {Injectable} from "@angular/core";
import {RequestExecutor} from "client-infrastructure/src/domain-model/services/http/request-executor";
import {Observable} from "rxjs/Observable";
import {CarInsuranceProcess} from "../domain-model/entities/process/car-insurance-process";
import {LocalStorageService} from "angular-2-local-storage";
import {Car} from "../domain-model/entities/car/car";
import {PolicyOwner} from "client-infrastructure/src/domain-model/entities/policies/policy-owner";
import {Questionnaire} from "client-infrastructure/src/domain-model/entities/questionnaires/questionnaire";
import {Policy} from "client-infrastructure/src/domain-model/entities/policies/policy";
import {VehicleDriver} from "client-infrastructure/src/domain-model/entities/vehicles/vehicle-driver";
import {CarSupplementaryDetails} from "../domain-model/entities/process/car-supplementary-details";
import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";
import {CarPolicy} from "../domain-model/entities/policy/car-policy";

@Injectable()
export class CarProcessRepository{

  constructor(private localStorageService: LocalStorageService ,private requestExecutor:RequestExecutor){
  }

  startProcess(): Observable<CarInsuranceProcess> {
    return this.requestExecutor.executePost('',{}).map(r => new CarInsuranceProcess({id:r.processId}));
  }

  recoverProcess(process: CarInsuranceProcess) : Observable<any>{
    return this.requestExecutor.executeGet(`${process.id}/recoverProcess`);
  }

  saveProcess(process: CarInsuranceProcess) {
    this.localStorageService.set('process', process);
  }

  getCarInsuranceProcess(): CarInsuranceProcess {
    let process: CarInsuranceProcess = this.localStorageService.get<CarInsuranceProcess>('process');
    if (process == null) {
      process = new CarInsuranceProcess();
      this.localStorageService.set('process', process);
      return process
    }

    return new CarInsuranceProcess(process);
  }

  createCar(process: CarInsuranceProcess, car: Car): Observable<any> {
    return this.requestExecutor.executePost(`${process.id}/cars`, {
      carManufacturer:car.manufacturer,
      carModel:car.model,
      year:car.year,
      subDescription:car.subDescription,
      fcwManufacturer:car.fcwSystem,
      ldwManufacturer:car.ldwSystem
    });
  }

  updateContactAndCar(process: CarInsuranceProcess, policyOwner: PolicyOwner, car: Car):Observable<any> {
    return this.requestExecutor.executePost(`${process.id}/cars/policyowner`, {
      policyOwner: policyOwner,
      car: car
    });
  }

  createOrUpdatePolicyOwner(process: CarInsuranceProcess, policyOwner: PolicyOwner): Observable<any> {
    return this.requestExecutor.executePost(`${process.id}/customers`, {
      firstName: policyOwner.fullName.firstName,
      lastName: policyOwner.fullName.lastName,
      gender: policyOwner.gender
    });
  }

  updateCarDetails(process: CarInsuranceProcess, car:Car){
    return this.requestExecutor.executePost(`${process.id}/cars`, car);
  }

  answerQuestionnaire(process: CarInsuranceProcess) {
    let questionnaire: Questionnaire = process.policyOwner.questionnaire;
    return this.requestExecutor.executePost(`${process.id}/questionnaires/${questionnaire.id}`, questionnaire);
  }

  goBackToPreviousStep(process: CarInsuranceProcess): Observable<boolean> {
    return this.requestExecutor.executePost(`${process.id}/previousstep`, {});
  }

  updateCarDrivers(process: CarInsuranceProcess, drivers: VehicleDriver[]) : Observable<any> {
    drivers.forEach(d => d.age = null);
    return this.requestExecutor.executePost(`${process.id}/drivers`, drivers);
  }

  savePolicyStartDate(policyStartDate:Date, process: CarInsuranceProcess) {
    return this.requestExecutor.executePost(`${process.id}/startdate`, policyStartDate);
  }

  acceptOffer(process: CarInsuranceProcess, policies: Policy[]) {

    let policyIds:Array<number> = [];
    policies.forEach(p => {
      policyIds.push(p.policyItemId);
    })

    return this.requestExecutor.executePost(`${process.id}/proposals/acceptance`,policyIds);
  }

  updateValidationStatus(process: CarInsuranceProcess, policy: Policy, subCover: Policy, validationStatus: Lookable):Observable<Policy> {
    let url:string = `${process.id}/proposals/${policy.policyItemId}/covers/${subCover.parentId}/subcovers/${subCover.policyItemId}/validationstatuses`;
    return this.requestExecutor.executePut(url, validationStatus).map(x => new CarPolicy(x.response.policy));
  }

  saveSupplementaryDetails(process: CarInsuranceProcess,supplementaryDetails:CarSupplementaryDetails, isCredit:boolean) {


    let owner:any = supplementaryDetails.policyOwner;
    owner.firstName = supplementaryDetails.policyOwner.fullName.firstName;
    owner.lastName = supplementaryDetails.policyOwner.fullName.lastName;

    return this.requestExecutor.executePost(`${process.id}/supplementarydetails`, {
      policyOwner: owner,
      car: supplementaryDetails.car,
      subordinateEntity : supplementaryDetails.subOrdinateEntity,
      isCredit:isCredit,
      specifiedDrivers:supplementaryDetails.specifiedDrivers
    });
  }

  sendCreditCardResponse(process: CarInsuranceProcess) {
    return this.requestExecutor.executePost(`${process.id}/payments/success`, {});
  }

  updateProperty(process: CarInsuranceProcess, policy: Policy, subCover: Policy,property:any):Observable<any> {
    let subCoverPolicyItemId:number = subCover.policyItemId;
    let coverPolicyItemId:number = subCover.parentId;
    let url:string = `${process.id}/proposals/${policy.policyItemId}/covers/${coverPolicyItemId}/subcovers/${subCoverPolicyItemId}/properties`;
    return this.requestExecutor.executePost(url, property);
  }

  getSubstantialDocumentPdf(process: CarInsuranceProcess) :Observable<any>{
    let url:string = `${process.id}/GetDocument/substantial`;
    return this.requestExecutor.executeGet(url);
  }

  getCarDetails(process: CarInsuranceProcess, car: Car):Observable<any>{
    let url:string = `${process.id}/cars/manufacturers/${car.manufacturer.code}/models/${car.model.code}/years/${car.year}`;
    return this.requestExecutor.executePost(url, {
      description: car.model.description,
      subDescription: car.subDescription
    });
  }
}
