import Piece from "./piece";
import Position from "./position";

export default class Bishop extends Piece {
    
    canMove(finalPosition: Position): boolean {
        return true;
    }

}