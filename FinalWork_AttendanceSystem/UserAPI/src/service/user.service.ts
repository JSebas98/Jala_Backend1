import { inject, injectable } from 'inversify';
import { User } from '../entity/user.entity';
import { UserServiceInterface } from './user.service.interface';
import { UserRepositoryInterface } from '../infrastructure/user.repository.interface';
import DITypes from '../shared/inversify.types';
import { BadRequest } from '../shared/exceptions/badRequest';
import { NotFound } from '../shared/exceptions/notFound';

@injectable()
export class UserService implements UserServiceInterface {

    constructor(@inject(DITypes.UserRepositoryInterface) private userRepository: UserRepositoryInterface){
    }

    getAllUsers(): Promise<User[]> {
        return this.userRepository.getAllUsers();
    }
    
    async createUser(user: User): Promise<User> {
        const resultValidation: string[] = this.validateFieldsUser(user);
        
        if (resultValidation.length > 0) {
            let errorDescription: string = '';
            resultValidation.forEach((message) => {
                errorDescription += `${message} `;
            });
            throw new BadRequest(errorDescription);
        }

        return await this.userRepository.createUser(user);
    }

    async deleteUser(id: string): Promise<boolean> {
        const result: boolean = await this.userRepository.deleteUser(id);
        return result;
        // if (!result) {
        //     throw new NotFound(`User with id ${id} not found.`);  
        // }
    }

    validateFieldsUser(user: User): string[] {
        const errorDetails: string[] = [];

        if (!user.name) {
            errorDetails.push('Name is a required field.');
        }

        if (!user.nickname) {
            errorDetails.push('Nickname is a required field.');
        }

        return errorDetails;
    }

}