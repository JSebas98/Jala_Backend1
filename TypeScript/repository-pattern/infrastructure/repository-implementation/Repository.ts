export class Repository<T> implements IRepository<T>{
    
    getById(id: number): T {
        throw new Error("Method not implemented.");
    }
    create(entity: T): void {
        throw new Error("Method not implemented.");
    }
    delete(entity: T): void {
        throw new Error("Method not implemented.");
    }
    update(entity: T): void {
        throw new Error("Method not implemented.");
    }
}