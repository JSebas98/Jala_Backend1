import { Square } from "../entity/square";
import { Piece } from '../entity/piece';
import { Board } from '../entity/board';

export interface IPieceService {

    getPossibleMoves(piece: Piece, board: Board): Square[];
    getPathToTargetSquare(piece: Piece, currentSquare: Square, targetSquare: Square, board: Board): Square[];

}