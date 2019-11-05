
import {browser, by, element, protractor} from 'protractor';
import {CarShellPage} from "./pages/car-insurance-shell-page";
import {PolicyOwnerPage} from "./pages/policy-owner-page";
import {CarSelectionPage} from "./pages/car-selection-page";
import {
  CarDetailsPage, PolicyProposalsPage, QuestionnairePage, SpecifiedDriversPage,
  SupplementaryDetailsPage, CreditCardPage, PolicyCommenceDatePage, FinalGreetingPage
} from "./pages/index";
import {RandomIsraeliIdentifierNumberGenerator} from "../src/app/domain-model/services/support/random-israeli-id-number-generator";

describe('Car Process', function() {
  let page: CarShellPage;

  beforeEach(() => {
    page = new CarShellPage();
  });

  it('should be able to start the process', () => {
    page.navigateTo();
  });

  describe('policy owner basic details feature', () => {
    let insuredCustomerPage:PolicyOwnerPage;

    beforeEach(() => {
      insuredCustomerPage = new PolicyOwnerPage();
    });

    it('should be able to enter valid first and last name', () => {
      var firstName = 'ישראל';
      var lastName = 'ישראלי';
      insuredCustomerPage.enterName(firstName, lastName);
      insuredCustomerPage.getFirstName().then(enteredFirstName => {
        expect(enteredFirstName).toEqual(firstName);
      })
    });

    it('should be able to select gender', () => {
      browser.wait(function(){
        return insuredCustomerPage.isGenderPresent();
      }, 60000);
      insuredCustomerPage.selectFemale();
      insuredCustomerPage.isMaleSelected().then(value => {
        expect(value).toBeFalsy();
      });

      insuredCustomerPage.isFemaleSelected().then(value => {
        expect(value).toBeTruthy();
      })
      //browser.pause();
    });
    it('should be able to go to the next step', () => {
      insuredCustomerPage.goToNextStep();
    });

  });

  describe('car selection feature', () => {
    let carSelectionPage:CarSelectionPage;
    beforeAll( () => {
      carSelectionPage = new CarSelectionPage();
      browser.wait(function(){
        return carSelectionPage.isPageReady();
      }, 10000);
    });

    it('should be able to click the dont remember button', () => {
      carSelectionPage.clickCantRemember();
    });

    it('should be able to select a car', () => {
      browser.sleep(1000);
      browser.wait(function(){
        return carSelectionPage.canSelectCar();
      }, 10000);

      carSelectionPage.enterManufacturerDummyText("foo");

      browser.wait(function(){
        return carSelectionPage.canSelectManufacturer();
      }, 10000);

      let manufacturerIndex = Math.floor(Math.random()*20);
      carSelectionPage.selectManufacturer(manufacturerIndex);
      //browser.sleep(3000);

      carSelectionPage.enterYearDummyText("bar");
     // browser.sleep(1000);
      carSelectionPage.selectYear(0);
     // browser.sleep(1000);


      carSelectionPage.focusOnModel();
      //browser.sleep(5000);
      browser.wait(function(){
        return carSelectionPage.canSelectModel();
      }, 10000);

      carSelectionPage.selectModel();
      //browser.sleep(5000);
     // browser.explore();
     // browser.explore();
      carSelectionPage.focusOnSubDescription();

      browser.wait(function(){
        return carSelectionPage.canSelectSubDescription();
      }, 10000);

      carSelectionPage.selectSubDescription();

      browser.wait(function(){
        return carSelectionPage.canClickFixed();
      }, 10000);

      carSelectionPage.clickFixed();

    });
  })

  describe('car additional details feature', () => {
    let carDetailsPage:CarDetailsPage;
    beforeAll( () => {
      carDetailsPage = new CarDetailsPage();
      browser.wait(function(){
        return carDetailsPage.isPageReady();
      }, 10000);
    });

    it('should be able to select car ownership', () => {
      carDetailsPage.focusOnOwnership();
      carDetailsPage.selectPrivateOwnership();
    });

    it('should be able to select car usage type', () => {

      browser.wait(function(){
        return carDetailsPage.isOwnershipSelected();
      }, 10000);
      carDetailsPage.focusOnUsageType();
      carDetailsPage.selectPrivateUsageType();
    });

    it('should be able to enter email and phone number', () => {
      browser.wait(function(){
        return carDetailsPage.isCarUsageSelected();
      }, 10000);
      carDetailsPage.enterEmail("foo@bar.baz");
      carDetailsPage.enterPhoneNumber("0533030214");
    });

    it('should be able to go to the next step', () => {
      page.goToNextStep();
    });
  });

  describe('specified drivers feature', () => {
    let specifiedDriversPage:SpecifiedDriversPage;
    beforeAll( () => {
      specifiedDriversPage = new SpecifiedDriversPage();
      browser.wait(function(){
        return specifiedDriversPage.isPageReady();
      }, 10000);
    });

    it('should be able to update the primary driver(policy owner) first and last name', () => {
      specifiedDriversPage.enterFirstName('שששכגד');
      specifiedDriversPage.enterLastName('לחדגכדכג');
    });

    it('should be able to select the birth date of the policy owner', () => {
      specifiedDriversPage.openDatePicker();
      specifiedDriversPage.pickDate();
    });

    it('should be able to enter the policy owner driving license issuing date', () => {
      specifiedDriversPage.enterDriverLicenseIssuingMonth("01");
      specifiedDriversPage.enterDriverLicenseIssuingYear("2016");
    });
    it('should be able to set the policy owner as the youngest driver', () => {
      browser.wait(function(){
        return specifiedDriversPage.canCheckPolicyOwnerAsYoungestDriver();
      }, 10000).then(x => {
        specifiedDriversPage.setPolicyOwnerAsYoungestDriver();
      });

    });


    it('should be able to declare that there are no additional drivers in the policy', () => {

      let canContinue = false;

      browser.wait(function(){
        return specifiedDriversPage.canSelectHasAdditionalDrivers();
      }, 10000).then(x => {


        browser.executeScript('window.scrollTo(0,10000);').then(function () {
          browser.sleep(3000).then(x => {
            canContinue = true;
          });

          browser.wait(function(){
            return canContinue;
          }, 10000).then(x => {
            specifiedDriversPage.setNoAdditionalDrivers();
            page.goToNextStep();
          });
        });
      });

    });
  });

  describe('questionnaire answering feature', () => {
    let questionnairePage:QuestionnairePage;
    beforeAll( () => {
      questionnairePage = new QuestionnairePage();

    });

    it('should be able answer all the questions', () => {
      browser.wait(function(){
        return questionnairePage.isPageReady();
      }, 10000).then(x => {
        questionnairePage.answerQuestions();
        page.goToNextStep();
      });
    });

/*    it('should be able to go to the next step', () => {

      browser.sleep(1000).then(x => {
        browser.explore();
      });
    });*/
  });

  describe('policy commence date selection feature', () => {
    let policyStartDatePage:PolicyCommenceDatePage;
    beforeAll( () => {
      policyStartDatePage = new PolicyCommenceDatePage();

    });

    it('should be able to pick the start date of the policy', () => {

      browser.wait(function(){
        return policyStartDatePage.isPageReady();
      }, 10000).then(x => {
        policyStartDatePage.openDatePicker();
        browser.wait(() => {
          return policyStartDatePage.canPickDate();
        }, 10000).then(x => {
          policyStartDatePage.pickCommenceDate();
        });
      });
    });


     afterAll(() => {
       page.goToNextStep();
     },10000);
  });

  describe('policy proposal selection feature', () => {
    let policyProposalsPage:PolicyProposalsPage;
    beforeAll( () => {
      policyProposalsPage = new PolicyProposalsPage();

    });

    it('should be able to select policy proposal', () => {
      browser.wait(function(){
        return policyProposalsPage.isPageReady();
      }, 10000).then(() => {
        policyProposalsPage.selectPolicyProposal(0);
      });

    });
  });

  describe('supplementary details feature', () => {
    let supplementaryDetailsPage:SupplementaryDetailsPage;
    beforeAll( () => {
      supplementaryDetailsPage = new SupplementaryDetailsPage();
      browser.wait(function(){
        return supplementaryDetailsPage.isPageReady();
      }, 10000);
    });

    it('should be able to enter the policy owner basic details', () => {

      let idGenerator = new RandomIsraeliIdentifierNumberGenerator();
      let identifier = idGenerator.generateIdentifier();
      supplementaryDetailsPage.enterIdentityNumber(identifier);
      supplementaryDetailsPage.enterPhoneNumber("0502020124");
      supplementaryDetailsPage.enterEmail("foo@bar.baz");
    });

    it('should be able to enter the policy owner address', () => {

      supplementaryDetailsPage.enterCityName("k");
      browser.wait(function(){
        return supplementaryDetailsPage.canPickCity();
      }, 10000).then(x => {
        supplementaryDetailsPage.pickCity(5);
        supplementaryDetailsPage.enterStreetName("k");
        browser.wait(function(){
          return supplementaryDetailsPage.canPickStreet();
        }, 10000).then(x => {
          supplementaryDetailsPage.pickStreet(0);
          supplementaryDetailsPage.enterAddressApartmentNumber("15");
          supplementaryDetailsPage.enterAddressHouseNumber("5");
          supplementaryDetailsPage.enterAddressZipCode("12345");
        });
      });

    });

    it('should be able enter car details', () => {
      //browser.explore();
      supplementaryDetailsPage.enterCarLicenseNumber("11","222","33");
      supplementaryDetailsPage.openCarProtectionOptions();
      browser.wait(function(){
        return supplementaryDetailsPage.canPickCarProtection();
      }, 10000).then(x => {
        supplementaryDetailsPage.pickCarProtection(0);
      });

    });

    it('should be able to accept the agreements', () => {
      supplementaryDetailsPage.acceptTechnologyAgreement();
      supplementaryDetailsPage.acceptEssentialDocumentAgreement();
    });

    it('should be able to select credit payment method', () => {
      //browser.explore();
      supplementaryDetailsPage.payWithCreditCard();
    });
  });

  describe('credit card details feature', () => {
    let creditCardPage:CreditCardPage;
    beforeAll( () => {
      creditCardPage = new CreditCardPage();
      browser.wait(function(){
        return creditCardPage.isPageReady();
      }, 20000);
    });

    it('should be able to pay with the supplied credit card details', () => {

      browser.wait(function(){
        return creditCardPage.isPageReady();
      }, 20000).then(x => {

        let webElement = creditCardPage.getCreditGuardIFrameWebElement();
        browser.switchTo().frame(0);

       // browser.explore();

        creditCardPage.enterCreditCardNumber("4580","0000","0000","0000");

        creditCardPage.tapExpirationMonth();
        browser.wait(function(){
          return creditCardPage.canPickExpirationMonth();
        }, 10000).then(x => {
          creditCardPage.pickExpirationMonth(2);

          creditCardPage.tapExpirationYear();
          browser.wait(function(){
            return creditCardPage.canPickExpirationYear();
          }, 10000).then(x => {
            creditCardPage.pickExpirationYear(2);
            creditCardPage.pay();
          });
        });
      });


    });
  });

  describe('final greeting feature', () => {

    let finalGreetingPage:FinalGreetingPage;
    beforeAll( () => {
      finalGreetingPage = new FinalGreetingPage();
    });

   it('should show the final greeting', () => {
     browser.switchTo().defaultContent().then(x => {
       browser.wait(function(){
         return finalGreetingPage.isPageReady();
       }, 20000).then(() => {
         browser.explore();
       });
     });
   });

  });
});
