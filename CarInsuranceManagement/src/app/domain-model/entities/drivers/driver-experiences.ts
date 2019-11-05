import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";

export  class DriverExperiences{
  public static moreThanTwoYears:Lookable = {
    name: "DRIVER_EXPERIENCE_RANGE_TWO_YEARS",
    id: 1
  };
  public static lessThanTwoYears:Lookable = {
    name: "DRIVER_EXPERIENCE_RANGE_LESS_THAN_TWO_YEARS",
    id: 0
  };

  public static all:Lookable[] = [DriverExperiences.moreThanTwoYears, DriverExperiences.lessThanTwoYears];
}

