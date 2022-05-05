import { Column } from "typeorm";
import { File, Rank } from "../src/types";
import { Piece } from "./piece.entity";

export abstract class Position {
    @Column()
    file!: File;

    @Column()
    rank!: Rank;

    @Column()
    occupied!: boolean;

    @Column()
    piece?: Piece;
}