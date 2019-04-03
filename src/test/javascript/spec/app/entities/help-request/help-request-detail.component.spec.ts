/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FraternityTestModule } from '../../../test.module';
import { HelpRequestDetailComponent } from 'app/entities/help-request/help-request-detail.component';
import { HelpRequest } from 'app/shared/model/help-request.model';

describe('Component Tests', () => {
    describe('HelpRequest Management Detail Component', () => {
        let comp: HelpRequestDetailComponent;
        let fixture: ComponentFixture<HelpRequestDetailComponent>;
        const route = ({ data: of({ helpRequest: new HelpRequest(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FraternityTestModule],
                declarations: [HelpRequestDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HelpRequestDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HelpRequestDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.helpRequest).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
