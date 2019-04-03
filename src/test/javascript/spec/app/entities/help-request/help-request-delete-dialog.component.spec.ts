/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FraternityTestModule } from '../../../test.module';
import { HelpRequestDeleteDialogComponent } from 'app/entities/help-request/help-request-delete-dialog.component';
import { HelpRequestService } from 'app/entities/help-request/help-request.service';

describe('Component Tests', () => {
    describe('HelpRequest Management Delete Component', () => {
        let comp: HelpRequestDeleteDialogComponent;
        let fixture: ComponentFixture<HelpRequestDeleteDialogComponent>;
        let service: HelpRequestService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FraternityTestModule],
                declarations: [HelpRequestDeleteDialogComponent]
            })
                .overrideTemplate(HelpRequestDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HelpRequestDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HelpRequestService);
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
