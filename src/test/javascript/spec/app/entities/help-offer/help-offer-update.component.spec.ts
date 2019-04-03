/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FraternityTestModule } from '../../../test.module';
import { HelpOfferUpdateComponent } from 'app/entities/help-offer/help-offer-update.component';
import { HelpOfferService } from 'app/entities/help-offer/help-offer.service';
import { HelpOffer } from 'app/shared/model/help-offer.model';

describe('Component Tests', () => {
    describe('HelpOffer Management Update Component', () => {
        let comp: HelpOfferUpdateComponent;
        let fixture: ComponentFixture<HelpOfferUpdateComponent>;
        let service: HelpOfferService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FraternityTestModule],
                declarations: [HelpOfferUpdateComponent]
            })
                .overrideTemplate(HelpOfferUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HelpOfferUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HelpOfferService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new HelpOffer(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.helpOffer = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new HelpOffer();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.helpOffer = entity;
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
