import Repository from './Interfaces/repository';
import User from './user';
import { IUserRepository } from './Interfaces/IUserRepository';

export default class UserRepository implements IUserRepository {
    
    update(id: number, user: User): User {
        throw new Error('Method not implemented.');
    }
    get(id: number): User {
        throw new Error('Method not implemented.');
    }
    delete(id: number): void {
        throw new Error('Method not implemented.');
    }
    insert(entity: User): User {
        throw new Error('Method not implemented.');
    }
    

}