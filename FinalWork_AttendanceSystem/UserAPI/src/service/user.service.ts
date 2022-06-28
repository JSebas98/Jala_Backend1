import { inject, injectable } from 'inversify';
import { User } from '../entity/user.entity';
import { UserServiceInterface } from './user.service.interface';
import { UserRepositoryInterface } from '../infrastructure/user.repository.interface';
import DITypes from '../shared/inversify.types';

@injectable()
export class UserService implements UserServiceInterface {

    constructor(@inject(DITypes.UserRepositoryInterface) private userRepository: UserRepositoryInterface){
    }
    
    createUser(user: User): Promise<User> {
        return this.userRepository.createUser(user);
    }
    deleteUser(id: string): void {
        this.userRepository.deleteUser(id);
    }

}