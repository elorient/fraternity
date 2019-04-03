/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FraternityTestModule } from '../../../test.module';
import { HelpOfferDetailComponent } from 'app/entities/help-offer/help-offer-detail.component';
import { HelpOffer } from 'app/shared/model/help-offer.model';

describe('Component Tests', () => {
    describe('HelpOffer Management Detail Component', () => {
        let comp: HelpOfferDetailComponent;
        let fixture: ComponentFixture<HelpOfferDetailComponent>;
        const route = ({ data: of({ helpOffer: new HelpOffer(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FraternityTestModule],
                declarations: [HelpOfferDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HelpOfferDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HelpOfferDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.helpOffer).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
