import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AssociationMember } from 'app/shared/model/association-member.model';
import { AssociationMemberService } from './association-member.service';
import { AssociationMemberComponent } from './association-member.component';
import { AssociationMemberDetailComponent } from './association-member-detail.component';
import { AssociationMemberUpdateComponent } from './association-member-update.component';
import { AssociationMemberDeletePopupComponent } from './association-member-delete-dialog.component';
import { IAssociationMember } from 'app/shared/model/association-member.model';

@Injectable({ providedIn: 'root' })
export class AssociationMemberResolve implements Resolve<IAssociationMember> {
    constructor(private service: AssociationMemberService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AssociationMember> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AssociationMember>) => response.ok),
                map((associationMember: HttpResponse<AssociationMember>) => associationMember.body)
            );
        }
        return of(new AssociationMember());
    }
}

export const associationMemberRoute: Routes = [
    {
        path: 'association-member',
        component: AssociationMemberComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.associationMember.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'association-member/:id/view',
        component: AssociationMemberDetailComponent,
        resolve: {
            associationMember: AssociationMemberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.associationMember.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'association-member/new',
        component: AssociationMemberUpdateComponent,
        resolve: {
            associationMember: AssociationMemberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.associationMember.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'association-member/:id/edit',
        component: AssociationMemberUpdateComponent,
        resolve: {
            associationMember: AssociationMemberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.associationMember.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const associationMemberPopupRoute: Routes = [
    {
        path: 'association-member/:id/delete',
        component: AssociationMemberDeletePopupComponent,
        resolve: {
            associationMember: AssociationMemberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.associationMember.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
