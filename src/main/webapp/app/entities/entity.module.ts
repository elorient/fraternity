import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FraternityAssociationModule } from './association/association.module';
import { FraternityAssociationMemberModule } from './association-member/association-member.module';
import { FraternityHelpOfferModule } from './help-offer/help-offer.module';
import { FraternityHelpRequestModule } from './help-request/help-request.module';
import { FraternityHelpActionModule } from './help-action/help-action.module';
import { FraternityUserModule } from './user/user.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        FraternityAssociationModule,
        FraternityAssociationMemberModule,
        FraternityHelpOfferModule,
        FraternityHelpRequestModule,
        FraternityHelpActionModule,
        FraternityUserModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FraternityEntityModule {}
