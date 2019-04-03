import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HelpAction } from 'app/shared/model/help-action.model';
import { HelpActionService } from './help-action.service';
import { HelpActionComponent } from './help-action.component';
import { HelpActionDetailComponent } from './help-action-detail.component';
import { HelpActionUpdateComponent } from './help-action-update.component';
import { HelpActionDeletePopupComponent } from './help-action-delete-dialog.component';
import { IHelpAction } from 'app/shared/model/help-action.model';

@Injectable({ providedIn: 'root' })
export class HelpActionResolve implements Resolve<IHelpAction> {
    constructor(private service: HelpActionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HelpAction> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HelpAction>) => response.ok),
                map((helpAction: HttpResponse<HelpAction>) => helpAction.body)
            );
        }
        return of(new HelpAction());
    }
}

export const helpActionRoute: Routes = [
    {
        path: 'help-action',
        component: HelpActionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.helpAction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'help-action/:id/view',
        component: HelpActionDetailComponent,
        resolve: {
            helpAction: HelpActionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.helpAction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'help-action/new',
        component: HelpActionUpdateComponent,
        resolve: {
            helpAction: HelpActionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.helpAction.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'help-action/:id/edit',
        component: HelpActionUpdateComponent,
        resolve: {
            helpAction: HelpActionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.helpAction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const helpActionPopupRoute: Routes = [
    {
        path: 'help-action/:id/delete',
        component: HelpActionDeletePopupComponent,
        resolve: {
            helpAction: HelpActionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.helpAction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
