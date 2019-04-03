import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FraternitySharedModule } from 'app/shared';
import { FraternityAdminModule } from 'app/admin/admin.module';
import {
    HelpOfferComponent,
    HelpOfferDetailComponent,
    HelpOfferUpdateComponent,
    HelpOfferDeletePopupComponent,
    HelpOfferDeleteDialogComponent,
    helpOfferRoute,
    helpOfferPopupRoute
} from './';

const ENTITY_STATES = [...helpOfferRoute, ...helpOfferPopupRoute];

@NgModule({
    imports: [FraternitySharedModule, FraternityAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HelpOfferComponent,
        HelpOfferDetailComponent,
        HelpOfferUpdateComponent,
        HelpOfferDeleteDialogComponent,
        HelpOfferDeletePopupComponent
    ],
    entryComponents: [HelpOfferComponent, HelpOfferUpdateComponent, HelpOfferDeleteDialogComponent, HelpOfferDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FraternityHelpOfferModule {}
