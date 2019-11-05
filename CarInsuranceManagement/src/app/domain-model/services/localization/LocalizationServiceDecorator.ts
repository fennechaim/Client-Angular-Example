

import {Injectable} from "@angular/core";
import {LocaleService, LocalizationService} from "angular2localization";
@Injectable()
export  class LocalizationServiceDecorator {
  constructor(private locale: LocaleService, private localization: LocalizationService) {

  }

  get direction():string{
    if (this.locale.getCurrentLanguage() == "he")
      return 'rtl';

      return  'ltr';

  }

  get currentLanguage():string{
    return this.locale.getCurrentLanguage();
  }
}
