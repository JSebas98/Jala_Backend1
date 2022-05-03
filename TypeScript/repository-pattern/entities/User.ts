import { EntityBase } from './EntityBase';

export class User extends EntityBase {

    constructor(public id: number, public name: string, ) {
        super(id);
    }
}