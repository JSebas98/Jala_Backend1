import { inject, injectable } from 'inversify';
import { User } from '../entity/user.entity';
import { UserServiceInterface } from './user.service.interface';
import { UserRepositoryInterface } from '../infrastructure/user.repository.interface';
import DITypes from '../shared/inversify.types';
import { BadRequest } from '../shared/exceptions/badRequest';
import { NotFound } from '../shared/exceptions/notFound';
import { AttendanceServiceInterface } from './attendance.service.interface';
import { UserDomain } from '../entity/user';

@injectable()
export class UserService implements UserServiceInterface {

    constructor(@inject(DITypes.UserRepositoryInterface) private userRepository: UserRepositoryInterface,
                @inject(DITypes.AttendanceServiceInterface) private attendanceService: AttendanceServiceInterface){
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.getAllUsers();
    }

    async getUsersByNameOrNickname(name: string, nickname: string) {
        const users: User[] | null = await this.userRepository.getUsersByNameOrNickname(name, nickname);
        if(users.length === 0) {
            throw new NotFound('User not found in database.');
        }

        return users;
    }

    async getUserDetailed(userId: string): Promise<UserDomain | null> {
        const user = await this.userRepository.getSingleUser(userId);

        if(!user) {
            throw new NotFound(`User with id ${userId} not found in database.`);
        }
        const attendances = await this.attendanceService.getAllAttendancesByUser(userId);
        user.attendances = attendances;

        return user;
    }
    
    async createUser(user: User): Promise<User> {
        const resultValidation: string[] = await this.validateFieldsUser(user);
        
        if (resultValidation.length > 0) {
            let errorDescription = '';
            resultValidation.forEach((message) => {
                errorDescription += `${message} `;
            });
            throw new BadRequest(errorDescription);
        }

        return await this.userRepository.createUser(user);
    }

    async deleteUser(id: string): Promise<boolean> {
        await this.attendanceService.deleteAllAttendancesByUser(id);
    
        const result = await this.userRepository.deleteUser(id);
        if (!result) {
            throw new NotFound(`User with id ${id} not found.`);  
        }

        return result;
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