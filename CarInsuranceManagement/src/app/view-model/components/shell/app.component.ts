import {Component, ErrorHandler} from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from "ng2-toasty";
import {Locale, LocaleService, LocalizationService} from "angular2localization";

export type LayoutDirection = 'ltr' | 'rtl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends Locale{
  title = 'app works!';

  dir: LayoutDirection;

  constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig, public locale: LocaleService, public localization: LocalizationService) {
    // Assign the selected theme name to the `theme` property of the instance of ToastyConfig.
    // Possible values: default, bootstrap, material
    super(locale, localization);

    this.locale.addLanguages(['en', 'he']);

    // Required: default language, country (ISO 3166 two-letter, uppercase code) and expiry (No days). If the expiry is omitted, the cookie becomes a session cookie.
    // Selects the default language and country, regardless of the browser language, to avoid inconsistencies between the language and country.
    this.locale.definePreferredLocale('en', 'US', 30);

    // Optional: default currency (ISO 4217 three-letter code).
    this.locale.definePreferredCurrency('USD');

    // Initializes LocalizationService: asynchronous loading.
    this.localization.translationProvider('./resources/locale-'); // Required: initializes the translation provider with the given path prefix.
    this.localization.updateTranslation(); // Need to update the translation.


    this.changeDirection();


    this.toastyConfig.theme = 'material';
    var toastOptions:ToastOptions = {
      title: "My title",
      msg: "The message",
      showClose: true,
      timeout: 5000,
      theme: 'default',
      onAdd: (toast:ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function(toast:ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    this.toastyService.default(toastOptions)
  }

  addToast() {
    // Just add default Toast with title only

    // Or create the instance of ToastOptions
    var toastOptions:ToastOptions = {
      title: "My title",
      msg: "The message",
    };
    // Add see all possible types in one shot
    this.toastyService.info(toastOptions);

  }

  selectLocale(language: string, country: string, currency: string): void {
    this.locale.setCurrentLocale(language, country);
    this.locale.setCurrentCurrency(currency);
    this.changeDirection();

  }

  private changeDirection(){
    if (this.locale.getCurrentLanguage() == "he") {

      this.dir = 'rtl';

    } else {

      this.dir = 'ltr';

    }
  }
}
