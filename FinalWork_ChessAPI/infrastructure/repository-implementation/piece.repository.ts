import { injectable } from "inversify";
import { Piece } from "../../entity/piece.entity";
import { BaseRepository } from "./base.repository";
import { AppDataSource } from '../ORM/dataSource';
import { PieceName } from "../../src/types";

@injectable()
export class PieceRepository extends BaseRepository<Piece> {
    
    async save(piece: Piece): Promise<Piece> {
        const pieceRepo = AppDataSource.getRepository(Piece);
        return await pieceRepo.save(piece);
    }

    async update(piece: Piece): Promise<Piece> {
        const pieceRepo = AppDataSource.getRepository(Piece);
        return await pieceRepo.save(piece);
    }

    async remove(piece: Piece): Promise<Piece> {
        const pieceRepo = AppDataSource.getRepository(Piece);
        return await pieceRepo.remove(piece);
    }

}