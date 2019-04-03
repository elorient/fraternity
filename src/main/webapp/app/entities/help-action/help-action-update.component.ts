import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IHelpAction } from 'app/shared/model/help-action.model';
import { HelpActionService } from './help-action.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-help-action-update',
    templateUrl: './help-action-update.component.html'
})
export class HelpActionUpdateComponent implements OnInit {
    helpAction: IHelpAction;
    isSaving: boolean;

    users: IUser[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected helpActionService: HelpActionService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ helpAction }) => {
            this.helpAction = helpAction;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.helpAction.id !== undefined) {
            this.subscribeToSaveResponse(this.helpActionService.update(this.helpAction));
        } else {
            this.subscribeToSaveResponse(this.helpActionService.create(this.helpAction));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IHelpAction>>) {
        result.subscribe((res: HttpResponse<IHelpAction>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
