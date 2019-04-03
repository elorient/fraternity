/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FraternityTestModule } from '../../../test.module';
import { AssociationDeleteDialogComponent } from 'app/entities/association/association-delete-dialog.component';
import { AssociationService } from 'app/entities/association/association.service';

describe('Component Tests', () => {
    describe('Association Management Delete Component', () => {
        let comp: AssociationDeleteDialogComponent;
        let fixture: ComponentFixture<AssociationDeleteDialogComponent>;
        let service: AssociationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FraternityTestModule],
                declarations: [AssociationDeleteDialogComponent]
            })
                .overrideTemplate(AssociationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AssociationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssociationService);
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
