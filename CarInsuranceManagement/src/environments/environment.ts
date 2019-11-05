// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  clalMode:true,
  insuranceAccountUrl:'http://qa.lali.co.il/Account',
  apiBaseUrl:'http://localhost/processmanagement/api/carinsurance/v1/processes/',
  lookupApiBaseUrl:'http://localhost/processmanagement/api/lookups/',
  //apiBaseUrl:'http://qa.udigital.co.il/processmanagement/api/homeinsurance/v1/processes/',
  paymentRedirectUrl:'http://qa.udigital.co.il/policyproposal/8',
  policyUrlSuccess: 'http://qa.udigital.co.il/paymentsmanagement/api/payments/success',
  policyUrlClearingPayment: "http://qa.udigital.co.il/paymentsmanagement/api/payments/clearing/1",

  authentication: {
    identityServerBaseUrl : 'https://localhost/identitymanagement/',
    postLogoutRedirectUrl:'http://localhost:4201/main',
    redirectBaseUrl:"http://localhost:4200",
    redirectResource:"/auth/callback/"
  }

};
