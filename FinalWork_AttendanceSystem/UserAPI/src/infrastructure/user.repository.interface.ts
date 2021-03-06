import { UserDomain } from '../entity/user';
import { User } from '../entity/user.entity';

export interface UserRepositoryInterface {
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User | null>;
    getUsersByNameOrNickname(name: string, nickname: string): Promise<User[]>;
    getSingleUser(id: string): Promise<UserDomain | null>;
    saveUser(user: User): Promise<User>;
    deleteUser(id: string): Promise<boolean>;
}