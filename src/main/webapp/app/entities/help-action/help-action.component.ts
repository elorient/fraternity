import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHelpAction } from 'app/shared/model/help-action.model';
import { AccountService } from 'app/core';
import { HelpActionService } from './help-action.service';

@Component({
    selector: 'jhi-help-action',
    templateUrl: './help-action.component.html'
})
export class HelpActionComponent implements OnInit, OnDestroy {
    helpActions: IHelpAction[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected helpActionService: HelpActionService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.helpActionService.query().subscribe(
            (res: HttpResponse<IHelpAction[]>) => {
                this.helpActions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHelpActions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHelpAction) {
        return item.id;
    }

    registerChangeInHelpActions() {
        this.eventSubscriber = this.eventManager.subscribe('helpActionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
