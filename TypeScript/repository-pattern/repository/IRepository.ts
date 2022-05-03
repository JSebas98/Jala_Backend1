interface IRepository<T> {
    
    getById(id: number): T;

    create(entity: T): void;

    delete(entity: T): void;

    update(entity: T): void;
}