import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHelpRequest } from 'app/shared/model/help-request.model';
import { HelpRequestService } from './help-request.service';

@Component({
    selector: 'jhi-help-request-delete-dialog',
    templateUrl: './help-request-delete-dialog.component.html'
})
export class HelpRequestDeleteDialogComponent {
    helpRequest: IHelpRequest;

    constructor(
        protected helpRequestService: HelpRequestService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.helpRequestService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'helpRequestListModification',
                content: 'Deleted an helpRequest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-help-request-delete-popup',
    template: ''
})
export class HelpRequestDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ helpRequest }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HelpRequestDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.helpRequest = helpRequest;
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
