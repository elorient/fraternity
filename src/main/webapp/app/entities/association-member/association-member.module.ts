import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FraternitySharedModule } from 'app/shared';
import {
    AssociationMemberComponent,
    AssociationMemberDetailComponent,
    AssociationMemberUpdateComponent,
    AssociationMemberDeletePopupComponent,
    AssociationMemberDeleteDialogComponent,
    associationMemberRoute,
    associationMemberPopupRoute
} from './';

const ENTITY_STATES = [...associationMemberRoute, ...associationMemberPopupRoute];

@NgModule({
    imports: [FraternitySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AssociationMemberComponent,
        AssociationMemberDetailComponent,
        AssociationMemberUpdateComponent,
        AssociationMemberDeleteDialogComponent,
        AssociationMemberDeletePopupComponent
    ],
    entryComponents: [
        AssociationMemberComponent,
        AssociationMemberUpdateComponent,
        AssociationMemberDeleteDialogComponent,
        AssociationMemberDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FraternityAssociationMemberModule {}
