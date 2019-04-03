import { IHelpOffer } from 'app/shared/model//help-offer.model';
import { IHelpRequest } from 'app/shared/model//help-request.model';
import { IHelpAction } from 'app/shared/model//help-action.model';

export interface IUser {
    id?: number;
    gives?: IHelpOffer[];
    requests?: IHelpRequest[];
    tos?: IHelpAction[];
}

export class User implements IUser {
    constructor(public id?: number, public gives?: IHelpOffer[], public requests?: IHelpRequest[], public tos?: IHelpAction[]) {}
}
