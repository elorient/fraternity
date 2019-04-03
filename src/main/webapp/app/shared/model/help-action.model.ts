import { IUser } from 'app/core/user/user.model';

export interface IHelpAction {
    id?: number;
    to?: IUser;
    from?: IUser;
}

export class HelpAction implements IHelpAction {
    constructor(public id?: number, public to?: IUser, public from?: IUser) {}
}
