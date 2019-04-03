import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHelpOffer } from 'app/shared/model/help-offer.model';

type EntityResponseType = HttpResponse<IHelpOffer>;
type EntityArrayResponseType = HttpResponse<IHelpOffer[]>;

@Injectable({ providedIn: 'root' })
export class HelpOfferService {
    public resourceUrl = SERVER_API_URL + 'api/help-offers';

    constructor(protected http: HttpClient) {}

    create(helpOffer: IHelpOffer): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(helpOffer);
        return this.http
            .post<IHelpOffer>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(helpOffer: IHelpOffer): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(helpOffer);
        return this.http
            .put<IHelpOffer>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IHelpOffer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHelpOffer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(helpOffer: IHelpOffer): IHelpOffer {
        const copy: IHelpOffer = Object.assign({}, helpOffer, {
            datePost: helpOffer.datePost != null && helpOffer.datePost.isValid() ? helpOffer.datePost.format(DATE_FORMAT) : null,
            dateStart: helpOffer.dateStart != null && helpOffer.dateStart.isValid() ? helpOffer.dateStart.format(DATE_FORMAT) : null,
            dateEnd: helpOffer.dateEnd != null && helpOffer.dateEnd.isValid() ? helpOffer.dateEnd.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.datePost = res.body.datePost != null ? moment(res.body.datePost) : null;
            res.body.dateStart = res.body.dateStart != null ? moment(res.body.dateStart) : null;
            res.body.dateEnd = res.body.dateEnd != null ? moment(res.body.dateEnd) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((helpOffer: IHelpOffer) => {
                helpOffer.datePost = helpOffer.datePost != null ? moment(helpOffer.datePost) : null;
                helpOffer.dateStart = helpOffer.dateStart != null ? moment(helpOffer.dateStart) : null;
                helpOffer.dateEnd = helpOffer.dateEnd != null ? moment(helpOffer.dateEnd) : null;
            });
        }
        return res;
    }
}
