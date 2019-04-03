/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FraternityTestModule } from '../../../test.module';
import { HelpOfferDeleteDialogComponent } from 'app/entities/help-offer/help-offer-delete-dialog.component';
import { HelpOfferService } from 'app/entities/help-offer/help-offer.service';

describe('Component Tests', () => {
    describe('HelpOffer Management Delete Component', () => {
        let comp: HelpOfferDeleteDialogComponent;
        let fixture: ComponentFixture<HelpOfferDeleteDialogComponent>;
        let service: HelpOfferService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FraternityTestModule],
                declarations: [HelpOfferDeleteDialogComponent]
            })
                .overrideTemplate(HelpOfferDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HelpOfferDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HelpOfferService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
