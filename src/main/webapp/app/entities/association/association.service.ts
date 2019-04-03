import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAssociation } from 'app/shared/model/association.model';

type EntityResponseType = HttpResponse<IAssociation>;
type EntityArrayResponseType = HttpResponse<IAssociation[]>;

@Injectable({ providedIn: 'root' })
export class AssociationService {
    public resourceUrl = SERVER_API_URL + 'api/associations';

    constructor(protected http: HttpClient) {}

    create(association: IAssociation): Observable<EntityResponseType> {
        return this.http.post<IAssociation>(this.resourceUrl, association, { observe: 'response' });
    }

    update(association: IAssociation): Observable<EntityResponseType> {
        return this.http.put<IAssociation>(this.resourceUrl, association, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAssociation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAssociation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
