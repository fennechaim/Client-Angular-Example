import { Lookable } from "client-infrastructure/src/domain-model/entities/lookable/lookable";


export  class ComprehensiveDrugSubCoverOptions{

  public static item1:Lookable = new Lookable({id:1,name:'Comprehensive_Drug_Provider_1'});
  public static item2:Lookable = new Lookable({id:2,name:'Comprehensive_Drug_Provider_2'});
  public static item3:Lookable = new Lookable({id:3,name:'Comprehensive_Drug_Provider_3'});

  public static all:Lookable[] = [ComprehensiveDrugSubCoverOptions.item1,ComprehensiveDrugSubCoverOptions.item2,ComprehensiveDrugSubCoverOptions.item3];
}
