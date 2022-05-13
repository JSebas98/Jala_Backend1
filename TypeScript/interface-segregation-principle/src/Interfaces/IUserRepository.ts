import User from '../user';
import Repository from './repository';

export interface IUserRepository extends Repository<User> {
    
    update(id: number, user: User): User;
    get(id: number): User;
    delete(id: number): void;

}