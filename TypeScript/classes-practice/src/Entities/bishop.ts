import Piece from "../piece";
import Position from "../position";

export default class Bishop extends Piece {
    
    canMove(finalPosition: Position): boolean {
        return Math.abs(this.position.getFile().charCodeAt(0) - finalPosition.getFile().charCodeAt(0)) ===
        Math.abs(this.position.getRank() - finalPosition.getRank());
    }

}