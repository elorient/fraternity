/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FraternityTestModule } from '../../../test.module';
import { AssociationMemberDetailComponent } from 'app/entities/association-member/association-member-detail.component';
import { AssociationMember } from 'app/shared/model/association-member.model';

describe('Component Tests', () => {
    describe('AssociationMember Management Detail Component', () => {
        let comp: AssociationMemberDetailComponent;
        let fixture: ComponentFixture<AssociationMemberDetailComponent>;
        const route = ({ data: of({ associationMember: new AssociationMember(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FraternityTestModule],
                declarations: [AssociationMemberDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AssociationMemberDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AssociationMemberDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.associationMember).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
