/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FraternityTestModule } from '../../../test.module';
import { HelpRequestUpdateComponent } from 'app/entities/help-request/help-request-update.component';
import { HelpRequestService } from 'app/entities/help-request/help-request.service';
import { HelpRequest } from 'app/shared/model/help-request.model';

describe('Component Tests', () => {
    describe('HelpRequest Management Update Component', () => {
        let comp: HelpRequestUpdateComponent;
        let fixture: ComponentFixture<HelpRequestUpdateComponent>;
        let service: HelpRequestService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FraternityTestModule],
                declarations: [HelpRequestUpdateComponent]
            })
                .overrideTemplate(HelpRequestUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HelpRequestUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HelpRequestService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new HelpRequest(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.helpRequest = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new HelpRequest();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.helpRequest = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
