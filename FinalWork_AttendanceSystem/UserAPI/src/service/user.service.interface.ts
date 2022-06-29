import { User } from '../entity/user.entity';

export interface UserServiceInterface {
    getAllUsers(): Promise<User[]>
    createUser(user: User): Promise<User>;
    deleteUser(id: string): void;
}