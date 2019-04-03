import { Moment } from 'moment';
import { IHelpAction } from 'app/shared/model//help-action.model';
import { IUser } from 'app/core/user/user.model';

export interface IHelpRequest {
    id?: number;
    title?: string;
    description?: string;
    datePost?: Moment;
    dateStart?: Moment;
    dateEnd?: Moment;
    helpR?: IHelpAction;
    request?: IUser;
}

export class HelpRequest implements IHelpRequest {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public datePost?: Moment,
        public dateStart?: Moment,
        public dateEnd?: Moment,
        public helpR?: IHelpAction,
        public request?: IUser
    ) {}
}
