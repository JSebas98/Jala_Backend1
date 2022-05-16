import { Piece } from './piece';
import { Square } from './square';
import { FileMapper } from '../shared/file.mapper';

export class King extends Piece {
    
    canMoveTo(targetSquare: Square): boolean {
        if (this.isTargetSquareCurrentSquare(targetSquare)) {
            return false;
        }

        if(!targetSquare.isEmpty()) {
            return false;
        }

        return Math.abs(targetSquare.getRank() - this.getRank()) <= 1
                && Math.abs(FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()]) <=1;
    }

}