import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAssociation } from 'app/shared/model/association.model';
import { AssociationService } from './association.service';

@Component({
    selector: 'jhi-association-delete-dialog',
    templateUrl: './association-delete-dialog.component.html'
})
export class AssociationDeleteDialogComponent {
    association: IAssociation;

    constructor(
        protected associationService: AssociationService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.associationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'associationListModification',
                content: 'Deleted an association'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-association-delete-popup',
    template: ''
})
export class AssociationDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ association }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AssociationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.association = association;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
