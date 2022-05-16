import { FileMapper } from '../shared/file.mapper';
import { Piece } from './piece';
import { Square } from './square';

export class Pawn extends Piece {

    canMoveTo(targetSquare: Square): boolean {
        if (this.isTargetSquareCurrentSquare(targetSquare)) {
            return false;
        }

        if(!targetSquare.isEmpty()) {
            return false;
        }

        const canMoveDiagonallyWhite: boolean = Math.abs(FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()]) == 1 &&
                                                targetSquare.getRank() - this.getRank() == 1;
        const canMoveDiagonallyBlack: boolean = Math.abs(FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()]) == 1 &&
                                                targetSquare.getRank() - this.getRank() == -1;
        const canMoveVerticallyWhite: boolean = Math.abs(FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()]) == 0 &&
                                                (targetSquare.getRank() - this.getRank() == 1 || targetSquare.getRank() - this.getRank() == 2);
        const canMoveVerticallyBlack: boolean = Math.abs(FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()]) == 0 &&
                                                (targetSquare.getRank() - this.getRank() == -1 || targetSquare.getRank() - this.getRank() == -2);

        if(this.getColor() === 'White') {
            return canMoveDiagonallyWhite || canMoveVerticallyWhite;
        } else {
            return canMoveDiagonallyBlack || canMoveVerticallyBlack;
        }        
    }

}