export const environment = {
  production: true,
  clalMode:true,
  insuranceAccountUrl:'http://intgr.lali.co.il/Account',
  apiBaseUrl:'http://intgr.lali.co.il/processmanagement/api/carinsurance/v1/processes/',
  lookupApiBaseUrl:'http://intgr.lali.co.il/processmanagement/api/lookups/',
  paymentRedirectUrl:'http://intgr.lali.co.il/policyproposal/8',
  policyUrlSuccess: 'http://intgr.lali.co.il/paymentsmanagement/api/payments/success',
  policyUrlClearingPayment: "http://intgr.lali.co.il/paymentsmanagement/api/payments/clearing/1",
   authentication: {
    identityServerBaseUrl : 'https://intgr.lali.co.il/identitymanagement/',
    postLogoutRedirectUrl:'http://intgr.lali.co.il/car/main',
    redirectBaseUrl:"http://intgr.lali.co.il",
    redirectResource:"/home/auth/callback/"
  }
};
