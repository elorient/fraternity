import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHelpRequest } from 'app/shared/model/help-request.model';

type EntityResponseType = HttpResponse<IHelpRequest>;
type EntityArrayResponseType = HttpResponse<IHelpRequest[]>;

@Injectable({ providedIn: 'root' })
export class HelpRequestService {
    public resourceUrl = SERVER_API_URL + 'api/help-requests';

    constructor(protected http: HttpClient) {}

    create(helpRequest: IHelpRequest): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(helpRequest);
        return this.http
            .post<IHelpRequest>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(helpRequest: IHelpRequest): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(helpRequest);
        return this.http
            .put<IHelpRequest>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IHelpRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHelpRequest[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(helpRequest: IHelpRequest): IHelpRequest {
        const copy: IHelpRequest = Object.assign({}, helpRequest, {
            datePost: helpRequest.datePost != null && helpRequest.datePost.isValid() ? helpRequest.datePost.format(DATE_FORMAT) : null,
            dateStart: helpRequest.dateStart != null && helpRequest.dateStart.isValid() ? helpRequest.dateStart.format(DATE_FORMAT) : null,
            dateEnd: helpRequest.dateEnd != null && helpRequest.dateEnd.isValid() ? helpRequest.dateEnd.format(DATE_FORMAT) : null
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
            res.body.forEach((helpRequest: IHelpRequest) => {
                helpRequest.datePost = helpRequest.datePost != null ? moment(helpRequest.datePost) : null;
                helpRequest.dateStart = helpRequest.dateStart != null ? moment(helpRequest.dateStart) : null;
                helpRequest.dateEnd = helpRequest.dateEnd != null ? moment(helpRequest.dateEnd) : null;
            });
        }
        return res;
    }
}
