import {Lookable} from "client-infrastructure/src/domain-model/entities/lookable/lookable";

export const CAR_PRICE_TYPES = [

  new Lookable( {
    name: "CarFullPrice",
    id: 1
  }),
  new Lookable ({
    name: "AccidentWaiver",
    id: 2
  }),
  new Lookable ({
    name: "TheftWaiver",
    id: 3
  })
];
