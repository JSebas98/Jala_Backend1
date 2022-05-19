import { Board } from '../entity/board';
import { Piece } from '../entity/piece';
import { File, GamePieces, Rank } from '../shared/types';
import { Square } from '../entity/square';

export interface IBoardService {
    
    initBoard(): Board;
    getPiece(file: File, rank: Rank): Piece | undefined;
    getSquare(file: File, rank: Rank): Square;
    movePiece(piece: Piece, goalFile: File, goalRank: Rank): Board | string;
    isMovePossible(piece: Piece, targetSquare: Square): boolean;
    getPlayingPieces(): GamePieces;

}