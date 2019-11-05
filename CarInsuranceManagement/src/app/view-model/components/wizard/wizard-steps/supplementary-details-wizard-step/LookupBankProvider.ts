import {Injectable, Inject} from "@angular/core";
import {Observable} from "rxjs";


import {Http, Response} from "@angular/http";

import {BankProvider} from "client-infrastructure/src/domain-model/services/lookups/bank-provider";
import {FinanceCompanyBranch} from "client-infrastructure/src/domain-model/entities/subordinates/finance-company-branch";


@Injectable()
export class LookupBankProvider extends BankProvider{

  banks:FinanceCompanyBranch[] = [];

  constructor(@Inject('lookupApiBaseUrl') private lookupApiBaseUrl:string, private http: Http){
    super();
  }

  getAllBanks(): Observable<FinanceCompanyBranch[]> {
    if(this.banks.length > 0)
      return Observable.from([this.banks]);

    let url:string = `${this.lookupApiBaseUrl}financialcompanies`;
    let observable:Observable<FinanceCompanyBranch[]>  =   this.http.get(url).publishLast().refCount().map(this.extractData)
      .catch(this.handleError);
    observable.subscribe( (banks:FinanceCompanyBranch[]) => {
      this.banks = banks;
      return this.banks;
    });
    return observable;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
