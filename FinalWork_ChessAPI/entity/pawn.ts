import { FileMapper } from '../shared/file.mapper';
import { Piece } from './piece';
import { Square } from './square';
import { Color } from '../shared/types';

export class Pawn extends Piece {

    canMoveTo(targetSquare: Square): boolean {
        if (this.isTargetSquareCurrentSquare(targetSquare)) {
            return false;
        }
                                                
        return this.canMoveTwoPlacesForward(this.getColor(), targetSquare) ||
                this.canMoveOnePlaceForward(this.getColor(), targetSquare) ||
                this.canCaptureDiagonally(this.getColor(), targetSquare);       
    }

    isFirstMove(pieceColor: Color): boolean {
        if (pieceColor === 'White') {
            return this.getRank() === 2;
        } else {
            return this.getRank() === 7;
        }
    }

    canCaptureDiagonally(pieceColor: Color, targetSquare: Square): boolean {
        let rankDistance: number;

        if (pieceColor === 'White') {
            rankDistance = 1;
        } else {
            rankDistance = -1;
        }
        
        return targetSquare.isOccupiedByAdversary(pieceColor) &&
                Math.abs(FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()]) === 1 &&
                targetSquare.getRank() - this.getRank() === rankDistance;
    }

    canMoveOnePlaceForward(pieceColor: Color, targetSquare: Square): boolean {
        let rankDistance: number;

        if (pieceColor === 'White') {
            rankDistance = 1;
        } else {
            rankDistance = -1;
        }

        return targetSquare.isEmpty() &&
                FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()] === 0 &&
                targetSquare.getRank() - this.getRank() === rankDistance;
    }

    canMoveTwoPlacesForward(pieceColor: Color, targetSquare: Square): boolean {
        if (!this.isFirstMove(pieceColor)) {
            return false;
        }

        let rankDistance: number;

        if (pieceColor === 'White') {
            rankDistance = 2;
        } else {
            rankDistance = -2;
        }

        return targetSquare.isEmpty() &&
                FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()] === 0 &&
                targetSquare.getRank() - this.getRank() === rankDistance;
    }

}