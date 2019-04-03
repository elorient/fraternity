import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHelpOffer } from 'app/shared/model/help-offer.model';
import { AccountService } from 'app/core';
import { HelpOfferService } from './help-offer.service';

@Component({
    selector: 'jhi-help-offer',
    templateUrl: './help-offer.component.html'
})
export class HelpOfferComponent implements OnInit, OnDestroy {
    helpOffers: IHelpOffer[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected helpOfferService: HelpOfferService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.helpOfferService.query().subscribe(
            (res: HttpResponse<IHelpOffer[]>) => {
                this.helpOffers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHelpOffers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHelpOffer) {
        return item.id;
    }

    registerChangeInHelpOffers() {
        this.eventSubscriber = this.eventManager.subscribe('helpOfferListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
