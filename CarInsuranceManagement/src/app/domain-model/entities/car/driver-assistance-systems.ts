import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";

export class DriverAssistanceSystems{

  public static  originalSystem:Lookable =  {    name: "OriginalSystem",    id: 1 , description:"מערכת מקורית" };

  public static  mobileye:Lookable =  {    name: "Mobileye",    id: 2 , description:"Mobileye - מובילאיי" };

  public static  awacs:Lookable =  {    name: "AWACS",    id: 3 , description:"AWACS – איווקס" };


  public static all:Lookable[] = [DriverAssistanceSystems.originalSystem,DriverAssistanceSystems.mobileye,DriverAssistanceSystems.awacs ];

}
