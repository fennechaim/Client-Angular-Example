import { Component } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
// import {Locale, LocaleService, LocalizationService} from "angular2localization";

@Component({
    selector: 'insurance-tooltip',
    templateUrl: './insurance-tooltip.component.html',
    styleUrls: ['./insurance-tooltip.component.scss']
})

export class InsuranceTooltipComponent {

    contactForm: FormGroup;


    constructor(private formBuilder: FormBuilder) {
        this.contactForm = this.formBuilder.group({
            contactUs: ['']
        })
    }
}