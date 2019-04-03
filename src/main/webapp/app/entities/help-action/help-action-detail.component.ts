import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHelpAction } from 'app/shared/model/help-action.model';

@Component({
    selector: 'jhi-help-action-detail',
    templateUrl: './help-action-detail.component.html'
})
export class HelpActionDetailComponent implements OnInit {
    helpAction: IHelpAction;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ helpAction }) => {
            this.helpAction = helpAction;
        });
    }

    previousState() {
        window.history.back();
    }
}
