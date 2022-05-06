export interface IRepository<T> {
    
    save(entity: T): Promise<T>;
    
    update(entity: T): Promise<T>;
    
    remove(entity: T): Promise<T>;

}