/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FraternityTestModule } from '../../../test.module';
import { AssociationUpdateComponent } from 'app/entities/association/association-update.component';
import { AssociationService } from 'app/entities/association/association.service';
import { Association } from 'app/shared/model/association.model';

describe('Component Tests', () => {
    describe('Association Management Update Component', () => {
        let comp: AssociationUpdateComponent;
        let fixture: ComponentFixture<AssociationUpdateComponent>;
        let service: AssociationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FraternityTestModule],
                declarations: [AssociationUpdateComponent]
            })
                .overrideTemplate(AssociationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AssociationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssociationService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Association(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.association = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Association();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.association = entity;
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
