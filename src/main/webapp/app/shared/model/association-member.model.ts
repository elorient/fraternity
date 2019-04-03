export interface IAssociationMember {
    id?: number;
    isPresident?: boolean;
}

export class AssociationMember implements IAssociationMember {
    constructor(public id?: number, public isPresident?: boolean) {
        this.isPresident = this.isPresident || false;
    }
}
