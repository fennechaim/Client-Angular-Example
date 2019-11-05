import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SpecifiedDriversWizardStepComponent} from "./specified-drivers-wizard-step.component";
import {DebugElement} from "@angular/core";
import {ProcessManagementService} from "../../../../../domain-model/services/process/process-management.service";
import {AppModule} from "../../../../../app.module";
import {APP_BASE_HREF} from "@angular/common";
import {DriverComponent} from "client-infrastructure/src/view-model/components/vehicles/driver-component/driver.component";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {CarInsuranceProcess} from "../../../../../domain-model/entities/process/car-insurance-process";
import {PrimaryDriver} from "../../../../../domain-model/entities/drivers/primary-driver";

describe("CarDriversWizardStep specs", () => {

  let fixture:ComponentFixture<SpecifiedDriversWizardStepComponent>;
  let component:SpecifiedDriversWizardStepComponent;
  let debugElement:DebugElement;
  let processManagementService:ProcessManagementService;
  let process:CarInsuranceProcess;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AppModule],
      providers:[
        {provide:APP_BASE_HREF,useValue:'/'}
      ]
    });

    fixture = TestBed.createComponent(SpecifiedDriversWizardStepComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    processManagementService = TestBed.get(ProcessManagementService);
    process = new CarInsuranceProcess({policyOwner:{
      fullName:{
        firstName:'Foo',
        lastName:'Bar'
      }
    }});

    spyOn(processManagementService,"getProcess").and.returnValue(process);

  });

  describe("When the component is being initialized" ,() => {



    it("Then the component's process should exist", async(() => {
      component.ngOnInit();
      expect(component.rawDrivers.length).toEqual(0);


      //expect(component.primaryDriverComponent).toBeUndefined();

      fixture.detectChanges();

      expect(component.process).toBeDefined();


      /*    fixture.whenStable().then( (waited)=>{
       expect(component.rawDrivers.length).toEqual(4);
       });*/

      //fixture.detectChanges();
      //const element = debugElement.query(By.css('p')).nativeElement;
      //expect(element.textContent).toEqual("foo bar");
    }));
  });
  describe("when setting the primary driver's date of birth to 1/1/1998",()=>{

    let primaryDriverComponent:DriverComponent;

    beforeEach( () => {
      component.ngOnInit();
      primaryDriverComponent = component.primaryDriverComponent;
      primaryDriverComponent.parentFormGroup = component.stepForm;
      primaryDriverComponent.driver = process.policyOwner as PrimaryDriver;
      primaryDriverComponent.key = "primaryDriver";
      primaryDriverComponent.isYoungDriver = true;
      primaryDriverComponent.isActive = true;
      primaryDriverComponent.ngOnInit();
      let dateStructure: NgbDateStruct = {year:1998,month:1,day:1};
      primaryDriverComponent.driverFormGroup.patchValue({birthDate:dateStructure});
    });

    it("Then the primary driver should be marked as young driver", async(() => {


      //fixture.detectChanges();

      fixture.whenStable().then( (waited)=>{
        expect(component.primaryDriverComponent.isYoungDriver).toBeTruthy();
        fixture.detectChanges();
      });
    }));

  })
});
