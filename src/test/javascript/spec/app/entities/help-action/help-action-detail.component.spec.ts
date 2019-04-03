/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FraternityTestModule } from '../../../test.module';
import { HelpActionDetailComponent } from 'app/entities/help-action/help-action-detail.component';
import { HelpAction } from 'app/shared/model/help-action.model';

describe('Component Tests', () => {
    describe('HelpAction Management Detail Component', () => {
        let comp: HelpActionDetailComponent;
        let fixture: ComponentFixture<HelpActionDetailComponent>;
        const route = ({ data: of({ helpAction: new HelpAction(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FraternityTestModule],
                declarations: [HelpActionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HelpActionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HelpActionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.helpAction).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
