import { Board } from '../entity/board';
import { Piece } from '../entity/piece';
import { Color, File, GamePieces, Rank } from '../shared/types';
import { Square } from '../entity/square';

export interface IBoardService {
    
    initBoard(): Board;
    getPiece(file: File, rank: Rank): Piece | undefined;
    getSquare(file: File, rank: Rank): Square;
    movePiece(piece: Piece, targetFile: File, targetRank: Rank): Board | string;
    isMoveValid(piece: Piece, targetSquare: Square): boolean;
    getPlayingPieces(): GamePieces;
    getKingSquare(color: Color): Square;
    getAttackedSquaresBy(color: Color): Square[];
    isKingOnCheck(kingSquare: Square, attackedSquares: Square[]): boolean;
    doesMovePutKingOnCheck(currentSquare: Square, targetSquare: Square): boolean;

}