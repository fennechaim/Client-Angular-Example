import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

/* models */

/* services */
import { ProcessManagementService } from '../../domain-model/services/process/process-management.service';
import { Logger }         from 'angular2-logger/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  template: `
    
  `,

  providers: [
    ProcessManagementService,
    Logger
  ]
})

export class RecoveryComponent implements OnInit{

    processId  : string;

  constructor(
    private router          : Router,
    private processService  : ProcessManagementService,
    private logger          : Logger,
    private activatedRoute  : ActivatedRoute,
    private localStorageService : LocalStorageService
  ) { }

  /**
   * Start main process
   */
  recoverProcess() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
        if(params['processId']){
            console.log('recovering process ' + params['processId']);
           /* this.processService.recoverProcess(params['processId'])
            .subscribe((res) => {
                if(res){
                    this.logger.log('starting recovered process...');
                    //fetch localstorage - PERHAPS MOVE TO BACKEND?
                    //this.localStorageService.set('process', process);
                    // go to relevant step
                    return this.router.navigate([res.link]);

                }
            });*/
        }
      });
  }

  ngOnInit() {

    this.recoverProcess();
  }

}
