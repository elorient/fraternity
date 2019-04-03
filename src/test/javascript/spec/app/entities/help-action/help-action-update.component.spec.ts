/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FraternityTestModule } from '../../../test.module';
import { HelpActionUpdateComponent } from 'app/entities/help-action/help-action-update.component';
import { HelpActionService } from 'app/entities/help-action/help-action.service';
import { HelpAction } from 'app/shared/model/help-action.model';

describe('Component Tests', () => {
    describe('HelpAction Management Update Component', () => {
        let comp: HelpActionUpdateComponent;
        let fixture: ComponentFixture<HelpActionUpdateComponent>;
        let service: HelpActionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FraternityTestModule],
                declarations: [HelpActionUpdateComponent]
            })
                .overrideTemplate(HelpActionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HelpActionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HelpActionService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new HelpAction(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.helpAction = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new HelpAction();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.helpAction = entity;
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
