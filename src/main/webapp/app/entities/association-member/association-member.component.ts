import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAssociationMember } from 'app/shared/model/association-member.model';
import { AccountService } from 'app/core';
import { AssociationMemberService } from './association-member.service';

@Component({
    selector: 'jhi-association-member',
    templateUrl: './association-member.component.html'
})
export class AssociationMemberComponent implements OnInit, OnDestroy {
    associationMembers: IAssociationMember[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected associationMemberService: AssociationMemberService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.associationMemberService.query().subscribe(
            (res: HttpResponse<IAssociationMember[]>) => {
                this.associationMembers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAssociationMembers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAssociationMember) {
        return item.id;
    }

    registerChangeInAssociationMembers() {
        this.eventSubscriber = this.eventManager.subscribe('associationMemberListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
