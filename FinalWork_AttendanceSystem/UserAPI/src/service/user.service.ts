import { inject, injectable } from 'inversify';
import { User } from '../entity/user.entity';
import { UserServiceInterface } from './user.service.interface';
import { UserRepositoryInterface } from '../infrastructure/user.repository.interface';
import DITypes from '../shared/inversify.types';
import { BadRequest } from '../shared/exceptions/badRequest';
import { NotFound } from '../shared/exceptions/notFound';
import { AttendanceServiceInterface } from './attendance.service.interface';
import { UserDomain } from '../entity/user';
import { UserUpdate } from '../shared/types';
import { UserMapper } from '../entity/userMapper';

@injectable()
export class UserService implements UserServiceInterface {

    constructor(@inject(DITypes.UserRepositoryInterface) private userRepository: UserRepositoryInterface,
                @inject(DITypes.AttendanceServiceInterface) private attendanceService: AttendanceServiceInterface){
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.getAllUsers();
    }

    async getUsersByNameOrNickname(name: string, nickname: string): Promise<User[]> {
        const users: User[] | null = await this.userRepository.getUsersByNameOrNickname(name, nickname);

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

        return await this.userRepository.saveUser(user);
    }

    async updateUser(user: UserUpdate): Promise<User> {
        const resultValidation: string[] = await this.validateFieldsUpdate(user);
        if (resultValidation.length > 0) {
            let errorDescription = '';
            resultValidation.forEach((message) => {
                errorDescription += `${message} `;
            });
            throw new BadRequest(errorDescription);
        }

        const userToUpdate = await this.userRepository.getSingleUser(user.id);
        if(!userToUpdate) {
            throw new NotFound(`User with ${user.id} not found. Can't update!`);
        }

        if(user.totalAttendance) {
            userToUpdate.totalAttendance = user.totalAttendance;
        }

        return await this.userRepository.saveUser(UserMapper.toEntity(userToUpdate));
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

    validateFieldsUpdate(user: UserUpdate): string[] {
        const errorDetails: string[] = [];

        if (!user.id) {
            errorDetails.push('Id is a required field.');
        }

        if (!user.totalAttendance) {
            errorDetails.push('totalAttendance is a required field.');
        }

        return errorDetails;
    }

}