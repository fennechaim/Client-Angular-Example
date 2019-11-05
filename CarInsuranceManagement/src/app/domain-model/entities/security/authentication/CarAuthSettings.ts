
import {Injectable} from "@angular/core";
import {AuthSettingsBase} from "client-infrastructure/src/domain-model/services/security/authentication/auth-settings";
import {environment} from "../../../../../environments/environment";

@Injectable()
export class CarAuthSettings extends AuthSettingsBase{
  getClientId() :string{
    return "homeInsuranceWebClient";
  }
  getClientDescription() :string{
    return "Car Insurance Web Client";
  }

    constructor(){
    super();
    this.identityServerBaseUrl = environment.authentication.identityServerBaseUrl;
    this.redirectUri = environment.authentication.redirectBaseUrl + environment.authentication.redirectResource;
    this.logoutUri = environment.authentication.postLogoutRedirectUrl;
    this.callbackEndpoint = environment.authentication.redirectResource;
  }
}
