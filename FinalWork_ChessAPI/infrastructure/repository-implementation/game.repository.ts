import { injectable } from 'inversify';
import { AppDataSource } from '../ORM/dataSource';
import { BaseRepository } from './base.repository';
import { Game } from '../../entity/game.entity';

@injectable()
export class GameRepository extends BaseRepository<Game> {

    async save(game: Game): Promise<Game> {
        const pieceRepo = AppDataSource.getRepository(Game);
        return await pieceRepo.save(game);
    }

    async update(game: Game): Promise<Game> {
        const pieceRepo = AppDataSource.getRepository(Game);
        return await pieceRepo.save(game);
    }

    async remove(game: Game): Promise<Game> {
        const pieceRepo = AppDataSource.getRepository(Game);
        return await pieceRepo.remove(game);
    }
    
}