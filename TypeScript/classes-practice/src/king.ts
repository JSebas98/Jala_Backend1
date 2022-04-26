import Piece from "./piece";
import Position from "./position";

export default class King extends Piece {

    public canMove(finalPosition: Position): boolean {
        // Checks if finalPosition is the current position
        if (this.position.getRank() == finalPosition.getRank()
            && this.position.getFile() == finalPosition.getFile()){
                return false;
        }
        
        return (Math.abs(this.position.getRank() - finalPosition.getRank()) <= 1
        && Math.abs(this.position.getFile().charCodeAt(0) - finalPosition.getFile().charCodeAt(0)) <= 1)
    }
}