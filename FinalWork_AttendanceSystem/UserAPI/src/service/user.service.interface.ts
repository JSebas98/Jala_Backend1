import { User } from '../entity/user.entity';

export interface UserServiceInterface {
    getAllUsers(): Promise<User[]>;
    getUsersByNameOrNickname(name: string, nickname: string): Promise<User[]>;
    getUserDetailed(userId: string): void;
    createUser(user: User): Promise<User>;
    deleteUser(id: string): Promise<boolean>;
}