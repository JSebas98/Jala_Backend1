import Piece from "./piece";
import Position from "./position";

export default class Queen extends Piece {
    canMove(position: Position): boolean {
        let bishop = Math.abs(this.position.getFile().charCodeAt(0) - position.getFile().charCodeAt(0))
        === Math.abs(this.position.getRank() - position.getRank());

        let rook = (+(Math.abs(this.position.getFile().charCodeAt(0) - position.getFile().charCodeAt(0)) === 0)
        ^ +(Math.abs(this.position.getRank() - position.getRank()) === 0))  === 1;

        let diffPosition = this.position.getFile() != position.getFile() || this.position.getRank() != position.getRank();
        
        return (((+bishop) ^ (+rook)) === 1) && diffPosition;
    }
}