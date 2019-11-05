import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";

export class DriverAges {
  public static seventeen: Lookable = {
    name: "17",
    id: 17
  };
  public static twentyOne: Lookable = {
    name: "21",
    id: 21
  };
  public static twentyFour: Lookable = {
    name: "24",
    id: 24
  };
  public static forty: Lookable = {
    name: "40",
    id: 40
  };


  public static all:Lookable[] = [DriverAges.seventeen, DriverAges.twentyOne, DriverAges.twentyFour , DriverAges.forty];

}
