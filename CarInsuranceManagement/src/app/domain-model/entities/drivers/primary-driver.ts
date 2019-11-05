import {PolicyOwner} from "client-infrastructure/src/domain-model/entities/policies/policy-owner";
import {DateProvider} from "client-infrastructure/src/domain-model/services/dates/date-provider.service";

export class PrimaryDriver extends PolicyOwner{
  driverLicenseIssuingYear:string;
  driverLicenseIssuingMonth:string;
  isPrimary:boolean = true;

  constructor(props:any) {
    super(props);
    Object.assign(this, props);
  }

  get drivingExperienceInYears():number{
    if(!this.driverLicenseIssuingMonth == null)
      return -1;

    if(!this.driverLicenseIssuingYear)
      return -1;

    let date:Date = new Date(+this.driverLicenseIssuingYear,+this.driverLicenseIssuingMonth);
    let totalYearsFromToday: number = DateProvider.current.getTotalYearsFromToday(date);
    return totalYearsFromToday;
  }

  get age():number{
    let totalYearsFromToday: number = DateProvider.current.getTotalYearsFromToday(this.birthDate)
    return totalYearsFromToday;
  }

  get isNewDriver():boolean{
    let drivingExperienceInYears:number = this.drivingExperienceInYears;
    return drivingExperienceInYears > 0 && drivingExperienceInYears <= 2;
  }

  get isYoungDriver():boolean{
    let age =  this.age;
    return age < 24;
  }

  get isYoungOrNewDriver():boolean{
    return this.isYoungDriver || this.isNewDriver;
  }
}
