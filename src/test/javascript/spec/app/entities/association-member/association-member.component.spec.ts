/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FraternityTestModule } from '../../../test.module';
import { AssociationMemberComponent } from 'app/entities/association-member/association-member.component';
import { AssociationMemberService } from 'app/entities/association-member/association-member.service';
import { AssociationMember } from 'app/shared/model/association-member.model';

describe('Component Tests', () => {
    describe('AssociationMember Management Component', () => {
        let comp: AssociationMemberComponent;
        let fixture: ComponentFixture<AssociationMemberComponent>;
        let service: AssociationMemberService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FraternityTestModule],
                declarations: [AssociationMemberComponent],
                providers: []
            })
                .overrideTemplate(AssociationMemberComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AssociationMemberComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssociationMemberService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AssociationMember(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.associationMembers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
