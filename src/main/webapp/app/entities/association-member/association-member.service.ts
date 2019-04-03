import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAssociationMember } from 'app/shared/model/association-member.model';

type EntityResponseType = HttpResponse<IAssociationMember>;
type EntityArrayResponseType = HttpResponse<IAssociationMember[]>;

@Injectable({ providedIn: 'root' })
export class AssociationMemberService {
    public resourceUrl = SERVER_API_URL + 'api/association-members';

    constructor(protected http: HttpClient) {}

    create(associationMember: IAssociationMember): Observable<EntityResponseType> {
        return this.http.post<IAssociationMember>(this.resourceUrl, associationMember, { observe: 'response' });
    }

    update(associationMember: IAssociationMember): Observable<EntityResponseType> {
        return this.http.put<IAssociationMember>(this.resourceUrl, associationMember, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAssociationMember>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAssociationMember[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
