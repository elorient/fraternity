import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { User } from 'app/shared/model/user.model';
import { UserService } from './user.service';
import { UserComponent } from './user.component';
import { UserDetailComponent } from './user-detail.component';
import { UserUpdateComponent } from './user-update.component';
import { UserDeletePopupComponent } from './user-delete-dialog.component';
import { IUser } from 'app/shared/model/user.model';

@Injectable({ providedIn: 'root' })
export class UserResolve implements Resolve<IUser> {
    constructor(private service: UserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<User>) => response.ok),
                map((user: HttpResponse<User>) => user.body)
            );
        }
        return of(new User());
    }
}

export const userRoute: Routes = [
    {
        path: 'user',
        component: UserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.user.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user/:id/view',
        component: UserDetailComponent,
        resolve: {
            user: UserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.user.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user/new',
        component: UserUpdateComponent,
        resolve: {
            user: UserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.user.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user/:id/edit',
        component: UserUpdateComponent,
        resolve: {
            user: UserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.user.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userPopupRoute: Routes = [
    {
        path: 'user/:id/delete',
        component: UserDeletePopupComponent,
        resolve: {
            user: UserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraternityApp.user.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
