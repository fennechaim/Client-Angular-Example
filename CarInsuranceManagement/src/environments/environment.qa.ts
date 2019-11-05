export const environment = {
  production: true,
  clalMode:false,
  insuranceAccountUrl:'http://qa.lali.co.il/Account',
  apiBaseUrl:'http://qa.lali.co.il/processmanagement/api/carinsurance/v1/processes/',
  lookupApiBaseUrl:'http://qa.lali.co.il/processmanagement/api/lookups/',
  paymentRedirectUrl:'http://qa.lali.co.il/policyproposal/8',
  policyUrlSuccess: 'http://qa.lali.co.il/paymentsmanagement/api/payments/success',
  policyUrlClearingPayment: "http://qa.lali.co.il/paymentsmanagement/api/payments/clearing/1",
    authentication: {
    identityServerBaseUrl : 'https://qa.lali.co.il/identitymanagement/',
    postLogoutRedirectUrl:'http://qa.lali.co.il/home/main',
    redirectBaseUrl:"http://qa.lali.co.il",
    redirectResource:"/home/auth/callback/"
  }
};
