export const environment = {
    production: true,
  clalMode:false,
  insuranceAccountUrl:'https://hart-ins.co.il/Account',
  apiBaseUrl:'https://hart-ins.co.il/processmanagement/api/carinsurance/v1/processes/',
  lookupApiBaseUrl:'https://hart-ins.co.il/processmanagement/api/lookups/',
  paymentRedirectUrl:'https://hart-ins.co.il/policyproposal/8',
  policyUrlSuccess: 'https://hart-ins.co.il/paymentsmanagement/api/payments/success',
  policyUrlClearingPayment: "https://hart-ins.co.il/paymentsmanagement/api/payments/clearing/1",
  authentication: {
    identityServerBaseUrl : 'https://hart-ins.co.il/identitymanagement/',
    postLogoutRedirectUrl:'http://hart-ins.co.il/home/main',
    redirectBaseUrl:"http://hart-ins.co.il",
    redirectResource:"/home/auth/callback/"
  }
};
