import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FraternitySharedModule } from 'app/shared';
import { FraternityAdminModule } from 'app/admin/admin.module';
import {
    HelpRequestComponent,
    HelpRequestDetailComponent,
    HelpRequestUpdateComponent,
    HelpRequestDeletePopupComponent,
    HelpRequestDeleteDialogComponent,
    helpRequestRoute,
    helpRequestPopupRoute
} from './';

const ENTITY_STATES = [...helpRequestRoute, ...helpRequestPopupRoute];

@NgModule({
    imports: [FraternitySharedModule, FraternityAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HelpRequestComponent,
        HelpRequestDetailComponent,
        HelpRequestUpdateComponent,
        HelpRequestDeleteDialogComponent,
        HelpRequestDeletePopupComponent
    ],
    entryComponents: [HelpRequestComponent, HelpRequestUpdateComponent, HelpRequestDeleteDialogComponent, HelpRequestDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FraternityHelpRequestModule {}
