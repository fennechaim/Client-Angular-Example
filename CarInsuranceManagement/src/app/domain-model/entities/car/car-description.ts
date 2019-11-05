export class CarDescription{
  engineCapacity:number;
  govModel:string;
  isEsp:boolean;
  isFcw:boolean;
  isLdw:boolean;
  leviModel:string;
  price:number;
  airBags:number;
  weight:number;
  isCommercial:boolean;

  constructor(props){
    Object.assign(this,props);
  }
}
