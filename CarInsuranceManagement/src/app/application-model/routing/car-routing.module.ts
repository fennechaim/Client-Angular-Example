import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CarInsuranceMainComponent} from '../../view-model/components/car-insurance-main.component';
import {ContentComponent} from "../../view-model/components/wizard/policy-proposal-wizard.component";
import {RecoveryComponent} from '../../view-model/components/recovery.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'main/:id',
        component: CarInsuranceMainComponent,
       // canActivate: [AuthenticatedGuard]
      },
      {
        path: 'wizard/:id',
        component: ContentComponent,
        //canActivate: [AuthenticatedGuard]
      },
      {
        path: 'policyProposal/:id',
        component: ContentComponent,
        //canActivate: [AuthenticatedGuard]
      },
      { path: 'recover', component: RecoveryComponent },
      { path: '', redirectTo: '/main/1', pathMatch: 'full' },
      { path: '**', component: CarInsuranceMainComponent }
    ])
  ]
})

export class CarRoutingModule {

}
