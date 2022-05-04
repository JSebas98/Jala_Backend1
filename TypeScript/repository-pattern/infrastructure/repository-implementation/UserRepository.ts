import { injectable } from "inversify";
import { User } from "../../entities/User";
import { BaseRepository } from "./BaseRepository";
import { AppDataSource } from '../database/data-source';

@injectable()
export class UserRepository extends BaseRepository<User> {

    getUser(): string {
        return 'This is a retrieved user';
    }

    async create(user: User): Promise<User> {
        const userRepo = AppDataSource.getRepository(User);
        return await userRepo.save(user);
    }
}