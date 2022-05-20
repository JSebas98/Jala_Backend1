import { Square } from "../entity/square";
import { Piece } from '../entity/piece';
import { Board } from '../entity/board';
import { Color } from '../shared/types';

export interface IPieceService {

    getPossibleMoves(piece: Piece, board: Board): Square[];
    isKing(piece: Piece): boolean;
    getPathToTargetSquare(piece: Piece, currentSquare: Square, targetSquare: Square, board: Board): Square[];
    isPathToTargetFree(pathToTarget: Square[], pieceColor: Color): boolean;
    getPathToTargetSquare(piece: Piece, currentSquare: Square, targetSquare: Square, board: Board): Square[];
    getPathForQueen(currentSquare: Square, targetSquare: Square, board: Board): Square[];
    getPathForBishop(currentSquare: Square, targetSquare: Square, board: Board): Square[];
    getPathForPawn(currentSquare: Square, targetSquare: Square, board: Board): Square[];
    getPathForRook(currentSquare: Square, targetSquare: Square, board: Board): Square[];
    isMoveVertical(currentSquare: Square, targetSquare: Square): boolean;
    isMoveHorizontal(currentSquare: Square, targetSquare: Square): boolean;
    isMoveDiagonal(currentSquare: Square, targetSquare: Square): boolean;
    getVerticalUpPath(currentSquare: Square, targetSquare: Square, board: Board, boardSquares: Square[]): Square[];
    getVerticalDownPath(currentSquare: Square, targetSquare: Square, board: Board, boardSquares: Square[]): Square[];
    getHorizontalRightPath(currentSquare: Square, targetSquare: Square, board: Board, boardSquares: Square[]): Square[];
    getHorizontalLeftPath(currentSquare: Square, targetSquare: Square, board: Board, boardSquares: Square[]): Square[];
    getDiagonalUpLeftPath(currentSquare: Square, targetSquare: Square, board: Board, boardSquares: Square[]): Square[];
    getDiagonalUpRightPath(currentSquare: Square, targetSquare: Square, board: Board, boardSquares: Square[]): Square[];
    getDiagonalDownRightPath(currentSquare: Square, targetSquare: Square, board: Board, boardSquares: Square[]): Square[];
    getDiagonalDownLeftPath(currentSquare: Square, targetSquare: Square, board: Board, boardSquares: Square[]): Square[];

}