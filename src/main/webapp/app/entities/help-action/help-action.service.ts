import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHelpAction } from 'app/shared/model/help-action.model';

type EntityResponseType = HttpResponse<IHelpAction>;
type EntityArrayResponseType = HttpResponse<IHelpAction[]>;

@Injectable({ providedIn: 'root' })
export class HelpActionService {
    public resourceUrl = SERVER_API_URL + 'api/help-actions';

    constructor(protected http: HttpClient) {}

    create(helpAction: IHelpAction): Observable<EntityResponseType> {
        return this.http.post<IHelpAction>(this.resourceUrl, helpAction, { observe: 'response' });
    }

    update(helpAction: IHelpAction): Observable<EntityResponseType> {
        return this.http.put<IHelpAction>(this.resourceUrl, helpAction, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHelpAction>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHelpAction[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
