import { Piece } from './piece';
import { Square } from './square';

export class Bishop extends Piece {
    
    canMoveTo(targetSquare: Square): boolean {
        if (this.isTargetSquareCurrentSquare(targetSquare)) {
            return false;
        }

        return targetSquare.isAvailable(this.getColor()) &&
                this.canMoveDiagonally(targetSquare);
    }
}