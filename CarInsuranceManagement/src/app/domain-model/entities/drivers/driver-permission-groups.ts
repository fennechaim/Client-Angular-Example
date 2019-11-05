import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";

export const DriverPermissionGroups = [

  new Lookable( {
    name: "singleDriver",
    id: 1
  }),
  new Lookable ({
    name: "partnerDriver",
    id: 2
  }),
  new Lookable ({
    name: "upToThreeDrivers",
    id: 3
  }),
  new Lookable({
    name: "anyDriver",
    id: 4
})



];
