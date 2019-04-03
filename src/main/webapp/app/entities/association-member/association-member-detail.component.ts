import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAssociationMember } from 'app/shared/model/association-member.model';

@Component({
    selector: 'jhi-association-member-detail',
    templateUrl: './association-member-detail.component.html'
})
export class AssociationMemberDetailComponent implements OnInit {
    associationMember: IAssociationMember;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ associationMember }) => {
            this.associationMember = associationMember;
        });
    }

    previousState() {
        window.history.back();
    }
}
