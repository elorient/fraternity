/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FraternityTestModule } from '../../../test.module';
import { AssociationMemberUpdateComponent } from 'app/entities/association-member/association-member-update.component';
import { AssociationMemberService } from 'app/entities/association-member/association-member.service';
import { AssociationMember } from 'app/shared/model/association-member.model';

describe('Component Tests', () => {
    describe('AssociationMember Management Update Component', () => {
        let comp: AssociationMemberUpdateComponent;
        let fixture: ComponentFixture<AssociationMemberUpdateComponent>;
        let service: AssociationMemberService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FraternityTestModule],
                declarations: [AssociationMemberUpdateComponent]
            })
                .overrideTemplate(AssociationMemberUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AssociationMemberUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssociationMemberService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new AssociationMember(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.associationMember = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new AssociationMember();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.associationMember = entity;
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
