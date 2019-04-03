import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FraternitySharedModule } from 'app/shared';
import { FraternityAdminModule } from 'app/admin/admin.module';
import {
    HelpActionComponent,
    HelpActionDetailComponent,
    HelpActionUpdateComponent,
    HelpActionDeletePopupComponent,
    HelpActionDeleteDialogComponent,
    helpActionRoute,
    helpActionPopupRoute
} from './';

const ENTITY_STATES = [...helpActionRoute, ...helpActionPopupRoute];

@NgModule({
    imports: [FraternitySharedModule, FraternityAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HelpActionComponent,
        HelpActionDetailComponent,
        HelpActionUpdateComponent,
        HelpActionDeleteDialogComponent,
        HelpActionDeletePopupComponent
    ],
    entryComponents: [HelpActionComponent, HelpActionUpdateComponent, HelpActionDeleteDialogComponent, HelpActionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FraternityHelpActionModule {}
