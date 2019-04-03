import { IAssociationMember } from 'app/shared/model//association-member.model';

export interface IAssociation {
    id?: number;
    nSiret?: string;
    statut?: string;
    asso?: IAssociationMember;
}

export class Association implements IAssociation {
    constructor(public id?: number, public nSiret?: string, public statut?: string, public asso?: IAssociationMember) {}
}
