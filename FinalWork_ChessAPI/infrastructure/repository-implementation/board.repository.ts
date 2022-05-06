import { injectable } from 'inversify';
import { Board } from '../../entity/board.entity';
import { AppDataSource } from '../ORM/dataSource';
import { BaseRepository } from './base.repository';

@injectable()
export class BoardRepository extends BaseRepository<Board> {

    async save(board: Board): Promise<Board> {
        const pieceRepo = AppDataSource.getRepository(Board);
        return await pieceRepo.save(board);
    }

    async update(board: Board): Promise<Board> {
        const pieceRepo = AppDataSource.getRepository(Board);
        return await pieceRepo.save(board);
    }

    async remove(board: Board): Promise<Board> {
        const pieceRepo = AppDataSource.getRepository(Board);
        return await pieceRepo.remove(board);
    }
    
}