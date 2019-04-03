import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAssociationMember } from 'app/shared/model/association-member.model';
import { AssociationMemberService } from './association-member.service';

@Component({
    selector: 'jhi-association-member-delete-dialog',
    templateUrl: './association-member-delete-dialog.component.html'
})
export class AssociationMemberDeleteDialogComponent {
    associationMember: IAssociationMember;

    constructor(
        protected associationMemberService: AssociationMemberService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.associationMemberService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'associationMemberListModification',
                content: 'Deleted an associationMember'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-association-member-delete-popup',
    template: ''
})
export class AssociationMemberDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ associationMember }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AssociationMemberDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.associationMember = associationMember;
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
