import { injectable } from "inversify";
import { AppDataSource } from "./dataSource";
import { User } from '../entity/user.entity';
import { Repository } from "typeorm";
import { UserRepositoryInterface } from './user.repository.interface';

@injectable()
export class UserRepository implements UserRepositoryInterface {

    private userRepository: Repository<User>;
    
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async createUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    deleteUser(id: string): void {
        this.userRepository.delete(id);
    }
}