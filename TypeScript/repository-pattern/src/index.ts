import { User } from '../entities/User';
import { AppDataSource } from '../infrastructure/database/data-source';
import { UserRepository } from '../infrastructure/repository-implementation/UserRepository';
import { UserService } from '../service/UserService';

class Test {
    async initializeDB() {
        await AppDataSource.initialize();

        const user = new User();
        user.id = 1,
        user.name = 'Pepe',
        user.email = 'pepe@gmail.com',
        user.password = 'pepe123.'

        const repo = new UserRepository();
        const service = new UserService(repo);

        service.create(user);
    }
}

new Test().initializeDB();

