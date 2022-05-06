import { IRepository } from '../../repository/IRepository';
import { AppDataSource } from '../ORM/dataSource';

export abstract class BaseRepository<T> implements IRepository<T> {
    
    save(entity: T): Promise<T> {
        throw new Error('Method not implemented.');
    }
    update(entity: T): Promise<T> {
        throw new Error('Method not implemented.');
    }
    
    remove(entity: T): Promise<T> {
        throw new Error('Method not implemented.');
    }

}