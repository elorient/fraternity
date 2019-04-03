/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FraternityTestModule } from '../../../test.module';
import { HelpActionDeleteDialogComponent } from 'app/entities/help-action/help-action-delete-dialog.component';
import { HelpActionService } from 'app/entities/help-action/help-action.service';

describe('Component Tests', () => {
    describe('HelpAction Management Delete Component', () => {
        let comp: HelpActionDeleteDialogComponent;
        let fixture: ComponentFixture<HelpActionDeleteDialogComponent>;
        let service: HelpActionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FraternityTestModule],
                declarations: [HelpActionDeleteDialogComponent]
            })
                .overrideTemplate(HelpActionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HelpActionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HelpActionService);
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
