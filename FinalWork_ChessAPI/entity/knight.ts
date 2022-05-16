import { FileMapper } from '../shared/file.mapper';
import { Piece } from './piece';
import { Square } from './square';

export class Knight extends Piece {
    canMoveTo(targetSquare: Square): boolean {
        if (this.isTargetSquareCurrentSquare(targetSquare)) {
            return false;
        }

        if(!targetSquare.isEmpty()) {
            return false;
        }

        const canMoveVerticalJump: boolean = Math.abs(FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()]) === 1 &&
                                            Math.abs(targetSquare.getRank() - this.getRank()) === 2;
        
        const canMoveHorizontalJump: boolean = Math.abs(FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()]) === 2 &&
                                                Math.abs(targetSquare.getRank() - this.getRank()) === 1;;
        
        return canMoveHorizontalJump || canMoveVerticalJump;
    }

}