import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAssociationMember } from 'app/shared/model/association-member.model';
import { AssociationMemberService } from './association-member.service';

@Component({
    selector: 'jhi-association-member-update',
    templateUrl: './association-member-update.component.html'
})
export class AssociationMemberUpdateComponent implements OnInit {
    associationMember: IAssociationMember;
    isSaving: boolean;

    constructor(protected associationMemberService: AssociationMemberService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ associationMember }) => {
            this.associationMember = associationMember;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.associationMember.id !== undefined) {
            this.subscribeToSaveResponse(this.associationMemberService.update(this.associationMember));
        } else {
            this.subscribeToSaveResponse(this.associationMemberService.create(this.associationMember));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAssociationMember>>) {
        result.subscribe((res: HttpResponse<IAssociationMember>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
