import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAssociation } from 'app/shared/model/association.model';

@Component({
    selector: 'jhi-association-detail',
    templateUrl: './association-detail.component.html'
})
export class AssociationDetailComponent implements OnInit {
    association: IAssociation;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ association }) => {
            this.association = association;
        });
    }

    previousState() {
        window.history.back();
    }
}
