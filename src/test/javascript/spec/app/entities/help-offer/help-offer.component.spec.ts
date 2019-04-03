/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FraternityTestModule } from '../../../test.module';
import { HelpOfferComponent } from 'app/entities/help-offer/help-offer.component';
import { HelpOfferService } from 'app/entities/help-offer/help-offer.service';
import { HelpOffer } from 'app/shared/model/help-offer.model';

describe('Component Tests', () => {
    describe('HelpOffer Management Component', () => {
        let comp: HelpOfferComponent;
        let fixture: ComponentFixture<HelpOfferComponent>;
        let service: HelpOfferService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FraternityTestModule],
                declarations: [HelpOfferComponent],
                providers: []
            })
                .overrideTemplate(HelpOfferComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HelpOfferComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HelpOfferService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HelpOffer(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.helpOffers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
