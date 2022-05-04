import { inject } from "inversify";
import { types } from "../src/types";
import { UserRepository } from '../infrastructure/repository-implementation/UserRepository';
import { BaseRepository } from '../infrastructure/repository-implementation/BaseRepository';
import { User } from "../entities/User";

export class UserService extends BaseRepository<User> {

    public repository: UserRepository;
    
    // Injecting UserRepository usign InversifyJS
    constructor(@inject(types.UserRepository) repository: UserRepository ) {
        super();
        this.repository = repository;
    }

    getUser(): string {
        return this.repository.getUser();
    }

    create(user: User): Promise<User>{
        return this.repository.create(user);
    }

}