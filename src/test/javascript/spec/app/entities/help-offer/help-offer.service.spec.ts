/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { HelpOfferService } from 'app/entities/help-offer/help-offer.service';
import { IHelpOffer, HelpOffer } from 'app/shared/model/help-offer.model';

describe('Service Tests', () => {
    describe('HelpOffer Service', () => {
        let injector: TestBed;
        let service: HelpOfferService;
        let httpMock: HttpTestingController;
        let elemDefault: IHelpOffer;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(HelpOfferService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new HelpOffer(0, 'AAAAAAA', 'AAAAAAA', currentDate, currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        datePost: currentDate.format(DATE_FORMAT),
                        dateStart: currentDate.format(DATE_FORMAT),
                        dateEnd: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a HelpOffer', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        datePost: currentDate.format(DATE_FORMAT),
                        dateStart: currentDate.format(DATE_FORMAT),
                        dateEnd: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        datePost: currentDate,
                        dateStart: currentDate,
                        dateEnd: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new HelpOffer(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a HelpOffer', async () => {
                const returnedFromService = Object.assign(
                    {
                        title: 'BBBBBB',
                        description: 'BBBBBB',
                        datePost: currentDate.format(DATE_FORMAT),
                        dateStart: currentDate.format(DATE_FORMAT),
                        dateEnd: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        datePost: currentDate,
                        dateStart: currentDate,
                        dateEnd: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of HelpOffer', async () => {
                const returnedFromService = Object.assign(
                    {
                        title: 'BBBBBB',
                        description: 'BBBBBB',
                        datePost: currentDate.format(DATE_FORMAT),
                        dateStart: currentDate.format(DATE_FORMAT),
                        dateEnd: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        datePost: currentDate,
                        dateStart: currentDate,
                        dateEnd: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a HelpOffer', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
