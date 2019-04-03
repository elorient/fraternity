/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FraternityTestModule } from '../../../test.module';
import { HelpActionComponent } from 'app/entities/help-action/help-action.component';
import { HelpActionService } from 'app/entities/help-action/help-action.service';
import { HelpAction } from 'app/shared/model/help-action.model';

describe('Component Tests', () => {
    describe('HelpAction Management Component', () => {
        let comp: HelpActionComponent;
        let fixture: ComponentFixture<HelpActionComponent>;
        let service: HelpActionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FraternityTestModule],
                declarations: [HelpActionComponent],
                providers: []
            })
                .overrideTemplate(HelpActionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HelpActionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HelpActionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HelpAction(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.helpActions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
