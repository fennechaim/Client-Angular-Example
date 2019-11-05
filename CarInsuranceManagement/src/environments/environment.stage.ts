export const environment = {
  production: true,
  clalMode:false,
  insuranceAccountUrl:'https://stage.hart-ins.co.il/Account',
  apiBaseUrl:'https://stage.hart-ins.co.il/processmanagement/api/carinsurance/v1/processes/',
  lookupApiBaseUrl:'https://stage.hart-ins.co.il/processmanagement/api/lookups/',
  paymentRedirectUrl:'https://stage.hart-ins.co.il/policyproposal/8',
  policyUrlSuccess: 'https://stage.hart-ins.co.il/paymentsmanagement/api/payments/success',
  policyUrlClearingPayment: "https://stage.hart-ins.co.il/paymentsmanagement/api/payments/clearing/1",
    authentication: {
    identityServerBaseUrl : 'https://stage.hart-ins.co.il/identitymanagement/',
    postLogoutRedirectUrl:'http://stage.hart-ins.co.il/home/main',
    redirectBaseUrl:"http://stage.hart-ins.co.il",
    redirectResource:"/home/auth/callback/"
  }
};
