import { Piece } from './piece';
import { Square } from './square';

export class Knight extends Piece {
    
    canMoveTo(targetSquare: Square): boolean {
        if (this.isTargetSquareCurrentSquare(targetSquare)) {
            return false;
        }

        return targetSquare.isAvailable(this.getColor()) &&
                this.canMoveInLShape(targetSquare);
    }

}