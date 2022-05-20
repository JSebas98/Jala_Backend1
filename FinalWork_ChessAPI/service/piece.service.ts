import "reflect-metadata";
import { injectable } from "inversify";
import { Square } from '../entity/square';
import { IPieceService } from './IPieceService';
import { Piece } from '../entity/piece';
import { Board } from "../entity/board";
import { FileMapper, turnNumberIntoFile } from '../shared/file.mapper';
import { File, Rank, Color } from '../shared/types';

@injectable()
export class PieceService implements IPieceService {

    constructor() {

    };
    
    getPossibleMoves(piece: Piece, board: Board): Square[] {
        const availableSquares: Square[] = [];
        const boardSquares: Square[] = board.getSquares();
        const indexCurrentSquare: number = board.findIndexSquare(piece.getFile(), piece.getRank());
        const currentSquare: Square = boardSquares[indexCurrentSquare];

        for(let i: number = 0; i<boardSquares.length; i++) {
            let targetSquare: Square = boardSquares[i];
            if (piece.canMoveTo(targetSquare)) {
                const pathToTarget: Square[] = this.getPathToTargetSquare(piece, currentSquare, targetSquare, board);
                if (this.isPathToTargetFree(pathToTarget, piece.getColor())) {
                    availableSquares.push(targetSquare);
                }
            }
        }
        
        return availableSquares;
    }

    isKing(piece: Piece): boolean {
        return piece.getType() === 'King';
    }

    isPathToTargetFree(pathToTarget: Square[], pieceColor: Color): boolean {
        let isFree: boolean = true;

        pathToTarget.forEach((square) => {
            if (!square.isEmpty()) {
                isFree = false
            };
        });

        return isFree;
    }

    getPathToTargetSquare(piece: Piece, currentSquare: Square, targetSquare: Square, board: Board): Square[] {
        switch(piece.getType()) {
            case 'Rook':
                return this.getPathForRook(currentSquare, targetSquare, board);
                break;
            case 'Pawn':
                return this.getPathForPawn(currentSquare, targetSquare, board);
                break;
            case 'Bishop':
                return this.getPathForBishop(currentSquare, targetSquare, board);
                break;
            case 'Queen':
                return this.getPathForQueen(currentSquare, targetSquare, board);
                break;
            default:
                return [];
        }
    }

    getPathForQueen(currentSquare: Square, targetSquare: Square, board: Board): Square[] {
        const pathToTarget: Square[] = [];
        const boardSquares: Square[] = board.getSquares();
        const currentRank: Rank = currentSquare.getRank();
        const targetRank: Rank = targetSquare.getRank();
        const currentFileAsNumber: number = FileMapper[currentSquare.getFile()];
        const targetFileAsNumber: number = FileMapper[targetSquare.getFile()];

        if (this.isMoveVertical(currentSquare, targetSquare)) {
            if (currentRank < targetRank) {
                return this.getVerticalUpPath(currentSquare, targetSquare, board, boardSquares);
            }

            if (currentRank > targetRank) {
                return this.getVerticalDownPath(currentSquare, targetSquare, board, boardSquares);
            }
        }

        if (this.isMoveHorizontal(currentSquare, targetSquare)) {
            if (currentFileAsNumber < targetFileAsNumber) {
                return this.getHorizontalRightPath(currentSquare, targetSquare, board, boardSquares);
            }

            if (currentFileAsNumber > targetFileAsNumber) {
                return this.getHorizontalLeftPath(currentSquare, targetSquare, board, boardSquares);
            }
        }

        if (this.isMoveDiagonal(currentSquare, targetSquare)) {
            if (currentRank < targetRank &&
                currentFileAsNumber > targetFileAsNumber) {
                    return this.getDiagonalUpLeftPath(currentSquare, targetSquare, board, boardSquares);
            }
    
            if (currentRank < targetRank &&
                currentFileAsNumber < targetFileAsNumber) {
                    return this.getDiagonalUpRightPath(currentSquare, targetSquare, board, boardSquares);
            }
    
            if (currentRank > targetRank &&
                currentFileAsNumber < targetFileAsNumber) {
                    return this.getDiagonalDownRightPath(currentSquare, targetSquare, board, boardSquares);
            }
    
            if (currentRank > targetRank &&
                currentFileAsNumber > targetFileAsNumber) {
                    return this.getDiagonalDownLeftPath(currentSquare, targetSquare, board, boardSquares);
            }
        }

        return pathToTarget;
    }

    getPathForBishop(currentSquare: Square, targetSquare: Square, board: Board): Square[] {
        const pathToTarget: Square[] = [];
        const boardSquares: Square[] = board.getSquares();

        const currentRank: Rank = currentSquare.getRank();
        const targetRank: Rank = targetSquare.getRank();
        const currentFileAsNumber: number = FileMapper[currentSquare.getFile()];
        const targetFileAsNumber: number = FileMapper[targetSquare.getFile()];

        if (currentRank < targetRank &&
            currentFileAsNumber > targetFileAsNumber) {
                return this.getDiagonalUpLeftPath(currentSquare, targetSquare, board, boardSquares);
        }

        if (currentRank < targetRank &&
            currentFileAsNumber < targetFileAsNumber) {
                return this.getDiagonalUpRightPath(currentSquare, targetSquare, board, boardSquares);
        }

        if (currentRank > targetRank &&
            currentFileAsNumber < targetFileAsNumber) {
                return this.getDiagonalDownRightPath(currentSquare, targetSquare, board, boardSquares);
        }

        if (currentRank > targetRank &&
            currentFileAsNumber > targetFileAsNumber) {
                return this.getDiagonalDownLeftPath(currentSquare, targetSquare, board, boardSquares);
        }

        return pathToTarget;
    }

    getPathForPawn(currentSquare: Square, targetSquare: Square, board: Board): Square[] {
        const pathToTarget: Square[] = [];
        const boardSquares: Square[] = board.getSquares();
        const currentRank: Rank = currentSquare.getRank();
        const targetRank: Rank = targetSquare.getRank();

        if (this.isMoveVertical(currentSquare, targetSquare)) {
            if (currentRank < targetRank) {
                return this.getVerticalUpPath(currentSquare, targetSquare, board, boardSquares);
            }

            if (currentRank > targetRank) {
                return this.getVerticalDownPath(currentSquare, targetSquare, board, boardSquares);
            }
        }

        if (this.isMoveDiagonal(currentSquare, targetSquare)) {
            const targetRank: Rank = targetSquare.getRank();
            const targetFile: File = targetSquare.getFile();

            const squareIndex: number = board.findIndexSquare(targetFile, targetRank);
            pathToTarget.push(boardSquares[squareIndex]);
            return pathToTarget;
        }

        return pathToTarget;
    };

    getPathForRook(currentSquare: Square, targetSquare: Square, board: Board): Square[] {
        
        const pathToTarget: Square[] = [];
        const boardSquares: Square[] = board.getSquares();
        const currentRank: Rank = currentSquare.getRank();
        const targetRank: Rank = targetSquare.getRank();
        const currentFileAsNumber: number = FileMapper[currentSquare.getFile()];
        const targetFileAsNumber: number = FileMapper[targetSquare.getFile()];

        if (this.isMoveVertical(currentSquare, targetSquare)) {
            if (currentRank < targetRank) {
                return this.getVerticalUpPath(currentSquare, targetSquare, board, boardSquares);
            }

            if (currentRank > targetRank) {
                return this.getVerticalDownPath(currentSquare, targetSquare, board, boardSquares);
            }
        }

        if (this.isMoveHorizontal(currentSquare, targetSquare)) {
            if (currentFileAsNumber < targetFileAsNumber) {
                return this.getHorizontalRightPath(currentSquare, targetSquare, board, boardSquares);
            }

            if (currentFileAsNumber > targetFileAsNumber) {
                return this.getHorizontalLeftPath(currentSquare, targetSquare, board, boardSquares);
            }
        }

        return pathToTarget;
    }

    isMoveVertical(currentSquare: Square, targetSquare: Square): boolean {
        const currentFile: File = currentSquare.getFile();
        const targetFile: File = targetSquare.getFile();
        
        return FileMapper[currentFile] - FileMapper[targetFile] === 0;
    }

    isMoveHorizontal(currentSquare: Square, targetSquare: Square): boolean {
        const currentRank: Rank = currentSquare.getRank();
        const targetRank: Rank = targetSquare.getRank();

        return currentRank - targetRank === 0;
    }

    isMoveDiagonal(currentSquare: Square, targetSquare: Square): boolean {
        const currentFile: File = currentSquare.getFile();
        const targetFile: File = targetSquare.getFile();
        const currentRank: Rank = currentSquare.getRank();
        const targetRank: Rank = targetSquare.getRank();

        return Math.abs(FileMapper[targetFile] - FileMapper[currentFile]) ===
                Math.abs(targetRank - currentRank);
    }

    getVerticalUpPath(currentSquare: Square, targetSquare: Square, board: Board, boardSquares: Square[]): Square[] {
        const pathToTarget: Square[] = [];
        const currentRank: Rank = currentSquare.getRank();
        const targetRank: Rank = targetSquare.getRank();
        const currentFile: File = currentSquare.getFile();

        for (let i:number = currentRank + 1; i < targetRank; i++) {
            const squareIndex: number = board.findIndexSquare(currentFile, i as Rank);
            pathToTarget.push(boardSquares[squareIndex]);
        }

        return pathToTarget;
    }

    getVerticalDownPath(currentSquare: Square, targetSquare: Square, board: Board, boardSquares: Square[]): Square[] {
        const pathToTarget: Square[] = [];
        const currentRank: Rank = currentSquare.getRank();
        const targetRank: Rank = targetSquare.getRank();
        const currentFile: File = currentSquare.getFile();

        for (let i:number = currentRank - 1; i > targetRank; i--) {
            const squareIndex: number = board.findIndexSquare(currentFile, i as Rank);
            pathToTarget.push(boardSquares[squareIndex]);
        }

        return pathToTarget;
    }

    getHorizontalRightPath(currentSquare: Square, targetSquare: Square, board: Board, boardSquares: Square[]): Square[] {
        const pathToTarget: Square[] = [];
        const currentRank: Rank = currentSquare.getRank();
        const currentFileAsNumber: number = FileMapper[currentSquare.getFile()];
        const targetFileAsNumber: number = FileMapper[targetSquare.getFile()];

        for (let i:number = currentFileAsNumber + 1; i < targetFileAsNumber; i++) {
            const currentFile: File = turnNumberIntoFile(i);
            const squareIndex: number = board.findIndexSquare(currentFile, currentRank);
            pathToTarget.push(boardSquares[squareIndex])
        }

        return pathToTarget;
    }

    getHorizontalLeftPath(currentSquare: Square, targetSquare: Square, board: Board, boardSquares: Square[]): Square[] {
        const pathToTarget: Square[] = [];
        const currentRank: Rank = currentSquare.getRank();
        const currentFileAsNumber: number = FileMapper[currentSquare.getFile()];
        const targetFileAsNumber: number = FileMapper[targetSquare.getFile()];

        for (let i:number = currentFileAsNumber - 1; i > targetFileAsNumber; i--) {
            const currentFile: File = turnNumberIntoFile(i);
            const squareIndex: number = board.findIndexSquare(currentFile, currentRank);
            pathToTarget.push(boardSquares[squareIndex])
        }

        return pathToTarget;
    }

    getDiagonalUpLeftPath(currentSquare: Square, targetSquare: Square, board: Board, boardSquares: Square[]): Square[] {
        const pathToTarget: Square[] = [];
        const currentRank: Rank = currentSquare.getRank();
        const targetRank: Rank = targetSquare.getRank();
        const currentFileAsNumber: number = FileMapper[currentSquare.getFile()];
        const distanceBetweenSquares: number = Math.abs(currentRank - targetRank);

        for (let i: number = 1; i < distanceBetweenSquares; i++) {
            const currentFile: File = turnNumberIntoFile(currentFileAsNumber - i);
            const squareIndex: number = board.findIndexSquare(currentFile, (currentRank + i) as Rank);
            pathToTarget.push(boardSquares[squareIndex]);
        }

        return pathToTarget;
    }

    getDiagonalUpRightPath(currentSquare: Square, targetSquare: Square, board: Board, boardSquares: Square[]): Square[] {
        const pathToTarget: Square[] = [];
        const currentRank: Rank = currentSquare.getRank();
        const targetRank: Rank = targetSquare.getRank();
        const currentFileAsNumber: number = FileMapper[currentSquare.getFile()];
        const distanceBetweenSquares: number = Math.abs(currentRank - targetRank);

        for (let i: number = 1; i < distanceBetweenSquares; i++) {
            const currentFile: File = turnNumberIntoFile(currentFileAsNumber + i);
            const squareIndex: number = board.findIndexSquare(currentFile, (currentRank + i) as Rank);
            pathToTarget.push(boardSquares[squareIndex]);
        }
        return pathToTarget;
    }

    getDiagonalDownRightPath(currentSquare: Square, targetSquare: Square, board: Board, boardSquares: Square[]): Square[] {
        const pathToTarget: Square[] = [];
        const currentRank: Rank = currentSquare.getRank();
        const targetRank: Rank = targetSquare.getRank();
        const currentFileAsNumber: number = FileMapper[currentSquare.getFile()];
        const distanceBetweenSquares: number = Math.abs(currentRank - targetRank);

        for (let i: number = 1; i < distanceBetweenSquares; i++) {
            const currentFile: File = turnNumberIntoFile(currentFileAsNumber + i);
            const squareIndex: number = board.findIndexSquare(currentFile, (currentRank - i) as Rank);
            pathToTarget.push(boardSquares[squareIndex]);
        }
        return pathToTarget;
    }

    getDiagonalDownLeftPath(currentSquare: Square, targetSquare: Square, board: Board, boardSquares: Square[]): Square[] {
        const pathToTarget: Square[] = [];
        const currentRank: Rank = currentSquare.getRank();
        const targetRank: Rank = targetSquare.getRank();
        const currentFileAsNumber: number = FileMapper[currentSquare.getFile()];
        const distanceBetweenSquares: number = Math.abs(currentRank - targetRank);

        for (let i: number = 1; i < distanceBetweenSquares; i++) {
            const currentFile: File = turnNumberIntoFile(currentFileAsNumber - i);
            const squareIndex: number = board.findIndexSquare(currentFile, (currentRank - i) as Rank);
            pathToTarget.push(boardSquares[squareIndex]);
        }
        return pathToTarget;
    }

}