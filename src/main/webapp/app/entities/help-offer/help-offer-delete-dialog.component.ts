import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHelpOffer } from 'app/shared/model/help-offer.model';
import { HelpOfferService } from './help-offer.service';

@Component({
    selector: 'jhi-help-offer-delete-dialog',
    templateUrl: './help-offer-delete-dialog.component.html'
})
export class HelpOfferDeleteDialogComponent {
    helpOffer: IHelpOffer;

    constructor(
        protected helpOfferService: HelpOfferService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.helpOfferService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'helpOfferListModification',
                content: 'Deleted an helpOffer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-help-offer-delete-popup',
    template: ''
})
export class HelpOfferDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ helpOffer }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HelpOfferDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.helpOffer = helpOffer;
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
