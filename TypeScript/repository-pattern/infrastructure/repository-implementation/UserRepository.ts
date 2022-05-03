import { User } from "../../entities/User";

export class UserRepository implements IRepository<User> {
    
    getById(id: number): User {
        throw new Error("Method not implemented.");
    }
    create(entity: User): void {
        throw new Error("Method not implemented.");
    }
    delete(entity: User): void {
        throw new Error("Method not implemented.");
    }
    update(entity: User): void {
        throw new Error("Method not implemented.");
    }

}