import { UserDomain } from '../entity/user';
import { User } from '../entity/user.entity';

export interface UserRepositoryInterface {
    getAllUsers(): Promise<User[]>;
    getUsersByNameOrNickname(name: string, nickname: string): Promise<User[]>;
    getSingleUser(id: string): Promise<UserDomain | null>;
    createUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User | null>;
    deleteUser(id: string): Promise<boolean>;
}