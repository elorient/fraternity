/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FraternityTestModule } from '../../../test.module';
import { AssociationComponent } from 'app/entities/association/association.component';
import { AssociationService } from 'app/entities/association/association.service';
import { Association } from 'app/shared/model/association.model';

describe('Component Tests', () => {
    describe('Association Management Component', () => {
        let comp: AssociationComponent;
        let fixture: ComponentFixture<AssociationComponent>;
        let service: AssociationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FraternityTestModule],
                declarations: [AssociationComponent],
                providers: []
            })
                .overrideTemplate(AssociationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AssociationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssociationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Association(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.associations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
