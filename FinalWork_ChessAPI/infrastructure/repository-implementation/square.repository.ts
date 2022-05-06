import { injectable } from 'inversify';
import { AppDataSource } from '../ORM/dataSource';
import { BaseRepository } from './base.repository';
import { Square } from '../../entity/square.entity';

@injectable()
export class SquareRepository extends BaseRepository<Square> {

    async save(square: Square): Promise<Square> {
        const pieceRepo = AppDataSource.getRepository(Square);
        return await pieceRepo.save(square);
    }

    async update(square: Square): Promise<Square> {
        const pieceRepo = AppDataSource.getRepository(Square);
        return await pieceRepo.save(square);
    }
    
}