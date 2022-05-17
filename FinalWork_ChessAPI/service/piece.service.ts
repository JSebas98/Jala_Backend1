import "reflect-metadata";
import { injectable } from "inversify";
import { Square } from '../entity/square';
import { IPieceService } from './IPieceService';
import { Piece } from '../entity/piece';
import { Board } from "../entity/board";
import { FileMapper, turnNumberIntoFile } from '../shared/file.mapper';
import { File, Rank } from '../shared/types';

@injectable()
export class PieceService implements IPieceService {
    
    getPossibleMoves(piece: Piece, board: Board): Square[] {
        let availableSquares: Square[] = [];
        const boardSquares: Square[] = board.getSquares();

        for(let i: number = 0; i<boardSquares.length; i++) {
            let square: Square = boardSquares[i];
            if (piece.canMoveTo(square)) {
                availableSquares.push(square);
            }
        }
        
        return availableSquares;
    }

    getPathToTargetSquare(piece: Piece, currentSquare: Square, targetSquare: Square, board: Board): Square[] {
        switch(piece.getType()) {
            case 'Rook':
                return this.getPathForRook(currentSquare, targetSquare, board);
            case 'Pawn':
                return this.getPathForPawn(currentSquare, targetSquare, board);
            case 'Bishop':
                return this.getPathForBishop(currentSquare, targetSquare, board);
            case 'Queen':
                return this.getPathForQueen(currentSquare, targetSquare, board);
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
        const currentFile: File = currentSquare.getFile();

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

    isMoveHorizontal(currentSquare: Square, targetSquare: Square) {
        const currentRank: Rank = currentSquare.getRank();
        const targetRank: Rank = targetSquare.getRank();

        return currentRank - targetRank === 0;
    }

    isMoveDiagonal(currentSquare: Square, targetSquare: Square) {
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

        for (let i:number = currentRank + 1; i <= targetRank; i++) {
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

        for (let i:number = currentRank - 1; i >= targetRank; i--) {
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

        for (let i:number = currentFileAsNumber + 1; i <= targetFileAsNumber; i++) {
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

        for (let i:number = currentFileAsNumber - 1; i >= targetFileAsNumber; i--) {
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

        for (let i: number = 1; i <= distanceBetweenSquares; i++) {
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

        for (let i: number = 1; i <= distanceBetweenSquares; i++) {
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

        for (let i: number = 1; i <= distanceBetweenSquares; i++) {
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

        for (let i: number = 1; i <= distanceBetweenSquares; i++) {
            const currentFile: File = turnNumberIntoFile(currentFileAsNumber - i);
            const squareIndex: number = board.findIndexSquare(currentFile, (currentRank - i) as Rank);
            pathToTarget.push(boardSquares[squareIndex]);
        }
        return pathToTarget;
    }

    

}