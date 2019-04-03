import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHelpAction } from 'app/shared/model/help-action.model';
import { HelpActionService } from './help-action.service';

@Component({
    selector: 'jhi-help-action-delete-dialog',
    templateUrl: './help-action-delete-dialog.component.html'
})
export class HelpActionDeleteDialogComponent {
    helpAction: IHelpAction;

    constructor(
        protected helpActionService: HelpActionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.helpActionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'helpActionListModification',
                content: 'Deleted an helpAction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-help-action-delete-popup',
    template: ''
})
export class HelpActionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ helpAction }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HelpActionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.helpAction = helpAction;
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
