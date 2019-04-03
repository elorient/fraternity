import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from 'app/shared/model/user.model';
import { UserService } from './user.service';

@Component({
    selector: 'jhi-user-update',
    templateUrl: './user-update.component.html'
})
export class UserUpdateComponent implements OnInit {
    user: IUser;
    isSaving: boolean;

    constructor(protected userService: UserService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ user }) => {
            this.user = user;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.user.id !== undefined) {
            this.subscribeToSaveResponse(this.userService.update(this.user));
        } else {
            this.subscribeToSaveResponse(this.userService.create(this.user));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUser>>) {
        result.subscribe((res: HttpResponse<IUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
