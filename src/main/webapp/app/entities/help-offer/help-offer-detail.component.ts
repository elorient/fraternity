import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHelpOffer } from 'app/shared/model/help-offer.model';

@Component({
    selector: 'jhi-help-offer-detail',
    templateUrl: './help-offer-detail.component.html'
})
export class HelpOfferDetailComponent implements OnInit {
    helpOffer: IHelpOffer;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ helpOffer }) => {
            this.helpOffer = helpOffer;
        });
    }

    previousState() {
        window.history.back();
    }
}
