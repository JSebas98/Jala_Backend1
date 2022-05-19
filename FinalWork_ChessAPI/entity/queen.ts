import { FileMapper } from '../shared/file.mapper';
import { Piece } from './piece';
import { Square } from './square';

export class Queen extends Piece {
    canMoveTo(targetSquare: Square): boolean {
        if (this.isTargetSquareCurrentSquare(targetSquare)) {
            return false;
        }

        return targetSquare.isAvailable(this.getColor()) &&
                (this.canMoveDiagonally(targetSquare) ||
                this.canMoveHorizontally(targetSquare) ||
                this.canMoveVertically(targetSquare));
    }
}