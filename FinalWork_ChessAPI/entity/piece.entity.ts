import { Color, File, PieceStatus, Rank } from "../src/types";
import { Column } from 'typeorm';

export abstract class Piece {
    @Column()
    color!: Color;

    @Column()
    file!: File;

    @Column()
    rank!: Rank;

    @Column()
    status!: PieceStatus;
}