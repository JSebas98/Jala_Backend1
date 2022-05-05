import { Column } from "typeorm";
import { Piece } from "./piece.entity";
import { Position } from "./position.entity";

export class Board {
    
    @Column()
    squares!: Position[];

    @Column()
    pieces!: Piece[];
    
}