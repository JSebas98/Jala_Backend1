import { User } from '../entity/user.entity';

export interface UserServiceInterface {
    createUser(user: User): Promise<User>;
    deleteUser(id: string): void;
}