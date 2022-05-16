import { FileMapper } from '../shared/file.mapper';
import { Piece } from './piece';
import { Square } from './square';

export class Queen extends Piece {
    canMoveTo(targetSquare: Square): boolean {
        if (this.isTargetSquareCurrentSquare(targetSquare)) {
            return false;
        }

        if(!targetSquare.isEmpty()) {
            return false;
        }

        const canMoveDiagonally: boolean = Math.abs(FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()]) ===
                                            Math.abs(targetSquare.getRank() - this.getRank());
                                            
        const canMoveVerticallyOrHorizontally: boolean = (Math.abs(FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()]) === 0 &&
                                                Math.abs(targetSquare.getRank() - this.getRank()) >= 0)
                                                || (Math.abs(targetSquare.getRank() - this.getRank()) === 0 &&
                                                Math.abs(FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()]) >= 0);

        return canMoveDiagonally || canMoveVerticallyOrHorizontally;
    }

}