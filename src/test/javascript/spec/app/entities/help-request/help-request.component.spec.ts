/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FraternityTestModule } from '../../../test.module';
import { HelpRequestComponent } from 'app/entities/help-request/help-request.component';
import { HelpRequestService } from 'app/entities/help-request/help-request.service';
import { HelpRequest } from 'app/shared/model/help-request.model';

describe('Component Tests', () => {
    describe('HelpRequest Management Component', () => {
        let comp: HelpRequestComponent;
        let fixture: ComponentFixture<HelpRequestComponent>;
        let service: HelpRequestService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FraternityTestModule],
                declarations: [HelpRequestComponent],
                providers: []
            })
                .overrideTemplate(HelpRequestComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HelpRequestComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HelpRequestService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HelpRequest(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.helpRequests[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
