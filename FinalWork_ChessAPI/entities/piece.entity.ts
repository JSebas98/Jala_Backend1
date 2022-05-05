import Position from "./position";
import { Color, Row, Column } from "../src/types";

export default abstract class Piece {

    protected position: Position
    
    constructor(
        private readonly color: Color,
        row: Row,
        column: Column
    ) {
        this.position = new Position(row, column);
    }

    moveTo(position: Position) {
        this.position = position;
    }

    abstract canMove(position: Position): boolean;
}