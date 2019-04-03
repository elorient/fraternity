import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Association } from 'app/shared/model/association.model';
import { AssociationService } from './association.service';
import { AssociationComponent } from './association.component';
import { AssociationDetailComponent } from './association-detail.component';
import { AssociationUpdateComponent } from './association-update.component';
import { AssociationDeletePopupComponent } from './association-delete-dialog.component';
import { IAssociation } from 'app/shared/model/association.model';

@Injectable({ providedIn: 'root' })
export class AssociationResolve implements Resolve<IAssociation> {
    constructor(private service: AssociationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Association> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Association>) => response.ok),
                map((association: HttpResponse<Association>) => association.body)
            );
        }
        return of(new Association());
    }
}

export const associationRoute: Routes = [
    {
        path: 'association',
        component: AssociationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.association.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'association/:id/view',
        component: AssociationDetailComponent,
        resolve: {
            association: AssociationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.association.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'association/new',
        component: AssociationUpdateComponent,
        resolve: {
            association: AssociationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.association.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'association/:id/edit',
        component: AssociationUpdateComponent,
        resolve: {
            association: AssociationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.association.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const associationPopupRoute: Routes = [
    {
        path: 'association/:id/delete',
        component: AssociationDeletePopupComponent,
        resolve: {
            association: AssociationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.association.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
