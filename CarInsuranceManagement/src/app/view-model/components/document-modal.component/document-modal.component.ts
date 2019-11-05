import { ModalDirective } from 'ng2-bootstrap/modal';
import { OnInit, Component, ViewChild, Input, OnChanges } from "@angular/core";
import { Logger } from "angular2-logger/core";
import { Observable } from "rxjs";

@Component({
  selector: 'document-modal',
  templateUrl: 'document-modal.component.html',
  styleUrls: ['document-modal.component.scss']
})

export class DocumentModal {
    @Input('fileBytes') fileBytes :string;
    @Input('showModal') showModal :string;
    @ViewChild('documentDisplayModal') public documentDisplayModal:ModalDirective;

    ngOnChanges(){
        if(this.showModal){
            this.documentDisplayModal.show();
        }
        else{
            this.documentDisplayModal.hide();
        }
    }
    
    get getFileBytes(){
        return this.fileBytes;
    }

    cancelModal(){
        this.fileBytes = '';
        this.showModal = '';
        this.documentDisplayModal.hide();
    }

    constructor(
    ) {}
}
