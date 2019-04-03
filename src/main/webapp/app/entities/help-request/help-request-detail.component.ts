import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHelpRequest } from 'app/shared/model/help-request.model';

@Component({
    selector: 'jhi-help-request-detail',
    templateUrl: './help-request-detail.component.html'
})
export class HelpRequestDetailComponent implements OnInit {
    helpRequest: IHelpRequest;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ helpRequest }) => {
            this.helpRequest = helpRequest;
        });
    }

    previousState() {
        window.history.back();
    }
}
