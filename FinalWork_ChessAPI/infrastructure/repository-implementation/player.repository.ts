import { injectable } from 'inversify';
import { AppDataSource } from '../ORM/dataSource';
import { BaseRepository } from './base.repository';
import { Player } from '../../entity/player.entity';

@injectable()
export class PlayerRepository extends BaseRepository<Player> {

    async save(player: Player): Promise<Player> {
        const pieceRepo = AppDataSource.getRepository(Player);
        return await pieceRepo.save(player);
    }

    async update(player: Player): Promise<Player> {
        const pieceRepo = AppDataSource.getRepository(Player);
        return await pieceRepo.save(player);
    }

    async remove(player: Player): Promise<Player> {
        const pieceRepo = AppDataSource.getRepository(Player);
        return await pieceRepo.remove(player);
    }
    
}